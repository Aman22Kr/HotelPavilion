import React, { useState, useMemo } from 'react';
import { ROOMS_DATA } from '../data/hotelData';
import { RoomCard } from '../components/RoomCard';
import { SponsoredAdsSection } from '../components/SponsoredAdsSection';
import { CurrencyCode } from '../utils/storage';
import { Sparkles, ShieldCheck, Clock, Award, SlidersHorizontal, Search } from 'lucide-react';

interface RoomsPageProps {
  currency: CurrencyCode;
}

export const RoomsPage: React.FC<RoomsPageProps> = ({ currency }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Rooms', 'Suites', 'Family Suites', 'Presidential Suites'];

  const filteredRooms = useMemo(() => {
    return ROOMS_DATA.filter((room) => {
      const matchCat = selectedCategory === 'All' || room.category === selectedCategory;
      const matchSearch = searchTerm.trim() === '' || 
        room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        room.amenities.some(a => a.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.priceIdr - b.priceIdr;
      if (sortBy === 'price-desc') return b.priceIdr - a.priceIdr;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, sortBy, searchTerm]);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* Page Header Banner */}
      <section className="bg-[#121820] text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B89358] mb-3 block">
            HotelPavilion Accommodations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Rooms & Grand Suites
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            145 gracefully appointed havens infused with timeless Dutch colonial elegance, custom vintage suitcase vanities, rainfall shower cubicles, and contemporary luxury.
          </p>
        </div>
      </section>

      {/* Direct Booking Privileges Strip */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-stone-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#B89358] shrink-0" />
              <span>Best Direct Rate Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B89358] shrink-0" />
              <span>Complimentary Welcome Drink</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B89358] shrink-0" />
              <span>Flexible Cancellation Terms</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-[#B89358] shrink-0" />
              <span>Priority Early Check-in Status</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="bg-white p-4 rounded-lg border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Tabs (Interactive buttons allowed as per constitution) */}
          <div className="flex flex-wrap items-center gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded text-xs font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#1B2430] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex items-center gap-3">
            <div className="relative flex-1 sm:w-48">
              <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search amenities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
              />
            </div>

            <div className="flex items-center gap-1.5 text-xs text-stone-600">
              <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort accommodations"
                className="text-xs bg-stone-50 border border-stone-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-[#B89358]"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Guest Rating</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* Rooms Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {filteredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRooms.map((room) => (
              <RoomCard key={room.id} room={room} currency={currency} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-lg border border-stone-200">
            <p className="text-base font-serif font-bold text-stone-800 mb-2">No accommodations match your selection</p>
            <p className="text-xs text-stone-500 mb-4">Try clearing the search term or choosing "All" categories.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchTerm('');
              }}
              className="px-4 py-2 bg-[#1B2430] text-white rounded text-xs font-semibold hover:bg-[#B89358] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Sponsored Ads Section */}
      <SponsoredAdsSection />

    </div>
  );
};
