# Editing the Sync. website in Storyblok

Every page on the site is content-managed in Storyblok. You edit text, prices,
images and FAQs in Storyblok, hit **Publish**, and the live site updates within
seconds — no developer needed.

---

## 1. Where things live

Open Storyblok → **Content**. Each page on the site is one "story":

| Story | Live page |
|---|---|
| Home | `/` |
| Terms of Service | `/terms` |
| Privacy Policy | `/privacy` |
| Journal | `/journal` |
| Article — Compounded peptides | `/journal/compounded-peptides` |
| Checkout | `/checkout` |
| Cart | `/cart` |
| Cart drawer | (the slide-out cart, shown on every page) |
| **Product — BPC-157** | `/products/bpc-157` |
| **Product — Sermorelin** | `/products/sermorelin` |
| **Product — NAD+** | `/products/nad` |
| **Product — PT-141** | `/products/pt-141` |
| **Product — GHK-Cu** | `/products/ghk-cu` |
| **Product — Compounded Semaglutide** | `/products/semaglutide` |
| **Product — Compounded Tirzepatide** | `/products/tirzepatide` |
| **Product — DSIP** | `/products/dsip` |
| **Product — MOTS-C** | `/products/mots-c` |

---

## 2. How to edit any page

1. Click the story (e.g. **Product — Sermorelin**).
2. The **Visual Editor** opens: the real page preview on the right, the editable
   fields on the left.
3. Change a field (text, price, image, etc.). The preview updates when you save.
4. Click **Save** to store a draft, then **Publish** to push it live.

> **Save** = keeps a private draft. **Publish** = makes it live on the website.
> Nothing is live until you Publish.

---

## 3. Editing a product page (the common one)

Open any **Product —** story. The fields are grouped top-to-bottom, matching the
page:

- **name / eyebrow / description / tagline** — the hero heading, category tag and
  intro text.
- **trust** — the four badges under the description.
- **priceAmount / plans** — the pricing. Each plan (Monthly / 3-Month / 6-Month)
  has its own **price**, **save** label and **badge**. *(These are placeholders
  right now — see §5.)*
- **accordion** — the "What it is / How it's used / What's in the vial" drop-downs.
- **whyFeatures** — the four benefit tiles ("Why <compound>").
- **qualityTest** — the "Tested every batch" panel and its four tiles.
- **faq** — the questions and answers. Add/remove/reorder items freely.
- **galleryMain / galleryThumbnails** — the product images. *(Placeholders — §5.)*

To add an FAQ: inside **faq → items**, click **+ Add**, pick **FAQ item**, fill in
the question and answer.

---

## 4. Tips & guardrails

- **Do change:** any text, price, image, badge, FAQ, benefit, accordion.
- **Don't change** a story's **slug** (the URL id) — that would break the page's
  link. Editing the content inside is always safe.
- **Images:** click an image field → **Choose asset** to upload/replace.
- **Reordering:** drag blocks (plans, FAQ items, benefits) by the handle.
- Made a mistake? Storyblok keeps a **version history** (top bar) — you can
  restore any previous version.

---

## 5. Known placeholders to update

These were flagged "pending" in the copy doc and currently reuse BPC-157 values:

1. **Pricing** — every product except BPC-157 uses placeholder prices
   ($225 / $189 / $166). Update each plan's **price** and **save** fields with the
   real catalogue numbers.
2. **Product images** — every product currently shows the BPC-157 (coral
   "RECOVERY") vial. Upload the correct vial art to **galleryMain** /
   **galleryThumbnails** per product. *(The large vial in the "Why" section is a
   shared graphic — ask the developer to swap it per product once art exists.)*
3. **Pharmacy strengths** — the "What's in the vial" text omits the exact
   mg/mL strength; add it when the pharmacy confirms.

---

## 6. Publishing

Hit **Publish** on a story and the live site reflects it within a few seconds.
That's it — you're done.
