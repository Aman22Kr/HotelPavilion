import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ROOMS_DATA } from '../data/hotelData';
import { getSavedItemIds, toggleSavedItemId, formatPrice, CurrencyCode } from '../utils/storage';
import { RoomCard } from '../components/RoomCard';
import { SponsoredAdsSection } from '../components/SponsoredAdsSection';
import { Heart, Trash2, ArrowRight, BedDouble } from 'lucide-react';

interface WishlistPageProps {
  currency: CurrencyCode;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({ currency }) => {
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    setSavedIds(getSavedItemIds());
  }, []);

  const savedRooms = ROOMS_DATA.filter((r) => savedIds.includes(r.id));

  const handleClearAll = () => {
    localStorage.removeItem('hotelpavilion_saved_items');
    setSavedIds([]);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* Page Header */}
      <section className="bg-[#121820] text-white py-14 sm:py-16 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B89358] mb-2 block">
            Personal Curated Collection
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
            Saved Accommodations ({savedRooms.length})
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto font-light leading-relaxed">
            Your shortlisted rooms and suites saved in local browser storage.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {savedRooms.length > 0 ? (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={handleClearAll}
                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Wishlist</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {savedRooms.map((room) => (
                <RoomCard
                  key={room.id}
                  room={room}
                  currency={currency}
                  onSavedChange={() => setSavedIds(getSavedItemIds())}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center max-w-lg mx-auto shadow-xs">
            <Heart className="w-12 h-12 text-stone-300 mx-auto mb-4" />
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
              Your Wishlist is Currently Empty
            </h3>
            <p className="text-xs text-stone-500 mb-6 leading-relaxed">
              Click the heart icon on any room or suite card to bookmark it here for later review.
            </p>
            <Link
              to="/rooms"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1B2430] hover:bg-[#B89358] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors"
            >
              <span>Explore Accommodations</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}
      </div>

      {/* Sponsored Ads Section */}
      <SponsoredAdsSection />

    </div>
  );
};
