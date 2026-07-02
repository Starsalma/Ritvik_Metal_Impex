import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import AnimatedSection from '../components/AnimatedSection';

export default function BlogPage() {
  const navigate = useNavigate();

  return (
    <section className="bg-white min-h-screen py-20 px-6 lg:px-16">
      <div className="max-w-[1200px] mx-auto">

        <AnimatedSection animation="fadeUp" className="text-center mb-16">
          <span className="text-[#E5A93C] font-bold tracking-[0.25em] uppercase text-sm">Knowledge Hub</span>
          <h1 className="text-5xl lg:text-6xl font-black text-[#0A1828] mt-4 uppercase">Product Guides</h1>
          <div className="w-20 h-[2px] bg-[#E5A93C] mx-auto mt-6" />
          <p className="max-w-2xl mx-auto text-gray-500 mt-8">
            In-depth guides on industrial metals, specifications, standards and applications.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <AnimatedSection key={product.id} animation="fadeUp" delay={index * 60}>
              <div
                onClick={() => navigate(`/products/${product.id}`)}
                className="group cursor-pointer bg-white rounded-tl-[40px] rounded-br-[40px] overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-shadow duration-500 h-full"
              >
                <div className="h-[200px] overflow-hidden bg-gray-100">
                  <img src={product.image} alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.style.display='none'; }} />
                </div>
                <div className="p-6">
                  <span className="text-[#E5A93C] text-[10px] font-black tracking-[0.2em] uppercase">{product.material} · {product.category}</span>
                  <h3 className="text-[17px] font-black text-[#0A1828] uppercase mt-2 leading-tight">
                    {product.blog?.title || product.name}
                  </h3>
                  <p className="text-gray-500 text-[13px] mt-3 leading-relaxed line-clamp-3">
                    {product.blog?.intro || product.description}
                  </p>
                  <div className="flex items-center gap-2 mt-5">
                    <span className="text-[11px] font-black tracking-widest text-[#0A1828] uppercase">Read Guide</span>
                    <span className="text-[#E5A93C] group-hover:translate-x-1 transition-transform duration-200">→</span>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

      </div>
    </section>
  );
}
