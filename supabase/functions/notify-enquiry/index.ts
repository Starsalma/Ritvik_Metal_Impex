import "jsr:@supabase/functions-js/edge-runtime.d.ts";

/*
 * notify-enquiry
 *
 * Fired by an AFTER INSERT trigger on public.enquiries (via pg_net). Announces
 * the enquiry by email and WhatsApp, then records the outcome on the row.
 *
 * Server-side on purpose: the alert no longer depends on the visitor's browser
 * staying open, and no provider key ships in the public JS bundle.
 *
 * verify_jwt is disabled because pg_net cannot mint a JWT. The trigger instead
 * sends a shared secret from Vault in x-enquiry-secret; only that secret's
 * SHA-256 lives here, so reading this source reveals nothing usable.
 */

const SECRET_SHA256 = "5a677040051b0c30a1ca2bb7574600d801e5cddb95c72f52970379852b8c9a23";

/** Who gets told about a new enquiry. */
const EMAIL_RECIPIENTS = [
  "suresh.prajapat@ritvikmetalimpex.com",
  "salesritvikmetal@gmail.com",
];

const WHATSAPP_TO = "917073895597";
const SITE_NAME = "Ritvik Metal Impex";

/* ------------------------------------------------------------------ */

async function sha256Hex(value: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(value));
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

type Enquiry = Record<string, unknown> & {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  subject?: string | null;
  message: string;
  quantity?: string | null;
  product_name?: string | null;
  source_url?: string | null;
  created_at?: string | null;
};

const esc = (v: unknown) =>
  String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function plainText(e: Enquiry): string {
  const line = (label: string, value?: unknown) =>
    value ? `${label.padEnd(11)}: ${String(value)}\n` : "";
  return (
    `New enquiry from the ${SITE_NAME} website\n${"=".repeat(46)}\n\n` +
    line("Name", e.name) +
    line("Email", e.email) +
    line("Phone", e.phone) +
    line("Company", e.company) +
    line("Product", e.product_name) +
    line("Quantity", e.quantity) +
    line("Subject", e.subject) +
    `\nRequirement:\n${e.message}\n\n` +
    line("Page", e.source_url) +
    line("Received", e.created_at) +
    line("Ref", e.id)
  );
}

function html(e: Enquiry): string {
  const row = (label: string, value?: unknown) =>
    value
      ? `<tr><td style="padding:6px 14px 6px 0;color:#6b7280;font-size:13px;white-space:nowrap">${label}</td>` +
        `<td style="padding:6px 0;color:#0A1828;font-size:14px;font-weight:600">${esc(value)}</td></tr>`
      : "";
  return (
    `<div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:640px">` +
    `<p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#E5A93C;font-weight:800;margin:0 0 6px">New Website Enquiry</p>` +
    `<h2 style="margin:0 0 18px;color:#0A1828;font-size:20px">${esc(e.product_name || "General enquiry")}</h2>` +
    `<table style="border-collapse:collapse;margin-bottom:18px">` +
    row("Name", e.name) + row("Email", e.email) + row("Phone", e.phone) +
    row("Company", e.company) + row("Product", e.product_name) +
    row("Quantity", e.quantity) + row("Subject", e.subject) +
    `</table>` +
    `<div style="background:#F8F9FA;border-left:4px solid #E5A93C;padding:14px 16px;border-radius:0 8px 8px 0">` +
    `<p style="margin:0;color:#374151;font-size:14px;line-height:1.7;white-space:pre-wrap">${esc(e.message)}</p></div>` +
    `<p style="margin:18px 0 0;color:#9ca3af;font-size:12px">` +
    (e.source_url ? `Page: ${esc(e.source_url)}<br>` : "") +
    `Ref: ${esc(e.id)}</p></div>`
  );
}

/* ---------------------------- email ------------------------------- */

async function sendEmail(e: Enquiry) {
  const subject = `New enquiry: ${e.product_name || e.subject || "website"} — ${e.name}`;

  /*
   * Preferred path: Resend. One API call reaches every recipient, which is the
   * only clean way to notify more than one inbox.
   */
  const resendKey = Deno.env.get("RESEND_API_KEY");
  if (resendKey) {
    const from = Deno.env.get("RESEND_FROM") || "Ritvik Metal Impex <onboarding@resend.dev>";
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: EMAIL_RECIPIENTS,
        reply_to: e.email,
        subject,
        html: html(e),
        text: plainText(e),
      }),
    });
    const body = await res.text();
    return {
      provider: "resend",
      ok: res.ok,
      status: res.status,
      recipients: EMAIL_RECIPIENTS,
      body: body.slice(0, 500),
    };
  }

  /*
   * Fallback: Web3Forms. Verified behaviour on the free tier — `ccemail` is a
   * Pro feature and returns 400, so a single key can only ever reach the one
   * inbox it is registered to. To notify more inboxes for free, create one
   * access key per address and list them all in WEB3FORMS_ACCESS_KEYS; each key
   * gets its own submission.
   */
  const keys = (Deno.env.get("WEB3FORMS_ACCESS_KEYS") ||
    Deno.env.get("WEB3FORMS_ACCESS_KEY") ||
    "ca4e124f-93f4-42fc-9910-0ff419185838")
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);

  const sends = await Promise.all(
    keys.map(async (access_key) => {
      try {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key,
            subject,
            from_name: `${SITE_NAME} Website`,
            replyto: e.email,
            Name: e.name,
            Email: e.email,
            Phone: e.phone || "-",
            Company: e.company || "-",
            Product: e.product_name || "-",
            Quantity: e.quantity || "-",
            Requirement: e.message,
            Page: e.source_url || "-",
            Ref: e.id,
          }),
        });
        const text = await res.text();
        let ok = res.ok;
        let message: string | null = null;
        try {
          const parsed = JSON.parse(text);
          ok = parsed?.success === true;
          message = parsed?.message ?? null;
        } catch {
          /* non-JSON — fall back to the HTTP status */
        }
        return { key: `${access_key.slice(0, 8)}…`, ok, status: res.status, message };
      } catch (err) {
        return { key: `${access_key.slice(0, 8)}…`, ok: false, message: String(err) };
      }
    }),
  );

  return {
    provider: "web3forms",
    ok: sends.some((s) => s.ok),
    sends,
    note:
      keys.length < EMAIL_RECIPIENTS.length
        ? `Only ${keys.length} Web3Forms key(s) configured, so only ${keys.length} inbox(es) are notified. ` +
          `Set RESEND_API_KEY, or add one access key per recipient to WEB3FORMS_ACCESS_KEYS.`
        : undefined,
  };
}

/* --------------------------- whatsapp ------------------------------ */

async function sendWhatsApp(e: Enquiry) {
  const summary =
    `*New enquiry — ${SITE_NAME}*\n\n` +
    `*Name:* ${e.name}\n*Email:* ${e.email}\n` +
    (e.phone ? `*Phone:* ${e.phone}\n` : "") +
    (e.company ? `*Company:* ${e.company}\n` : "") +
    (e.product_name ? `*Product:* ${e.product_name}\n` : "") +
    (e.quantity ? `*Quantity:* ${e.quantity}\n` : "") +
    `\n${String(e.message).slice(0, 600)}`;

  // 1. Meta WhatsApp Cloud API
  const metaToken = Deno.env.get("WHATSAPP_TOKEN");
  const metaPhoneId = Deno.env.get("WHATSAPP_PHONE_NUMBER_ID");
  if (metaToken && metaPhoneId) {
    const template = Deno.env.get("WHATSAPP_TEMPLATE_NAME");
    const payload = template
      ? {
          messaging_product: "whatsapp",
          to: WHATSAPP_TO,
          type: "template",
          template: {
            name: template,
            language: { code: Deno.env.get("WHATSAPP_TEMPLATE_LANG") || "en" },
            components: [{
              type: "body",
              parameters: [
                { type: "text", text: String(e.name).slice(0, 60) },
                { type: "text", text: String(e.product_name || "General enquiry").slice(0, 60) },
                { type: "text", text: String(e.phone || e.email).slice(0, 60) },
              ],
            }],
          },
        }
      : { messaging_product: "whatsapp", to: WHATSAPP_TO, type: "text", text: { body: summary } };

    const res = await fetch(`https://graph.facebook.com/v21.0/${metaPhoneId}/messages`, {
      method: "POST",
      headers: { Authorization: `Bearer ${metaToken}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await res.text();
    return { provider: "meta-cloud-api", ok: res.ok, status: res.status, body: body.slice(0, 500) };
  }

  // 2. Twilio WhatsApp
  const twSid = Deno.env.get("TWILIO_ACCOUNT_SID");
  const twToken = Deno.env.get("TWILIO_AUTH_TOKEN");
  const twFrom = Deno.env.get("TWILIO_WHATSAPP_FROM");
  if (twSid && twToken && twFrom) {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twSid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${twSid}:${twToken}`)}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        From: `whatsapp:${twFrom}`,
        To: `whatsapp:+${WHATSAPP_TO}`,
        Body: summary,
      }),
    });
    const body = await res.text();
    return { provider: "twilio", ok: res.ok, status: res.status, body: body.slice(0, 500) };
  }

  // 3. CallMeBot — free, intended for alerting your own number
  const cmbKey = Deno.env.get("CALLMEBOT_APIKEY");
  if (cmbKey) {
    const res = await fetch(
      `https://api.callmebot.com/whatsapp.php?phone=${WHATSAPP_TO}` +
        `&text=${encodeURIComponent(summary)}&apikey=${cmbKey}`,
    );
    const body = await res.text();
    return { provider: "callmebot", ok: res.ok, status: res.status, body: body.slice(0, 500) };
  }

  return {
    provider: "none",
    ok: false,
    skipped: true,
    reason:
      "No WhatsApp provider configured. Set WHATSAPP_TOKEN + WHATSAPP_PHONE_NUMBER_ID (Meta Cloud API), " +
      "TWILIO_ACCOUNT_SID + TWILIO_AUTH_TOKEN + TWILIO_WHATSAPP_FROM, or CALLMEBOT_APIKEY.",
  };
}

/* ----------------------------- handler ----------------------------- */

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const presented = req.headers.get("x-enquiry-secret") ?? "";
  if (!presented || !safeEqual(await sha256Hex(presented), SECRET_SHA256)) {
    return new Response(JSON.stringify({ error: "unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  let enquiry: Enquiry;
  try {
    const payload = await req.json();
    enquiry = payload.record ?? payload.enquiry ?? payload;
  } catch {
    return new Response(JSON.stringify({ error: "invalid json" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!enquiry?.id || !enquiry?.email) {
    return new Response(JSON.stringify({ error: "missing enquiry id or email" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const [email, whatsapp] = await Promise.all([
    sendEmail(enquiry).catch((err) => ({ provider: "error", ok: false, body: String(err) })),
    sendWhatsApp(enquiry).catch((err) => ({ provider: "error", ok: false, body: String(err) })),
  ]);

  // Record the outcome, failures included, so nothing fails silently.
  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  let recorded = false;
  if (supabaseUrl && serviceKey) {
    const now = new Date().toISOString();
    const patch: Record<string, unknown> = { notification_log: { at: now, email, whatsapp } };
    if (email.ok) patch.notified_email_at = now;
    if (whatsapp.ok) patch.notified_whatsapp_at = now;

    const res = await fetch(`${supabaseUrl}/rest/v1/enquiries?id=eq.${enquiry.id}`, {
      method: "PATCH",
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(patch),
    });
    recorded = res.ok;
  }

  return new Response(JSON.stringify({ ok: email.ok, email, whatsapp, recorded }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});
