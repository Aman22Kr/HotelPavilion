import React from 'react';
import { HOTEL_INFO } from '../data/hotelData';
import { SponsoredAdsSection } from '../components/SponsoredAdsSection';
import { Award, Compass, ShieldCheck, Heart, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* Page Header */}
      <section className="bg-[#121820] text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B89358] mb-3 block">
            Our Heritage & Philosophy
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            The Story of HotelPavilion
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            A celebrated 12-storey architectural landmark nestled on historic Jalan R.E. Martadinata, Bandung, marrying Dutch Colonial elegance with authentic Indonesian hospitality.
          </p>
        </div>
      </section>

      {/* Main Narrative Section with Blank Square Video Placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
        
        {/* Heritage Story & Blank Video Space */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B89358]">
              A Heritage Revitalized
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 leading-snug">
              Modern Colonial Grandeur in the Paris of Java
            </h2>
            <p className="text-stone-600 text-sm leading-relaxed">
              In the early 20th century, Bandung gained world renown as the "Paris van Java"—famed for its cool highland climate, Art Deco boulevards, and stately Dutch residential pavilions. Jalan R.E. Martadinata (affectionately known as Jalan Riau) stood at the heart of this gilded era.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              HotelPavilion was conceived as a living bridge between that nostalgic golden age and the desires of today's discerning international traveler. Built with soaring 4.5-meter ceilings, arched masonry colonnades, and hand-carved teak furnishings, the hotel evokes timeless colonial romance while delivering state-of-the-art sustainability and connectivity.
            </p>
            <p className="text-stone-600 text-sm leading-relaxed">
              Whether taking afternoon tea at Koffie Story, tasting heirloom recipes at Keuken, or relaxing on your balcony overlooking the Tangkuban Perahu volcanoes, every touchpoint reflects our dedication to authentic warmth.
            </p>
          </div>

          {/* Blank square space for YouTube video link as requested */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-md aspect-square bg-stone-900 rounded-xl shadow-xl border border-stone-300 p-4 flex flex-col justify-between">
              {/* Blank square interior */}
              <div className="w-full h-full bg-stone-950 rounded border border-stone-800 flex flex-col items-center justify-center p-6 text-center">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#B89358] mb-2">
                  Documentary Video Space
                </span>
                <h4 className="font-serif text-lg text-white font-medium mb-1">
                  HotelPavilion Architecture
                </h4>
                <p className="text-xs text-stone-400 max-w-xs leading-relaxed">
                  Historical documentary featurette on the restoration of modern colonial architecture in Bandung.
                </p>
              </div>
            </div>
            <span className="text-[11px] text-stone-400 mt-2 text-center">
              Archival Video Frame · In-House Archival Recording
            </span>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="pt-8 border-t border-stone-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#B89358] font-semibold block mb-1">
              Guiding Principles
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              The HotelPavilion Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-stone-200">
              <Award className="w-6 h-6 text-[#B89358] mb-4" />
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                Authentic Craftsmanship
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                From hand-cast brass room fixtures to custom vintage suitcase desks, we partner with West Java master craftsmen to preserve native woodworking traditions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-stone-200">
              <Heart className="w-6 h-6 text-[#B89358] mb-4" />
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                Sundanese Hospitality
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Our service is guided by "Someah Hade ka Semoh"—the ancient Sundanese philosophy of welcoming guests as cherished family with gracious dignity.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-stone-200">
              <ShieldCheck className="w-6 h-6 text-[#B89358] mb-4" />
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                Conscious Sustainability
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed font-light">
                Zero single-use plastics in guest rooms, energy-efficient chilled water systems, and 100% locally sourced Highland organic coffee and farm produce.
              </p>
            </div>
          </div>
        </div>

        {/* Fact Sheet */}
        <div className="bg-white rounded-xl border border-stone-200 p-8 sm:p-10 shadow-xs">
          <h3 className="font-serif text-2xl font-bold text-stone-900 mb-6 text-center">
            Key Hotel Facts & Milestones
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-stone-50 rounded border border-stone-100">
              <span className="font-serif text-3xl font-bold text-stone-900 block tabular-nums">145</span>
              <span className="text-xs text-stone-500">Rooms & Suites</span>
            </div>
            <div className="p-4 bg-stone-50 rounded border border-stone-100">
              <span className="font-serif text-3xl font-bold text-stone-900 block tabular-nums">12</span>
              <span className="text-xs text-stone-500">Storeys</span>
            </div>
            <div className="p-4 bg-stone-50 rounded border border-stone-100">
              <span className="font-serif text-3xl font-bold text-stone-900 block tabular-nums">349 sqm</span>
              <span className="text-xs text-stone-500">Event Space</span>
            </div>
            <div className="p-4 bg-stone-50 rounded border border-stone-100">
              <span className="font-serif text-3xl font-bold text-stone-900 block tabular-nums">4.8 / 5.0</span>
              <span className="text-xs text-stone-500">TripAdvisor Score</span>
            </div>
          </div>
        </div>

      </div>

      {/* Sponsored Ads Section */}
      <SponsoredAdsSection />

    </div>
  );
};
