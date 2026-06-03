import React from 'react';
import { Award, ShieldCheck, Users, Briefcase } from 'lucide-react';

const stats = [
  { id: 1, count: "10+",   label: "YEARS OF EXPERIENCE", icon: Award },
  { id: 2, count: "500+",  label: "PRODUCT VARIANTS",    icon: ShieldCheck },
  { id: 3, count: "1000+", label: "HAPPY CLIENTS",       icon: Users },
  { id: 4, count: "25+",   label: "INDUSTRIES SERVED",   icon: Briefcase },
];

export default function StatsBar() {
  return (
    <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12">
      <div className="bg-[#051124] text-white rounded-md shadow-2xl border border-gray-800/60 grid grid-cols-2 lg:grid-cols-4">
        {stats.map((item, index) => {
          const IconComponent = item.icon;

          // Border logic:
          // Mobile (2-col): right border on col 1 (index 0, 2), bottom border on top row (index 0, 1)
          // Desktop (4-col): right border on all except last
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
                  {item.count}
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