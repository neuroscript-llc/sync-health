"use client";

import { useState } from "react";
import { QuizIntro } from "@/components/quiz/quiz-intro";
import { QuizName } from "@/components/quiz/quiz-name";
import { QuizInterstitial } from "@/components/quiz/quiz-interstitial";
import { QuizChoice } from "@/components/quiz/quiz-choice";
import { QuizMulti } from "@/components/quiz/quiz-multi";
import { QuizEducation } from "@/components/quiz/quiz-education";
import { QuizCapture } from "@/components/quiz/quiz-capture";
import { QuizEmail } from "@/components/quiz/quiz-email";
import { QuizReveal } from "@/components/quiz/quiz-reveal";
import type { QuizContent } from "@/lib/quiz-content";

/**
 * The flow itself: which step is on screen, and the answers given so far.
 *
 * One route rather than a route per step. Every page on this site is
 * force-dynamic and fetches Storyblok per request, so a route per step would
 * put a server round trip between every tap — the wrong trade for a quiz,
 * where the whole appeal is that it moves as fast as you do. The content for
 * all the steps arrives once, from the server component that renders this.
 *
 * Answers live here so they survive moving back and forth. Nothing is
 * submitted anywhere yet: what happens at the end of the quiz is still an open
 * question, so the last step stays swappable.
 *
 * Only the numbered question steps count toward the progress bar. The welcome
 * screen and this interstitial are not questions and show no header, which is
 * why the step index and the screen index are not the same number.
 */
/** Add or remove one value from a set of ticked answers. */
const toggle = (current: string[], value: string): string[] =>
  current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];

export function QuizFlow({
  content,
  shape = "shape2",
}: {
  content: QuizContent;
  /**
   * Which reveal to render. Overridable from the URL while the three shapes
   * are being reviewed, because no rule engine picks between them yet.
   */
  shape?: "shape1" | "shape2" | "shape3";
}) {
  const [screen, setScreen] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [sex, setSex] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [depth, setDepth] = useState<string | null>(null);
  const [secondary, setSecondary] = useState<string[]>([]);
  const [recovery, setRecovery] = useState<string[]>([]);
  const [inflammation, setInflammation] = useState<string | null>(null);
  const [sleep, setSleep] = useState<string | null>(null);
  const [stress, setStress] = useState<string | null>(null);
  const [ninetyDay, setNinetyDay] = useState("");
  const [email, setEmail] = useState("");

  switch (screen) {
    case 0:
      return <QuizIntro content={content.intro} onStart={() => setScreen(1)} />;

    case 1:
      return (
        <QuizName
          content={content.name}
          value={firstName}
          onChange={setFirstName}
          onSubmit={() => setScreen(2)}
          onBack={() => setScreen(0)}
          step={1}
          total={content.totalSteps}
        />
      );

    case 2:
      return (
        <QuizInterstitial
          content={content.interstitial}
          name={firstName}
          onContinue={() => setScreen(3)}
        />
      );

    case 3:
      return (
        <QuizChoice
          content={content.sex}
          value={sex}
          onSelect={(value) => {
            setSex(value);
            setScreen(4);
          }}
          onBack={() => setScreen(2)}
          step={2}
          total={content.totalSteps}
        />
      );

    case 4:
      return (
        <QuizChoice
          content={content.goal}
          value={goal}
          onSelect={(value) => {
            setGoal(value);
            // The lane chosen here is what the flow branches on later; the
            // routing itself lands with the Branch A screens.
            setScreen(5);
          }}
          onBack={() => setScreen(3)}
          step={3}
          total={content.totalSteps}
        />
      );

    case 5:
      return (
        <QuizChoice
          content={content.depth}
          value={depth}
          onSelect={(value) => {
            setDepth(value);
            setScreen(6);
          }}
          onBack={() => setScreen(4)}
          step={4}
          total={content.totalSteps}
        />
      );

    case 6:
      return (
        <QuizMulti
          content={content.secondary}
          values={secondary}
          onToggle={(value) => setSecondary(toggle(secondary, value))}
          onSubmit={() => setScreen(7)}
          onBack={() => setScreen(5)}
          step={5}
          total={content.totalSteps}
        />
      );

    case 7:
      // The lane chosen on S5 is what should decide whether this branch runs
      // at all; only the Recovery branch is drawn, so for now every path
      // reaches it.
      return (
        <QuizMulti
          content={content.branchDiscriminator}
          values={recovery}
          onToggle={(value) => setRecovery(toggle(recovery, value))}
          onSubmit={() => setScreen(8)}
          onBack={() => setScreen(6)}
          step={6}
          total={content.totalSteps}
          pan={[-190, -380]}
        />
      );

    case 8:
      return (
        <QuizChoice
          content={content.branchQualifier}
          value={inflammation}
          onSelect={(value) => {
            setInflammation(value);
            setScreen(9);
          }}
          onBack={() => setScreen(7)}
          step={7}
          total={content.totalSteps}
          pan={[-330, -60]}
        />
      );

    case 9:
      return (
        <QuizEducation
          content={content.branchEducation}
          onContinue={() => setScreen(10)}
        />
      );

    case 10:
      return (
        <QuizChoice
          content={content.sleep}
          value={sleep}
          onSelect={(value) => {
            setSleep(value);
            setScreen(11);
          }}
          onBack={() => setScreen(9)}
          step={8}
          total={content.totalSteps}
          pan={[-240, -420]}
        />
      );

    case 11:
      return (
        <QuizChoice
          content={content.stress}
          value={stress}
          onSelect={(value) => {
            setStress(value);
            setScreen(12);
          }}
          onBack={() => setScreen(10)}
          step={9}
          total={content.totalSteps}
          pan={[-140, -160]}
        />
      );

    case 12:
      // Step 10, not 9: the frames number the branch screens into the same
      // count, so the two Recovery steps already spent 6 and 7.
      return (
        <QuizCapture
          content={content.capture}
          value={ninetyDay}
          onChange={setNinetyDay}
          onSubmit={() => setScreen(13)}
          onBack={() => setScreen(11)}
          step={10}
          total={content.totalSteps}
        />
      );

    case 13:
      return (
        <QuizEmail
          content={content.email}
          value={email}
          onChange={setEmail}
          onSubmit={() => {
            // Nothing is sent anywhere yet — there is no endpoint, and the
            // reveal below reads from content rather than from an answer.
            //
            // When it is wired: everything from this step on goes server-side
            // (Conversions API), and no health parameter may reach an ad
            // platform — not the lane, not the branch, not a symptom, not the
            // free text from S8C. A client-side pixel fired here would carry
            // the answers in the page context by default, which is exactly
            // what the screen above promises it does not do.
            setScreen(14);
          }}
          onBack={() => setScreen(12)}
          step={11}
          total={content.totalSteps}
        />
      );

    default:
      // Which shape a person actually gets is decided by rules the frames
      // name but do not define (R7 dedup, R8 cross-lane default), so the
      // shape is chosen for us rather than derived from the answers above.
      return (
        <QuizReveal
          content={content.reveal[shape]}
          name={firstName}
          onClose={() => setScreen(0)}
          onStartOver={() => setScreen(0)}
          onSwap={() => setScreen(4)}
          onBegin={() => {
            // The clinical assessment is a separate flow and does not exist
            // yet.
          }}
        />
      );
  }
}
