/**
 * Body copy an editor can format.
 *
 * Storyblok rich text fields hand back a document object; every one of these
 * fields used to be a plain textarea, and a story keeps its old string value
 * until someone re-saves it. The local fallback content in `content.ts` is
 * written as strings too. So both shapes stay valid for good, and `<Rich>`
 * renders either.
 */
export type RichTextDoc = { type: "doc"; content?: unknown[] };
export type RichTextValue = string | RichTextDoc;

export const isRichDoc = (v: unknown): v is RichTextDoc =>
  typeof v === "object" &&
  v !== null &&
  (v as { type?: unknown }).type === "doc";

/**
 * Flatten to a plain string. Anywhere a formatted value has to become an
 * attribute rather than markup — a meta description, alt text, a title — needs
 * this, because markup there renders as literal angle brackets.
 */
export function richToPlain(v: RichTextValue | undefined): string {
  if (!v) return "";
  if (typeof v === "string") return v;
  const parts: string[] = [];
  const walk = (n: unknown): void => {
    if (Array.isArray(n)) return n.forEach(walk);
    if (!n || typeof n !== "object") return;
    const node = n as { text?: unknown; content?: unknown; type?: unknown };
    if (typeof node.text === "string") parts.push(node.text);
    if (node.content) walk(node.content);
    // Block-level nodes end a sentence run; without this every paragraph would
    // run into the next with no gap.
    if (node.type === "paragraph" || node.type === "heading") parts.push("\n");
  };
  walk(v.content);
  return parts.join("").replace(/\n+/g, " ").trim();
}
