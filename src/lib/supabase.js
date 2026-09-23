/*
 * Supabase access for the public website.
 *
 * The client is loaded with a dynamic import inside saveEnquiry() rather than
 * at module scope. @supabase/supabase-js is ~120 kB gzipped and is only needed
 * the moment someone submits the form, so importing it eagerly would put it in
 * the landing-page bundle and cost every visitor LCP for a feature almost none
 * of them will use on that page view.
 *
 * The publishable key is designed to ship in client-side JavaScript — it grants
 * only what row level security allows. On `public.enquiries` that is INSERT and
 * nothing else: there is no SELECT policy, so the enquiry list cannot be read
 * back with this key.
 */

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || 'https://zibldmkvlmbkneicrwif.supabase.co';

const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_W4RwhQQE2LPBKQLOBtOSzQ_TKYT4AaT';

let clientPromise = null;

/** Lazily creates (and memoises) the Supabase client. */
function getClient() {
  if (!clientPromise) {
    clientPromise = import('@supabase/supabase-js').then(({ createClient }) =>
      createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
        auth: {
          // Nobody signs in on this site; skip session handling entirely.
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      }),
    );
  }
  return clientPromise;
}

/**
 * Saves an enquiry to Postgres.
 * Returns { ok: true } or { ok: false, error } — never throws, so the caller
 * can still fall back to the email notification path.
 */
export async function saveEnquiry(fields) {
  try {
    const supabase = await getClient();

    const { error } = await supabase.from('enquiries').insert({
      name: fields.name?.trim(),
      email: fields.email?.trim(),
      phone: fields.phone?.trim() || null,
      company: fields.company?.trim() || null,
      subject: fields.subject?.trim() || null,
      message: fields.message?.trim(),
      quantity: fields.quantity?.trim() || null,
      product_id: fields.productId ?? null,
      product_name: fields.productName || null,
      source_path: typeof window !== 'undefined' ? window.location.pathname : null,
      source_url: typeof window !== 'undefined' ? window.location.href : null,
      referrer: typeof document !== 'undefined' ? document.referrer || null : null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 500) : null,
    });

    if (error) return { ok: false, error };
    return { ok: true };
  } catch (error) {
    return { ok: false, error };
  }
}
