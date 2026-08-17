/**
 * Starter content for the Home story — mirrors src/lib/content.ts.
 * Image values are local /public paths; the provisioner uploads each one and
 * swaps in the resulting Storyblok asset object.
 */
export const seed = {
  header: {
    tickerMessages: [
      "Free delivery on orders over $50.",
      "Most protocol reviews completed within 1–2 hours.",
    ],
    navLinks: [
      // Both open a mega-menu rather than navigating, but a dropdown can be
      // turned off in the CMS — so these have to point somewhere real.
      { label: "Protocols", href: "/products/bpc-157", hasDropdown: true },
      { label: "Learn", href: "/journal", hasDropdown: true },
    ],
    loginLabel: "Login",
    loginHref: "/login",
    ctaLabel: "Start Your Protocol",
    ctaHref: "/start",
  },

  hero: {
    headline: "We're simplifying the path to the Good Life",
    subheadline:
      "Clinician-reviewed peptide protocols, compounded in US pharmacies and delivered to your door.",
    ctaLabel: "Start your protocol",
    ctaHref: "/start",
    backgroundImage: "/images/hero-bg.jpg",
    backgroundAlt: "",
  },

  trustBar: {
    eyebrow: "Trusted & certified",
    logos: [
      { image: "/images/certs/hipaa.png", alt: "HIPAA — We Protect Your Privacy", width: "149", height: "64" },
      { image: "/images/certs/cert2.png", alt: "Certified", width: "60", height: "56" },
      { image: "/images/certs/fda.png", alt: "FDA registered", width: "60", height: "56" },
      { image: "/images/certs/legitscript.svg", alt: "LegitScript Certified", width: "169", height: "52" },
    ],
  },

  howItWorks: {
    eyebrow: "How it works",
    heading: "Three steps to in-sync.",
    subtext:
      "From goal to doorstep in a few days — with a clinician reviewing every protocol along the way.",
    cardImage: "/images/step-portrait.png",
    steps: [
      { number: "01", title: "Take the assessment", description: "Not a form. We ask what you've run before, what it did, and what you're training for — an intake a clinician can actually reason from." },
      { number: "02", title: "A clinician builds your protocol", description: "Your compound, your dose, your cycle, decided by a licensed provider for your body. Sometimes the answer is less than you came for." },
      { number: "03", title: "It ships — and evolves", description: "Compounded, tested, at your door. Then your clinician checks in — and cycle two isn't cycle one. Most platforms stop at checkout." },
    ],
    ctaLabel: "Start your protocol",
    ctaHref: "/start",
  },

  protocols: {
    eyebrow: "Explore protocols",
    heading: "Start with a goal.",
    subtext:
      "Whether you know exactly what you want or need help finding the right protocol, browse by what you're working toward.",
    cards: [
      { image: "/images/protocols/recovery.png", description: "A short intake maps your goals, lifestyle and history to a protocol matched to you — never a one-size-fits-all stack.", category: "Recovery", featured: true, color: "#DC5B24", bgColor: "#F6C6A0" },
      { image: "/images/step-glow.png", description: "A physician personally reviews every intake and prescribes only what's right for you, before anything ships.", category: "Performance", featured: false, color: "#037FBD", bgColor: "#B9DBF0" },
      { image: "/images/protocols/metabolic.png", description: "Pre-sorted daily packs arrive at your door. Check-ins every 3–6 months evolve your protocol as your body changes.", category: "Metabolic", featured: false, color: "#E68A2B", bgColor: "#F6D3A6" },
      { image: "/images/step-glow.png", description: "Tailored workout routines that align with your fitness level and personal goals, helping you reach your desired results.", category: "Skin & Longevity", featured: false, color: "#45B562", bgColor: "#C6E7AC" },
      { image: "/images/step-glow.png", description: "Tailored workout routines that align with your fitness level and personal goals, helping you reach your desired results.", category: "Hormonal Health", featured: false, color: "#F05DA0", bgColor: "#F8B4D3" },
    ],
    ctaLabel: "Shop all",
    ctaHref: "/start",
  },

  quality: {
    eyebrow: "Why patients choose Sync",
    heading: "Bringing quality care home, 100% online.",
    supporting:
      "No clinics, no waiting rooms, no pharmacy lines, just clinician-backed protocols, verified and delivered to your door.",
    features: [
      { icon: "/images/quality/trusted.svg", title: "Trusted by doctors", description: "Verified medications aligned with your health needs, sourced from US-licensed pharmacies." },
      { icon: "/images/quality/clinical.svg", title: "Clinical experts", description: "Every intake reviewed by a licensed provider before anything is prescribed." },
      { icon: "/images/quality/delivery.svg", title: "Fast & discreet delivery", description: "Confidential shipping straight to your door." },
      { icon: "/images/quality/safe.svg", title: "Safe, quality medications", description: "Sourced from US-based, licensed pharmacies for consistent quality." },
    ],
  },

  catalog: {
    eyebrow: "The catalog",
    heading: "Peptides, prescribed\n& personalized.",
    toggleOptions: ["Single", "Advanced"],
    toggleActive: "Single",
    // tier drives the Single / Advanced toggle; untagged products show in both.
    products: [
      { category: "Recovery", name: "BPC-157", description: "Tissue repair, joint and gut support.", image: "/images/catalog/vial-recovery.png", ctaLabel: "Start your protocol", ctaHref: "/products/bpc-157", featured: true, tier: "Single" },
      { category: "Performance", name: "Sermorelin", description: "Growth-hormone support, recovery and sleep.", image: "/images/catalog/vial-bpc157.png", ctaLabel: "Start your protocol", ctaHref: "/products/sermorelin", featured: false, tier: "Single" },
      { category: "Skin", name: "GHK-Cu", description: "Skin, hair and collagen renewal.", image: "/images/catalog/vial-recovery.png", ctaLabel: "Start your protocol", ctaHref: "/products/ghk-cu", featured: false, tier: "Single" },
      { category: "Longevity", name: "NAD+", description: "Cellular energy, focus and healthy aging.", image: "/images/catalog/vial-bpc157.png", ctaLabel: "Start your protocol", ctaHref: "/products/nad", featured: false, tier: "Single" },
      { category: "Weight", name: "Compounded Tirzepatide", description: "Dual-action weight management, once weekly.", image: "/images/catalog/vial-recovery.png", ctaLabel: "Start your protocol", ctaHref: "/products/tirzepatide", featured: true, tier: "Advanced" },
      { category: "Weight", name: "Compounded Semaglutide", description: "Appetite, weight and metabolic support.", image: "/images/catalog/vial-bpc157.png", ctaLabel: "Start your protocol", ctaHref: "/products/semaglutide", featured: false, tier: "Advanced" },
      { category: "Metabolic", name: "MOTS-C", description: "Metabolic health and cellular energy.", image: "/images/catalog/vial-recovery.png", ctaLabel: "Start your protocol", ctaHref: "/products/mots-c", featured: false, tier: "Advanced" },
      { category: "Hormonal", name: "PT-141", description: "Sexual desire and arousal support.", image: "/images/catalog/vial-bpc157.png", ctaLabel: "Start your protocol", ctaHref: "/products/pt-141", featured: false, tier: "Advanced" },
    ],
    ctaLabel: "Shop all",
    ctaHref: "/start",
  },

  compare: {
    eyebrow: "Why Sync",
    heading: "Why pay more than the vial you found?",
    subtext:
      "Not research-grade — compounded to prescription, batch-tested, clinician-prescribed, with someone accountable on the other end.",
    features: [
      "Clinician-designed for your body",
      "Compounded at licensed US pharmacy",
      "Purity / batch testing",
      "Dose personalized to you",
      "Adjusted every cycle",
      "Care team to message",
      "Approval speed",
    ],
    sync: [
      { type: "check" }, { type: "check" }, { type: "check" }, { type: "check" },
      { type: "check" }, { type: "check" }, { type: "text", text: "< 24 hrs" },
    ],
    competitors: [
      { title: "Grey market", cells: [
        { type: "cross" }, { type: "cross" }, { type: "cross" },
        { type: "text", text: "You guess" }, { type: "cross" }, { type: "cross" }, { type: "text", text: "—" },
      ] },
      { title: "Generic telehealth", cells: [
        { type: "cross" }, { type: "yes" }, { type: "text", text: "Varies" },
        { type: "cross" }, { type: "text", text: "Rarely" }, { type: "text", text: "Limited" }, { type: "text", text: "Varies" },
      ] },
    ],
    supporting: [
      { icon: "/images/compare/sup-research.svg", label: "Not research-grade" },
      { icon: "/images/compare/sup-batch.svg", label: "Batch-tested" },
      { icon: "/images/compare/sup-clinician.svg", label: "Clinician-prescribed" },
    ],
  },

  testimonials: {
    eyebrow: "Real people. Real results.",
    heading: "The support people keep coming back to.",
    ratingLabel: "Excellent",
    testimonials: [
      { highlight: "", quote: "“I was peptide-curious for a long time but always scared of dosing myself. SYNC gave me a personalized protocol with the security of medical supervision.”", name: "Nic K.", tag: "Verified member", image: "/images/testimonials/nic-k.png" },
      { highlight: "“Recovery sped up and I started looking leaner within weeks.", quote: " It feels like I unlocked another level — and the daily packs make it effortless.”", name: "K. L.", tag: "Recovery protocol", image: "/images/testimonials/k-l.png" },
      { highlight: "", quote: "“My doctor struggled to explain my fatigue. My SYNC protocol helped me feel like my old self again in about 14 weeks.”", name: "Chase H.", tag: "Longevity protocol", image: "/images/testimonials/chase-h.png" },
    ],
  },

  blog: {
    eyebrow: "Learn",
    heading: "From the SYNC journal.",
    subtext:
      "Physician-informed articles on the compounds, protocols and the research behind them.",
    articles: [
      { category: "Science", title: "The science behind compounded peptides & why sourcing matters.", meta: "6 min read · Apr 2026", image: "/images/blog/science.png", href: "/journal/compounded-peptides" },
      { category: "Weight", title: "GLP-1s, explained without the hype: what to actually expect.", meta: "8 min read · Mar 2026", image: "/images/blog/weight.png", href: "/journal/glp-1s-explained" },
      { category: "Routine", title: "Building a wellness routine that actually sticks past week three.", meta: "5 min read · Mar 2026", image: "/images/blog/routine.png", href: "/journal/wellness-routine" },
      { category: "Science", title: "The science behind compounded peptides & why sourcing matters.", meta: "6 min read · Apr 2026", image: "/images/blog/science.png", href: "/journal/compounded-peptides" },
    ],
    ctaLabel: "View all articles",
    ctaHref: "/journal",
  },

  faq: {
    eyebrow: "FAQ",
    heading: "Questions?\nAnswered.",
    subtext: "Everything you need to know about protocols, safety and getting started.",
    ctaLabel: "Contact our care team",
    ctaHref: "/contact",
    items: [
      { question: "Are SYNC’s peptides safe and legal?", answer: "Every protocol is prescribed by a licensed U.S. provider and compounded at accredited 503A/503B pharmacies. Compounded medications are not FDA-approved; your provider reviews whether treatment is appropriate for you before anything ships." },
      { question: "Do I need a prescription?", answer: "Yes. Nothing ships without a prescription. You complete an online assessment, and a licensed provider reviews it and prescribes only what’s appropriate for you — no prior prescription needed to start." },
      { question: "How does the online assessment work?", answer: "It’s a short intake about your goals, history and what you’ve tried before. A clinician reviews your answers, may follow up with questions, and builds a protocol matched to you — usually within 1–2 hours." },
      { question: "Can I change or cancel my plan?", answer: "Anytime. You can pause, adjust or cancel from your account, and your care team can re-tune your protocol between cycles as your body and goals change." },
      { question: "Where are the medications made?", answer: "All compounds are made at licensed, accredited U.S. 503A/503B pharmacies, batch-tested for purity and potency before they’re dispensed to you." },
      { question: "How soon will I see results?", answer: "It depends on the protocol and your goals — some people notice changes within a few weeks, while longevity and metabolic protocols typically build over 8–14 weeks. Your clinician sets expectations up front." },
    ],
  },

  finalCta: {
    eyebrow: "Your protocol, your body",
    heading: "Stop guessing.\nStart your protocol.",
    subtext:
      "Five-minute assessment.\nA licensed clinician builds it.\nNo charge until your protocol is approved.",
    ctaLabel: "Start your protocol",
    ctaHref: "/start",
  },

  footer: {
    tagline:
      "Personalized, physician-supervised protocols for people who are intentional about their health.",
    socials: [
      { name: "instagram", href: "https://instagram.com" },
      { name: "linkedin", href: "https://linkedin.com" },
      { name: "facebook", href: "https://facebook.com" },
      { name: "youtube", href: "https://youtube.com" },
    ],
    navColumns: [
      { links: [
        { label: "About us", href: "/about", muted: false },
        { label: "Blog", href: "/blog", muted: false },
        { label: "How it works", href: "/how-it-works", muted: false },
        { label: "FAQs", href: "/faqs", muted: false },
        { label: "Contact", href: "/contact", muted: false },
        { label: "Patient login", href: "/login", muted: false },
      ] },
      { links: [
        { label: "Shipping & Delivery", href: "/shipping", muted: true },
        { label: "Privacy Policy", href: "/privacy", muted: true },
        { label: "Telehealth consent", href: "/telehealth-consent", muted: true },
        { label: "Terms & Conditions", href: "/terms", muted: true },
        { label: "Press kit", href: "/press", muted: true },
      ] },
    ],
    newsletterText: "Clinician-guided wellness plans and updates. No spam.",
    newsletterPlaceholder: "Enter email",
    newsletterCta: "Subscribe",
    disclaimer:
      "Compounded medications offered through SYNC are produced in FDA-registered facilities but are not FDA-approved and have not been evaluated by the FDA for safety, efficacy or quality. These statements have not been evaluated by the Food and Drug Administration and are not intended to diagnose, treat, cure or prevent any disease.",
    payments: [
      { image: "/images/footer/pay-paypal.svg", alt: "PayPal" },
      { image: "/images/footer/pay-mastercard.svg", alt: "Mastercard" },
      { image: "/images/footer/pay-maestro.svg", alt: "Maestro" },
      { image: "/images/footer/pay-visa.svg", alt: "Visa" },
      { image: "/images/footer/pay-amex.svg", alt: "American Express" },
      { image: "/images/footer/pay-klarna.svg", alt: "Klarna" },
      { image: "/images/footer/pay-jcb.svg", alt: "JCB" },
      { image: "/images/footer/pay-venmo.svg", alt: "Venmo" },
      { image: "/images/footer/pay-applepay.svg", alt: "Apple Pay" },
      { image: "/images/footer/pay-gpay.svg", alt: "Google Pay" },
    ],
  },
};
