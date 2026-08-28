"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Settles a section into place the first time it is scrolled to.
 *
 * The motion itself lives in `.reveal` in globals.css; this only decides when
 * a section has arrived. It fires once and disconnects, so scrolling back up
 * never replays it — the page should feel like it is being read, not performed.
 *
 * The bottom margin holds the trigger back until the section is properly into
 * the viewport rather than the instant its first pixel appears. A section
 * already on screen at load intersects immediately, so above-the-fold content
 * fades in on arrival rather than waiting for a scroll.
 */
export function Reveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        io.disconnect();
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="reveal" data-visible={visible || undefined}>
      {children}
    </div>
  );
}
