import { useState } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
import { Link, useSearchParams } from "react-router-dom";
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
import { products } from "../data/products";
import { getPriceRange, formatPriceRange } from '../data/pricing';
import AnimatedSection from "../components/AnimatedSection";
import Seo from "../components/Seo";
<<<<<<< HEAD
import { site, absoluteUrl, breadcrumbSchema } from "../data/siteConfig";

export default function ProductsPage() {
  const [materialFilter, setMaterialFilter] = useState("All");
  const [formFilter, setFormFilter] = useState("All");
=======
import CTABand from "../components/CTABand";
import RelatedLinks from "../components/RelatedLinks";
import { browseClusters } from "../data/internalLinks";
import { site, absoluteUrl, breadcrumbSchema } from "../data/site";

export default function ProductsPage() {
  /*
   * Filters live in the URL so "/products?material=Copper" is a real,
   * linkable, crawlable page. The internal-link clusters in the footer and on
   * product pages point here; without this they would all land on an unfiltered
   * catalogue and the links would be meaningless.
   */
  const [searchParams, setSearchParams] = useSearchParams();
  const materialFilter = searchParams.get("material") || "All";
  const formFilter = searchParams.get("form") || "All";
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
  const [search, setSearch] = useState("");

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value === "All") next.delete(key);
    else next.set(key, value);
    setSearchParams(next, { replace: true });
  };

  const materials = ["All","Stainless Steel","Carbon Steel","Alloy Steel","Duplex Steel","Nickel Alloys","Copper","Brass"];
  const forms = ["All","Pipes","Tubes","Sheets","Plates","Bars","Flanges","Fittings","Fasteners","Valves","Wire","Profiles"];

  const filteredProducts = products.filter((product) => {
    const matchesMaterial = materialFilter === "All" || product.material === materialFilter;
    const matchesForm = formFilter === "All" || product.form === formFilter;
    const term = search.trim().toLowerCase();
    const matchesSearch =
      !term ||
      product.name.toLowerCase().includes(term) ||
      product.material.toLowerCase().includes(term) ||
      product.form.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term);
    return matchesMaterial && matchesForm && matchesSearch;
  });

<<<<<<< HEAD
  const schema = [
    {
      "@type": "CollectionPage",
      "@id": `${site.url}/products#collection`,
      name: "Industrial Metal Products — Ferrous & Non-Ferrous Catalogue",
      description:
        "Complete catalogue of stainless steel, carbon steel, alloy steel, duplex, nickel alloy, copper and brass products supplied by Ritvik Metal Impex, Mumbai.",
      url: `${site.url}/products`,
      isPartOf: { "@id": `${site.url}/#website` },
    },
    {
      "@type": "ItemList",
      "@id": `${site.url}/products#catalogue`,
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: absoluteUrl(`/products/${p.slug}`),
        name: `${p.material} ${p.name}`,
      })),
    },
    breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Products", path: "/products" },
    ]),
  ];
=======
  const catalogueSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Industrial Metal Products Catalogue",
    description:
      "Complete catalogue of ferrous and non-ferrous industrial metal products supplied by Ritvik Metal Impex, Mumbai.",
    url: absoluteUrl("/products"),
    inLanguage: site.language,
    isPartOf: { "@id": `${site.url}/#website` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: products.length,
      itemListElement: products.map((product, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: `${product.material} ${product.name}`,
        url: absoluteUrl(`/products/${product.id}`),
      })),
    },
  };

  const crumbs = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
  ]);

  /*
   * Faceted navigation handling. A single facet ("all our copper products") is
   * a genuine landing page and gets its own title, description and self
   * canonical. Combining facets produces thin, near-duplicate permutations, so
   * those canonicalise back to /products and are left out of the index.
   */
  const activeFacets = [materialFilter, formFilter].filter((f) => f !== "All");
  const singleFacet = activeFacets.length === 1;
  const multiFacet = activeFacets.length > 1;

  const facetPath = singleFacet
    ? `/products?${materialFilter !== "All" ? `material=${encodeURIComponent(materialFilter)}` : `form=${encodeURIComponent(formFilter)}`}`
    : "/products";

  const facetTitle = singleFacet
    ? `${activeFacets[0]} Products — Supplier in Mumbai`
    : "Industrial Metal Products — Pipes, Fittings & Flanges";

  const facetDescription = singleFacet
    ? `${activeFacets[0]} products supplied and stocked by Ritvik Metal Impex, Mumbai — ${filteredProducts
        .map((p) => p.name)
        .slice(0, 6)
        .join(", ")}. Mill test certificates and pan-India delivery.`
    : "Browse the full Ritvik Metal Impex catalogue: stainless steel, carbon steel, alloy, duplex and nickel alloy pipes, buttweld and forged fittings, flanges, sheets, plates, coils, bars, flats, fasteners and valves, plus copper tubes, strips, wires and brass rods.";
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914

  return (
    <>
      <Seo
<<<<<<< HEAD
        title="Industrial Metal Products | Stainless Steel, Copper & Brass Catalogue — Ritvik Metal Impex"
        description="Browse 22 product categories: stainless steel pipes & tubes, buttweld and forged fittings, flanges, bars, sheets, valves, fasteners, plus copper tubes, brass rods and enameled winding wire. Mumbai stockist and exporter with Mill Test Certificates."
        keywords="industrial metal products, stainless steel supplier Mumbai, ss pipe fittings stockist, flanges supplier India, copper tube supplier, brass rod supplier, nickel alloy stockist, metal exporter India"
        path="/products"
        image="/images/products/pipes-tubes.jpg"
        schema={schema}
=======
        title={facetTitle}
        description={facetDescription}
        keywords="stainless steel products supplier, pipe fittings flanges supplier Mumbai, stainless steel sheet plate coil supplier, copper tube brass rod supplier India, duplex nickel alloy stockist, industrial metal catalogue India"
        path={facetPath}
        noindex={multiFacet}
        image="/images/products/pipes-tubes.jpg"
        schema={[catalogueSchema, crumbs]}
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
      />

    <section className="bg-white min-h-screen py-20 px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto">

        <AnimatedSection animation="fadeUp" className="text-center mb-16">
          <span className="text-[#E5A93C] font-bold tracking-[0.25em] uppercase text-sm">Industrial Catalogue</span>
<<<<<<< HEAD
          <h1 className="text-5xl lg:text-6xl font-black text-[#0A1828] mt-4 uppercase">
            Stainless Steel &amp; Non-Ferrous Metal Products
          </h1>
          <div className="w-20 h-[2px] bg-[#E5A93C] mx-auto mt-6" />
          <p className="max-w-3xl mx-auto text-gray-500 mt-8 leading-relaxed">
            Our complete ferrous and non-ferrous range — pipes and tubes, buttweld and forged fittings,
            flanges, bars, sheets, valves, fasteners, and copper, brass and nickel alloy products —
            supplied ex-Mumbai with Mill Test Certificates and third-party inspection support.
=======
          <h1 className="text-4xl lg:text-6xl font-black text-[#0A1828] mt-4 uppercase leading-[1.1]">
            Industrial Metal Products
          </h1>
          <div className="w-20 h-[2px] bg-[#E5A93C] mx-auto mt-6" />
          <p className="max-w-3xl mx-auto text-gray-500 mt-8 leading-relaxed">
            Explore our complete range of ferrous and non-ferrous industrial metal products —
            stainless steel, carbon steel, alloy steel, duplex, nickel alloys, copper and brass —
            supplied from Mumbai across India and worldwide with mill test certificates.
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
          </p>
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={100} className="mb-10">
          <input type="text" placeholder="Search products..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-full px-6 py-4 outline-none focus:border-[#E5A93C] transition-colors" />
        </AnimatedSection>

        <AnimatedSection animation="fadeUp" delay={150} className="space-y-6 mb-16">
          <div>
            <p className="font-bold text-[#0A1828] mb-3 uppercase text-sm tracking-widest">Material</p>
            <div className="flex flex-wrap gap-3">
              {materials.map((material) => (
                <button key={material} onClick={() => setFilter("material", material)}
                  className={`px-5 py-3 rounded-full text-sm font-bold transition-all duration-200 ${materialFilter === material ? "bg-[#0A1828] text-white" : "bg-gray-100 hover:bg-gray-200"}`}>
                  {material}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="font-bold text-[#0A1828] mb-3 uppercase text-sm tracking-widest">Product Form</p>
            <div className="flex flex-wrap gap-3">
              {forms.map((form) => (
                <button key={form} onClick={() => setFilter("form", form)}
                  className={`px-5 py-3 rounded-full text-sm font-bold transition-all duration-200 ${formFilter === form ? "bg-[#E5A93C] text-white" : "bg-gray-100 hover:bg-gray-200"}`}>
                  {form}
                </button>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <AnimatedSection key={product.id} animation="scaleUp" delay={index * 60}>
              <Link
<<<<<<< HEAD
                to={`/products/${product.slug}`}
                className="group block bg-white rounded-tl-[50px] rounded-br-[50px] overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-shadow duration-500 h-full">
                <div className="h-[260px] overflow-hidden bg-gray-100">
                  <img src={product.image}
                    alt={`${product.material} ${product.name} — ${site.name}, Mumbai`}
=======
                to={`/products/${product.id}`}
                className="group block bg-white rounded-tl-[50px] rounded-br-[50px] overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-shadow duration-500 h-full">
                <div className="h-[260px] overflow-hidden bg-gray-100">
                  <img src={product.image} alt={`${product.material} ${product.name} supplier and stockist in Mumbai, India`}
                    loading={index < 4 ? "eager" : "lazy"}
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading={index < 4 ? "eager" : "lazy"} decoding="async"
                    onError={(e) => { e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-gray-300 uppercase tracking-widest text-sm">Product Image</span></div>'; }} />
                </div>
                <div className="p-6">
                  <span className="text-[#E5A93C] text-xs font-black tracking-[0.2em] uppercase">{product.material}</span>
                  <h2 className="text-xl font-black text-[#0A1828] uppercase mt-3">{product.name}</h2>
                  <p className="text-gray-500 mt-3 text-sm line-clamp-2">{product.description}</p>
                  {/* Only ever rendered for a verified range — see src/data/pricing.js */}
                  {getPriceRange(product) && (
                    <p className="mt-4 text-[#0A1828] font-black text-lg">
                      {formatPriceRange(getPriceRange(product))}
                      <span className="block text-[11px] font-semibold tracking-wide text-gray-400 uppercase mt-0.5">
                        Indicative
                      </span>
                    </p>
                  )}
                  <div className="flex items-center gap-3 mt-6">
                    <span className="font-black uppercase text-xs tracking-widest">View Details</span>
                    <span className="text-[#E5A93C] group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        {filteredProducts.length === 0 && (
<<<<<<< HEAD
          <p className="text-center text-gray-400 py-16">
            No products match that filter. <Link to="/products" className="text-[#E5A93C] font-bold">View the full catalogue</Link>.
          </p>
        )}

      </div>
    </section>
=======
          <p className="text-center text-gray-500 py-16">
            No products match those filters. Try a different material or product form.
          </p>
        )}

        {/* SEO copy — describes the catalogue in the language buyers actually search with */}
        <div className="mt-24 border-t border-gray-100 pt-14 max-w-4xl">
          <h2 className="text-2xl font-black text-[#0A1828] uppercase">
            Ferrous &amp; Non-Ferrous Metal Supplier in Mumbai
          </h2>
          <div className="w-12 h-[2px] bg-[#E5A93C] mt-4 mb-6" />
          <p className="text-gray-600 text-[15px] leading-[1.85]">
            Ritvik Metal Impex is a Mumbai-based supplier, stockist and exporter of industrial
            metal products. Our ferrous range covers stainless steel, carbon steel, alloy steel,
            duplex and super duplex and nickel alloy pipes and tubes, buttweld and forged fittings,
            flanges, sheets, plates and coils, round, square and hex bars, flats, fasteners, valves,
            dairy fittings and electro-polished fittings. Our non-ferrous range covers copper tubes
            and sections, copper strips and profiles, copper wires, super enamelled copper wire,
            brass tubes and brass rods.
          </p>
          <p className="text-gray-600 text-[15px] leading-[1.85] mt-4">
            Material is supplied to ASTM, ASME, EN and IS standards with mill test certificates
            traceable to the heat number, IBR certification where the application requires it, and
            third-party inspection support from agencies including Bureau Veritas, TÜV, DNV, SGS
            and Lloyd&apos;s Register. We deliver across {site.areasServed.slice(0, 9).join(', ')} and
            export to the Middle East, Europe, the USA and South East Asia.
          </p>
        </div>

        <RelatedLinks
          clusters={browseClusters()}
          title="Browse the Catalogue"
          className="mt-24"
        />

      </div>
    </section>

    <CTABand
      eyebrow="Request a Quote"
      title="Tell us the grade, size and quantity — we will price it today"
      body="Send your enquiry, drawing or line list. We confirm stock position, grade options and a firm price, with mill test certificates as standard and third-party inspection where your project requires it."
      whatsappMessage="Hi, I would like a quote for products from your catalogue."
    />
>>>>>>> 44a93c1066d3219f4c6feeec5dced53432d90914
    </>
  );
}
