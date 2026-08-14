import Image from "next/image";
import type { FounderNotesContent } from "@/lib/content";

/**
 * Two founder cards, each a square portrait on a coral wash beside the quote
 * with the name pinned to the bottom (Figma 1302:5822).
 */
export function FounderNotes({ content }: { content: FounderNotesContent }) {
  return (
    <section className="px-5 py-12 sm:px-9 sm:py-20">
      <div className="mx-auto flex w-full max-w-[900px] flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-1 text-center sm:gap-4">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.08em] text-brand sm:tracking-[0.04em]">
            {content.eyebrow}
          </p>
          <h2 className="text-4xl font-medium leading-[1.16] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[56px] lg:leading-[64px] lg:tracking-[-0.02em]">
            {content.heading}
          </h2>
        </div>

        <div className="flex w-full flex-col gap-6">
          {content.notes.map((note) => (
            <div
              key={note.name}
              className="flex flex-col gap-3 rounded-3xl bg-white p-3 sm:flex-row"
            >
              <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-[20px] bg-[#F16818] ring-2 ring-white sm:aspect-auto sm:size-[320px]">
                <Image
                  src={note.photo}
                  alt={note.name}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-6 p-3">
                <p className="text-base leading-[1.4] text-ink/80 sm:text-xl">
                  {note.quote}
                </p>
                <div className="flex flex-col gap-1">
                  <p className="text-xl font-medium leading-8 text-ink sm:text-2xl">
                    {note.name}
                  </p>
                  <p className="text-base leading-6 text-ink/80">{note.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
