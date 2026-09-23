import { useState } from 'react';

/**
 * Renders the technical specification tables for a product as a tabbed panel.
 *
 * Every table stays in the DOM (hidden panels use `hidden`, not conditional
 * rendering) so crawlers index all of the specification content even though
 * only one tab is visible — the data is the SEO asset here.
 */
export default function SpecTables({ tables = [], productName = '' }) {
  const [active, setActive] = useState(0);
  if (!tables.length) return null;

  return (
    <section id="technical-specifications" className="scroll-mt-36">
      <header className="mb-8">
        <span className="text-[11px] font-black tracking-[0.3em] text-[#E5A93C] uppercase">
          Technical Data
        </span>
        <h2 className="text-[26px] sm:text-[32px] font-black text-[#0A1828] uppercase mt-3 leading-tight">
          {productName} Specifications
        </h2>
        <div className="w-16 h-[2px] bg-[#E5A93C] mt-5" />
      </header>

      {/* Tabs */}
      <div role="tablist" aria-label="Technical specifications" className="flex flex-wrap gap-2 mb-8">
        {tables.map((table, i) => (
          <button
            key={table.id}
            role="tab"
            type="button"
            id={`spec-tab-${table.id}`}
            aria-selected={active === i}
            aria-controls={`spec-panel-${table.id}`}
            onClick={() => setActive(i)}
            className={`px-5 py-3 text-[11px] font-black uppercase tracking-[0.12em] transition-all duration-200 rounded-tl-[14px] rounded-br-[14px] ${
              active === i
                ? 'bg-[#0A1828] text-white shadow-lg'
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-[#0A1828]'
            }`}
          >
            {table.title}
          </button>
        ))}
      </div>

      {tables.map((table, i) => (
        <div
          key={table.id}
          role="tabpanel"
          id={`spec-panel-${table.id}`}
          aria-labelledby={`spec-tab-${table.id}`}
          hidden={active !== i}
        >
          {/* Heading kept in the DOM for every panel — crawlers read them all */}
          <h3 className="sr-only">{`${productName} — ${table.title}`}</h3>

          <div className="overflow-x-auto rounded-tl-[22px] rounded-br-[22px] border border-gray-200 shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">
                {`${table.title} for ${productName} supplied by Ritvik Metal Impex`}
              </caption>
              <thead>
                <tr className="bg-[#0A1828]">
                  {table.columns.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="text-white text-[10px] sm:text-[11px] font-black uppercase tracking-[0.1em] px-4 sm:px-5 py-4 whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row, r) => (
                  <tr key={r} className={r % 2 ? 'bg-gray-50' : 'bg-white'}>
                    {row.map((cell, c) => (
                      <td
                        key={c}
                        className={`px-4 sm:px-5 py-3.5 text-[13px] sm:text-[14px] align-top border-t border-gray-100 ${
                          c === 0 ? 'font-bold text-[#0A1828] whitespace-nowrap' : 'text-gray-600'
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {table.note && (
            <p className="text-[13px] text-gray-500 leading-relaxed mt-4 max-w-4xl">
              <span className="font-bold text-[#0A1828]">Note: </span>
              {table.note}
            </p>
          )}
        </div>
      ))}

      <p className="text-[12px] text-gray-400 leading-relaxed mt-6 max-w-4xl border-t border-gray-100 pt-5">
        Values shown are the specified minima and maxima published in the governing standards and
        are given for guidance. The mill test certificate supplied with your consignment reports the
        actual results for that heat.
      </p>
    </section>
  );
}
