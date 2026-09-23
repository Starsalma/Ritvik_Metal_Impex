import { Link } from 'react-router-dom';
import Seo from '../components/Seo';

export default function NotFoundPage() {
  return (
    <>
      <Seo
        title="Page Not Found"
        description="The page you are looking for could not be found on ritvikmetalimpex.com."
        path="/404"
        noindex
      />
      <section className="bg-white min-h-[70vh] flex items-center justify-center px-6 py-24">
        <div className="text-center max-w-lg">
          <span className="text-[#E5A93C] text-[11px] font-black tracking-[0.3em] uppercase">
            Error 404
          </span>
          <h1 className="text-4xl lg:text-5xl font-black text-[#0A1828] uppercase mt-4">
            Page Not Found
          </h1>
          <div className="w-16 h-[2px] bg-[#E5A93C] mx-auto mt-6" />
          <p className="text-gray-500 mt-6 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has moved. Browse our product
            catalogue or read our technical guides instead.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <Link
              to="/products"
              className="bg-[#0A1828] text-white px-8 py-4 uppercase font-bold text-[11px] tracking-widest hover:bg-[#1A3A5C] transition-colors"
            >
              View Products
            </Link>
            <Link
              to="/blog"
              className="border border-gray-300 text-[#0A1828] px-8 py-4 uppercase font-bold text-[11px] tracking-widest hover:border-[#0A1828] transition-colors"
            >
              Knowledge Hub
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
