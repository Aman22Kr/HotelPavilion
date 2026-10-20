import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowRight, Home, Bed, Utensils } from 'lucide-react';
import { SponsoredAdsSection } from '../components/SponsoredAdsSection';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col justify-between">
      <div className="max-w-3xl mx-auto px-4 py-24 text-center my-auto">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#B89358] mb-2 block">
          Error 404
        </span>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-stone-900 mb-4">
          Page Not Discovered
        </h1>
        <p className="text-sm text-stone-600 max-w-md mx-auto mb-8 font-light leading-relaxed">
          The sanctuary or destination you are seeking cannot be located in the HotelPavilion directory. Perhaps it was moved or renamed.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          <Link
            to="/"
            className="px-5 py-2.5 bg-[#1B2430] hover:bg-[#B89358] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
          <Link
            to="/rooms"
            className="px-5 py-2.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <Bed className="w-3.5 h-3.5" />
            <span>View Accommodations</span>
          </Link>
          <Link
            to="/dining"
            className="px-5 py-2.5 bg-white border border-stone-200 hover:bg-stone-50 text-stone-800 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-2"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>Explore Dining</span>
          </Link>
        </div>
      </div>

      <SponsoredAdsSection />
    </div>
  );
};
