"use client";

import { useActiveHeading } from "@/components/use-active-heading";
import type { LegalClause } from "@/lib/content";

/** Sticky clause list, highlighting whichever clause the reader is on. */
export function LegalContents({
  label,
  clauses,
}: {
  label: string;
  clauses: LegalClause[];
}) {
  const active = useActiveHeading(clauses.map((c) => c.id));

  return (
    <div className="lg:sticky lg:top-24 flex flex-col gap-3">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.02em] text-ink/80">
        {label}
      </p>
      <nav className="flex flex-col gap-3">
        {clauses.map((clause) => {
          const isActive = clause.id === active;
          return (
            <a
              key={clause.id}
              href={`#${clause.id}`}
              aria-current={isActive ? "true" : undefined}
              className={`flex gap-2 text-sm leading-5 transition-colors ${
                isActive ? "font-medium text-ink" : "text-ink/80 hover:text-ink"
              }`}
            >
              <span className="shrink-0 font-mono text-brand">
                {clause.number}
              </span>
              <span>{clause.title}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
