import type { QuizIconName } from "@/components/quiz/quiz-icons";

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
