"use client";

import { useState } from "react";
import Link from "next/link";
import type { ContactChannel, ContactContent } from "@/lib/content";
import { Rich } from "@/components/rich";

const FIELD_BOX =
  "w-full rounded-xl border border-ink/20 bg-[#FCFCFC] px-4 py-3 text-base leading-6 text-ink outline-none transition-colors placeholder:text-ink/40 focus:border-ink/40";

const LABEL =
  "font-mono text-sm font-medium uppercase tracking-[0.02em] text-ink/80";

function Channel({ channel }: { channel: ContactChannel }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-ink/[0.12] bg-white p-6">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-brand">
        {channel.eyebrow}
      </p>
      <p className="text-sm leading-5 text-ink/80">{channel.description}</p>

      {channel.email && (
        <a
          href={`mailto:${channel.email}`}
          className="font-medium leading-6 text-ink underline underline-offset-2 transition-colors hover:text-brand"
        >
          {channel.email}
        </a>
      )}

      {channel.cta && (
        <Link
          href={channel.cta.href}
          className="mt-1 inline-flex items-center gap-2 self-start rounded-full bg-ink py-3 pl-6 pr-5 font-mono text-base uppercase leading-6 text-white transition-opacity duration-300 hover:opacity-90"
        >
          {channel.cta.label}
        </Link>
      )}
    </div>
  );
}

export function Contact({ content }: { content: ContactContent }) {
  const { form } = content;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="px-5 py-12 sm:px-9 sm:py-20">
      <div className="mx-auto flex w-full max-w-[1368px] flex-col gap-6 sm:gap-11">
        {/* Heading — mobile tightens the eyebrow to the headline (Figma 1108:7669). */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 sm:gap-4">
            <p className="font-mono text-sm font-medium uppercase tracking-[0.08em] text-brand sm:tracking-[0.04em]">
              {content.eyebrow}
            </p>
            <h1 className="text-5xl font-medium leading-[1.16] tracking-[-0.03em] text-ink lg:text-[56px] lg:leading-[64px] lg:tracking-[-0.02em]">
              {content.heading}
            </h1>
          </div>
          <p className="max-w-[822px] text-base leading-[1.5] text-ink/80 sm:text-lg">
            {content.subtext}
          </p>
        </div>

        {/* Form + channels. The channel rail is a fixed 440px on desktop and
            stacks under the form below lg (Figma 1108:8001 / 1108:7668). */}
        <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
          <form
            onSubmit={onSubmit}
            className="flex flex-1 flex-col gap-4 rounded-3xl border border-ink/[0.08] bg-white px-5 py-6 sm:gap-5 sm:rounded-[20px] sm:border-ink/[0.12] sm:p-8"
          >
            <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-brand">
              {form.eyebrow}
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex flex-1 flex-col gap-1">
                <label htmlFor="contact-name" className={LABEL}>
                  {form.nameLabel}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder={form.namePlaceholder}
                  className={FIELD_BOX}
                />
              </div>

              <div className="flex flex-1 flex-col gap-1">
                <label htmlFor="contact-email" className={LABEL}>
                  {form.emailLabel}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder={form.emailPlaceholder}
                  className={FIELD_BOX}
                />
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <label
                htmlFor="contact-message"
                className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-ink/80"
              >
                {form.messageLabel}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                placeholder={form.messagePlaceholder}
                className={`${FIELD_BOX} min-h-[172px] flex-1 resize-y`}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending" || status === "sent"}
              className="w-full rounded-full bg-ink px-5 py-3 font-mono text-base uppercase leading-6 text-white transition-opacity duration-300 hover:opacity-90 disabled:opacity-60 sm:py-4 sm:text-xl sm:leading-8"
            >
              {status === "sending" ? "Sending…" : form.submitLabel}
            </button>

            {/* Only one of these ever shows — the form keeps its fields so a
                failed send isn't lost. */}
            {status === "sent" && (
              <p
                role="status"
                className="text-sm leading-5 text-ink"
              >
                <span className="font-medium">{form.successHeading}</span>{" "}
                {form.successBody}
              </p>
            )}
            {status === "error" && (
              <p role="alert" className="text-sm leading-5 text-brand">
                {form.errorBody}
              </p>
            )}

            <Rich
              value={form.disclaimer}
              className="text-xs leading-5 text-ink/80"
            />
          </form>

          <div className="flex w-full flex-col gap-6 lg:w-[440px] lg:shrink-0 lg:gap-4">
            {content.channels.map((c) => (
              <Channel key={c.eyebrow} channel={c} />
            ))}

            <div className="flex flex-col gap-2 rounded-2xl bg-ink p-6">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.06em] text-brand">
                {content.emergency.eyebrow}
              </p>
              <Rich
                value={content.emergency.body}
                className="text-sm leading-5 text-white/80"
                tone="invert"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
