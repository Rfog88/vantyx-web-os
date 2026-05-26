import type { SiteConfig } from "@/lib/site-config";
import { Send } from "lucide-react";

async function submitBooking(formData: FormData): Promise<void> {
  "use server";

  const name = (formData.get("name") || "").toString().trim();
  const phone = (formData.get("phone") || "").toString().trim();
  const email = (formData.get("email") || "").toString().trim();
  const service = (formData.get("service") || "").toString().trim();
  const message = (formData.get("message") || "").toString().trim();

  if (!name || !phone) {
    console.warn("[BookingForm] missing required fields");
    return;
  }

  const resendKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.RESEND_TO_EMAIL;

  if (!resendKey || !toEmail) {
    console.log("[BookingForm] no Resend configured; would have sent:", { name, phone, email, service, message });
    return;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Vantyx Web OS <noreply@vantyx.com>",
        to: [toEmail],
        subject: `New website lead: ${name} (${service || "general"})`,
        text: [
          `Name: ${name}`,
          `Phone: ${phone}`,
          `Email: ${email || "—"}`,
          `Service: ${service || "—"}`,
          "",
          `Message:`,
          message || "(none)",
        ].join("\n"),
      }),
    });
    if (!res.ok) {
      console.error("[BookingForm] resend failed", res.status, await res.text());
    }
  } catch (e) {
    console.error("[BookingForm] resend error", e);
  }
}

export function BookingForm({ config }: { config: SiteConfig }) {
  return (
    <section id="contact" className="bg-gray-50 py-16 md:py-24">
      <div className="mx-auto max-w-3xl px-6">
        <header className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
            Get a Free Quote
          </p>
          <h2 className="mt-2 text-3xl font-bold text-brand-primary md:text-4xl">
            Tell us what you need
          </h2>
          <p className="mt-3 text-brand-muted">
            We&apos;ll text or call back within 1 business hour. Mon–Fri 7–6, Sat 8–2.
          </p>
        </header>

        <form action={submitBooking} className="grid gap-4 rounded-lg bg-white p-6 shadow-sm ring-1 ring-gray-200">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-brand-text">Name *</span>
              <input
                type="text"
                name="name"
                required
                autoComplete="name"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-brand-text">Phone *</span>
              <input
                type="tel"
                name="phone"
                required
                inputMode="tel"
                autoComplete="tel"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-brand-text">Email (optional)</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-brand-text">Service needed</span>
            <select
              name="service"
              defaultValue=""
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
            >
              <option value="" disabled>
                Pick one
              </option>
              {config.services.map((s) => (
                <option key={s.title} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="other">Something else</option>
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-brand-text">What&apos;s going on? (optional)</span>
            <textarea
              name="message"
              rows={4}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-base focus:border-brand-accent focus:outline-none focus:ring-1 focus:ring-brand-accent"
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-brand-accent px-6 py-3 text-base font-semibold text-brand-primary transition hover:brightness-95"
          >
            <Send className="h-5 w-5" aria-hidden="true" />
            Send Request
          </button>
          <p className="text-center text-xs text-brand-muted">
            By submitting, you agree we may contact you about your project. No spam — just a real callback.
          </p>
        </form>
      </div>
    </section>
  );
}
