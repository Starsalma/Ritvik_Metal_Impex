alter table public.enquiries
  add column if not exists notified_email_at    timestamptz,
  add column if not exists notified_whatsapp_at timestamptz,
  add column if not exists notification_log     jsonb;

comment on column public.enquiries.notified_email_at is
  'Set when the email notification was accepted by the provider.';
comment on column public.enquiries.notified_whatsapp_at is
  'Set when the WhatsApp notification was accepted by the provider.';
comment on column public.enquiries.notification_log is
  'Per-channel result from the notify-enquiry edge function, including failures.';

/*
 * The publishable key ships in client-side JS, so the public role gets INSERT
 * and nothing else. With no SELECT policy, RLS denies reads by default.
 * The WITH CHECK also blocks pre-setting workflow or notification state, which
 * would otherwise let a submitter mark their own enquiry as already announced.
 */
drop policy if exists "public can submit enquiries" on public.enquiries;
create policy "public can submit enquiries"
  on public.enquiries
  for insert
  to anon, authenticated
  with check (
    status = 'new'
    and handled_at is null
    and notes is null
    and notified_email_at is null
    and notified_whatsapp_at is null
    and notification_log is null
  );

create index if not exists enquiries_unnotified_idx
  on public.enquiries (created_at desc)
  where notified_email_at is null;
