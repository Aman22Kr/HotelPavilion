import React from 'react';
import { Link } from 'react-router-dom';
import { OFFERS_DATA } from '../data/hotelData';
import { formatPrice, CurrencyCode } from '../utils/storage';
import { SponsoredAdsSection } from '../components/SponsoredAdsSection';
import { Sparkles, Check, ArrowRight, Tag, Calendar, ShieldCheck } from 'lucide-react';

interface OffersPageProps {
  currency: CurrencyCode;
}

export const OffersPage: React.FC<OffersPageProps> = ({ currency }) => {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* Page Header */}
      <section className="bg-[#121820] text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B89358] mb-3 block">
            Exclusive Privileges & Direct Booking Perks
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Special Packages & Offers
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Curated staycation escapes, rooftop dinners at Vesper Sky Bar, wellness retreats, and early bird discounts reserved exclusively for direct reservations.
          </p>
        </div>
      </section>

      {/* Offers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {OFFERS_DATA.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:border-[#B89358]/80 transition-all flex flex-col group"
            >
              <div className="relative aspect-16/9 overflow-hidden">
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-[#121820]/80 backdrop-blur-xs text-white text-xs px-3 py-1 rounded font-medium">
                  {offer.tag}
                </div>
                <div className="absolute bottom-4 right-4 bg-[#B89358] text-stone-900 font-bold text-xs px-3 py-1.5 rounded shadow-sm">
                  {offer.discount}
                </div>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-[#B89358]" />
                    <span>{offer.validity}</span>
                  </div>

                  <h2 className="font-serif text-2xl font-bold text-stone-900 mb-3 group-hover:text-[#9E7A43] transition-colors">
                    {offer.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6 font-light">
                    {offer.description}
                  </p>

                  {/* Inclusions list */}
                  <div className="mb-6 space-y-2 bg-stone-50 p-4 rounded border border-stone-100">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 block mb-1">
                      Package Inclusions
                    </span>
                    {offer.inclusions.map((inc, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-[#B89358] shrink-0 mt-0.5" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Pricing & CTA */}
                <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] text-stone-400 block uppercase">Package Rates From</span>
                    <span className="text-base sm:text-lg font-bold text-stone-900 tabular-nums">
                      {formatPrice(offer.priceStartsIdr, currency)}
                    </span>
                    <span className="text-xs text-stone-500"> / night</span>
                  </div>

                  <Link
                    to={`/booking?offerId=${offer.id}`}
                    className="px-5 py-2.5 bg-[#1B2430] hover:bg-[#B89358] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <span>Book Package</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sponsored Ads Section */}
      <SponsoredAdsSection />

    </div>
  );
};
