# Supabase backend

Project: `zibldmkvlmbkneicrwif` (Ritvik_Metal_Impex), region `ap-southeast-1`.

- `migrations/` — schema, RLS policies and the enquiry notification trigger.
- `functions/notify-enquiry/` — sends the email and WhatsApp alerts.

See `../docs/NOTIFICATIONS.md` for how the pipeline fits together and what
credentials each channel needs.

## Deploying

```bash
supabase link --project-ref zibldmkvlmbkneicrwif
supabase db push                              # apply migrations
supabase functions deploy notify-enquiry --no-verify-jwt
```

`--no-verify-jwt` is required: pg_net cannot mint a JWT, so the function
authenticates the trigger with the Vault shared secret instead. See the comment
at the top of the function.

## After rotating the webhook secret

Update the `enquiry_webhook_secret` Vault entry, then put its new SHA-256 into
`SECRET_SHA256` in the function and redeploy:

```sql
select encode(extensions.digest(decrypted_secret, 'sha256'), 'hex')
from vault.decrypted_secrets where name = 'enquiry_webhook_secret';
```
