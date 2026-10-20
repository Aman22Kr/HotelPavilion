import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Award, 
  MapPin, 
  Star, 
  Sparkles, 
  Clock, 
  Compass, 
  Coffee, 
  Wine, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { HOTEL_INFO, ROOMS_DATA, DINING_VENUES, TESTIMONIALS, MEETING_SPACES } from '../data/hotelData';
import { QuickBookingBar } from '../components/QuickBookingBar';
import { RoomCard } from '../components/RoomCard';
import { SponsoredAdsSection } from '../components/SponsoredAdsSection';
import { CurrencyCode } from '../utils/storage';

interface HomePageProps {
  currency: CurrencyCode;
}

export const HomePage: React.FC<HomePageProps> = ({ currency }) => {
  const featuredRooms = ROOMS_DATA.filter(r => r.featured);

  return (
    <div className="min-h-screen">
      
      {/* Cinematic Hero Section */}
      <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/hero_hotel_facade_1792482383186.jpg"
            alt="HotelPavilion Bandung Exterior"
            className="w-full h-full object-cover object-center scale-100 animate-in fade-in duration-1000"
          />
          {/* Measured multi-stop scrim for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#121820] via-[#121820]/60 to-[#121820]/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20 pb-28 text-white">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs tracking-wider uppercase text-[#E6D4B7] mb-6 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-[#B89358]" />
            <span>Modern Colonial Luxury on Jalan Riau, Bandung</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight text-balance">
            Where Dutch Colonial Heritage Meets Contemporary Luxury
          </h1>

          <p className="text-sm sm:text-base text-stone-200 max-w-2xl mx-auto mb-8 font-light leading-relaxed">
            Experience 12 storeys of curated luxury in the center of Bandung. 145 boutique rooms and suites, open-air culinary theatre at Keuken, 360° sunset vistas at Vesper Sky Bar, and serene lagoon waters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/rooms"
              className="w-full sm:w-auto px-6 py-3.5 bg-[#B89358] hover:bg-[#9E7A43] text-stone-900 hover:text-white rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-lg flex items-center justify-center gap-2"
            >
              <span>Explore Accommodations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/dining"
              className="w-full sm:w-auto px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded text-xs font-semibold uppercase tracking-wider transition-all backdrop-blur-xs flex items-center justify-center gap-2"
            >
              <span>Discover Dining & Bars</span>
            </Link>
          </div>
        </div>

        {/* Sub-hero trust marker */}
        <div className="absolute bottom-4 left-0 right-0 z-10 hidden md:block">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs text-stone-300">
            <div className="flex items-center gap-4">
              <span>Jl. R.E. Martadinata No.68, Bandung</span>
              <span>·</span>
              <span>Check-in 14:00</span>
              <span>·</span>
              <span>145 Luxury Rooms</span>
            </div>
            <div className="flex items-center gap-2 text-[#E6D4B7]">
              <Star className="w-3.5 h-3.5 fill-[#B89358] text-[#B89358]" />
              <span>4.8 Rating from over 1,200 verified travelers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Quick Booking Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-14 relative z-20">
        <QuickBookingBar />
      </div>

      {/* Heritage & Architectural Story Section (with blank square video space) */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Story Text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#B89358]">
                <span>Our Heritage & Architecture</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 leading-snug">
                A Timeless Tribute to Bandung’s Storied Colonial Legacy
              </h2>

              <p className="text-stone-600 text-sm leading-relaxed">
                Situated along Jalan R.E. Martadinata—historically known as Jalan Riau, Bandung’s premier European residential avenue—HotelPavilion pays homage to the grand Dutch colonial estates that once framed the Paris van Java.
              </p>

              <p className="text-stone-600 text-sm leading-relaxed">
                Rising 12 storeys, the property weaves historic colonial keystones, elegant high arched windows, and authentic bespoke teak finishes with the contemporary comforts of a premier international luxury destination. From the vintage luggage work desks to the tranquil lagoon courtyard, every corner tells a story.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-stone-200">
                <div>
                  <span className="font-serif text-3xl font-bold text-stone-900 block tabular-nums">145</span>
                  <span className="text-xs text-stone-500">Colonial Rooms & Suites</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-stone-900 block tabular-nums">12</span>
                  <span className="text-xs text-stone-500">Storeys of Luxury</span>
                </div>
                <div>
                  <span className="font-serif text-3xl font-bold text-stone-900 block tabular-nums">4</span>
                  <span className="text-xs text-stone-500">Gourmet Venues & Spa</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-900 hover:text-[#9E7A43] group"
                >
                  <span>Read our full story</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Architectural Tour Video Slot (Explicitly requested: blank square space) */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-md aspect-square bg-stone-900 rounded-lg shadow-lg border border-stone-300/80 overflow-hidden relative flex flex-col items-center justify-center p-6 text-center group">
                {/* Blank square space with subtle archival styling */}
                <div className="w-full h-full border border-stone-700/60 rounded flex flex-col items-center justify-center p-6 bg-stone-950">
                  <span className="text-[11px] font-mono tracking-widest uppercase text-stone-400 mb-2">
                    Architectural Video Tour
                  </span>
                  <h3 className="font-serif text-lg text-white font-medium mb-1">
                    HotelPavilion Experience Film
                  </h3>
                  <p className="text-xs text-stone-400 max-w-xs leading-relaxed">
                    Historic documentary footage and walkthrough of our modern colonial sanctuary.
                  </p>
                </div>
              </div>
              <span className="text-[11px] text-stone-500 mt-2 text-center">
                Archival documentary showcase · Available on-site
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Featured Rooms Showcase */}
      <section className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B89358] block mb-2">
                Accommodations
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900">
                Elegantly Appointed Rooms & Suites
              </h2>
            </div>
            <Link
              to="/rooms"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-800 hover:text-[#9E7A43] group"
            >
              <span>View All 6 Room Categories</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} currency={currency} />
            ))}
          </div>
        </div>
      </section>

      {/* Signature Dining & Lounges Preview */}
      <section className="py-20 bg-[#121820] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B89358] block mb-2">
              Culinary Artistry
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-4">
              Gastronomic Excellence from Morning to Starlight
            </h2>
            <p className="text-xs sm:text-sm text-stone-400 font-light leading-relaxed">
              From open-kitchen Dutch-Indonesian feasts at Keuken to twilight tapas and craft cocktails atop Vesper Sky Bar, culinary discovery is woven into every hour.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Keuken Feature Card */}
            <div className="bg-stone-900 rounded-lg overflow-hidden border border-stone-800 flex flex-col group">
              <div className="aspect-16/9 overflow-hidden relative">
                <img
                  src="/src/assets/images/restaurant_keuken_dining_1792482382946.jpg"
                  alt="Keuken All Day Dining"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded font-medium">
                  Ground Floor · 06:00 - 23:00
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-[#B89358] transition-colors">
                    Keuken All Day Dining
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed mb-4">
                    Theatre-style live cooking brasserie serving traditional Dutch colonial specialties, fragrant Sundanese favorites, and prime grilled steaks.
                  </p>
                  <div className="space-y-1 text-xs text-stone-300 mb-6">
                    <div>• Signature dish: Rawon Buntut Bakar Keuken</div>
                    <div>• Authentic Dutch Bitterballen & Poffertjes</div>
                    <div>• Breakfast buffet daily from 06:00 - 10:00</div>
                  </div>
                </div>
                <Link
                  to="/dining/keuken-all-day-dining"
                  className="inline-flex items-center justify-between text-xs font-semibold text-[#B89358] hover:text-white pt-4 border-t border-stone-800 group/link"
                >
                  <span>Explore Menu & Reserve Table</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Vesper Feature Card */}
            <div className="bg-stone-900 rounded-lg overflow-hidden border border-stone-800 flex flex-col group">
              <div className="aspect-16/9 overflow-hidden relative">
                <img
                  src="/src/assets/images/rooftop_vesper_lounge_1792482412312.jpg"
                  alt="Vesper Sky Bar & Lounge"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded font-medium">
                  12th Floor Rooftop · 17:00 - 01:00
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-[#B89358] transition-colors">
                    Vesper Sky Bar & Lounge
                  </h3>
                  <p className="text-xs text-stone-400 leading-relaxed mb-4">
                    Bandung’s premier rooftop sanctuary with 360-degree panoramic skyline vistas, handcrafted barrel-aged cocktails, and sunset acoustic sessions.
                  </p>
                  <div className="space-y-1 text-xs text-stone-300 mb-6">
                    <div>• 360° Open-Air Bandung Skyline Views</div>
                    <div>• Barrel-aged cocktails & Robata skewers</div>
                    <div>• Live acoustic sessions every weekend</div>
                  </div>
                </div>
                <Link
                  to="/dining/vesper-sky-bar-lounge"
                  className="inline-flex items-center justify-between text-xs font-semibold text-[#B89358] hover:text-white pt-4 border-t border-stone-800 group/link"
                >
                  <span>Explore Sunset Cocktails</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link
              to="/dining"
              className="inline-flex items-center gap-2 px-6 py-3 border border-stone-700 hover:border-[#B89358] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <span>View All Dining & Koffie Story Salon</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Wellness & Lagoon Pool Sanctuary */}
      <section className="py-20 bg-[#FAF8F5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="aspect-4/3 rounded-lg overflow-hidden shadow-xl border border-stone-200">
                <img
                  src="/src/assets/images/spa_wellness_lagoon_1792482411296.jpg"
                  alt="Tamarind Spa and Lagoon Pool"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-semibold uppercase tracking-widest text-[#B89358]">
                Holistic Wellness
              </span>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 leading-snug">
                The Pavilion Lagoon Pool & Tamarind Spa
              </h2>
              <p className="text-stone-600 text-sm leading-relaxed">
                Step into a secluded tropical sanctuary. Take a refreshing swim in our heated azure lagoon swimming pool or rebalance your senses at Tamarind Spa with centuries-old Indonesian botanical therapies and herbal baths.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#B89358] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Lagoon Pool</h4>
                    <p className="text-xs text-stone-500">Open 06:00 - 20:00 Daily with heated tropical water and private cabanas.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-[#B89358] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-stone-900">Tamarind Heritage Spa</h4>
                    <p className="text-xs text-stone-500">Open 09:00 - 22:00 Daily with single & couples suites, steam, and herbal baths.</p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/facilities"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B2430] hover:bg-[#B89358] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  <span>Explore All Facilities</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Reviews & Testimonials */}
      <section className="py-20 bg-white border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#B89358] block mb-2">
              Guest Experiences
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-stone-900 mb-3">
              Cherished Moments from Our Guests
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Verified reviews from travelers who stayed at HotelPavilion Bandung.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-[#FAF8F5] p-6 rounded-lg border border-stone-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-[#B89358] mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#B89358]" />
                    ))}
                  </div>
                  <h4 className="font-serif text-base font-bold text-stone-900 mb-2 leading-snug">
                    "{t.title}"
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed mb-6">
                    {t.comment}
                  </p>
                </div>
                <div className="pt-4 border-t border-stone-200/60 text-xs">
                  <div className="font-semibold text-stone-900">{t.author}</div>
                  <div className="text-stone-500 text-[11px]">{t.origin} · {t.roomType}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsored Ads Section */}
      <SponsoredAdsSection />

    </div>
  );
};
