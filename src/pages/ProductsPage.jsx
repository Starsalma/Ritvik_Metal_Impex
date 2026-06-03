import { useState } from "react";
import { products } from "../data/products";

export default function ProductsPage() {
  const [materialFilter, setMaterialFilter] = useState("All");
  const [formFilter, setFormFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = [
  "All",
  "Ferrous",
  "Non-Ferrous"
];

const materials = [
  "All",
  "Stainless Steel",
  "Carbon Steel",
  "Alloy Steel",
  "Duplex Steel",
  "Nickel Alloys",
  "Copper",
  "Brass"
];

const forms = [
  "All",
  "Pipes",
  "Tubes",
  "Sheets",
  "Plates",
  "Bars",
  "Flanges",
  "Fittings",
  "Fasteners",
  "Valves",
  "Wire",
  "Profiles"
];

  const filteredProducts = products.filter((product) => {
    const matchesMaterial =
      materialFilter === "All" ||
      product.material === materialFilter;

    const matchesForm =
      formFilter === "All" ||
      product.form === formFilter;

    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase());

    return matchesMaterial && matchesForm && matchesSearch;
  });

  return (
    <section className="bg-white min-h-screen py-20 px-6 lg:px-16">
      <div className="max-w-[1440px] mx-auto">

        {/* Header */}

        <div className="text-center mb-16">
          <span className="text-[#E5A93C] font-bold tracking-[0.25em] uppercase text-sm">
            Industrial Catalogue
          </span>

          <h1 className="text-5xl lg:text-6xl font-black text-[#0A1828] mt-4 uppercase">
            Our Products
          </h1>

          <div className="w-20 h-[2px] bg-[#E5A93C] mx-auto mt-6" />

          <p className="max-w-3xl mx-auto text-gray-500 mt-8">
            Explore our complete range of ferrous and non-ferrous
            industrial metal products.
          </p>
        </div>

        {/* Search */}

        <div className="mb-10">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border border-gray-200 rounded-full px-6 py-4 outline-none focus:border-[#E5A93C]"
          />
        </div>

        {/* Filters */}

        <div className="space-y-6 mb-16">

          <div>
            <p className="font-bold text-[#0A1828] mb-3 uppercase text-sm tracking-widest">
              Material
            </p>

            <div className="flex flex-wrap gap-3">
              {materials.map((material) => (
                <button
                  key={material}
                  onClick={() => setMaterialFilter(material)}
                  className={`px-5 py-3 rounded-full text-sm font-bold transition-all ${
                    materialFilter === material
                      ? "bg-[#0A1828] text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {material}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="font-bold text-[#0A1828] mb-3 uppercase text-sm tracking-widest">
              Product Form
            </p>

            <div className="flex flex-wrap gap-3">
              {forms.map((form) => (
                <button
                  key={form}
                  onClick={() => setFormFilter(form)}
                  className={`px-5 py-3 rounded-full text-sm font-bold transition-all ${
                    formFilter === form
                      ? "bg-[#E5A93C] text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {form}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="group cursor-pointer bg-white rounded-tl-[50px] rounded-br-[50px] overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-500"
            >
              <div className="h-[260px] bg-gray-100 flex items-center justify-center">
                <span className="text-gray-300 uppercase tracking-widest text-sm">
                  Product Image
                </span>
              </div>

              <div className="p-6">

                <span className="text-[#E5A93C] text-xs font-black tracking-[0.2em] uppercase">
                  {product.material}
                </span>

                <h3 className="text-xl font-black text-[#0A1828] uppercase mt-3">
                  {product.name}
                </h3>

                <p className="text-gray-500 mt-3 text-sm">
                  {product.description}
                </p>

                <div className="flex items-center gap-3 mt-6">
                  <span className="font-black uppercase text-xs tracking-widest">
                    View Details
                  </span>

                  <span className="text-[#E5A93C] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>

              </div>
            </div>
          ))}

        </div>

        {/* Modal */}

        {selectedProduct && (
          <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="
                  bg-white
                  max-w-6xl
                  w-full
                  rounded-tl-[80px]
                  rounded-br-[80px]
                  overflow-hidden
                  shadow-[0_30px_80px_rgba(0,0,0,0.25)]
                  relative
                "
            >
              <div className="grid lg:grid-cols-2">

                <div className="h-[500px] bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-300 uppercase tracking-widest">
                    Product Image
                  </span>
                </div>

                <div className="p-10">

                  <span className="text-[#E5A93C] font-black tracking-[0.2em] uppercase text-xs">
                    {selectedProduct.material}
                  </span>

                  <h2 className="text-4xl font-black text-[#0A1828] uppercase mt-3">
                    {selectedProduct.name}
                  </h2>

                  <p className="mt-6 text-gray-500 leading-relaxed">
                    {selectedProduct.description}
                  </p>

                  <div className="mt-10">
                    <h4 className="font-black uppercase text-[#0A1828] mb-4">
                      Available Forms
                    </h4>

                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-gray-100 rounded-full">
                        Pipes
                      </span>
                      <span className="px-4 py-2 bg-gray-100 rounded-full">
                        Tubes
                      </span>
                      <span className="px-4 py-2 bg-gray-100 rounded-full">
                        Sheets
                      </span>
                    </div>
                  </div>

                  <button className="mt-10 bg-[#0A1828] text-white px-8 py-4 uppercase font-bold tracking-widest">
                    Request Quote
                  </button>

                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}