import { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import AnimatedSection from "../components/AnimatedSection";
import Seo from "../components/Seo";
import { site, absoluteUrl, breadcrumbSchema } from "../data/siteConfig";

export default function ProductsPage() {
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

  return (
    <>
      <Seo
        title="Industrial Metal Products | Stainless Steel, Copper & Brass Catalogue — Ritvik Metal Impex"
        description="Browse 22 product categories: stainless steel pipes & tubes, buttweld and forged fittings, flanges, bars, sheets, valves, fasteners, plus copper tubes, brass rods and enameled winding wire. Mumbai stockist and exporter with Mill Test Certificates."
        keywords="industrial metal products, stainless steel supplier Mumbai, ss pipe fittings stockist, flanges supplier India, copper tube supplier, brass rod supplier, nickel alloy stockist, metal exporter India"
        path="/products"
        image="/images/products/pipes-tubes.jpg"
        schema={schema}
      />

    <section className="bg-white min-h-screen py-20 px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto">

        <AnimatedSection animation="fadeUp" className="text-center mb-16">
          <span className="text-[#E5A93C] font-bold tracking-[0.25em] uppercase text-sm">Industrial Catalogue</span>
          <h1 className="text-5xl lg:text-6xl font-black text-[#0A1828] mt-4 uppercase">
            Stainless Steel &amp; Non-Ferrous Metal Products
          </h1>
          <div className="w-20 h-[2px] bg-[#E5A93C] mx-auto mt-6" />
          <p className="max-w-3xl mx-auto text-gray-500 mt-8 leading-relaxed">
            Our complete ferrous and non-ferrous range — pipes and tubes, buttweld and forged fittings,
            flanges, bars, sheets, valves, fasteners, and copper, brass and nickel alloy products —
            supplied ex-Mumbai with Mill Test Certificates and third-party inspection support.
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
              <Link
                to={`/products/${product.slug}`}
                className="group block bg-white rounded-tl-[50px] rounded-br-[50px] overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-shadow duration-500 h-full">
                <div className="h-[260px] overflow-hidden bg-gray-100">
                  <img src={product.image}
                    alt={`${product.material} ${product.name} — ${site.name}, Mumbai`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading={index < 4 ? "eager" : "lazy"} decoding="async"
                    onError={(e) => { e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-gray-300 uppercase tracking-widest text-sm">Product Image</span></div>'; }} />
                </div>
                <div className="p-6">
                  <span className="text-[#E5A93C] text-xs font-black tracking-[0.2em] uppercase">{product.material}</span>
                  <h2 className="text-xl font-black text-[#0A1828] uppercase mt-3">{product.name}</h2>
                  <p className="text-gray-500 mt-3 text-sm line-clamp-2">{product.description}</p>
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
          <p className="text-center text-gray-400 py-16">
            No products match that filter. <Link to="/products" className="text-[#E5A93C] font-bold">View the full catalogue</Link>.
          </p>
        )}

      </div>
    </section>
    </>
  );
}
