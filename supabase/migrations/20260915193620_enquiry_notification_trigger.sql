/*
 * Announce every new enquiry by calling the notify-enquiry edge function.
 *
 * pg_net is asynchronous, so the HTTP call is queued and the INSERT returns
 * immediately — a slow or down provider can never make the website's form
 * submission hang or fail.
 */
create or replace function public.notify_new_enquiry()
returns trigger
language plpgsql
security definer
set search_path = public, extensions, vault
as $$
declare
  secret text;
  fn_url text := 'https://zibldmkvlmbkneicrwif.supabase.co/functions/v1/notify-enquiry';
begin
  select decrypted_secret into secret
  from vault.decrypted_secrets
  where name = 'enquiry_webhook_secret';

  if secret is null then
    raise warning 'notify_new_enquiry: enquiry_webhook_secret missing from Vault; enquiry % saved but not announced', new.id;
    return new;
  end if;

  perform net.http_post(
    url     := fn_url,
    headers := jsonb_build_object(
                 'Content-Type',     'application/json',
                 'x-enquiry-secret', secret
               ),
    body    := jsonb_build_object('record', to_jsonb(new)),
    timeout_milliseconds := 15000
  );

  return new;
exception when others then
  -- Never let a notification problem roll back a captured enquiry.
  raise warning 'notify_new_enquiry failed for %: %', new.id, sqlerrm;
  return new;
end $$;

comment on function public.notify_new_enquiry is
  'AFTER INSERT trigger on enquiries: calls the notify-enquiry edge function via pg_net to send email and WhatsApp alerts.';

drop trigger if exists enquiries_notify on public.enquiries;
create trigger enquiries_notify
  after insert on public.enquiries
  for each row
  execute function public.notify_new_enquiry();
