import React from 'react';
import { FACILITIES_DATA } from '../data/hotelData';
import { SponsoredAdsSection } from '../components/SponsoredAdsSection';
import { Clock, MapPin, Check, Sparkles, Droplets, Dumbbell, Laptop, HeartHandshake } from 'lucide-react';

export const FacilitiesPage: React.FC = () => {
  const spaTreatments = [
    {
      title: 'Tamarind Royal Heritage Massage',
      duration: '90 Minutes',
      price: 'IDR 450,000',
      description: 'A traditional Sundanese therapeutic treatment utilizing long flowing strokes, thumb pressure on meridian pathways, and warm botanical ginger massage oil to stimulate blood circulation and release chronic muscular fatigue.'
    },
    {
      title: 'Javanese Lulur Herbal Body Scrub',
      duration: '60 Minutes',
      price: 'IDR 350,000',
      description: 'A historic royal court ritual incorporating natural turmeric, sandalwood powder, and rice grain scrub to gently exfoliate dead skin cells, followed by a soothing yogurt wrap.'
    },
    {
      title: 'Warm River Stone Tension Relief',
      duration: '75 Minutes',
      price: 'IDR 420,000',
      description: 'Polished volcanic basalt stones heated to ideal therapeutic temperatures, placed along spinal energy centers to relieve deep stiffness and induce tranquil sleep.'
    },
    {
      title: 'Sundanese Herbal Floral Bath',
      duration: '30 Minutes',
      price: 'IDR 200,000',
      description: 'Soak in a fragrant wooden tub infused with fresh frangipani blossoms, pandan leaves, lemongrass, and natural sea salts.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* Page Header */}
      <section className="bg-[#121820] text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B89358] mb-3 block">
            Wellness, Leisure & Rejuvenation
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Hotel Facilities & Spa
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Unwind in our serene tropical lagoon pool, indulge in traditional therapies at Tamarind Spa, or energize with Technogym equipment.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {FACILITIES_DATA.map((fac, idx) => {
          const isReversed = idx % 2 === 1;
          return (
            <div
              key={fac.id}
              className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch"
            >
              <div className={`lg:col-span-6 relative aspect-16/10 lg:aspect-auto ${isReversed ? 'lg:order-2' : ''}`}>
                <img
                  src={fac.image}
                  alt={fac.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#121820]/80 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded font-medium">
                  {fac.category}
                </div>
              </div>

              <div className={`lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between ${isReversed ? 'lg:order-1' : ''}`}>
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
                    {fac.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                    {fac.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded border border-stone-200/80 text-xs mb-6">
                    <div className="flex items-center gap-2 text-stone-700">
                      <Clock className="w-4 h-4 text-[#B89358] shrink-0" />
                      <span>{fac.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-700">
                      <MapPin className="w-4 h-4 text-[#B89358] shrink-0" />
                      <span>{fac.location}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-1">
                      Key Highlights
                    </span>
                    {fac.highlights.map((hl, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-[#B89358] shrink-0" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span>Available to all registered in-house guests</span>
                  <a href="#spa-menu" className="text-[#9E7A43] font-semibold hover:underline">
                    View Spa Menu ↓
                  </a>
                </div>
              </div>
            </div>
          );
        })}

        {/* Tamarind Spa Treatment Menu Showcase */}
        <div id="spa-menu" className="bg-white rounded-xl border border-stone-200 p-8 sm:p-10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#B89358] font-semibold block mb-1">
              Tamarind Spa Menu
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Signature Body Therapies & Rituals
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-2">
              All treatments use pure cold-pressed natural oils, organic lemongrass, and handpicked herbal essences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {spaTreatments.map((treatment, idx) => (
              <div
                key={idx}
                className="p-5 bg-stone-50 rounded-lg border border-stone-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <h3 className="font-serif text-base font-bold text-stone-900">
                      {treatment.title}
                    </h3>
                    <span className="text-xs font-bold text-[#9E7A43] tabular-nums font-sans">
                      {treatment.price}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400 block mb-2">{treatment.duration}</span>
                  <p className="text-xs text-stone-600 leading-relaxed font-light">
                    {treatment.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8 mt-6 border-t border-stone-100">
            <p className="text-xs text-stone-500 mb-3">
              To schedule treatments, dial extension <strong>88</strong> from your suite phone or visit the spa reception on the 2nd floor.
            </p>
            <a
              href="tel:+622286012888"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B2430] hover:bg-[#B89358] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              Contact Spa Concierge
            </a>
          </div>
        </div>

      </div>

      {/* Sponsored Ads Section */}
      <SponsoredAdsSection />

    </div>
  );
};
