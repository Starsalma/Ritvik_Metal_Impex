/**
 * Indicative price ranges.
 *
 * ---------------------------------------------------------------------------
 * READ THIS BEFORE PUBLISHING ANY OF IT
 * ---------------------------------------------------------------------------
 * Every range below is an UNVERIFIED PLACEHOLDER. They were written to give the
 * feature a working shape and realistic column widths — they are NOT quotes,
 * they were not supplied by Ritvik Metal Impex, and they must not be trusted.
 *
 * Nothing renders until you set `verified: true` on an entry. That is
 * deliberate: an entry is published only once a person who knows the real
 * number has looked at it. Flip them one at a time as you confirm each line.
 *
 * To publish a product's price:
 *   1. Replace `min` and `max` with your own figures.
 *   2. Check `unit` and `basis` describe how you actually quote that line.
 *   3. Set `verified: true`.
 *   4. Update PRICE_AS_OF to the date you checked.
 *
 * `npm run check:prices` lists everything still unverified.
 *
 * Keep PRICE_AS_OF current. A visible, honest "as of" date is what makes an
 * indicative range trustworthy rather than a liability — a stale price either
 * costs you credibility or forces you to honour a number you did not mean.
 */

/** Date the ranges below were last reviewed. Shown to buyers next to the price. */
export const PRICE_AS_OF = '2026-09-17';

/** How long Google should treat a published price as current (ISO date). */
export const PRICE_VALID_UNTIL = '2026-12-31';

export const PRICE_CURRENCY = 'INR';
export const PRICE_CURRENCY_SYMBOL = '₹';

/**
 * Shown wherever a price appears. Says plainly what the number is and is not,
 * which is the difference between a useful signal and a misleading one.
 */
export const PRICE_DISCLAIMER =
  'Indicative only. Alloy surcharges move with the market, and the final rate depends on grade, size, schedule, quantity and delivery terms. Send your specification for a firm quotation.';

/**
 * Keyed by product id (see src/data/products.js).
 *
 * min / max  — numeric, in PRICE_CURRENCY
 * unit       — what the price is per ('kg', 'metre', 'piece')
 * basis      — the commercial basis, shown in the tooltip/footnote
 * verified   — MUST be true for the range to appear anywhere on the site
 */
export const priceRanges = {
  1:  { min: 220,  max: 460,   unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  2:  { min: 340,  max: 620,   unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  3:  { min: 400,  max: 780,   unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  4:  { min: 340,  max: 680,   unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  5:  { min: 480,  max: 920,   unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  6:  { min: 200,  max: 380,   unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  7:  { min: 340,  max: 820,   unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  8:  { min: 1200, max: 26000, unit: 'piece', basis: 'Ex-works Mumbai',  verified: false },
  9:  { min: 200,  max: 340,   unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  10: { min: 540,  max: 1050,  unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  11: { min: 820,  max: 1120,  unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  12: { min: 640,  max: 880,   unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  13: { min: 600,  max: 800,   unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  14: { min: 840,  max: 1180,  unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  15: { min: 840,  max: 1140,  unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  16: { min: 790,  max: 1020,  unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  17: { min: 880,  max: 1200,  unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  18: { min: 340,  max: 620,   unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  19: { min: 700,  max: 1450,  unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  20: { min: 150,  max: 420,   unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  21: { min: 200,  max: 340,   unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
  22: { min: 1800, max: 6800,  unit: 'kg',    basis: 'Ex-works Mumbai',  verified: false },
};

/**
 * The range to display for a product, or null when there is nothing safe to
 * show. Callers render nothing on null — the page reads exactly as it does
 * today, so an unverified or missing entry can never leak a number.
 */
export const getPriceRange = (product) => {
  const entry = priceRanges[product?.id];
  if (!entry || !entry.verified) return null;
  if (!Number.isFinite(entry.min) || !Number.isFinite(entry.max)) return null;
  return entry;
};

const inr = (value) => `${PRICE_CURRENCY_SYMBOL}${value.toLocaleString('en-IN')}`;

/** "₹220 – ₹460 / kg", or "₹1,200 / piece" when both ends are the same. */
export const formatPriceRange = (range) => {
  if (!range) return '';
  const amount = range.min === range.max ? inr(range.min) : `${inr(range.min)} – ${inr(range.max)}`;
  return `${amount} / ${range.unit}`;
};

/**
 * schema.org AggregateOffer.
 *
 * A bare Offer needs a single `price`; a range needs AggregateOffer with
 * lowPrice and highPrice. Both are valid for Google's Product rich result, and
 * this is the only form that is honest about a quoted-per-order product.
 * Returns null for an unverified product, which keeps the Product node
 * offer-less and still valid.
 */
export const priceOfferSchema = (product, url) => {
  const range = getPriceRange(product);
  if (!range) return null;
  return {
    '@type': 'AggregateOffer',
    priceCurrency: PRICE_CURRENCY,
    lowPrice: range.min,
    highPrice: range.max,
    offerCount: 1,
    unitText: range.unit,
    priceValidUntil: PRICE_VALID_UNTIL,
    availability: 'https://schema.org/InStock',
    itemCondition: 'https://schema.org/NewCondition',
    url,
    eligibleQuantity: { '@type': 'QuantitativeValue', minValue: 5, unitCode: 'KGM' },
  };
};
