import { StoryblokServerRichText } from "@storyblok/react/rsc";
import { isRichDoc, type RichTextValue } from "@/lib/richtext";

/** An email in running text, linked the way the legal pages always have. */
const EMAIL = /([\w.+-]+@[\w.-]+\.[a-z]{2,})/gi;

function linkEmails(text: string, linkClass: string) {
  return text
    .split(EMAIL)
    .map((part, i) =>
      /^[\w.+-]+@[\w.-]+\.[a-z]{2,}$/i.test(part) ? (
        <a key={i} href={`mailto:${part}`} className={linkClass}>
          {part}
        </a>
      ) : (
        part
      ),
    );
}

// Tailwind only sees class names written out in full, so each tone is a
// literal rather than something assembled from a prop.
const TONE = {
  ink: {
    block: "[&_a]:text-brand [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-ink",
    link: "text-brand underline underline-offset-2",
  },
  invert: {
    block: "[&_a]:text-white [&_a]:underline [&_a]:underline-offset-2 [&_strong]:text-white",
    link: "text-white underline underline-offset-2",
  },
} as const;

/**
 * Body copy with whatever formatting the editor applied — bold, italic, links,
 * lists, paragraph breaks.
 *
 * `className` styles the block the way the copy around it is styled, and the
 * descendant rules carry that down to the tags the editor produced, so a bolded
 * phrase or a link looks like the site rather than like a browser default.
 * `tone` picks the link and bold colour, because several of these sit on the
 * dark footer and emergency panels where coral-on-charcoal would not read.
 *
 * A plain string still renders: blank lines become paragraphs and a bare email
 * becomes a mailto link, which is what these fields did before they could be
 * formatted. That keeps un-migrated stories and the local fallback content
 * looking exactly as they do today.
 */
export function Rich({
  value,
  className = "",
  tone = "ink",
}: {
  value: RichTextValue | undefined;
  className?: string;
  tone?: keyof typeof TONE;
}) {
  if (!value) return null;

  const styled = [
    className,
    "[&_p]:m-0 [&_p+p]:mt-3",
    TONE[tone].block,
    "[&_strong]:font-medium [&_em]:italic",
    "[&_ul]:mt-3 [&_ol]:mt-3 [&_ul]:list-disc [&_ol]:list-decimal",
    "[&_ul]:pl-5 [&_ol]:pl-5 [&_li+li]:mt-1",
  ]
    .filter(Boolean)
    .join(" ");

  if (isRichDoc(value)) {
    return <StoryblokServerRichText document={value as never} className={styled} />;
  }

  return (
    <div className={styled}>
      {value.split(/\n{2,}/).map((para, i) => (
        <p key={i}>{linkEmails(para, TONE[tone].link)}</p>
      ))}
    </div>
  );
}
