"use client";

import { useCallback, useEffect, useRef } from "react";

/** Copies of the item list rendered into the track. Stepping past the last
    card slides forward into the next copy's first card, and the track is then
    shunted back by one copy width. Because the copies are identical the shunt
    is invisible, so the carousel reads as a, b, c, a, b, c rather than
    rewinding to the start.

    Four rather than three: a wide viewport can show a whole short list at
    once, and three copies then leave too little scrollable track to keep a
    full step of runway on both sides. */
export const LOOP_COPIES = 4;

/** Wire up an endlessly scrolling horizontal track.

    Returns the ref for the scroller plus `recenter`, which callers invoke
    before a programmatic step so the step always begins somewhere with room
    to move in either direction. */
export function useLoopedTrack(itemCount: number) {
  const ref = useRef<HTMLDivElement>(null);

  /** Distance from one copy to the next. Measured off the DOM rather than
      derived from card widths, so it stays exact across breakpoints and
      whatever gap the track happens to be using. */
  const setWidth = useCallback(() => {
    const track = ref.current;
    if (!track || itemCount <= 0) return 0;
    const first = track.children[0] as HTMLElement | undefined;
    const nextCopy = track.children[itemCount] as HTMLElement | undefined;
    if (!first || !nextCopy) return 0;
    return nextCopy.offsetLeft - first.offsetLeft;
  }, [itemCount]);

  /** Shunt the scroll position back into the loop window. Instant and
      invisible, since it lands on identical content one copy away. */
  const recenter = useCallback(() => {
    const track = ref.current;
    const width = setWidth();
    if (!track || width <= 0) return;

    const maxScroll = track.scrollWidth - track.clientWidth;
    const step = width / itemCount; // one card, its gap included

    // The window is centred in the reachable scroll range rather than pinned
    // to a particular copy. Pinning to a copy is what makes a carousel stall:
    // when the viewport shows most of the list at once, the far edge of that
    // copy sits past the end of the track and the arrow has nowhere to go.
    const lo = (maxScroll - width) / 2;
    if (lo < step) return; // not enough track to loop; leave it alone

    let next = track.scrollLeft;
    while (next >= lo + width) next -= width;
    while (next < lo) next += width;

    // "instant" rather than "auto": these tracks set scroll-smooth in CSS and
    // "auto" defers to it, which would animate a jump meant to go unseen.
    if (Math.abs(next - track.scrollLeft) > 0.5) {
      track.scrollTo({ left: next, behavior: "instant" });
    }
  }, [itemCount, setWidth]);

  // Free scrolling has to loop too, otherwise the extra copies would just read
  // as the same cards listed several times to anyone swiping or trackpadding.
  // Waiting for the scroll to settle keeps the shunt from fighting momentum.
  useEffect(() => {
    const track = ref.current;
    if (!track) return;

    let settle: ReturnType<typeof setTimeout>;
    const onScroll = () => {
      clearTimeout(settle);
      settle = setTimeout(recenter, 150);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(settle);
      track.removeEventListener("scroll", onScroll);
    };
  }, [recenter]);

  return { ref, recenter, setWidth };
}
