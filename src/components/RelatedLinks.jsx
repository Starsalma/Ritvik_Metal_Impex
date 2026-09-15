import { Link } from 'react-router-dom';

/**
 * Renders internal link clusters built by src/data/internalLinks.js.
 * Real <Link> elements, not click handlers on divs, so every one of these is a
 * crawlable href.
 */
export default function RelatedLinks({ clusters = [], title = 'Explore More', className = '' }) {
  if (!clusters.length) return null;

  return (
    <nav aria-label={title} className={`border-t border-gray-100 pt-12 ${className}`}>
      <h2 className="text-[13px] font-black tracking-[0.25em] text-[#0A1828] uppercase mb-2">
        {title}
      </h2>
      <div className="w-10 h-[2px] bg-[#E5A93C] mb-9" />

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
        {clusters.map((cluster) => (
          <div key={cluster.heading}>
            <h3 className="text-[11px] font-black tracking-[0.2em] text-[#E5A93C] uppercase mb-4">
              {cluster.heading}
            </h3>
            <ul className="space-y-2.5">
              {cluster.links.map((link) => (
                <li key={link.to + link.label}>
                  <Link
                    to={link.to}
                    className="group flex items-baseline gap-2 text-[14px] text-gray-600 hover:text-[#0A1828] transition-colors"
                  >
                    <span className="text-[#E5A93C] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                      →
                    </span>
                    <span className="-ml-[18px] group-hover:ml-0 transition-all duration-200">
                      <span className="font-semibold">{link.label}</span>
                      {link.sub && (
                        <span className="text-gray-400 text-[12px] ml-2">{link.sub}</span>
                      )}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </nav>
  );
}
