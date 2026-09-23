# Enquiry notifications

How a website enquiry reaches the sales team, what is already working, and what
still needs credentials.

## The pipeline

```
Website form
   ↓  insert (publishable key, RLS: INSERT only)
public.enquiries                      ← the system of record
   ↓  AFTER INSERT trigger: notify_new_enquiry()
pg_net (async — never blocks the form)
   ↓  POST + x-enquiry-secret from Vault
Edge Function: notify-enquiry
   ├─ email     → Resend, else Web3Forms
   └─ WhatsApp  → Meta Cloud API, else Twilio, else CallMeBot
   ↓
PATCH enquiries.notified_email_at / notified_whatsapp_at / notification_log
```

Two properties worth keeping:

- **pg_net is asynchronous.** A slow or failed email provider can never make the
  website's form submission hang or fail.
- **The trigger swallows its own errors.** A notification problem is logged as a
  warning; it never rolls back a captured enquiry.

## Status

| Channel | Status | Notes |
|---|---|---|
| Save to Postgres | **Working** | Verified end to end |
| Email → the inbox on the Web3Forms key | **Working** | Verified: `200 "Form submitted successfully!"` |
| Email → the second inbox | **Needs setup** | Web3Forms free tier limit — see below |
| WhatsApp → +91 7073895597 | **One step left** | Pipeline verified; needs the CallMeBot key — see below |

## Security

`verify_jwt` is disabled on the function because pg_net cannot mint a JWT.
Instead the trigger sends a 32-byte secret from Vault in `x-enquiry-secret`, and
the function compares its SHA-256 against a constant. **Only the hash is in the
function source**, so reading the source reveals nothing usable. Unauthenticated
calls get a 401.

If you ever need to rotate it: generate a new secret, update the
`enquiry_webhook_secret` Vault entry, and redeploy the function with the new
SHA-256 in `SECRET_SHA256`.

## Making email reach all recipients

Recipients are hard-coded in the function:

```
suresh.prajapat@ritvikmetalimpex.com
salesritvikmetal@gmail.com
```

**Why only one currently receives it:** Web3Forms delivers to the single inbox
its access key is registered against. Probing the API directly returned:

> `400 — "You are trying to use a Pro feature, Please Upgrade to use ccemail"`

So CC is paywalled. Two ways to fix it, both fine:

### Option A — Resend (recommended, one call reaches everyone)

1. Sign up at resend.com (free tier: 3,000 emails/month).
2. Verify `ritvikmetalimpex.com` as a sending domain, so mail arrives from your
   own address rather than a shared one.
3. Supabase Dashboard → Edge Functions → `notify-enquiry` → Secrets, add:
   - `RESEND_API_KEY` = `re_…`
   - `RESEND_FROM` = `Ritvik Metal Impex <enquiries@ritvikmetalimpex.com>`

The function prefers Resend automatically once the key is present. Nothing to
redeploy.

### Option B — a second free Web3Forms key (no new service)

1. Create a second free Web3Forms access key registered to
   `salesritvikmetal@gmail.com`.
2. Add the secret `WEB3FORMS_ACCESS_KEYS` = `key1,key2` (comma-separated).

The function sends one submission per key, so each inbox gets its own copy.

## Setting up WhatsApp

**There is no way to send a WhatsApp message without a provider account.** A
`wa.me` link only opens a chat for a human to type in; it cannot deliver an
automated alert. Pick one:

### Meta WhatsApp Cloud API — free tier, most work to set up

1. Create a Meta Business account and a WhatsApp Business app.
2. Add a sender phone number. It cannot be a number already active on the normal
   WhatsApp app unless you migrate it.
3. Generate a **permanent** access token (a system user token — the default
   24-hour token will stop working overnight).
4. Add secrets: `WHATSAPP_TOKEN`, `WHATSAPP_PHONE_NUMBER_ID`.
5. **Template:** Meta only allows free-form text inside a 24-hour window opened
   by the recipient messaging you first. For a reliable alert, create and get
   approval for a message template, then also set `WHATSAPP_TEMPLATE_NAME` (and
   `WHATSAPP_TEMPLATE_LANG`, default `en`). The function sends three body
   parameters in order: name, product, contact.

### Twilio — fastest to trial

1. Twilio account → Messaging → WhatsApp sender (sandbox works immediately).
2. Add secrets: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`,
   `TWILIO_WHATSAPP_FROM` (e.g. `+14155238886`).
3. For the sandbox, +91 7073895597 must join once by sending the sandbox join
   code. Production needs your own approved sender.

### CallMeBot — free, and already wired up

Everything is in place except the key itself, which CallMeBot will only issue in
reply to a message sent **from the phone that will receive the alerts**. That is
the one step nobody can do on your behalf.

1. From **+91 7073895597**, open WhatsApp and send
   `I allow callmebot to send me messages`
   to **+34 644 51 95 23**.
2. It replies within a minute or two with your personal API key.
3. Turn it on with one statement (Supabase Dashboard → SQL Editor):

   ```sql
   select public.set_whatsapp_config('{"callmebot_apikey":"YOUR_KEY"}'::jsonb);
   ```

That is all — no redeploy, no dashboard secrets. The next enquiry will send a
WhatsApp message.

**Verified:** storing a deliberately invalid key made the pipeline call
CallMeBot's API, which answered
`ERROR: apikey can not be empty or it has an invalid format`, and the failure was
recorded in `notification_log`. So the path from Vault through the trigger to
CallMeBot works; only a valid key is missing.

It is a free third-party service, so enquiry text passes through it. Fine for
internal alerts to your own phone; use Meta Cloud API or Twilio if you would
rather customer details did not transit a third party.

Indian resellers of the Cloud API (AiSensy, WATI, Interakt) handle the Meta
setup for you if you would rather not do step 1–5 yourself; they expose the same
Cloud API, so `WHATSAPP_TOKEN` + `WHATSAPP_PHONE_NUMBER_ID` still applies.

## Checking that it worked

Every attempt is recorded on the row, failures included:

```sql
select created_at, name, product_name,
       notified_email_at, notified_whatsapp_at, notification_log
from public.enquiries
order by created_at desc
limit 20;
```

Enquiries saved but never announced:

```sql
select * from public.enquiries
where notified_email_at is null
order by created_at desc;
```

Raw HTTP responses from the trigger's calls:

```sql
select id, status_code, content, created
from net._http_response
order by created desc limit 10;
```

## Where WhatsApp credentials live

Two options, and the function checks them in this order:

1. **Edge Function secrets** (Dashboard → Edge Functions → notify-enquiry →
   Secrets) — `CALLMEBOT_APIKEY`, `WHATSAPP_TOKEN`, `TWILIO_*` and so on.
2. **Vault**, via `public.set_whatsapp_config(jsonb)`. The trigger reads the
   config and passes it to the function in the request body.

Vault exists as an option because it can be written with plain SQL, so WhatsApp
can be switched on from the SQL Editor without touching the dashboard. Either
way the credential travels database → edge function server-side and never
reaches the browser. Accepted JSON keys mirror the env var names in lower case:
`callmebot_apikey`, `whatsapp_token`, `whatsapp_phone_number_id`,
`whatsapp_template_name`, `whatsapp_template_lang`, `twilio_account_sid`,
`twilio_auth_token`, `twilio_whatsapp_from`.

To check or clear what is stored:

```sql
select name from vault.secrets where name = 'whatsapp_config';
delete from vault.secrets where name = 'whatsapp_config';
```

## Changing recipients

Edit `EMAIL_RECIPIENTS` and `WHATSAPP_TO` at the top of the function source and
redeploy. They are deliberately in the function rather than the database so a
compromised publishable key cannot redirect where alerts go.
