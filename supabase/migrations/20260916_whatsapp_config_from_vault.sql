/*
 * WhatsApp provider configuration, stored in Vault and passed to the edge
 * function by the trigger.
 *
 * Edge Function secrets can only be set from the Supabase dashboard or the CLI.
 * Vault can be written with SQL, so keeping the credential here means WhatsApp
 * can be switched on with a single statement instead of a dashboard visit. The
 * value never reaches the browser — it travels database -> edge function over
 * HTTPS, server to server.
 *
 * The function still reads its own env vars first, so a dashboard-set secret
 * continues to take precedence if one is ever added.
 *
 * Usage:
 *   select public.set_whatsapp_config('{"callmebot_apikey":"123456"}'::jsonb);
 */
create or replace function public.set_whatsapp_config(config jsonb)
returns text
language plpgsql
security definer
set search_path = public, vault
as $$
begin
  if exists (select 1 from vault.secrets where name = 'whatsapp_config') then
    perform vault.update_secret(
      (select id from vault.secrets where name = 'whatsapp_config'),
      config::text
    );
    return 'updated';
  end if;

  perform vault.create_secret(
    config::text,
    'whatsapp_config',
    'WhatsApp provider credentials passed to the notify-enquiry edge function.'
  );
  return 'created';
end $$;

comment on function public.set_whatsapp_config is
  'Stores WhatsApp provider credentials in Vault, e.g. set_whatsapp_config(''{"callmebot_apikey":"123456"}''::jsonb).';

revoke all on function public.set_whatsapp_config(jsonb) from public, anon, authenticated;

-- Pass the stored config to the edge function on every enquiry.
create or replace function public.notify_new_enquiry()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  secret text;
  wa_config jsonb := '{}'::jsonb;
  fn_url text := 'https://zibldmkvlmbkneicrwif.supabase.co/functions/v1/notify-enquiry';
begin
  select decrypted_secret into secret
  from vault.decrypted_secrets
  where name = 'enquiry_webhook_secret';

  if secret is null then
    raise warning 'notify_new_enquiry: enquiry_webhook_secret missing from Vault; enquiry % saved but not announced', new.id;
    return new;
  end if;

  begin
    select decrypted_secret::jsonb into wa_config
    from vault.decrypted_secrets
    where name = 'whatsapp_config';
  exception when others then
    wa_config := '{}'::jsonb;
  end;

  perform net.http_post(
    url     := fn_url,
    headers := jsonb_build_object(
                 'Content-Type',     'application/json',
                 'x-enquiry-secret', secret
               ),
    body    := jsonb_build_object(
                 'record',   to_jsonb(new),
                 'whatsapp', coalesce(wa_config, '{}'::jsonb)
               ),
    timeout_milliseconds := 15000
  );

  return new;
exception when others then
  raise warning 'notify_new_enquiry failed for %: %', new.id, sqlerrm;
  return new;
end $$;
