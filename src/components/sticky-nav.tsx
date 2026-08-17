"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/** Gap the pinned bar keeps from the top — matches the hero's 12px inset. */
const TOP_GAP = 12;
/** Below this width the bar pins; at lg ↑ the header scrolls away as before. */
const MOBILE = "(max-width: 1023.98px)";

/**
 * Keeps the nav pill on screen once the header scrolls off, on mobile only.
 *
 * `position: sticky` can't do this here: on the home page the nav lives inside
 * the hero's fixed-height flex column, so it would unstick at the bottom of the
 * hero. Instead the bar is re-parented to `document.body` as a fixed element —
 * a portal rather than a raised z-index, because several sections position
 * themselves above the header's stacking context to let the coral glows bleed
 * across section boundaries.
 */
export function StickyNav({ children }: { children: React.ReactNode }) {
  const slot = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  // Frozen while pinned so the page doesn't jump when the bar leaves the flow.
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    const mq = window.matchMedia(MOBILE);

    const sync = () => {
      const el = slot.current;
      if (!el) return;
      if (!mq.matches) {
        setPinned(false);
        return;
      }
      // offsetHeight, not getBoundingClientRect(): the body carries a
      // `zoom: --app-scale`, and only offsetHeight reports the unscaled layout
      // box that this inline height has to match.
      if (el.offsetHeight) setHeight(el.offsetHeight);
      setPinned(el.getBoundingClientRect().top < TOP_GAP);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    mq.addEventListener("change", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
      mq.removeEventListener("change", sync);
    };
  }, []);

  return (
    <div
      ref={slot}
      className="flex w-full justify-center"
      style={pinned ? { height } : undefined}
    >
      {pinned
        ? createPortal(
            // The pill itself is translucent by design; over arbitrary page
            // content it needs a denser fill and a lift to read as a bar.
            <div className="animate-nav-drop fixed inset-x-3 top-3 z-50 flex justify-center [&>nav]:bg-white/90 [&>nav]:shadow-[0_10px_30px_rgba(29,29,27,0.14)]">
              {children}
            </div>,
            document.body,
          )
        : children}
    </div>
  );
}
