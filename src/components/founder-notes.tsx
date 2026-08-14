import Image from "next/image";
import type { FounderNotesContent } from "@/lib/content";

/**
 * Two founder cards, each a square portrait on a coral wash beside the quote
 * with the name pinned to the bottom (Figma 1302:5822).
 */
export function FounderNotes({ content }: { content: FounderNotesContent }) {
  return (
    <section className="px-5 py-12 sm:px-9 sm:py-20">
      <div className="mx-auto flex w-full max-w-[900px] flex-col gap-6 sm:items-center">
        {/* Left-aligned on mobile, centred from sm (Figma 1115:9541 / 1302:5822). */}
        <div className="flex flex-col gap-1 sm:items-center sm:gap-4 sm:text-center">
          <p className="font-mono text-sm font-medium uppercase tracking-[0.08em] text-brand sm:tracking-[0.04em]">
            {content.eyebrow}
          </p>
          <h2 className="text-5xl font-medium leading-[1.16] tracking-[-0.03em] text-ink lg:text-[56px] lg:leading-[64px] lg:tracking-[-0.02em]">
            {content.heading}
          </h2>
        </div>

        <div className="flex w-full flex-col gap-6">
          {content.notes.map((note) => (
            <div
              key={note.name}
              className="flex flex-col gap-3 rounded-3xl bg-white p-3 sm:flex-row"
            >
              {/* 160px square on mobile, 320px beside the quote from sm. */}
              <div className="relative size-40 shrink-0 overflow-hidden rounded-[20px] bg-[#F16818] ring-2 ring-white sm:size-[320px]">
                <Image
                  src={note.photo}
                  alt={note.name}
                  fill
                  sizes="(max-width: 640px) 160px, 320px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-3 p-1 sm:gap-6 sm:p-3">
                <p className="text-lg leading-[1.4] text-ink/80 sm:text-xl">
                  {note.quote}
                </p>
                <div className="flex flex-col gap-1">
                  <p className="text-xl font-medium leading-7 text-ink sm:text-2xl sm:leading-8">
                    {note.name}
                  </p>
                  <p className="text-sm leading-5 text-ink/80 sm:text-base sm:leading-6">
                    {note.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
