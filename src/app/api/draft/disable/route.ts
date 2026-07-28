import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/** Disables Draft Mode and returns to the home page. */
export async function GET() {
  (await draftMode()).disable();
  redirect("/");
}
