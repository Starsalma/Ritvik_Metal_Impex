import React, { useEffect, useRef, useState } from 'react';
import { Award, ShieldCheck, Users, Briefcase } from 'lucide-react';

const stats = [
  { id: 1, value: 10,   suffix: "+", label: "YEARS OF EXPERIENCE", icon: Award },
  { id: 2, value: 500,  suffix: "+", label: "PRODUCT VARIANTS",    icon: ShieldCheck },
  { id: 3, value: 1000, suffix: "+", label: "HAPPY CLIENTS",       icon: Users },
  { id: 4, value: 25,   suffix: "+", label: "INDUSTRIES SERVED",   icon: Briefcase },
];

function useCountUp(target, start) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const duration = 1500;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };

    requestAnimationFrame(step);
  }, [start, target]);

  return count;
}

export default function StatsBar() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
      <div className="bg-[#051124] text-white rounded-md shadow-2xl border border-gray-800/60 grid grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => {
          const IconComponent = item.icon;
          const count = useCountUp(item.value, visible);

          const borderClasses = [
            index === 0 ? 'border-r border-b lg:border-b-0 lg:border-r' : '',
            index === 1 ? 'border-b lg:border-b-0 lg:border-r'          : '',
            index === 2 ? 'border-r lg:border-r'                         : '',
            index === 3 ? 'lg:border-r-0'                                : '',
          ].join(' ') + ' border-gray-800/80';

          return (
            <div
              key={item.id}
              className={`flex items-center justify-center gap-4 px-4 py-7 sm:px-6 sm:py-8 ${borderClasses}`}
            >
              <div className="bg-[#E5A93C]/10 p-3 rounded-full shrink-0">
                <IconComponent size={24} className="text-[#E5A93C] stroke-[1.5]" />
              </div>
              <div className="min-w-0">
                <div className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-none">
                  {count}{item.suffix}
                </div>
                <div className="text-[10px] sm:text-[11px] font-bold tracking-widest text-gray-400 mt-1 uppercase leading-tight">
                  {item.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
