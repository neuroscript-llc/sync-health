"use client";

/**
 * Tab / filter pill (Figma component set 934:2725). Active is solid ink,
 * default is a hairline outline on white. Used by the formulary listing and
 * the FAQ browser.
 */
export function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2.5 font-mono text-sm font-medium uppercase tracking-[0.04em] transition-colors sm:px-6 sm:py-3 sm:text-base ${
        active
          ? "bg-ink text-white"
          : "border border-ink/[0.12] bg-white text-ink hover:border-ink/30"
      }`}
    >
      {label}
    </button>
  );
}
