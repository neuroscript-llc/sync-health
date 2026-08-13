"use client";

/**
 * Single / Advanced segmented pill (Figma "Tab / Filter Pill", coral variant).
 * Active half is a filled coral pill; the inactive label stays coral on the
 * cream track. Shared by the home catalog and the /start formulary.
 */
export function TierToggle({
  options,
  value,
  onChange,
  fullWidth,
  className = "",
}: {
  options: string[];
  value: string;
  onChange: (opt: string) => void;
  fullWidth?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center rounded-full bg-cream p-0.5 ${
        fullWidth ? "w-full" : ""
      } ${className}`}
    >
      {options.map((opt) => {
        const isActive = opt === value;
        return (
          <button
            key={opt}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(opt)}
            className={`rounded-full px-4 py-3 font-mono text-base uppercase leading-none transition-colors ${
              fullWidth ? "flex-1" : ""
            } ${
              isActive
                ? "bg-brand text-brand-foreground"
                : "text-brand hover:text-brand/80"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}
