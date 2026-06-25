import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { products } from '../data/products';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <section className="bg-white min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-black text-[#0A1828] uppercase">Product Not Found</h1>
          <p className="text-gray-500 mt-4">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="inline-block mt-8 bg-[#0A1828] text-white px-8 py-4 uppercase font-bold tracking-widest">Back to Products</Link>
        </div>
      </section>
    );
  }

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <section className="bg-white min-h-screen py-16 px-6 lg:px-16">
      <div className="max-w-[1200px] mx-auto">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-400 mb-10">
          <Link to="/" className="hover:text-[#E5A93C]">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-[#E5A93C]">Products</Link>
          <span>/</span>
          <span className="text-[#0A1828] font-semibold">{product.name}</span>
        </div>

        {/* Product Header */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="rounded-tl-[60px] rounded-br-[60px] overflow-hidden shadow-xl bg-gray-100 h-[420px] lg:h-[520px]">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover"
              onError={(e) => { e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center"><span class="text-gray-300 uppercase tracking-widest">Product Image</span></div>'; }} />
          </div>

          <div>
            <span className="text-[#E5A93C] font-black tracking-[0.2em] uppercase text-xs">{product.material} · {product.category}</span>
            <h1 className="text-4xl lg:text-5xl font-black text-[#0A1828] uppercase mt-3 leading-tight">{product.name}</h1>
            <div className="w-16 h-[2px] bg-[#E5A93C] mt-6 mb-6" />
            <p className="text-gray-600 text-[16px] leading-relaxed">{product.description}</p>

            {/* Spec table */}
            <div className="mt-10 border border-gray-200 rounded-lg overflow-hidden">
              <div className="grid grid-cols-2 divide-x divide-gray-200">
                <div className="p-5">
                  <p className="text-[11px] font-black tracking-widest text-gray-400 uppercase">Material</p>
                  <p className="text-[#0A1828] font-bold mt-1">{product.material}</p>
                </div>
                <div className="p-5">
                  <p className="text-[11px] font-black tracking-widest text-gray-400 uppercase">Form</p>
                  <p className="text-[#0A1828] font-bold mt-1">{product.form}</p>
                </div>
              </div>
              <div className="border-t border-gray-200 p-5">
                <p className="text-[11px] font-black tracking-widest text-gray-400 uppercase">Category</p>
                <p className="text-[#0A1828] font-bold mt-1">{product.category}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact-us')?.scrollIntoView({behavior:'smooth'}), 300); }}
                className="bg-[#0A1828] text-white px-8 py-4 uppercase font-bold tracking-widest hover:bg-[#1A3A5C] transition-colors">
                Request Quote
              </button>
              <a href={`https://wa.me/917073895597?text=${encodeURIComponent(`Hi, I'm interested in ${product.name}. Please share more details.`)}`}
                target="_blank" rel="noreferrer"
                className="border border-gray-300 text-[#0A1828] px-8 py-4 uppercase font-bold tracking-widest hover:border-[#0A1828] transition-colors text-center">
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* ── BLOG SECTION ── */}
        {product.blog && (
          <div className="mt-24 border-t border-gray-100 pt-16">

            {/* Blog Header */}
            <div className="mb-12">
              <span className="text-[11px] font-black tracking-[0.3em] text-[#E5A93C] uppercase">Product Guide</span>
              <h2 className="text-3xl lg:text-4xl font-black text-[#0A1828] uppercase mt-3 leading-tight">{product.blog.title}</h2>
              <div className="w-16 h-[2px] bg-[#E5A93C] mt-6 mb-6" />
              <p className="text-gray-600 text-[16px] leading-relaxed max-w-3xl">{product.blog.intro}</p>
            </div>

            {/* Blog Sections */}
            <div className="grid md:grid-cols-2 gap-8">
              {product.blog.sections.map((section, i) => (
                <div key={i} className="bg-gray-50 rounded-tl-[24px] rounded-br-[24px] p-8 border border-gray-100 hover:border-[#E5A93C]/30 transition-colors">
                  <div className="flex items-start gap-4 mb-4">
                    <span className="bg-[#0A1828] text-[#E5A93C] text-[11px] font-black tracking-widest w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-[16px] font-black text-[#0A1828] uppercase leading-tight">{section.heading}</h3>
                  </div>
                  <p className="text-gray-500 text-[14px] leading-relaxed pl-12">{section.content}</p>
                </div>
              ))}
            </div>

            {/* CTA Banner */}
            <div className="mt-12 bg-[#0A1828] rounded-tl-[32px] rounded-br-[32px] p-8 lg:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-white text-xl font-black uppercase">Need {product.name}?</h3>
                <p className="text-gray-400 mt-1 text-sm">Get a competitive quote with full material certification.</p>
              </div>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() => { navigate('/'); setTimeout(() => document.getElementById('contact-us')?.scrollIntoView({behavior:'smooth'}), 300); }}
                  className="bg-[#E5A93C] text-[#0A1828] px-8 py-3 uppercase font-black text-[11px] tracking-widest hover:bg-[#d4982b] transition-colors">
                  Request Quote
                </button>
                <a href={`https://wa.me/917073895597?text=${encodeURIComponent(`Hi, I need a quote for ${product.name}.`)}`}
                  target="_blank" rel="noreferrer"
                  className="border border-white/30 text-white px-8 py-3 uppercase font-black text-[11px] tracking-widest hover:border-white transition-colors text-center">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Related Products */}
        {related.length > 0 && (
          <div className="mt-24">
            <h3 className="text-2xl font-black text-[#0A1828] uppercase mb-8">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((r) => (
                <div key={r.id} onClick={() => navigate(`/products/${r.id}`)}
                  className="cursor-pointer bg-white rounded-tl-[30px] rounded-br-[30px] overflow-hidden shadow-md hover:shadow-xl border border-gray-100 transition-all">
                  <div className="h-[180px] bg-gray-100 overflow-hidden">
                    <img src={r.image} alt={r.name} className="w-full h-full object-cover" onError={(e)=>{e.target.style.display='none';}} />
                  </div>
                  <div className="p-4">
                    <span className="text-[#E5A93C] text-[10px] font-black tracking-widest uppercase">{r.material}</span>
                    <h4 className="text-[15px] font-black text-[#0A1828] uppercase mt-1">{r.name}</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
