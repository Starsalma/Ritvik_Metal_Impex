/**
 * Alt text for a product image.
 *
 * Alt text describes the picture for someone who cannot see it. The previous
 * template — "<material> <name> supplier and stockist in Mumbai, India" —
 * described the business instead, and repeating the same location phrase across
 * 23 images is the shape of keyword stuffing rather than a description.
 *
 * Products photographed in our own stockyard carry hand-written alt text naming
 * what is in the frame. Everything else falls back to naming the product
 * plainly, which is honest about a stock image without pretending to describe
 * a specific scene.
 */
export const productImageAlt = (product) =>
  product?.imageAlt ?? `${product?.material ?? ''} ${(product?.name ?? '').toLowerCase()}`.trim();
