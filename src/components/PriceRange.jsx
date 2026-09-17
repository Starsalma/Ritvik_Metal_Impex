import {
  getPriceRange,
  formatPriceRange,
  PRICE_AS_OF,
  PRICE_DISCLAIMER,
} from '../data/pricing';
import { MOQ } from '../data/specifications';

/**
 * Indicative price block for a product page.
 *
 * Renders nothing when the product has no verified range, so the page reads
 * exactly as it did before pricing existed. Never show a number without the
 * "as of" date and the disclaimer beside it — an undated price on a metals
 * site is a promise you did not mean to make.
 */
export default function PriceRange({ product }) {
  const range = getPriceRange(product);
  if (!range) return null;

  const asOf = new Date(PRICE_AS_OF).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="mt-8 border border-[#E5A93C]/40 bg-[#E5A93C]/[0.06] rounded-tl-[24px] rounded-br-[24px] p-6">
      <p className="text-[11px] font-black tracking-[0.16em] text-gray-500 uppercase">
        Indicative Price
      </p>

      <p className="text-[#0A1828] font-black text-3xl mt-2 leading-none">
        {formatPriceRange(range)}
      </p>

      <p className="text-[12px] text-gray-500 mt-3">
        {range.basis} · MOQ {MOQ} ·{' '}
        <span className="whitespace-nowrap">as of {asOf}</span>
      </p>

      <p className="text-[12px] text-gray-500 leading-relaxed mt-3 pt-3 border-t border-[#E5A93C]/25">
        {PRICE_DISCLAIMER}
      </p>
    </div>
  );
}
