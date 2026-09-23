/**
 * Grade × form combinations.
 *
 * "duplex 2205 pipe supplier" and "ss 316 flanges supplier" are how buyers
 * search. The grade pages cover the metal and the product pages cover the form,
 * but nothing targeted the intersection, which is where the commercial intent
 * actually sits.
 *
 * A combination is published ONLY when it clears three tests, because a
 * near-duplicate page is worse than no page:
 *
 *   1. We stock the grade in that form (the grade's own productIds say so).
 *   2. A governing standard exists for that exact pairing — this is the unique
 *      technical payload, and the reason the page is not a template fill.
 *   3. There are specification tables for the material and form.
 *
 * Valves fail test 2: our standards lists carry no valve specification, so no
 * valve combination is generated rather than shipping a page with nothing
 * specific to say.
 */
import { grades } from './grades.js';
import { products } from './products.js';

/** Form name as it appears on products -> URL slug and display wording. */
export const FORM_SLUGS = {
  Pipes: { slug: 'pipes', label: 'Pipes & Tubes', singular: 'pipe' },
  Tubes: { slug: 'tubes', label: 'Tubes', singular: 'tube' },
  Fittings: { slug: 'fittings', label: 'Fittings', singular: 'fitting' },
  Flanges: { slug: 'flanges', label: 'Flanges', singular: 'flange' },
  Sheets: { slug: 'sheets-plates', label: 'Sheets, Plates & Coils', singular: 'plate' },
  Bars: { slug: 'bars', label: 'Bars & Rods', singular: 'bar' },
  Fasteners: { slug: 'fasteners', label: 'Fasteners', singular: 'fastener' },
  Sections: { slug: 'channels-angles', label: 'Channels & Angles', singular: 'section' },
};

/*
 * Which words in a standard's "covers" text mean which form. Deriving the
 * pairing from the grade's own standards list keeps one source of truth — hand
 * writing ~50 grade/form standard entries would drift the first time a
 * specification changed.
 */
const FORM_KEYWORDS = {
  Pipes: ['pipe'],
  Tubes: ['tube'],
  Fittings: ['fitting'],
  Flanges: ['flange'],
  Sheets: ['plate', 'sheet', 'strip', 'coil'],
  Bars: ['bar', 'rod', 'billet'],
  Fasteners: ['nut', 'bolt'],
  Sections: ['shape'],
};

/** The standards from a grade's list that govern a given form. */
export const standardsForForm = (grade, form) => {
  const words = FORM_KEYWORDS[form] ?? [];
  return grade.standards.filter(([, covers]) =>
    words.some((w) => covers.toLowerCase().includes(w)),
  );
};

/** Products of this form that the grade is supplied in. */
export const productsForGradeForm = (grade, form) =>
  products.filter((p) => p.form === form && grade.productIds.includes(p.id));

/**
 * Every publishable combination. Built once at module load and reused by the
 * router, the sitemap generator and the internal-link builders, so the three
 * can never disagree about which pages exist.
 */
export const gradeForms = grades.flatMap((grade) =>
  Object.keys(FORM_SLUGS)
    .map((form) => ({
      grade,
      form,
      ...FORM_SLUGS[form],
      standards: standardsForForm(grade, form),
      items: productsForGradeForm(grade, form),
    }))
    /* Tests 1 and 2 from the comment above. Test 3 is enforced on the page,
     * which renders the shared specification tables for the material and form. */
    .filter((c) => c.items.length > 0 && c.standards.length > 0)
    .map((c) => ({
      ...c,
      path: `/grades/${c.grade.slug}/${c.slug}`,
      title: `${c.grade.shortName} ${c.label}`,
    })),
);

export const gradeFormBy = (gradeSlug, formSlug) =>
  gradeForms.find((c) => c.grade.slug === gradeSlug && c.slug === formSlug) ?? null;

/** Combinations available for a grade — used for cross-links on its page. */
export const formsForGrade = (gradeSlug) =>
  gradeForms.filter((c) => c.grade.slug === gradeSlug);
