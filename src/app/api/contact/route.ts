/**
 * Contact form endpoint.
 *
 * Delivery is intentionally a seam: the validated message is forwarded to
 * whatever `CONTACT_WEBHOOK_URL` points at (an email provider, a Slack hook, a
 * CRM inbox). With no target configured the route returns 503 rather than
 * pretending to have sent, so the form can fall back to the direct address.
 */
export const dynamic = "force-dynamic";

const MAX_MESSAGE = 5000;

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Malformed request." }, { status: 400 });
  }

  const { name, email, message } = (body ?? {}) as Record<string, unknown>;
  const clean = {
    name: typeof name === "string" ? name.trim() : "",
    email: typeof email === "string" ? email.trim() : "",
    message: typeof message === "string" ? message.trim() : "",
  };

  if (
    !clean.name ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email) ||
    clean.message.length < 10 ||
    clean.message.length > MAX_MESSAGE
  ) {
    return Response.json(
      { error: "Please check your name, email and message." },
      { status: 400 },
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return Response.json(
      { error: "Message delivery is not configured." },
      { status: 503 },
    );
  }

  const res = await fetch(webhook, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...clean, source: "sync.health/contact" }),
  });

  if (!res.ok) {
    return Response.json({ error: "Delivery failed." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
