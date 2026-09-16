-- Enquiries captured by the website contact form and product quote requests.
create table if not exists public.enquiries (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  name          text not null,
  email         text not null,
  phone         text,
  company       text,

  subject       text,
  message       text not null,
  quantity      text,

  product_id    integer,
  product_name  text,

  source_path   text,
  source_url    text,
  referrer      text,
  user_agent    text,

  status        text not null default 'new',
  handled_at    timestamptz,
  notes         text,

  constraint enquiries_name_len     check (char_length(btrim(name)) between 2 and 120),
  constraint enquiries_email_len    check (char_length(email) between 5 and 254),
  constraint enquiries_email_shape  check (email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  constraint enquiries_phone_len    check (phone is null or char_length(phone) <= 40),
  constraint enquiries_company_len  check (company is null or char_length(company) <= 200),
  constraint enquiries_subject_len  check (subject is null or char_length(subject) <= 300),
  constraint enquiries_message_len  check (char_length(btrim(message)) between 5 and 5000),
  constraint enquiries_quantity_len check (quantity is null or char_length(quantity) <= 120),
  constraint enquiries_status_valid check (status in ('new','contacted','quoted','won','lost','spam'))
);

comment on table public.enquiries is
  'Website enquiries. Anonymous visitors may INSERT only; reading requires the service role or the Supabase dashboard.';

create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx     on public.enquiries (status);
create index if not exists enquiries_email_idx      on public.enquiries (email);
create index if not exists enquiries_product_idx    on public.enquiries (product_id);

alter table public.enquiries enable row level security;
