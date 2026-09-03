import type { QuizIconName } from "@/components/quiz/quiz-icons";
import type { QuizRevealIconName } from "@/components/quiz/quiz-reveal-icons";

/**
 * Quiz copy.
 *
 * Its own file rather than another few hundred lines in content.ts, which is
 * already ~3,900 lines of marketing-site copy. The contract is the same as
 * every other page: this object is the shape the Storyblok bloks map onto, and
 * the fallback the route renders when the CMS is unreachable or the story has
 * not been created yet.
 */

/** The opening screen: what the flow is, and the invitation to begin it. */
export type QuizIntroContent = {
  /** Two lines in the design. Kept as one string so the CMS controls the wrap. */
  heading: string;
  /** Rendered in order, each its own paragraph. */
  paragraphs: string[];
  ctaLabel: string;
  /** Reassurance under the button — cost, effort, commitment. */
  footnote: string;
};

/** S2 Name — the first question. */
export type QuizNameContent = {
  /** The section the step belongs to, shown in the progress pill. */
  progressLabel: string;
  heading: string;
  fieldLabel: string;
  ctaLabel: string;
};

/** S3 Welcome interstitial — a beat between the name and the questions. */
export type QuizInterstitialContent = {
  /** "{name}" is replaced with what they typed on the name step. */
  heading: string;
  body: string;
  ctaLabel: string;
};

/** One answer on a pick-one step. */
export type QuizChoiceOption = {
  /** Stored on the answer; stays stable if the label is reworded in the CMS. */
  value: string;
  label: string;
  /** The grey second line, on the steps that have one. */
  description?: string;
  /** Names a shape in quiz-icons. An unknown name simply draws nothing. */
  icon?: QuizIconName;
};

/** A pick-one question. Choosing is the answer — these frames have no button. */
/**
 * The panel under the options: "we see this often".
 *
 * On S6 it is context that helps someone answer honestly, so it is always
 * there. On the branch screens it is a response to what was ticked, and `when`
 * is what decides — a list of groups, each of which needs at least one of its
 * values ticked before the panel appears. "Gut and something structural" is
 * two groups: the gut option, then every option that counts as structural.
 */
export type QuizRecognition = {
  eyebrow: string;
  body: string;
  when?: string[][];
};

/** Whether a recognition panel has earned its place given what is ticked. */
export const recognitionFires = (
  recognition: QuizRecognition | undefined,
  chosen: string[],
): boolean => {
  if (!recognition) return false;
  if (!recognition.when?.length) return true;
  return recognition.when.every((group) =>
    group.some((value) => chosen.includes(value)),
  );
};

export type QuizChoiceContent = {
  progressLabel: string;
  heading: string;
  /** The grey line under the question. Empty hides it. */
  subheading?: string;
  options: QuizChoiceOption[];
  recognition?: QuizRecognition;
  /** The grey line under the options. Empty hides it. */
  helper: string;
  /**
   * The branch screens draw a different card: a 24 radius and a 16/21 label,
   * height following the words rather than fixed.
   */
  dense?: boolean;
  /**
   * The question's size, where the frames step it down to fit more words:
   * 32/38 by default, 30/36, or 28/34. Separate from `dense` because the
   * frames vary the two independently — the qualifier takes the smaller card
   * with the full-size question. The smallest also pulls the subheading down
   * to 15.5/21, which is the only screen that does.
   */
  headingSize?: 28 | 30;
};

/** A pick-many question. No moment means "done", so it needs a button. */
export type QuizMultiContent = {
  progressLabel: string;
  heading: string;
  subheading?: string;
  options: QuizChoiceOption[];
  /** "{n}" is replaced with how many are ticked. Empty hides the line. */
  countLabel: string;
  ctaLabel: string;
  recognition?: QuizRecognition;
  /** See QuizChoiceContent. */
  dense?: boolean;
  headingSize?: 28 | 30;
};

/** Branch A education — a sheet that explains, and sells nothing. */
export type QuizEducationContent = {
  /** The lone pill at the top; this screen has no back button or progress. */
  pillLabel: string;
  eyebrow: string;
  heading: string;
  /** The bold line under the heading. */
  lead: string;
  body: string;
  footnote: string;
  ctaLabel: string;
};

/**
 * S8C 90-day capture — the one answer they write themselves.
 *
 * Per the design note on the frame, this text is quoted back to them at week
 * 8, so it has to be stored verbatim rather than parsed or summarised into
 * anything. Nothing consumes it yet.
 */
export type QuizCaptureContent = {
  progressLabel: string;
  heading: string;
  subheading: string;
  /**
   * Shown in the empty field rather than prefilled, so nobody has to delete
   * someone else's goal before writing their own. Its job is to show the
   * shape of a useful answer: specific, and about a week rather than a year.
   */
  placeholder: string;
  ctaLabel: string;
};

/** S9 Email — the last question, and the gate on the reveal. */
export type QuizEmailContent = {
  progressLabel: string;
  heading: string;
  subheading: string;
  fieldLabel: string;
  placeholder: string;
  ctaLabel: string;
  /** The line in the padlock panel under the button. */
  privacyNote: string;
};

/** One benefit chip on a protocol card. */
export type QuizRevealChip = {
  icon: QuizRevealIconName;
  label: string;
};

/**
 * A protocol card — the big one.
 *
 * Serves both the base and Shape 3's supporting protocol, because the frames
 * draw them identically: a 78 product tile beside a three-line title block, a
 * 2x2 grid of chips, the reasoning, a rule, and a price. The two differ only
 * in their copy, so they differ only in their content here.
 */
export type QuizRevealProtocol = {
  /** The small line above the name: "Your base", "Supporting protocol". */
  kicker: string;
  name: string;
  /** The compounds, or what the single molecule does. */
  subtitle: string;
  chips: QuizRevealChip[];
  /** Why this, for this person. The card's height follows this. */
  body: string;
  priceLabel: string;
  price: string;
  cadence: string;
};

/**
 * Shape 2's adjunct card — smaller, and the only card with its own button.
 *
 * Per the frame note, pairs-well-with fires on Shape 2 and nowhere else: it is
 * not a section that other shapes hide, it is the thing that makes a reveal
 * Shape 2.
 */
export type QuizRevealPairs = {
  kicker: string;
  name: string;
  /** One line, unlike the protocol card's three-part price row. */
  price: string;
  body: string;
  ctaLabel: string;
};

/** The plan in the picker, and the running total in the bar. */
export type QuizRevealPlan = {
  name: string;
  price: string;
  cadence: string;
};

/*
 * A note on the money, because it does not add up in the frames.
 *
 * All three shapes show the same plan price and the same footer total —
 * $289.00 — while their cards read $225, $340, and $340 + $95. The footer is
 * a placeholder the shapes were copied from, not a running total, however the
 * sticky-footer frame describes it. So the plan is the single source here and
 * the bar mirrors it, rather than this file guessing at a pricing model: no
 * arithmetic runs over these strings anywhere.
 */

/**
 * One reveal.
 *
 * Three of these exist and none is derived from another. The frames are
 * explicit that Shape 1 is its own shorter template "never merged into the
 * standard reveal", and the same holds in reverse: Shape 2 is not Shape 1 plus
 * a card. So the sections are shared components and the content is not — a
 * shape declares what it has, and an absent section is absent rather than
 * hidden.
 */
export type QuizRevealContent = {
  eyebrow: string;
  /** "{name}" is replaced with what they typed on the name step. */
  heading: string;
  body: string;
  baseLabel: string;
  base: QuizRevealProtocol;
  /** Shape 3 only. */
  supportingLabel: string;
  supporting?: QuizRevealProtocol;
  removeSupportingLabel: string;
  /** Shape 2 only. */
  pairs?: QuizRevealPairs;
  planHeading: string;
  plan: QuizRevealPlan;
  /** Verbatim in the frames, and not ours to reword. */
  lockedLine: string;
  dayNinety: string;
  swapLabel: string;
  startOverLabel: string;
  disclaimer: string;
  ctaLabel: string;
  /** The bar that appears once the read band has scrolled away. */
  condensedKicker: string;
  condensedTitle: string;
  closeLabel: string;
};

export type QuizContent = {
  /**
   * How many steps the progress bar counts. The frame says 11; it will need to
   * come from the question list once the branching steps are in, because a
   * branch changes the count.
   */
  totalSteps: number;
  intro: QuizIntroContent;
  name: QuizNameContent;
  interstitial: QuizInterstitialContent;
  sex: QuizChoiceContent;
  goal: QuizChoiceContent;
  depth: QuizChoiceContent;
  secondary: QuizMultiContent;
  branchDiscriminator: QuizMultiContent;
  branchQualifier: QuizChoiceContent;
  branchEducation: QuizEducationContent;
  sleep: QuizChoiceContent;
  stress: QuizChoiceContent;
  capture: QuizCaptureContent;
  email: QuizEmailContent;
  /**
   * The three engine shapes. Which one a person sees is decided by rules the
   * frames refer to but do not define (R7 dedup, R8 cross-lane default), so
   * nothing picks between them yet.
   */
  reveal: {
    shape1: QuizRevealContent;
    shape2: QuizRevealContent;
    shape3: QuizRevealContent;
  };
};

export const quiz: QuizContent = {
  totalSteps: 11,
  intro: {
    heading: "You've probably already tried the obvious things.",
    paragraphs: [
      "If you're here, it's because something's not adding up — the effort you're putting in isn't matching what you're getting back. That's worth two minutes.",
      "We'll ask the questions your GP didn't, then show you what actually fits. If the honest answer is one molecule, that's what you'll get.",
    ],
    ctaLabel: "Start",
    footnote: "About two minutes · No card required",
  },
  name: {
    progressLabel: "About you",
    heading: "What should we call you?",
    fieldLabel: "First name",
    ctaLabel: "Continue",
  },
  interstitial: {
    heading: "Welcome, {name}.",
    body: "Two minutes — let's see what fits.",
    ctaLabel: "Continue",
  },
  sex: {
    progressLabel: "About you",
    heading: "Sex assigned at birth.",
    options: [
      { value: "female", label: "Female" },
      { value: "male", label: "Male" },
      { value: "self-describe", label: "Prefer to self-describe" },
    ],
    helper:
      "Your provider uses this to read your answers and dose accurately.",
  },
  goal: {
    progressLabel: "Your goals",
    heading: "What's the most important thing you want to focus on first?",
    subheading: "Pick the one that matters most. You'll add the others next.",
    options: [
      {
        value: "recover",
        label: "Recover",
        description: "From injury, training, or gut issues",
        icon: "repair",
      },
      {
        value: "perform",
        label: "Perform",
        description: "Build, train, recover harder",
        icon: "perform",
      },
      {
        value: "body-composition",
        label: "Change my body composition",
        description: "Fat, definition, plateau",
        icon: "define",
      },
      {
        value: "age-slower",
        label: "Age slower",
        description: "Skin, energy, longevity",
        icon: "restore",
      },
      {
        value: "libido",
        label: "Sex drive and arousal",
        description: "Desire and response",
        icon: "libido",
      },
    ],
    helper: "",
  },
  depth: {
    progressLabel: "Your goals",
    heading: "Is it one clear thing — or a few things at once?",
    subheading: "Both are common. The answer just changes what we build.",
    options: [
      { value: "one-thing", label: "One clear thing" },
      { value: "a-few-connected", label: "A few, and they're connected" },
    ],
    recognition: {
      eyebrow: "We see this often",
      body: "Most people arrive with more than one — usually it means the system is under load, not that any one part has failed.",
    },
    helper: "",
  },
  secondary: {
    progressLabel: "Your goals",
    heading: "Anything else going on?",
    subheading:
      "Tick anything else you'd want addressed. Anything you pick becomes part of what we build.",
    options: [
      {
        value: "perform",
        label: "Perform",
        description: "Build, train, recover harder",
        icon: "perform",
      },
      {
        value: "body-composition",
        label: "Change my body composition",
        description: "Fat, definition, plateau",
        icon: "define",
      },
      {
        value: "age-slower",
        label: "Age slower",
        description: "Skin, energy, longevity",
        icon: "restore",
      },
      {
        value: "libido",
        label: "Sex drive and arousal",
        description: "Desire and response",
        icon: "libido",
      },
    ],
    countLabel: "{n} selected · no ranking",
    ctaLabel: "Continue",
  },
  branchDiscriminator: {
    progressLabel: "Recovery",
    heading: "Where's the recovery problem showing up?",
    subheading: "Tick everything that fits. Most people have more than one.",
    options: [
      {
        value: "injury",
        label: "A specific injury or tendon that should've healed by now",
      },
      {
        value: "gut_mucosal",
        label: "Gut — bloating, reactivity, the way food sits",
      },
      { value: "skin", label: "Skin — small cuts, wear, things heal slowly" },
      {
        value: "everywhere",
        label: "Everywhere — I don't repair the way I used to",
      },
    ],
    countLabel: "",
    ctaLabel: "Continue",
    recognition: {
      eyebrow: "We see this often",
      body: "If you ticked gut and something structural — those usually track together. Gut and tissue repair share the same underlying pathway.",
      // Gut, and at least one of the structural answers.
      when: [["gut_mucosal"], ["injury", "skin", "everywhere"]],
    },
    dense: true,
    headingSize: 28,
  },
  branchQualifier: {
    progressLabel: "Recovery",
    heading: "Is there active inflammation right now?",
    subheading: "Heat, swelling, or a flare that won't settle.",
    options: [
      { value: "inflammatory_active", label: "Yes, right now" },
      { value: "intermittent", label: "Comes and goes" },
      { value: "wear_and_tear", label: "No — it's more wear-and-tear" },
    ],
    helper: "",
    dense: true,
  },
  branchEducation: {
    pillLabel: "Recovery · why we asked",
    eyebrow: "Why we asked",
    heading: "Why recovery isn't one problem.",
    lead: "Your gut and your soft tissue heal through the same repair pathway.",
    body: "When one is inflamed, the other slows down. That's why gut issues and an injury that won't heal aren't two separate problems in the same body — they're the same process, showing up in different places.",
    footnote: "No product mentioned on this screen — education only.",
    ctaLabel: "Keep going",
  },
  sleep: {
    progressLabel: "Cross-signals",
    heading: "How many hours are you actually sleeping most nights?",
    options: [
      { value: "under_5", label: "Under 5" },
      { value: "5_to_6", label: "5 to 6" },
      { value: "6_to_7", label: "6 to 7" },
      { value: "7_to_8", label: "7 to 8" },
      { value: "8_or_more", label: "8 or more" },
    ],
    helper: "",
    dense: true,
    headingSize: 30,
  },
  stress: {
    progressLabel: "Cross-signals",
    heading: "How have the last few months felt?",
    subheading: "Work, life, whatever's been going on — the honest version.",
    options: [
      { value: "steady", label: "Steady — nothing out of the ordinary" },
      { value: "managing", label: "Managing, but there's a lot on" },
      {
        value: "stretched_thin",
        label: "Stretched thin — running above what feels sustainable",
      },
      { value: "empty", label: "Running on empty — no reserves left" },
    ],
    helper: "",
    dense: true,
  },
  capture: {
    progressLabel: "Your read",
    heading: "90 days from now \u2014 what\u2019s different?",
    subheading:
      "Your words. This is the line your clinician reads back at day 90 to check what actually moved.",
    placeholder:
      "In 90 days I want to get through a full training week without my shoulder flaring up.",
    ctaLabel: "Continue",
  },
  email: {
    progressLabel: "Almost there",
    heading: "Where should we send your personalised protocol?",
    subheading:
      "Your read and your assembled stack \u2014 then you'll move into the clinical assessment with a licensed provider. You won't be asked any of this twice.",
    fieldLabel: "Email address",
    placeholder: "you@example.com",
    ctaLabel: "Show me my personalised protocol",
    privacyNote: "Your answers never reach an advertising platform.",
  },
  reveal: {
    // SHAPE 1 — recommend-less single. Its own template: a single molecule,
    // no adjunct, and reasoning that stops at one sentence because there is
    // no second thing to justify.
    shape1: {
      eyebrow: "Your read",
      heading: "Here's what we see, {name}.",
      body: "You told us where it's showing up and how long it's been going on. Whether the problem is one tissue or the whole system is the distinction a clinician uses to decide what to actually target. You just gave us the answer.",
      baseLabel: "Your base",
      base: {
        kicker: "Your base",
        name: "BPC-157",
        subtitle: "Single molecule \u00b7 systemic soft-tissue and gut repair",
        chips: [
          { icon: "systemic", label: "Systemic repair" },
          { icon: "inflam", label: "Gut lining support" },
          { icon: "gut", label: "Soft-tissue repair" },
          { icon: "restore", label: "Targets inflammation" },
        ],
        body: "It's the compound built for the pattern you described. Nothing else earns a place yet.",
        priceLabel: "From",
        price: "$225.00",
        cadence: "/month",
      },
      supportingLabel: "Supporting protocol",
      removeSupportingLabel: "Remove supporting protocol",
      planHeading: "Choose your plan.",
      plan: { name: "3-month plan", price: "$289.00", cadence: "/month" },
    lockedLine:
      "Peptide protocols are clinically recommended to run for at least 3 months to signal your body properly.",
    dayNinety:
      "At day 90, your clinician reviews what moved and adjusts the next cycle around it.",
    swapLabel: "Swap the base",
    startOverLabel: "Start over",
    disclaimer:
      "This is a personalised match, not a prescription. Everything you've entered passes to your clinical assessment \u2014 a licensed provider makes the final call. Peptide therapy is prescribed at a provider's discretion.",
    ctaLabel: "Begin clinical assessment",
    closeLabel: "Close",
      condensedKicker: "Your protocol",
      condensedTitle: "BPC-157",
    },

    // SHAPE 2 — blend, plus the one adjunct that sits outside it. The
    // pairs-well-with card fires here and nowhere else.
    shape2: {
      eyebrow: "Your read",
      heading: "Here's what we see, {name}.",
      body: "You told us where it's showing up and how long it's been going on. Whether the problem is one tissue or the whole system is the distinction a clinician uses to decide what to actually target. You just gave us the answer.",
      baseLabel: "Your base",
      base: {
        kicker: "Your base",
        name: "REPAIR",
        subtitle: "BPC-157 \u00b7 TB-500 \u00b7 KPV \u00b7 GHK-Cu",
        chips: [
          { icon: "systemic", label: "Systemic repair" },
          { icon: "inflam", label: "Targets inflammation" },
          { icon: "gut", label: "Supports gut lining" },
          { icon: "restore", label: "Rebuilds connective tissue" },
        ],
        body: "You told us the recovery is showing up in your gut and something structural. REPAIR is built for exactly that pattern \u2014 four compounds working on the shared repair system, not one tissue at a time.",
        priceLabel: "From",
        price: "$340.00",
        cadence: "/month",
      },
      supportingLabel: "Supporting protocol",
      removeSupportingLabel: "Remove supporting protocol",
      pairs: {
        kicker: "Pairs well with",
        name: "NAD+",
        price: "From $95.00/month",
        body: "Recovery leans on cellular energy \u2014 NAD+ is the natural pair, and it sits outside the REPAIR blend.",
        ctaLabel: "Add to my protocol",
      },
      planHeading: "Choose your plan.",
      plan: { name: "3-month plan", price: "$289.00", cadence: "/month" },
    lockedLine:
      "Peptide protocols are clinically recommended to run for at least 3 months to signal your body properly.",
    dayNinety:
      "At day 90, your clinician reviews what moved and adjusts the next cycle around it.",
    swapLabel: "Swap the base",
    startOverLabel: "Start over",
    disclaimer:
      "This is a personalised match, not a prescription. Everything you've entered passes to your clinical assessment \u2014 a licensed provider makes the final call. Peptide therapy is prescribed at a provider's discretion.",
    ctaLabel: "Begin clinical assessment",
    closeLabel: "Close",
      condensedKicker: "Your protocol",
      condensedTitle: "REPAIR + NAD+",
    },

    // SHAPE 3 — blend, plus a supporting protocol in its own right. A
    // cross-lane single that came in on the R8 default and survived R7 dedup,
    // which is why it is a second card rather than a suggestion.
    shape3: {
      eyebrow: "Your read",
      heading: "Here's what we see, {name}.",
      body: "You told us where it's showing up and how long it's been going on. Whether the problem is one tissue or the whole system is the distinction a clinician uses to decide what to actually target. You just gave us the answer.",
      baseLabel: "Your base",
      base: {
        kicker: "Your base",
        name: "REPAIR",
        subtitle: "BPC-157 \u00b7 TB-500 \u00b7 KPV \u00b7 GHK-Cu",
        chips: [
          { icon: "systemic", label: "Systemic repair" },
          { icon: "inflam", label: "Targets inflammation" },
          { icon: "gut", label: "Supports gut lining" },
          { icon: "restore", label: "Rebuilds connective tissue" },
        ],
        body: "You told us the recovery is showing up in your gut and something structural. REPAIR is built for exactly that pattern \u2014 four compounds working on the shared repair system, not one tissue at a time.",
        priceLabel: "From",
        price: "$340.00",
        cadence: "/month",
      },
      supportingLabel: "Supporting protocol",
      removeSupportingLabel: "Remove supporting protocol",
      supporting: {
        kicker: "Supporting protocol",
        name: "NAD+",
        subtitle: "Cross-lane single \u00b7 from your RESTORE flag",
        chips: [
          { icon: "energy", label: "Cellular energy" },
          { icon: "mito", label: "Mitochondrial function" },
          { icon: "signal", label: "Recovery signalling" },
          { icon: "fatigue", label: "Anti-fatigue" },
        ],
        body: "You also flagged energy \u2014 that's a separate system, running low. NAD+ powers the fuel your cells run on. Paired with REPAIR, it means the repair machinery has something to work with.",
        priceLabel: "From",
        price: "$95.00",
        cadence: "/month",
      },
      planHeading: "Choose your plan.",
      plan: { name: "3-month plan", price: "$289.00", cadence: "/month" },
    lockedLine:
      "Peptide protocols are clinically recommended to run for at least 3 months to signal your body properly.",
    dayNinety:
      "At day 90, your clinician reviews what moved and adjusts the next cycle around it.",
    swapLabel: "Swap the base",
    startOverLabel: "Start over",
    disclaimer:
      "This is a personalised match, not a prescription. Everything you've entered passes to your clinical assessment \u2014 a licensed provider makes the final call. Peptide therapy is prescribed at a provider's discretion.",
    ctaLabel: "Begin clinical assessment",
    closeLabel: "Close",
      condensedKicker: "Your protocol",
      condensedTitle: "REPAIR + NAD+",
    },
  },
};

/**
 * Put the name into a heading that has a place for it.
 *
 * The name step can be passed without typing anything, so the empty case has
 * to read properly rather than as "Welcome, ." — the tidy-up collapses the
 * comma that is left dangling.
 */
export const withName = (template: string, name: string): string =>
  template.replace("{name}", name.trim()).replace(/,\s*\./, ".");
