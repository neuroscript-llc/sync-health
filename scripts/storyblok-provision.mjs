/**
 * One-shot Storyblok provisioner for the Sync. site.
 *
 *   node scripts/storyblok-provision.mjs
 *
 * Requires (read from .env.local or the environment):
 *   STORYBLOK_OAUTH_TOKEN         personal access token (Management API)
 *   STORYBLOK_SPACE_ID            numeric space id
 *   NEXT_PUBLIC_STORYBLOK_REGION  eu | us | ap | ca | cn   (default: eu)
 *
 * Idempotent: re-running updates existing components and the Home story
 * rather than duplicating them.
 */
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import StoryblokClient from "storyblok-js-client";
import { components } from "./storyblok-schema.mjs";
import { seed } from "./storyblok-seed.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(ROOT, "public");

/* --------------------------- env ---------------------------------------- */
function loadEnv() {
  const p = path.join(ROOT, ".env.local");
  if (!fs.existsSync(p)) return;
  for (const line of fs.readFileSync(p, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  }
}
loadEnv();

const OAUTH =
  process.env.STORYBLOK_OAUTH_TOKEN ||
  process.env.STORYBLOK_PERSONAL_ACCESS_TOKEN;
const SPACE_ID = process.env.STORYBLOK_SPACE_ID;
const REGION = process.env.NEXT_PUBLIC_STORYBLOK_REGION || "eu";

if (!OAUTH || !SPACE_ID) {
  console.error(
    "\n✖ Missing credentials. Set the following in .env.local (or the env):\n" +
      "  STORYBLOK_OAUTH_TOKEN=<personal access token>\n" +
      "  STORYBLOK_SPACE_ID=<numeric space id>\n" +
      "  NEXT_PUBLIC_STORYBLOK_REGION=eu\n\n" +
      "Get the token at: https://app.storyblok.com/#/me/account?tab=token\n" +
      "Find the space id in: Space Settings → General.\n",
  );
  process.exit(1);
}

const Storyblok = new StoryblokClient({ oauthToken: OAUTH, region: REGION });
const base = `spaces/${SPACE_ID}`;

/* --------------------------- helpers ------------------------------------ */
const uid = () => crypto.randomUUID();
const blk = (component, fields) => ({ _uid: uid(), component, ...fields });
const mime = (f) =>
  f.endsWith(".svg")
    ? "image/svg+xml"
    : /\.jpe?g$/.test(f)
      ? "image/jpeg"
      : f.endsWith(".png")
        ? "image/png"
        : "application/octet-stream";

/* --------------------------- components --------------------------------- */
async function syncComponents() {
  const existing = (await Storyblok.get(`${base}/components`, { per_page: 100 }))
    .data.components;
  const byName = new Map(existing.map((c) => [c.name, c.id]));
  let created = 0;
  let updated = 0;
  for (const c of components) {
    if (byName.has(c.name)) {
      const id = byName.get(c.name);
      await Storyblok.put(`${base}/components/${id}`, {
        component: { ...c, id },
      });
      updated++;
    } else {
      await Storyblok.post(`${base}/components`, { component: c });
      created++;
    }
    process.stdout.write(`  · ${c.name}\n`);
  }
  console.log(`✔ Components synced (${created} created, ${updated} updated)\n`);
}

/* --------------------------- assets ------------------------------------- */
const assetCache = new Map();

async function uploadAsset(localPath) {
  if (assetCache.has(localPath)) return assetCache.get(localPath);
  const abs = path.join(PUBLIC_DIR, localPath.replace(/^\//, ""));
  if (!fs.existsSync(abs)) throw new Error(`Missing image file: ${abs}`);
  const buf = fs.readFileSync(abs);
  const filename = path.basename(localPath);

  const sign = (await Storyblok.post(`${base}/assets`, { filename })).data;

  const form = new FormData();
  for (const [k, v] of Object.entries(sign.fields)) form.append(k, v);
  form.append("file", new Blob([buf], { type: mime(filename) }), filename);

  const up = await fetch(sign.post_url, { method: "POST", body: form });
  if (![200, 201, 204].includes(up.status)) {
    throw new Error(`S3 upload failed for ${filename}: ${up.status}`);
  }
  await Storyblok.get(`${base}/assets/${sign.id}/finish_upload`);
  const res = (await Storyblok.get(`${base}/assets/${sign.id}`)).data;
  const asset = res.asset ?? res;
  const filenameUrl = asset.filename || sign.public_url || sign.pretty_url;

  const obj = {
    id: sign.id,
    filename: filenameUrl,
    fieldtype: "asset",
    alt: "",
    name: "",
    title: "",
    focus: "",
    copyright: "",
  };
  assetCache.set(localPath, obj);
  process.stdout.write(`  · ${filename}\n`);
  return obj;
}

/** Collect every unique image path in the seed. */
function collectImages() {
  const set = new Set();
  set.add(seed.hero.backgroundImage);
  seed.trustBar.logos.forEach((l) => set.add(l.image));
  set.add(seed.howItWorks.cardImage);
  seed.protocols.cards.forEach((c) => set.add(c.image));
  seed.quality.features.forEach((f) => set.add(f.icon));
  seed.catalog.products.forEach((p) => set.add(p.image));
  seed.compare.supporting.forEach((s) => set.add(s.icon));
  seed.testimonials.testimonials.forEach((t) => set.add(t.image));
  seed.blog.articles.forEach((a) => set.add(a.image));
  seed.footer.payments.forEach((p) => set.add(p.image));
  return [...set];
}

async function uploadAll() {
  const imgs = collectImages();
  for (const p of imgs) await uploadAsset(p);
  console.log(`✔ Uploaded ${imgs.length} images\n`);
}

/* --------------------------- story content ------------------------------ */
/** asset field getter: clones the uploaded asset and stamps alt text. */
const a = (p, alt = "") => ({ ...assetCache.get(p), alt });

function buildBody() {
  const s = seed;
  return [
    blk("hero", {
      headline: s.hero.headline,
      ctaLabel: s.hero.ctaLabel,
      ctaHref: s.hero.ctaHref,
      backgroundImage: a(s.hero.backgroundImage, s.hero.backgroundAlt),
      backgroundAlt: s.hero.backgroundAlt,
      header: [
        blk("site_header", {
          tickerMessages: s.header.tickerMessages.map((t) =>
            blk("text_item", { text: t }),
          ),
          navLinks: s.header.navLinks.map((l) =>
            blk("nav_link", {
              label: l.label,
              href: l.href,
              hasDropdown: l.hasDropdown,
            }),
          ),
          loginLabel: s.header.loginLabel,
          loginHref: s.header.loginHref,
          ctaLabel: s.header.ctaLabel,
          ctaHref: s.header.ctaHref,
        }),
      ],
    }),

    blk("trust_bar", {
      eyebrow: s.trustBar.eyebrow,
      logos: s.trustBar.logos.map((l) =>
        blk("cert_logo", {
          image: a(l.image, l.alt),
          alt: l.alt,
          width: l.width,
          height: l.height,
        }),
      ),
    }),

    blk("how_it_works", {
      eyebrow: s.howItWorks.eyebrow,
      heading: s.howItWorks.heading,
      subtext: s.howItWorks.subtext,
      cardImage: a(s.howItWorks.cardImage),
      steps: s.howItWorks.steps.map((st) => blk("step", { ...st })),
      ctaLabel: s.howItWorks.ctaLabel,
      ctaHref: s.howItWorks.ctaHref,
    }),

    blk("protocols", {
      eyebrow: s.protocols.eyebrow,
      heading: s.protocols.heading,
      subtext: s.protocols.subtext,
      cards: s.protocols.cards.map((c) =>
        blk("protocol_card", {
          image: a(c.image),
          category: c.category,
          description: c.description,
          featured: c.featured,
        }),
      ),
      ctaLabel: s.protocols.ctaLabel,
      ctaHref: s.protocols.ctaHref,
    }),

    blk("quality", {
      eyebrow: s.quality.eyebrow,
      heading: s.quality.heading,
      supporting: s.quality.supporting,
      features: s.quality.features.map((f) =>
        blk("quality_feature", {
          icon: a(f.icon),
          title: f.title,
          description: f.description,
        }),
      ),
    }),

    blk("catalog", {
      eyebrow: s.catalog.eyebrow,
      heading: s.catalog.heading,
      toggleOptions: s.catalog.toggleOptions.map((t) =>
        blk("text_item", { text: t }),
      ),
      toggleActive: s.catalog.toggleActive,
      products: s.catalog.products.map((p) =>
        blk("catalog_product", {
          category: p.category,
          name: p.name,
          description: p.description,
          image: a(p.image),
          ctaLabel: p.ctaLabel,
          ctaHref: p.ctaHref,
          featured: p.featured,
        }),
      ),
      ctaLabel: s.catalog.ctaLabel,
      ctaHref: s.catalog.ctaHref,
    }),

    blk("compare", {
      eyebrow: s.compare.eyebrow,
      heading: s.compare.heading,
      subtext: s.compare.subtext,
      features: s.compare.features.map((t) => blk("text_item", { text: t })),
      sync: s.compare.sync.map((c) =>
        blk("compare_cell", { type: c.type, text: c.text || "" }),
      ),
      competitors: s.compare.competitors.map((col) =>
        blk("compare_column", {
          title: col.title,
          cells: col.cells.map((c) =>
            blk("compare_cell", { type: c.type, text: c.text || "" }),
          ),
        }),
      ),
      supporting: s.compare.supporting.map((sp) =>
        blk("compare_support", { icon: a(sp.icon), label: sp.label }),
      ),
    }),

    blk("testimonials", {
      eyebrow: s.testimonials.eyebrow,
      heading: s.testimonials.heading,
      ratingLabel: s.testimonials.ratingLabel,
      testimonials: s.testimonials.testimonials.map((t) =>
        blk("testimonial", {
          highlight: t.highlight,
          quote: t.quote,
          name: t.name,
          tag: t.tag,
          image: a(t.image),
        }),
      ),
    }),

    blk("blog", {
      eyebrow: s.blog.eyebrow,
      heading: s.blog.heading,
      subtext: s.blog.subtext,
      articles: s.blog.articles.map((ar) =>
        blk("article", {
          category: ar.category,
          title: ar.title,
          meta: ar.meta,
          image: a(ar.image),
          href: ar.href,
        }),
      ),
      ctaLabel: s.blog.ctaLabel,
      ctaHref: s.blog.ctaHref,
    }),

    blk("faq", {
      eyebrow: s.faq.eyebrow,
      heading: s.faq.heading,
      subtext: s.faq.subtext,
      ctaLabel: s.faq.ctaLabel,
      ctaHref: s.faq.ctaHref,
      items: s.faq.items.map((i) => blk("faq_item", { ...i })),
    }),

    blk("final_cta", {
      eyebrow: s.finalCta.eyebrow,
      heading: s.finalCta.heading,
      subtext: s.finalCta.subtext,
      ctaLabel: s.finalCta.ctaLabel,
      ctaHref: s.finalCta.ctaHref,
    }),

    blk("footer", {
      tagline: s.footer.tagline,
      socials: s.footer.socials.map((so) => blk("social_link", { ...so })),
      navColumns: s.footer.navColumns.map((col) =>
        blk("footer_column", {
          links: col.links.map((l) => blk("footer_link", { ...l })),
        }),
      ),
      newsletterText: s.footer.newsletterText,
      newsletterPlaceholder: s.footer.newsletterPlaceholder,
      newsletterCta: s.footer.newsletterCta,
      disclaimer: s.footer.disclaimer,
      payments: s.footer.payments.map((p) =>
        blk("payment_logo", { image: a(p.image, p.alt), alt: p.alt }),
      ),
    }),
  ];
}

async function seedHome() {
  const content = blk("page", { body: buildBody() });

  const list = (await Storyblok.get(`${base}/stories`, { per_page: 100 })).data
    .stories;
  const existing = list.find((st) => st.slug === "home");

  const story = {
    name: "Home",
    slug: "home",
    is_startpage: true,
    content,
  };

  if (existing) {
    await Storyblok.put(`${base}/stories/${existing.id}`, { story, publish: 1 });
    console.log(`✔ Home story updated & published (id ${existing.id})\n`);
  } else {
    const res = await Storyblok.post(`${base}/stories`, { story, publish: 1 });
    console.log(
      `✔ Home story created & published (id ${res.data.story.id})\n`,
    );
  }
}

/* --------------------------- run ---------------------------------------- */
async function main() {
  console.log(`\nProvisioning Storyblok space ${SPACE_ID} (${REGION})…\n`);
  console.log("→ Syncing components");
  await syncComponents();
  console.log("→ Uploading images");
  await uploadAll();
  console.log("→ Seeding Home story");
  await seedHome();
  console.log("✅ Done. Open the Visual Editor on the Home story to edit.\n");
}

main().catch((err) => {
  console.error("\n✖ Provisioning failed:\n", err?.message || err);
  if (err?.response) console.error(err.response);
  process.exit(1);
});
