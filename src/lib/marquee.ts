/** Shared sizing for the two scrolling strips (header ticker, trust bar).

    Both are built the same way: a flex of identical tracks that slides -50%,
    so the second half lands exactly where the first started. That is only
    seamless while each half is at least as wide as the viewport. With a single
    track per half the strip runs out of content on a wide screen and the loop
    shows a blank stretch, so the track is repeated until a half clears
    TARGET_WIDTH. */

/** Widest display the loop is guaranteed to cover without a gap. */
const TARGET_WIDTH = 2560;

/** Backstop so unusually short content cannot balloon the DOM. */
const MAX_REPEATS = 10;

export function marqueeLoop(trackWidth: number, pxPerSecond: number) {
  const repeats = Math.min(
    MAX_REPEATS,
    Math.max(1, Math.ceil(TARGET_WIDTH / Math.max(trackWidth, 1))),
  );

  return {
    /** Indices to render. Always even, since the slide is -50%. */
    tracks: Array.from({ length: repeats * 2 }, (_, i) => i),
    /** Scales with the content so the strip scrolls at one speed regardless
        of how many repeats it took to fill. Feeds --marquee-duration. */
    duration: `${Math.round((trackWidth * repeats) / pxPerSecond)}s`,
  };
}
