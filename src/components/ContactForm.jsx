import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "ca4e124f-93f4-42fc-9910-0ff419185838",
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject || "New Contact Form Submission - Ritvik Metal Impex",
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setError("Something went wrong. Please try again or contact us directly.");
      }
    } catch {
      setError("Something went wrong. Please try again or contact us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-us" className="w-full bg-[#030914] py-20 px-6 lg:px-16">
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-[13px] font-bold tracking-[0.2em] text-[#E5A93C] uppercase">Get In Touch</span>
          <h2 className="text-[32px] sm:text-[40px] font-extrabold text-white uppercase mt-3 tracking-tight">
            CONTACT <span className="text-[#E5A93C]">US</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#E5A93C]/50 mx-auto mt-5" />
        </div>

        {submitted ? (
          <div className="text-center py-16">
            <div className="text-[#E5A93C] text-5xl mb-4">✓</div>
            <h3 className="text-white text-2xl font-bold">Message Sent!</h3>
            <p className="text-gray-400 mt-2">We'll get back to you shortly.</p>
            <button onClick={() => setSubmitted(false)} className="mt-6 text-[#E5A93C] text-sm underline">Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-[12px] font-bold tracking-widest uppercase">Full Name *</label>
              <input required name="name" value={formData.name} onChange={handleChange}
                placeholder="Your Name"
                className="bg-white/5 border border-gray-700 text-white px-4 py-3 text-[14px] focus:outline-none focus:border-[#E5A93C] transition-colors placeholder-gray-600" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-[12px] font-bold tracking-widest uppercase">Email Address *</label>
              <input required name="email" type="email" value={formData.email} onChange={handleChange}
                placeholder="your@email.com"
                className="bg-white/5 border border-gray-700 text-white px-4 py-3 text-[14px] focus:outline-none focus:border-[#E5A93C] transition-colors placeholder-gray-600" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-[12px] font-bold tracking-widest uppercase">Phone Number</label>
              <input name="phone" value={formData.phone} onChange={handleChange}
                placeholder="+91 00000 00000"
                className="bg-white/5 border border-gray-700 text-white px-4 py-3 text-[14px] focus:outline-none focus:border-[#E5A93C] transition-colors placeholder-gray-600" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-400 text-[12px] font-bold tracking-widest uppercase">Subject</label>
              <input name="subject" value={formData.subject} onChange={handleChange}
                placeholder="Product Enquiry"
                className="bg-white/5 border border-gray-700 text-white px-4 py-3 text-[14px] focus:outline-none focus:border-[#E5A93C] transition-colors placeholder-gray-600" />
            </div>

            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-gray-400 text-[12px] font-bold tracking-widest uppercase">Message *</label>
              <textarea required name="message" value={formData.message} onChange={handleChange}
                placeholder="Tell us about your requirement..."
                rows={5}
                className="bg-white/5 border border-gray-700 text-white px-4 py-3 text-[14px] focus:outline-none focus:border-[#E5A93C] transition-colors placeholder-gray-600 resize-none" />
            </div>

            {error && (
              <div className="md:col-span-2 text-red-400 text-sm">{error}</div>
            )}

            <div className="md:col-span-2">
              <button type="submit" disabled={loading}
                className="bg-[#E5A93C] text-[#030914] text-[12px] font-black tracking-[0.2em] px-10 py-4 uppercase hover:bg-[#d4982b] transition-colors disabled:opacity-60">
                {loading ? "SENDING..." : "SEND MESSAGE →"}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
