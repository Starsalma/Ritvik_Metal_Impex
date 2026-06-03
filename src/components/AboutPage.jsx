import React, { useEffect, useRef } from 'react';

function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('in'); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

const css = `
  .ab-tag  { opacity:0; transform:translateY(12px); transition:opacity .6s ease, transform .6s ease; }
  .ab-tag.in  { opacity:1; transform:translateY(0); }

  .ab-h    { opacity:0; transform:translateY(36px); transition:opacity .8s cubic-bezier(.16,1,.3,1), transform .8s cubic-bezier(.16,1,.3,1); }
  .ab-h.in { opacity:1; transform:translateY(0); }

  .ab-fade { opacity:0; transition:opacity .9s ease; }
  .ab-fade.in { opacity:1; }

  .ab-left { opacity:0; transform:translateX(-40px); transition:opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
  .ab-left.in { opacity:1; transform:translateX(0); }

  .ab-right { opacity:0; transform:translateX(40px); transition:opacity .8s cubic-bezier(.22,1,.36,1), transform .8s cubic-bezier(.22,1,.36,1); }
  .ab-right.in { opacity:1; transform:translateX(0); }

  .ab-up   { opacity:0; transform:translateY(32px); transition:opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1); }
  .ab-up.in { opacity:1; transform:translateY(0); }

  .ab-line { transform:scaleX(0); transform-origin:left; transition:transform .8s cubic-bezier(.22,1,.36,1) .2s; }
  .ab-line.in { transform:scaleX(1); }

  .ab-stagger > * { opacity:0; transform:translateY(28px); transition:opacity .65s cubic-bezier(.22,1,.36,1), transform .65s cubic-bezier(.22,1,.36,1); }
  .ab-stagger.in > *:nth-child(1) { opacity:1; transform:translateY(0); transition-delay:.00s; }
  .ab-stagger.in > *:nth-child(2) { opacity:1; transform:translateY(0); transition-delay:.10s; }
  .ab-stagger.in > *:nth-child(3) { opacity:1; transform:translateY(0); transition-delay:.20s; }
  .ab-stagger.in > *:nth-child(4) { opacity:1; transform:translateY(0); transition-delay:.30s; }

  .ab-tl-stagger > * { opacity:0; transform:translateX(-24px); transition:opacity .6s cubic-bezier(.22,1,.36,1), transform .6s cubic-bezier(.22,1,.36,1); }
  .ab-tl-stagger.in > *:nth-child(1) { opacity:1; transform:translateX(0); transition-delay:.00s; }
  .ab-tl-stagger.in > *:nth-child(2) { opacity:1; transform:translateX(0); transition-delay:.12s; }
  .ab-tl-stagger.in > *:nth-child(3) { opacity:1; transform:translateX(0); transition-delay:.24s; }
  .ab-tl-stagger.in > *:nth-child(4) { opacity:1; transform:translateX(0); transition-delay:.36s; }
  .ab-tl-stagger.in > *:nth-child(5) { opacity:1; transform:translateX(0); transition-delay:.48s; }

  .val-hover { transition:transform .3s ease, box-shadow .3s ease; }
  .val-hover:hover { transform:translateY(-5px); box-shadow:0 18px 40px rgba(229,169,60,.13); }

  .img-zoom img { transition:transform .7s ease; }
  .img-zoom:hover img { transform:scale(1.06); }

  @keyframes ab-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(7px)} }
  .ab-bounce { animation:ab-bounce 2.2s ease-in-out infinite; }
`;

const stats = [
  { n: '20+',  l: 'Years Active'       },
  { n: '500+', l: 'Products'           },
  { n: '13+',  l: 'Industries'         },
  { n: '9',    l: 'TPI Certifications' },
];

const team = [
  { init:'RK', name:'Rajesh Kumar',     role:'Founder & MD',             note:'25+ yrs in steel trading. Built RMI from the ground up with a quality-first ethos.' },
  { init:'AP', name:'Anand Parekh',     role:'Director – Operations',    note:'Materials engineering background. Oversees sourcing, logistics & quality control.' },
  { init:'SM', name:'Sunita Mehta',     role:'Director – Business Dev.',  note:'Consultative seller. Matches client project specs to the right grade & form.' },
  { init:'VD', name:'Vijay Desai',      role:'Head – Quality & TPI',     note:'Former DNV/TUV inspector. Manages all mill certifications & third-party approvals.' },
];

const milestones = [
  { yr:'2001', head:'Founded',         body:'Established in Mumbai as a stainless steel specialist.' },
  { yr:'2007', head:'Expansion',       body:'Added Carbon Steel & Alloy grades; 50+ clients across 5 states.' },
  { yr:'2013', head:'TPI Approvals',   body:'Certified by DNV, TUV India, L&T, ONGC, NTPC, SAIL & more.' },
  { yr:'2019', head:'Exotic Alloys',   body:'Launched Duplex, Super Duplex and High Nickel Alloy division.' },
  { yr:'Now',  head:'National Reach',  body:'500+ variants. 13+ industries. Trusted across India & globally.' },
];

const values = [
  { icon:'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z', title:'QUALITY FIRST',     body:'Every item verified against international mill standards before dispatch.' },
  { icon:'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    title:'TRUST & INTEGRITY', body:'Transparent pricing, honest specs, and timelines we actually keep.' },
  { icon:'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 004 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z',                                                                                                                                                                                                                                                                                                                                       title:'GLOBAL REACH',      body:'Reliable logistics to project sites across India and internationally.' },
  { icon:'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',                                                                                                                                                                                                                                                                    title:'CUSTOMER FOCUS',    body:'Your spec, your deadline, your project — we treat it as our own.' },
];

export default function AboutPage() {
  /* hero entrance */
  useEffect(() => {
    const t = setTimeout(() => {
      ['.ab-hero-tag','.ab-hero-h1','.ab-hero-sub','.ab-hero-img',
       '.ab-hero-shape','.ab-hero-stats'].forEach((s,i) =>
        setTimeout(() => document.querySelectorAll(s).forEach(e=>e.classList.add('in')), i*100)
      );
    }, 60);
    return () => clearTimeout(t);
  }, []);

  const heroImgRef = useRef(null);
  useEffect(() => {
    const img = heroImgRef.current;
    if (!img) return;
    let t = false;
    const fn = () => { if(!t){requestAnimationFrame(()=>{ img.style.transform=`scale(1.08) translateY(${window.scrollY*.15}px)`; t=false; }); t=true; } };
    window.addEventListener('scroll', fn, {passive:true});
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* section refs */
  const whoTagR  = useReveal(); const whoHR = useReveal(); const whoTxtR = useReveal(); const whoImgR = useReveal();
  const tpiR     = useReveal(.08);
  const mvR      = useReveal(.1);
  const teamHR   = useReveal(); const teamGR = useReveal(.08);
  const tlHR     = useReveal(); const tlR    = useReveal(.08);
  const valHR    = useReveal(); const valR   = useReveal(.08);
  const ctaR     = useReveal(.15);

  return (
    <div className="w-full bg-white overflow-x-hidden font-sans">
      <style>{css}</style>

      

      {/* ══════════ WHO WE ARE ══════════ */}
      <section className="w-full bg-white px-6 lg:px-16 py-24">
        <div className="max-w-[1380px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* image */}
          <div ref={whoImgR} className="ab-left relative h-[420px] sm:h-[500px] img-zoom">
            <div className="w-[82%] h-[88%] overflow-hidden shadow-2xl relative z-10"
              style={{clipPath:'polygon(0 0,100% 0,100% 88%,88% 100%,0 100%)'}}>
              <img src="https://images.unsplash.com/photo-1565793979231-5a39d2ff4ce1?auto=format&fit=crop&q=80&w=900"
                alt="" className="w-full h-full object-cover" />
            </div>
            {/* accent box */}
            <div className="absolute right-0 bottom-4 w-[46%] bg-[#0A1828] p-6 z-20 shadow-xl"
              style={{clipPath:'polygon(12% 0,100% 0,100% 100%,0 100%,0 12%)'}}>
              <div className="text-[#E5A93C] text-4xl font-black leading-none">"</div>
              <p className="text-[11px] font-black tracking-[0.18em] text-white uppercase leading-[1.5] mt-1">
                YOUR RELIABLE<br />SOURCE FOR QUALITY
              </p>
            </div>
            <div className="absolute -top-3 -left-3 w-14 h-14 bg-[#E5A93C]/15 z-0" />
          </div>

          {/* text */}
          <div className="flex flex-col">
            <div ref={whoTagR} className="ab-tag">
              <span className="text-[10px] font-black tracking-[0.3em] text-[#E5A93C] uppercase">Who We Are</span>
            </div>
            <div ref={whoHR} className="ab-h mt-3">
              <h2 className="text-[30px] sm:text-[40px] lg:text-[50px] font-black text-[#0A1828] uppercase tracking-tight leading-[1.08]">
                ABOUT<br />RITVIK METAL IMPEX
              </h2>
            </div>
            <div ref={whoTxtR} className="ab-up mt-1">
              <div className="ab-line w-12 h-[2px] bg-[#E5A93C]/50 mt-5 mb-6" />
              <p className="text-gray-500 text-[14px] sm:text-[15px] font-medium leading-[1.85]">
                One of India's fastest-growing companies in the premium iron and steel industry — a leading supplier of Stainless Steel, Carbon Steel and High Nickel Alloy products serving critical sectors across India and globally.
              </p>
              <p className="text-gray-500 text-[14px] sm:text-[15px] font-medium leading-[1.85] mt-4">
                Our commitment to excellence, quality and customer satisfaction makes us your go-to partner for all industrial metal needs.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button className="group bg-[#051124] text-white text-[10px] font-black tracking-[0.22em] px-7 py-[13px] uppercase flex items-center gap-4 hover:bg-[#0d2040] transition-colors cursor-pointer">
                  <span>OUR PRODUCTS</span><span className="text-[#E5A93C] group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button className="text-[#0A1828] text-[10px] font-black tracking-[0.22em] px-7 py-[13px] uppercase border border-gray-300 hover:border-[#0A1828] transition-colors cursor-pointer bg-white">
                  CONTACT US
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ MISSION + VISION ══════════ */}
      <section className="w-full bg-[#0A1828] px-6 lg:px-16 py-24 overflow-hidden relative">
        <div className="absolute bottom-0 right-6 text-[180px] font-black text-white/[0.03] tracking-widest select-none hidden lg:block uppercase leading-none">RMI</div>
        <div className="relative z-10 max-w-[1380px] mx-auto">
          <div ref={mvR} className="ab-up">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#E5A93C] uppercase">What Guides Us</span>
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/10">
              {/* Mission */}
              <div className="bg-[#0A1828] p-10 lg:p-14">
                <div className="w-10 h-10 bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-[#E5A93C]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
                  </svg>
                </div>
                <div className="text-[9px] font-black tracking-[0.3em] text-[#E5A93C] uppercase mb-3">Mission</div>
                <h3 className="text-[22px] sm:text-[28px] font-black text-white uppercase tracking-tight leading-[1.15] mb-5">
                  INDIA'S MOST TRUSTED<br />PREMIUM METAL SUPPLIER
                </h3>
                <div className="w-8 h-[2px] bg-[#E5A93C]/40 mb-5" />
                <p className="text-gray-400 text-[13px] font-medium leading-[1.9]">
                  Source, verify and deliver premium metals with complete accuracy — on specification, on time, every time. We bridge the gap between mill and project site.
                </p>
              </div>
              {/* Vision */}
              <div className="bg-[#051124] p-10 lg:p-14">
                <div className="w-10 h-10 bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center mb-6">
                  <svg className="w-5 h-5 text-[#E5A93C]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
                <div className="text-[9px] font-black tracking-[0.3em] text-[#E5A93C] uppercase mb-3">Vision</div>
                <h3 className="text-[22px] sm:text-[28px] font-black text-white uppercase tracking-tight leading-[1.15] mb-5">
                  THE BENCHMARK FOR<br />METAL SUPPLY IN ASIA
                </h3>
                <div className="w-8 h-[2px] bg-[#E5A93C]/40 mb-5" />
                <p className="text-gray-400 text-[13px] font-medium leading-[1.9]">
                  When an engineer anywhere in Asia needs a critical specification sourced reliably, Ritvik Metal Impex is the first name they think of.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* ══════════ VALUES ══════════ */}
        <section className="w-full bg-white px-6 lg:px-16 pt-12 pb-24">
        <div className="max-w-[1380px] mx-auto">
          <div ref={valHR} className="ab-up text-center mb-14">
            <span className="text-[10px] font-black tracking-[0.3em] text-[#E5A93C] uppercase">What We Stand For</span>
            <h2 className="text-[28px] sm:text-[38px] lg:text-[48px] font-black text-[#0A1828] uppercase tracking-tight leading-[1.08] mt-2">
              OUR CORE VALUES
            </h2>
            <div className="w-12 h-[2px] bg-[#E5A93C]/50 mt-5 mx-auto" />
          </div>

          <div ref={valR} className="ab-stagger grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v,i) => (
              <div key={i} className="val-hover bg-white border border-gray-100 p-8 shadow-sm"
                style={{borderRadius:'0 0 24px 0', borderTopLeftRadius:'24px'}}>
                <div className="w-11 h-11 bg-[#E5A93C]/10 rounded-full flex items-center justify-center mb-5">
                  <svg className="w-5 h-5 text-[#E5A93C]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d={v.icon} />
                  </svg>
                </div>
                <div className="text-[11px] font-black tracking-[0.2em] text-[#0A1828] uppercase mb-3">{v.title}</div>
                <p className="text-gray-500 text-[12px] font-medium leading-[1.8]">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}