"use client";

import { useEffect, useState } from "react";

/**
 * Which of `ids` the reader is currently on, for a contents list that
 * highlights as the page scrolls. Covers both ways in: clicking an entry
 * jumps and the spy follows, and scrolling by hand moves the highlight.
 *
 * The ids are keyed on their joined value rather than the array itself, so a
 * caller can build the list inline without the effect tearing down and
 * rebinding on every render.
 */
export function useActiveHeading(ids: string[]): string {
  const key = ids.join("|");
  const [active, setActive] = useState(ids[0] ?? "");

  useEffect(() => {
    const headings = key
      .split("|")
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    // The reading line sits below the sticky nav rather than at the very top,
    // so a heading counts as current once it reaches where it is actually
    // being read, not the instant it enters the viewport.
    const READING_LINE = 140;

    let frame = 0;
    const update = () => {
      frame = 0;
      // The last heading to have crossed the line is the one being read.
      // Falling back to the first keeps an entry lit above the first heading.
      let current = headings[0];
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= READING_LINE) current = h;
      }
      setActive(current.id);
    };

    // Deliberately not run on mount: the initial state already points at the
    // first heading, and calling it here would set state during the effect.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [key]);

  return active;
}
