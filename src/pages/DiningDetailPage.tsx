import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DINING_VENUES } from '../data/hotelData';
import { SponsoredAdsSection } from '../components/SponsoredAdsSection';
import { ArrowLeft, Clock, MapPin, Utensils, CheckCircle2, Award, Calendar, Sparkles } from 'lucide-react';

export const DiningDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const venue = DINING_VENUES.find((v) => v.slug === slug) || DINING_VENUES[0];

  const [activeTab, setActiveTab] = useState<'menu' | 'hours' | 'atmosphere'>('menu');

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* Top Breadcrumb */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Link to="/dining" className="hover:text-[#9E7A43] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Dining & Lounges</span>
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-stone-900 font-medium">{venue.name}</span>
          </div>
        </div>
      </div>

      {/* Hero Cover */}
      <section className="relative h-80 sm:h-96 overflow-hidden bg-stone-950">
        <img
          src={venue.image}
          alt={venue.name}
          className="w-full h-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121820] via-black/40 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <span className="text-xs uppercase tracking-widest text-[#B89358] font-semibold mb-2 block">
              {venue.cuisine}
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold mb-2">
              {venue.name}
            </h1>
            <p className="text-sm text-stone-300 font-serif italic max-w-xl">
              "{venue.tagline}"
            </p>
          </div>
        </div>
      </section>

      {/* Main Details and Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Quick Info Strip */}
        <div className="bg-white rounded-lg border border-stone-200 p-4 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="flex items-center gap-2.5 text-stone-700">
            <Clock className="w-4 h-4 text-[#B89358]" />
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Service Hours</span>
              <span className="font-semibold">{venue.hours}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-stone-700">
            <MapPin className="w-4 h-4 text-[#B89358]" />
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Location</span>
              <span className="font-semibold">{venue.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2.5 text-stone-700">
            <Utensils className="w-4 h-4 text-[#B89358]" />
            <div>
              <span className="text-stone-400 block text-[10px] uppercase">Dress Code</span>
              <span className="font-semibold">{venue.dressCode}</span>
            </div>
          </div>
        </div>

        {/* Story & Philosophy */}
        <div className="bg-white rounded-lg border border-stone-200 p-6 sm:p-8 mb-10">
          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-4">
            Culinary Philosophy & Experience
          </h2>
          <p className="text-sm text-stone-600 leading-relaxed mb-6 font-light">
            {venue.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-stone-100">
            {venue.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-stone-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#B89358]" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Signature Dishes Card Grid */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B89358] font-semibold block mb-1">
                Executive Chef Selection
              </span>
              <h2 className="font-serif text-2xl font-bold text-stone-900">
                Signature Dishes & Specialties
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {venue.signatureDishes.map((dish, idx) => (
              <div
                key={idx}
                className="bg-white p-6 rounded-lg border border-stone-200 shadow-xs flex flex-col justify-between hover:border-[#B89358]/60 transition-colors"
              >
                <div>
                  <div className="flex items-baseline justify-between mb-2">
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      {dish.name}
                    </h3>
                    <span className="text-sm font-bold text-[#9E7A43] tabular-nums font-sans">
                      {dish.price}
                    </span>
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    {dish.desc}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-[11px] text-[#B89358]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Freshly prepared daily with locally sourced ingredients</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back and Booking CTA */}
        <div className="bg-[#121820] text-white p-8 rounded-xl text-center space-y-4">
          <h3 className="font-serif text-2xl font-bold">
            Reserve Your Culinary Table at {venue.name}
          </h3>
          <p className="text-xs text-stone-300 max-w-md mx-auto">
            Reservations are highly recommended for evening seatings, sunset rooftop views, and weekend brunches.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              to="/dining"
              className="px-6 py-2.5 bg-[#B89358] hover:bg-[#9E7A43] text-stone-900 hover:text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Reserve Table Online
            </Link>
            <a
              href="tel:+622286012888"
              className="px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Call Concierge (+62 22 8601 2888)
            </a>
          </div>
        </div>

      </div>

      {/* Sponsored Ads Section */}
      <SponsoredAdsSection />

    </div>
  );
};
