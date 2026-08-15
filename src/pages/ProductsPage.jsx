import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { products } from "../data/products";
import AnimatedSection from "../components/AnimatedSection";
import Seo from "../components/Seo";
import { site, absoluteUrl, breadcrumbSchema } from "../data/site";

export default function ProductsPage() {
  const navigate = useNavigate();
  const [materialFilter, setMaterialFilter] = useState("All");
  const [formFilter, setFormFilter] = useState("All");
  const [search, setSearch] = useState("");

  const materials = ["All","Stainless Steel","Carbon Steel","Alloy Steel","Duplex Steel","Nickel Alloys","Copper","Brass"];
  const forms = ["All","Pipes","Tubes","Sheets","Plates","Bars","Flanges","Fittings","Fasteners","Valves","Wire","Profiles"];

  const filteredProducts = products.filter((product) => {
    const matchesMaterial = materialFilter === "All" || product.material === materialFilter;
    const matchesForm = formFilter === "All" || product.form === formFilter;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesMaterial && matchesForm && matchesSearch;
  });

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

  return (
    <>
      <Seo
        title="Industrial Metal Products — Pipes, Fittings & Flanges"
        description="Browse the full Ritvik Metal Impex catalogue: stainless steel, carbon steel, alloy, duplex and nickel alloy pipes, buttweld and forged fittings, flanges, sheets, plates, coils, bars, flats, fasteners and valves, plus copper tubes, strips, wires and brass rods."
        keywords="stainless steel products supplier, pipe fittings flanges supplier Mumbai, stainless steel sheet plate coil supplier, copper tube brass rod supplier India, duplex nickel alloy stockist, industrial metal catalogue India"
        path="/products"
        image="/images/products/pipes-tubes.jpg"
        schema={[catalogueSchema, crumbs]}
      />

    <section className="bg-white min-h-screen py-20 px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto">

        <AnimatedSection animation="fadeUp" className="text-center mb-16">
          <span className="text-[#E5A93C] font-bold tracking-[0.25em] uppercase text-sm">Industrial Catalogue</span>
          <h1 className="text-4xl lg:text-6xl font-black text-[#0A1828] mt-4 uppercase leading-[1.1]">
            Industrial Metal Products
          </h1>
          <div className="w-20 h-[2px] bg-[#E5A93C] mx-auto mt-6" />
          <p className="max-w-3xl mx-auto text-gray-500 mt-8 leading-relaxed">
            Explore our complete range of ferrous and non-ferrous industrial metal products —
            stainless steel, carbon steel, alloy steel, duplex, nickel alloys, copper and brass —
            supplied from Mumbai across India and worldwide with mill test certificates.
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
                <button key={material} onClick={() => setMaterialFilter(material)}
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
                <button key={form} onClick={() => setFormFilter(form)}
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
              <div
                onClick={() => navigate(`/products/${product.id}`)}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/products/${product.id}`); }}
                className="group cursor-pointer bg-white rounded-tl-[50px] rounded-br-[50px] overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-shadow duration-500 h-full">
                <div className="h-[260px] overflow-hidden bg-gray-100">
                  <img src={product.image} alt={`${product.material} ${product.name} supplier and stockist in Mumbai, India`}
                    loading={index < 4 ? "eager" : "lazy"}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-gray-300 uppercase tracking-widest text-sm">Product Image</span></div>'; }} />
                </div>
                <div className="p-6">
                  <span className="text-[#E5A93C] text-xs font-black tracking-[0.2em] uppercase">{product.material}</span>
                  <h3 className="text-xl font-black text-[#0A1828] uppercase mt-3">{product.name}</h3>
                  <p className="text-gray-500 mt-3 text-sm line-clamp-2">{product.description}</p>
                  <div className="flex items-center gap-3 mt-6">
                    <span className="font-black uppercase text-xs tracking-widest">View Details</span>
                    <span className="text-[#E5A93C] group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {filteredProducts.length === 0 && (
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

      </div>
    </section>
    </>
  );
}
