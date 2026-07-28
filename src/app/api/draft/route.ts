import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Enables Draft Mode, then redirects to the requested slug so drafts render
 * outside the Visual Editor (e.g. shareable preview links).
 * Usage: /api/draft?secret=<STORYBLOK_PREVIEW_SECRET>&slug=/
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = url.searchParams.get("secret");
  const slug = url.searchParams.get("slug") || "/";
  const expected = process.env.STORYBLOK_PREVIEW_SECRET;

  if (expected && secret !== expected) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  (await draftMode()).enable();
  redirect(slug);
}
