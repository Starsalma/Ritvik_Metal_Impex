import { useState } from 'react';
import { saveEnquiry } from '../lib/supabase';
import { readEnquiryContext, clearEnquiryContext } from '../utils/navigation';
import { site } from '../data/site';

const EMPTY = {
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: '',
  quantity: '',
  message: '',
};

const WEB3FORMS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY || 'ca4e124f-93f4-42fc-9910-0ff419185838';

/**
 * Browser-side email fallback.
 *
 * The normal path is server-side: an AFTER INSERT trigger on public.enquiries
 * calls the notify-enquiry edge function, which sends the email and the
 * WhatsApp alert. That happens regardless of what the browser does next.
 *
 * This runs ONLY when the database insert failed, so a dropped connection or a
 * Supabase outage still gets the enquiry in front of the sales team instead of
 * losing it. On the happy path it never fires, so nobody receives a duplicate.
 */
async function notifyByEmail(fields, productName) {
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject:
          fields.subject?.trim() ||
          (productName
            ? `Quote request: ${productName} — Ritvik Metal Impex`
            : 'New enquiry — Ritvik Metal Impex'),
        name: fields.name,
        email: fields.email,
        phone: fields.phone,
        company: fields.company,
        quantity: fields.quantity,
        product: productName || '—',
        page: typeof window !== 'undefined' ? window.location.href : '',
        message: fields.message,
      }),
    });
    const result = await response.json();
    return Boolean(result?.success);
  } catch {
    return false;
  }
}

/*
 * Product pages publish what the visitor was looking at, so the enquiry lands
 * with product context attached instead of an anonymous "Product Enquiry".
 * Read once during the first render via a lazy initialiser rather than in an
 * effect — an effect would setState synchronously on mount and cascade a
 * second render.
 */
export default function ContactForm() {
  const [context] = useState(readEnquiryContext);
  const [formData, setFormData] = useState(() => ({
    ...EMPTY,
    subject: context?.productName ? `Quote request: ${context.productName}` : '',
  }));
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot: real users never see this field, bots fill everything.
    if (e.target.website?.value) {
      setSubmitted(true);
      return;
    }

    setLoading(true);
    setError('');

    const payload = {
      ...formData,
      productId: context?.productId ?? null,
      productName: context?.productName ?? null,
    };

    // Postgres is the record; its insert trigger sends the email and WhatsApp
    // alerts. Only fall back to a browser-side email if that write failed.
    const saved = await saveEnquiry(payload);
    const emailed = saved.ok ? false : await notifyByEmail(formData, context?.productName);

    setLoading(false);

    if (saved.ok || emailed) {
      setSubmitted(true);
      setFormData(EMPTY);
      clearEnquiryContext();
      return;
    }

    setError(
      `We could not send that. Please email ${site.contact.emails[0]} or call ${site.contact.phoneDisplay} and we will pick it up straight away.`,
    );
  };

  const field =
    'bg-white/5 border border-gray-700 text-white px-4 py-3 text-[14px] focus:outline-none focus:border-[#E5A93C] transition-colors placeholder-gray-600';
  const label = 'text-gray-400 text-[12px] font-bold tracking-widest uppercase';

  return (
    <section id="contact-us" className="w-full bg-[#030914] py-20 px-6 lg:px-16">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-[13px] font-bold tracking-[0.2em] text-[#E5A93C] uppercase">
            Get In Touch
          </span>
          <h2 className="text-[32px] sm:text-[40px] font-extrabold text-white uppercase mt-3 tracking-tight">
            CONTACT <span className="text-[#E5A93C]">US</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#E5A93C]/50 mx-auto mt-5" />
          <p className="text-gray-400 text-[14px] mt-5 max-w-xl mx-auto leading-relaxed">
            Minimum order quantity is {site.moq}. Tell us the grade, size and quantity and we
            will come back with stock position and a firm price.
          </p>
        </div>

        {submitted ? (
          <div className="text-center py-16">
            <div className="text-[#E5A93C] text-5xl mb-4">✓</div>
            <h3 className="text-white text-2xl font-bold">Enquiry Received</h3>
            <p className="text-gray-400 mt-2">
              Your enquiry is logged with our sales team. We typically reply within one working day.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-6 text-[#E5A93C] text-sm underline"
            >
              Send another enquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {context?.productName && (
              <div className="md:col-span-2 flex items-center gap-3 border border-[#E5A93C]/30 bg-[#E5A93C]/[0.06] px-4 py-3">
                <span className="text-[10px] font-black tracking-[0.2em] text-[#E5A93C] uppercase shrink-0">
                  Enquiring about
                </span>
                <span className="text-white text-[14px] font-bold">{context.productName}</span>
              </div>
            )}

            {/* Honeypot — visually hidden, never announced to screen readers */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="flex flex-col gap-2">
              <label htmlFor="cf-name" className={label}>Full Name *</label>
              <input id="cf-name" required name="name" value={formData.name} onChange={handleChange}
                autoComplete="name" placeholder="Your Name" className={field} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="cf-email" className={label}>Email Address *</label>
              <input id="cf-email" required name="email" type="email" value={formData.email}
                onChange={handleChange} autoComplete="email" placeholder="your@email.com" className={field} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="cf-phone" className={label}>Phone Number</label>
              <input id="cf-phone" name="phone" value={formData.phone} onChange={handleChange}
                autoComplete="tel" placeholder="+91 00000 00000" className={field} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="cf-company" className={label}>Company</label>
              <input id="cf-company" name="company" value={formData.company} onChange={handleChange}
                autoComplete="organization" placeholder="Company Name" className={field} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="cf-subject" className={label}>Subject</label>
              <input id="cf-subject" name="subject" value={formData.subject} onChange={handleChange}
                placeholder="Product Enquiry" className={field} />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="cf-quantity" className={label}>
                Quantity <span className="normal-case tracking-normal text-gray-500">(min {site.moq})</span>
              </label>
              <input id="cf-quantity" name="quantity" value={formData.quantity} onChange={handleChange}
                placeholder="e.g. 500 kg / 100 metres / 50 nos" className={field} />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label htmlFor="cf-message" className={label}>Requirement *</label>
              <textarea id="cf-message" required name="message" value={formData.message}
                onChange={handleChange} rows={5}
                placeholder="Grade, size, schedule, quantity, certification required, delivery location…"
                className={`${field} resize-none`} />
            </div>

            {error && (
              <div role="alert" className="md:col-span-2 text-red-400 text-sm leading-relaxed">
                {error}
              </div>
            )}

            <div className="md:col-span-2 flex flex-wrap items-center gap-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-[#E5A93C] text-[#030914] text-[12px] font-black tracking-[0.2em] px-10 py-4 uppercase hover:bg-[#d4982b] transition-colors disabled:opacity-60"
              >
                {loading ? 'SENDING…' : 'SEND ENQUIRY →'}
              </button>
              <a
                href={`https://wa.me/${site.contact.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="text-gray-400 hover:text-[#E5A93C] text-[12px] font-bold tracking-widest uppercase transition-colors"
              >
                or WhatsApp us
              </a>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
