/**
 * Maps a fetched Storyblok blok (loosely-typed) onto the typed content objects
 * the page components consume. Each mapper takes the story `content` (or null)
 * plus the local content.ts object as a fallback, so a missing story or a
 * partially-filled one still renders. Field technical names in Storyblok match
 * the content.ts keys.
 */
import type {
  LegalContent,
  JournalContent,
  JournalArticle,
  ArticleContent,
  ArticleProseBlock,
  CheckoutContent,
  CheckoutPayRow,
  CartPageContent,
  CartContent,
  ProductContent,
  ProductPlan,
} from "@/lib/content";

type Blok = Record<string, unknown>;

const str = (v: unknown): string => (typeof v === "string" ? v : "");
const num = (v: unknown): number => (Number(v) ? Number(v) : 0);
const bool = (v: unknown): boolean => v === true || v === "true";
export const arr = (v: unknown): Blok[] => (Array.isArray(v) ? (v as Blok[]) : []);
/** Storyblok asset field → URL string; plain string path passes through. */
export const img = (v: unknown): string =>
  v && typeof v === "object" && "filename" in v
    ? str((v as { filename?: unknown }).filename)
    : str(v);

/* -------------------------------------------------------------------------- */
/*  Legal pages (Terms, Privacy)                                               */
/* -------------------------------------------------------------------------- */

export function mapLegal(
  content: Blok | null,
  fallback: LegalContent,
): LegalContent {
  if (!content) return fallback;
  const clauses = arr(content.clauses);
  return {
    eyebrow: str(content.eyebrow) || fallback.eyebrow,
    title: str(content.title) || fallback.title,
    lastUpdated: str(content.lastUpdated) || fallback.lastUpdated,
    intro: str(content.intro) || fallback.intro,
    contentsLabel: str(content.contentsLabel) || fallback.contentsLabel,
    clauses: clauses.length
      ? clauses.map((c) => ({
          number: str(c.number),
          title: str(c.title),
          id: str(c.id),
          body: str(c.body),
        }))
      : fallback.clauses,
  };
}

/* -------------------------------------------------------------------------- */
/*  Journal index                                                             */
/* -------------------------------------------------------------------------- */

const mapArticleCard = (a: Blok): JournalArticle => ({
  category: str(a.category),
  title: str(a.title),
  excerpt: str(a.excerpt),
  meta: str(a.meta),
  image: img(a.image),
  href: str(a.href),
});

/** Map a published `article_page` story → a Journal index card, so newly
    created articles appear on /journal automatically. */
export function mapArticleStoryCard(story: {
  slug?: string;
  content?: Blok | null;
}): JournalArticle {
  const c = (story.content ?? {}) as Blok;
  const slug = str(story.slug).replace(/^article-/, "");
  return {
    category: str(c.category),
    title: str(c.title),
    excerpt: str(c.dek),
    meta: str(c.metaLine) || str(c.publishedValue),
    image: img(c.cover) || "/images/journal/featured.png",
    href: `/journal/${slug}`,
  };
}

/** Hero image of each published article, keyed by the journal URL that points
    at it. Lets an index card take its thumbnail straight from the article, so
    publishing a blog is the only step and nobody has to upload a second copy
    onto the journal story. Articles with no cover are left out of the map, so
    those cards keep whatever image they were given. */
export function articleCoversByHref(
  stories: { slug?: string; content?: Blok | null }[],
): Map<string, string> {
  const covers = new Map<string, string>();
  for (const story of stories) {
    const cover = img(((story.content ?? {}) as Blok).cover);
    if (!cover) continue;
    covers.set(`/journal/${str(story.slug).replace(/^article-/, "")}`, cover);
  }
  return covers;
}

export function mapJournal(
  content: Blok | null,
  fallback: JournalContent,
): JournalContent {
  if (!content) return fallback;
  const tabs = arr(content.tabs);
  const featured = arr(content.featured)[0];
  const articles = arr(content.articles);
  const nl = arr(content.newsletter)[0];
  return {
    eyebrow: str(content.eyebrow) || fallback.eyebrow,
    heading: str(content.heading) || fallback.heading,
    subtext: str(content.subtext) || fallback.subtext,
    tabs: tabs.length ? tabs.map((t) => str(t.text)) : fallback.tabs,
    featured: featured
      ? {
          eyebrow: str(featured.eyebrow),
          title: str(featured.title),
          excerpt: str(featured.excerpt),
          meta: str(featured.meta),
          image: img(featured.image) || fallback.featured.image,
          href: str(featured.href),
          readMoreLabel: str(featured.readMoreLabel),
        }
      : fallback.featured,
    articles: articles.length
      ? articles.map(mapArticleCard)
      : fallback.articles,
    loadMoreLabel: str(content.loadMoreLabel) || fallback.loadMoreLabel,
    newsletter: nl
      ? {
          eyebrow: str(nl.eyebrow),
          heading: str(nl.heading),
          subtext: str(nl.subtext),
          placeholder: str(nl.placeholder),
          ctaLabel: str(nl.ctaLabel),
        }
      : fallback.newsletter,
  };
}

/* -------------------------------------------------------------------------- */
/*  Article detail                                                            */
/* -------------------------------------------------------------------------- */

function mapProse(b: Blok): ArticleProseBlock {
  const text = str(b.text);
  switch (str(b.type)) {
    case "lead":
      return { type: "lead", text };
    case "h2":
      return { type: "h2", text, id: str(b.id) };
    case "quote":
      return { type: "quote", text };
    case "image":
      return {
        type: "image",
        image: img(b.image),
        ...(str(b.caption) ? { caption: str(b.caption) } : {}),
      };
    default:
      return { type: "p", text };
  }
}

export function mapArticle(
  content: Blok | null,
  fallback: ArticleContent,
): ArticleContent {
  if (!content) return fallback;
  const toc = arr(content.toc);
  const prose = arr(content.prose);
  const related = arr(content.relatedArticles);
  return {
    journalLabel: str(content.journalLabel) || fallback.journalLabel,
    category: str(content.category) || fallback.category,
    title: str(content.title) || fallback.title,
    dek: str(content.dek) || fallback.dek,
    author: {
      label: str(content.authorLabel) || fallback.author.label,
      name: str(content.authorName) || fallback.author.name,
      avatar: img(content.authorAvatar) || fallback.author.avatar,
    },
    published: {
      label: str(content.publishedLabel) || fallback.published.label,
      value: str(content.publishedValue) || fallback.published.value,
    },
    readTime: {
      label: str(content.readTimeLabel) || fallback.readTime.label,
      value: str(content.readTimeValue) || fallback.readTime.value,
    },
    metaLine: str(content.metaLine) || fallback.metaLine,
    cover: img(content.cover) || fallback.cover,
    tocLabel: str(content.tocLabel) || fallback.tocLabel,
    toc: toc.length
      ? toc.map((t) => ({ label: str(t.label), id: str(t.id) }))
      : fallback.toc,
    prose: prose.length ? prose.map(mapProse) : fallback.prose,
    disclaimer: {
      label: str(content.disclaimerLabel) || fallback.disclaimer.label,
      text: str(content.disclaimerText) || fallback.disclaimer.text,
    },
    reviewer: {
      label: str(content.reviewerLabel) || fallback.reviewer.label,
      name: str(content.reviewerName) || fallback.reviewer.name,
      note: str(content.reviewerNote) || fallback.reviewer.note,
      avatar: img(content.reviewerAvatar) || fallback.reviewer.avatar,
    },
    related: {
      eyebrow: str(content.relatedEyebrow) || fallback.related.eyebrow,
      heading: str(content.relatedHeading) || fallback.related.heading,
      articles: related.length
        ? related.map(mapArticleCard)
        : fallback.related.articles,
    },
  };
}

/* -------------------------------------------------------------------------- */
/*  Checkout                                                                   */
/* -------------------------------------------------------------------------- */

export function mapCheckout(
  content: Blok | null,
  fb: CheckoutContent,
): CheckoutContent {
  if (!content) return fb;
  const g = (name: string): Blok | undefined => arr(content[name])[0];
  const contact = g("contact");
  const delivery = g("delivery");
  const shipping = g("shipping");
  const consent = g("consent");
  const payment = g("payment");
  const summary = g("summary");
  const footerLinks = arr(content.footerLinks);

  return {
    expressLabel: str(content.expressLabel) || fb.expressLabel,
    orLabel: str(content.orLabel) || fb.orLabel,
    contact: contact
      ? {
          title: str(contact.title),
          signInLabel: str(contact.signInLabel),
          signInHref: str(contact.signInHref),
          emailPlaceholder: str(contact.emailPlaceholder),
          optInLabel: str(contact.optInLabel),
        }
      : fb.contact,
    delivery: delivery
      ? {
          title: str(delivery.title),
          countryLabel: str(delivery.countryLabel),
          countryValue: str(delivery.countryValue),
          firstName: str(delivery.firstName),
          lastName: str(delivery.lastName),
          company: str(delivery.company),
          address: str(delivery.address),
          address2: str(delivery.address2),
          zip: str(delivery.zip),
          city: str(delivery.city),
          phone: str(delivery.phone),
        }
      : fb.delivery,
    shipping: shipping
      ? { title: str(shipping.title), empty: str(shipping.empty) }
      : fb.shipping,
    consent: consent
      ? {
          title: str(consent.title),
          subtitle: str(consent.subtitle),
          items: arr(consent.items).length
            ? arr(consent.items).map((i) => ({
                title: str(i.title),
                body: str(i.body),
              }))
            : fb.consent.items,
        }
      : fb.consent,
    payment: payment
      ? {
          title: str(payment.title),
          subtitle: str(payment.subtitle),
          cardLabel: str(payment.cardLabel),
          logos: arr(payment.logos).length
            ? arr(payment.logos).map((l) => ({
                src: img(l.src),
                alt: str(l.alt),
              }))
            : fb.payment.logos,
          logosMore: str(payment.logosMore),
          cardNumber: str(payment.cardNumber),
          expiry: str(payment.expiry),
          cvc: str(payment.cvc),
          nameOnCard: str(payment.nameOnCard),
          billingSame: str(payment.billingSame),
          altRows: arr(payment.altRows).length
            ? arr(payment.altRows).map((r): CheckoutPayRow => ({
                id: str(r.id),
                label: str(r.label),
                logo: str(r.logo) || undefined,
                logoW: str(r.logoW) ? num(r.logoW) : undefined,
                boxed: bool(r.boxed) || undefined,
              }))
            : fb.payment.altRows,
          saveTitle: str(payment.saveTitle),
          saveBody: str(payment.saveBody),
          saveDismiss: str(payment.saveDismiss),
        }
      : fb.payment,
    discountPlaceholder:
      str(content.discountPlaceholder) || fb.discountPlaceholder,
    applyLabel: str(content.applyLabel) || fb.applyLabel,
    summary: summary
      ? {
          barLabel: str(summary.barLabel),
          subscriptionLabel: str(summary.subscriptionLabel),
          subtotalLabel: str(summary.subtotalLabel),
          reviewLabel: str(summary.reviewLabel),
          reviewValue: str(summary.reviewValue),
          shippingLabel: str(summary.shippingLabel),
          shippingValue: str(summary.shippingValue),
          totalLabel: str(summary.totalLabel),
          totalNote: str(summary.totalNote),
          taxNote: str(summary.taxNote),
        }
      : fb.summary,
    payNow: str(content.payNow) || fb.payNow,
    payDisclaimer: str(content.payDisclaimer) || fb.payDisclaimer,
    footerLinks: footerLinks.length
      ? footerLinks.map((l) => ({ label: str(l.label), href: str(l.href) }))
      : fb.footerLinks,
  };
}

/* -------------------------------------------------------------------------- */
/*  Cart (page + drawer)                                                       */
/* -------------------------------------------------------------------------- */

export function mapCartPage(
  content: Blok | null,
  fb: CartPageContent,
): CartPageContent {
  if (!content) return fb;
  const s = (k: keyof CartPageContent) => str(content[k]) || fb[k];
  return {
    eyebrow: s("eyebrow"),
    heading: s("heading"),
    subtext: s("subtext"),
    summaryTitle: s("summaryTitle"),
    subtotalLabel: s("subtotalLabel"),
    shippingLabel: s("shippingLabel"),
    shippingValue: s("shippingValue"),
    taxLabel: s("taxLabel"),
    taxValue: s("taxValue"),
    dueLabel: s("dueLabel"),
    checkoutLabel: s("checkoutLabel"),
    trustLine: s("trustLine"),
    emptyLabel: s("emptyLabel"),
    emptyCtaLabel: s("emptyCtaLabel"),
    emptyCtaHref: s("emptyCtaHref"),
    stackedEyebrow: s("stackedEyebrow"),
    stackedHeading: s("stackedHeading"),
  };
}

export function mapCartDrawer(
  content: Blok | null,
  fb: CartContent,
): CartContent {
  if (!content) return fb;
  const upsells = arr(content.upsells);
  const logos = arr(content.paymentLogos);
  return {
    title: str(content.title) || fb.title,
    emptyLabel: str(content.emptyLabel) || fb.emptyLabel,
    upsellTitle: str(content.upsellTitle) || fb.upsellTitle,
    pairedTitle: str(content.pairedTitle) || fb.pairedTitle,
    upsells: upsells.length
      ? upsells.map((u) => ({
          category: str(u.category),
          name: str(u.name),
          description: str(u.description),
          image: img(u.image),
          price: str(u.price),
          href: str(u.href),
        }))
      : fb.upsells,
    subscriptionLabel: str(content.subscriptionLabel) || fb.subscriptionLabel,
    removeLabel: str(content.removeLabel) || fb.removeLabel,
    switchPlanLabel: str(content.switchPlanLabel) || fb.switchPlanLabel,
    shippingLabel: str(content.shippingLabel) || fb.shippingLabel,
    shippingValue: str(content.shippingValue) || fb.shippingValue,
    paymentLabel: str(content.paymentLabel) || fb.paymentLabel,
    paymentLogos: logos.length
      ? logos.map((l) => ({ src: img(l.src), alt: str(l.alt) }))
      : fb.paymentLogos,
    paymentMore: str(content.paymentMore) || fb.paymentMore,
    goodieLabel: str(content.goodieLabel) || fb.goodieLabel,
    goodieHighlight: str(content.goodieHighlight) || fb.goodieHighlight,
    goodieText: str(content.goodieText) || fb.goodieText,
    subtotalLabel: str(content.subtotalLabel) || fb.subtotalLabel,
    viewCartLabel: str(content.viewCartLabel) || fb.viewCartLabel,
    checkoutLabel: str(content.checkoutLabel) || fb.checkoutLabel,
    noteLabel: str(content.noteLabel) || fb.noteLabel,
    note: str(content.note) || fb.note,
  };
}

/* -------------------------------------------------------------------------- */
/*  Product                                                                    */
/* -------------------------------------------------------------------------- */

export function mapProduct(
  content: Blok | null,
  fb: ProductContent,
): ProductContent {
  if (!content) return fb;
  const q = arr(content.qualityTest)[0];
  const h = arr(content.howItWorks)[0];
  const plans = arr(content.plans);
  const trust = arr(content.trust);
  const methods = arr(content.methods);
  const accordion = arr(content.accordion);
  const whyFeatures = arr(content.whyFeatures);
  const thumbs = arr(content.galleryThumbnails);
  const fq = arr(content.faq)[0];

  return {
    slug: str(content.slug) || fb.slug,
    eyebrow: str(content.eyebrow) || fb.eyebrow,
    name: str(content.name) || fb.name,
    description: str(content.description) || fb.description,
    tagline: str(content.tagline) || fb.tagline,
    gallery: {
      main: img(content.galleryMain) || fb.gallery.main,
      thumbnails: thumbs.length
        ? thumbs.map((t) => str(t.text))
        : fb.gallery.thumbnails,
    },
    trust: trust.length
      ? trust.map((t) => ({ icon: img(t.icon), label: str(t.label) }))
      : fb.trust,
    methodLabel: str(content.methodLabel) || fb.methodLabel,
    methods: methods.length
      ? methods.map((m) => ({ image: img(m.image), alt: str(m.alt) }))
      : fb.methods,
    price: {
      amount: str(content.priceAmount) || fb.price.amount,
      period: str(content.pricePeriod) || fb.price.period,
    },
    planLabel: str(content.planLabel) || fb.planLabel,
    plans: plans.length
      ? plans.map((p): ProductPlan => {
          const badgeText = str(p.badgeText);
          const badgeVariant = str(p.badgeVariant);
          const save = str(p.save);
          return {
            label: str(p.label),
            price: str(p.price),
            period: str(p.period),
            ...(badgeText
              ? {
                  badge: {
                    text: badgeText,
                    variant: badgeVariant === "best" ? "best" : "recommended",
                  },
                }
              : {}),
            ...(save ? { save } : {}),
          };
        })
      : fb.plans,
    cta: {
      label: str(content.ctaLabel) || fb.cta.label,
      href: str(content.ctaHref) || fb.cta.href,
      note: str(content.ctaNote) || fb.cta.note,
      // Left undefined when unset so the component keeps its default classes
      // rather than painting an empty string over them.
      color: str(content.ctaColor) || fb.cta.color,
      textColor: str(content.ctaTextColor) || fb.cta.textColor,
    },
    accordion: accordion.length
      ? accordion.map((a) => ({
          title: str(a.title),
          ...(str(a.body) ? { body: str(a.body) } : {}),
        }))
      : fb.accordion,
    safetyLabel: str(content.safetyLabel) || fb.safetyLabel,
    safetyHref: str(content.safetyHref) || fb.safetyHref,
    why: {
      heading: str(content.whyHeading) || fb.why.heading,
      features: whyFeatures.length
        ? whyFeatures.map((f) => ({
            icon: img(f.icon),
            title: str(f.title),
            description: str(f.description),
          }))
        : fb.why.features,
    },
    qualityTest: q
      ? {
          heading: str(q.heading),
          collage: arr(q.collage).length
            ? arr(q.collage).map((t) => str(t.text))
            : fb.qualityTest.collage,
          lead: str(q.lead),
          body: str(q.body),
          tests: arr(q.tests).length
            ? arr(q.tests).map((t) => ({
                name: str(t.name),
                status: str(t.status),
                description: str(t.description),
              }))
            : fb.qualityTest.tests,
        }
      : fb.qualityTest,
    howItWorks: h
      ? {
          eyebrow: str(h.eyebrow),
          heading: str(h.heading),
          subtext: str(h.subtext),
          cardImage: img(h.cardImage),
          steps: arr(h.steps).length
            ? arr(h.steps).map((s) => ({
                number: str(s.number),
                title: str(s.title),
                description: str(s.description),
                image: img(s.image),
              }))
            : fb.howItWorks.steps,
          ctaLabel: str(h.ctaLabel),
          ctaHref: str(h.ctaHref),
        }
      : fb.howItWorks,
    faq: fq
      ? {
          eyebrow: str(fq.eyebrow) || fb.faq.eyebrow,
          heading: str(fq.heading) || fb.faq.heading,
          subtext: str(fq.subtext) || fb.faq.subtext,
          ctaLabel: str(fq.ctaLabel) || fb.faq.ctaLabel,
          ctaHref: str(fq.ctaHref) || fb.faq.ctaHref,
          items: arr(fq.items).length
            ? arr(fq.items).map((i) => ({
                question: str(i.question),
                answer: str(i.answer),
              }))
            : fb.faq.items,
        }
      : fb.faq,
  };
}
