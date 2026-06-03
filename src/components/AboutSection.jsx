import React, { useEffect, useRef } from 'react';

function useReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const revealStyles = `
  .reveal {
    opacity: 0;
    transform: translateY(36px);
    transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
  }
  .reveal.revealed {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-left {
    opacity: 0;
    transform: translateX(-48px);
    transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
  }
  .reveal-left.revealed {
    opacity: 1;
    transform: translateX(0);
  }
  .reveal-right {
    opacity: 0;
    transform: translateX(48px);
    transition: opacity 0.8s cubic-bezier(0.22,1,0.36,1), transform 0.8s cubic-bezier(0.22,1,0.36,1);
  }
  .reveal-right.revealed {
    opacity: 1;
    transform: translateX(0);
  }
  .reveal-scale {
    opacity: 0;
    transform: scale(0.93);
    transition: opacity 0.75s cubic-bezier(0.22,1,0.36,1), transform 0.75s cubic-bezier(0.22,1,0.36,1);
  }
  .reveal-scale.revealed {
    opacity: 1;
    transform: scale(1);
  }
  /* staggered children */
  .stagger > * { opacity: 0; transform: translateY(24px); transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1); }
  .stagger.revealed > *:nth-child(1) { opacity:1; transform:translateY(0); transition-delay: 0s; }
  .stagger.revealed > *:nth-child(2) { opacity:1; transform:translateY(0); transition-delay: 0.1s; }
  .stagger.revealed > *:nth-child(3) { opacity:1; transform:translateY(0); transition-delay: 0.2s; }
  .stagger.revealed > *:nth-child(4) { opacity:1; transform:translateY(0); transition-delay: 0.3s; }
  .stagger.revealed > *:nth-child(5) { opacity:1; transform:translateY(0); transition-delay: 0.4s; }

  /* image parallax on scroll */
  .parallax-img {
    will-change: transform;
    transition: transform 0.1s linear;
  }

  /* quote block float */
  .quote-float {
    opacity: 0;
    transform: translateY(40px) scale(0.96);
    transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.25s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.25s;
  }
  .quote-float.revealed {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  /* line draw */
  .line-draw {
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s;
  }
  .line-draw.revealed {
    transform: scaleX(1);
  }
`;

export default function About() {
  // Refs for each animated element
  const badgeRef    = useReveal();
  const headingRef  = useReveal();
  const textRef     = useReveal();
  const btnRef      = useReveal();
  const imageRef    = useReveal();
  const quoteRef    = useReveal();
  const lineRef     = useReveal();
  const imgElRef    = useRef(null);
  const sectionRef  = useRef(null);

  // Subtle parallax on the main image while scrolling
  useEffect(() => {
    const img = imgElRef.current;
    const section = sectionRef.current;
    if (!img || !section) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = section.getBoundingClientRect();
          const viewH = window.innerHeight;
          const progress = (viewH - rect.top) / (viewH + rect.height);
          const shift = (progress - 0.5) * 40; // ±20px travel
          img.style.transform = `translateY(${shift}px) scale(1.08)`;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white pb-24 px-6 lg:px-16 pt-20 overflow-hidden"
    >
      <style>{revealStyles}</style>

      {/* Background Watermark */}
      <div className="absolute bottom-2 right-16 text-[180px] sm:text-[240px] font-black text-gray-100/60 tracking-widest select-none hidden lg:block z-0 uppercase font-sans">
        RMI
      </div>

      {/* Decorative Golden Lines */}
      <div className="absolute top-[28%] right-[42%] w-64 h-64 pointer-events-none z-0 hidden lg:block opacity-40">
        <div className="absolute w-full h-[1px] bg-[#E5A93C] -rotate-[35deg] origin-right" />
        <div className="absolute w-[1px] h-[120%] bg-[#E5A93C]/40 right-16 -top-10" />
      </div>

      {/* ================================================================
          MAIN CONTENT ROW
         ================================================================ */}
      <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">

        {/* LEFT: PHOTO & QUOTE */}
        <div
          ref={imageRef}
          className="reveal-left lg:col-span-7 lg:order-1 relative w-full h-[400px] sm:h-[480px] lg:h-[500px] flex items-end mt-8 lg:mt-0"
        >
          {/* Main image */}
          <div className="w-[85%] h-[92%] rounded-tl-[60px] rounded-br-[60px] overflow-hidden shadow-lg bg-gray-100 relative z-10 ml-0 mr-auto mb-4">
            <img
              ref={imgElRef}
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
              alt="Industrial Corporate Architecture"
              className="parallax-img w-full h-full object-cover object-center scale-[1.08]"
            />
          </div>

          {/* Floating Quote Block */}
          <div
            ref={quoteRef}
            className="quote-float absolute right-0 lg:right-6 bottom-0 w-[42%] bg-[#0A1828] text-white p-5 sm:p-8 lg:p-10 rounded-tl-[60px] rounded-br-[60px] flex flex-col justify-center shadow-2xl z-20"
          >
            <div className="text-[#E5A93C] text-4xl sm:text-5xl font-serif font-black leading-none select-none opacity-90">
              "
            </div>
            <p className="text-[12px] sm:text-[15px] lg:text-[17px] font-extrabold tracking-wider text-white uppercase leading-[1.35] mt-3">
              QUALITY <br />
              THAT BUILDS <br />
              A STRONGER <br />
              TOMORROW
            </p>
            <div
              ref={lineRef}
              className="line-draw w-12 h-[1px] bg-[#E5A93C]/60 mt-6"
            />
          </div>
        </div>

        {/* RIGHT: BRAND CONTENT */}
        <div className="lg:col-span-5 lg:order-2 flex flex-col justify-center">

          <span
            ref={badgeRef}
            className="reveal text-[13px] font-bold tracking-[0.2em] text-[#E5A93C] uppercase"
          >
            ABOUT US
          </span>

          <h2
            ref={headingRef}
            className="reveal text-[28px] sm:text-[36px] lg:text-[42px] font-extrabold text-[#0A1828] leading-[1.15] uppercase mt-3 tracking-tight"
            style={{ transitionDelay: '0.08s' }}
          >
            BUILT ON TRUST,<br />
            FOCUSED ON QUALITY
          </h2>

          <div
            ref={textRef}
            className="stagger mt-6 space-y-5 text-gray-500 text-[15px] font-medium leading-relaxed max-w-xl"
            style={{ transitionDelay: '0.16s' }}
          >
            <p className="tracking-wide">
              Ritvik Metal Impex is one of the fastest growing companies in the premium Iron and Steel industry. We are a leading supplier of Stainless Steel, Carbon Steel and High Nickel Alloy products.
            </p>
            <p className="tracking-wide">
              Our commitment to excellence, quality and customer satisfaction makes us your go-to partner for all your industrial needs.
            </p>
          </div>

          <div
            ref={btnRef}
            className="reveal mt-8"
            style={{ transitionDelay: '0.24s' }}
          >
            <button className="bg-[#0A1828] hover:bg-[#11253c] text-white text-[11px] font-bold tracking-[0.2em] px-7 py-3.5 uppercase flex items-center gap-6 transition-all rounded-[3px] shadow-sm cursor-pointer group">
              <span>KNOW MORE</span>
              <span className="text-[#E5A93C] text-sm transform transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}