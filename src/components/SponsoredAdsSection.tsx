import React from 'react';
import { ExternalLink, Sparkles, Compass } from 'lucide-react';
import { SPONSORED_ADS } from '../data/hotelData';

export const SponsoredAdsSection: React.FC = () => {
  return (
    <section className="py-8 bg-stone-100/80 border-t border-b border-stone-200/80 my-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold tracking-widest text-[#B89358] uppercase">
              Partner Spotlight
            </span>
            <span className="text-stone-300">·</span>
            <span className="text-xs text-stone-500">Curated Regional Experiences & Travel Partners</span>
          </div>
          <span className="text-[11px] text-stone-400">Sponsored Collection</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SPONSORED_ADS.map((ad) => (
            <div
              key={ad.id}
              className="bg-white p-4 rounded border border-stone-200/90 shadow-xs hover:border-[#B89358]/60 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                  <span className="text-[#9E7A43] font-medium text-[11px]">{ad.tag}</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#B89358]" />
                </div>
                <h4 className="font-serif text-base font-semibold text-stone-900 mb-1 leading-snug">
                  {ad.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  {ad.desc}
                </p>
              </div>
              <a
                href={ad.link}
                className="inline-flex items-center justify-between text-xs font-semibold text-[#9E7A43] hover:text-[#7E5F32] pt-2 border-t border-stone-100 group"
              >
                <span>{ad.cta}</span>
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
