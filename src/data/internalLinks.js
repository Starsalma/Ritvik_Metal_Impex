/**
 * Internal linking model.
 *
 * The catalogue is flat (22 products, one blog index), which leaves product
 * pages linked only from /products. These helpers build the sideways links —
 * material siblings, form siblings, guides that cover the product — so every
 * page passes authority to its neighbours and crawlers can reach any product
 * in two hops from anywhere on the site.
 */
import { products } from './products';
import { articles } from './articles';

/** Distinct material families present in the catalogue, in catalogue order. */
export const materials = [...new Set(products.map((p) => p.material))];

/** Distinct product forms present in the catalogue. */
export const forms = [...new Set(products.map((p) => p.form))];

export const byMaterial = (material) => products.filter((p) => p.material === material);
export const byForm = (form) => products.filter((p) => p.form === form);

/** Guides whose relatedProductIds include this product. */
export const guidesForProduct = (productId) =>
  articles.filter((a) => a.relatedProductIds?.includes(productId));

/** Products referenced by a guide. */
export const productsForGuide = (article) =>
  products.filter((p) => article?.relatedProductIds?.includes(p.id));

/**
 * Builds the link clusters shown at the foot of a product page.
 * Each cluster is { heading, links: [{ label, to, sub }] }.
 */
export function productLinkClusters(product) {
  if (!product) return [];

  const clusters = [];

  const materialSiblings = byMaterial(product.material).filter((p) => p.id !== product.id);
  if (materialSiblings.length) {
    clusters.push({
      heading: `More in ${product.material}`,
      links: materialSiblings.slice(0, 6).map((p) => ({
        label: p.name,
        to: `/products/${p.id}`,
        sub: p.form,
      })),
    });
  }

  const formSiblings = byForm(product.form).filter(
    (p) => p.id !== product.id && p.material !== product.material,
  );
  if (formSiblings.length) {
    clusters.push({
      heading: `Other ${product.form}`,
      links: formSiblings.slice(0, 6).map((p) => ({
        label: p.name,
        to: `/products/${p.id}`,
        sub: p.material,
      })),
    });
  }

  const guides = guidesForProduct(product.id);
  if (guides.length) {
    clusters.push({
      heading: 'Technical guides',
      links: guides.slice(0, 6).map((a) => ({
        label: a.title,
        to: `/blog/${a.slug}`,
        sub: a.category,
      })),
    });
  }

  return clusters;
}

/** Cross-links for an article: the products it covers plus sibling guides. */
export function articleLinkClusters(article) {
  if (!article) return [];

  const clusters = [];

  const covered = productsForGuide(article);
  if (covered.length) {
    clusters.push({
      heading: 'Products in this guide',
      links: covered.slice(0, 6).map((p) => ({
        label: p.name,
        to: `/products/${p.id}`,
        sub: p.material,
      })),
    });
  }

  const sameCategory = articles.filter(
    (a) => a.category === article.category && a.slug !== article.slug,
  );
  const others = articles.filter(
    (a) => a.slug !== article.slug && !sameCategory.includes(a),
  );
  const related = [...sameCategory, ...others].slice(0, 5);

  if (related.length) {
    clusters.push({
      heading: 'Related guides',
      links: related.map((a) => ({
        label: a.title,
        to: `/blog/${a.slug}`,
        sub: a.category,
      })),
    });
  }

  return clusters;
}

/** Material and form hubs — used in the footer and on the catalogue page. */
export function browseClusters() {
  return [
    {
      heading: 'Browse by material',
      links: materials.map((m) => ({
        label: m,
        to: `/products?material=${encodeURIComponent(m)}`,
        sub: `${byMaterial(m).length} products`,
      })),
    },
    {
      heading: 'Browse by form',
      links: forms.map((f) => ({
        label: f,
        to: `/products?form=${encodeURIComponent(f)}`,
        sub: `${byForm(f).length} products`,
      })),
    },
  ];
}
