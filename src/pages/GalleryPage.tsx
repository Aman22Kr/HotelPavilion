import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/hotelData';
import { SponsoredAdsSection } from '../components/SponsoredAdsSection';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

export const GalleryPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'Architecture', 'Rooms', 'Dining', 'Facilities', 'Events'];

  const filteredItems = selectedCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredItems.length);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* Page Header */}
      <section className="bg-[#121820] text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B89358] mb-3 block">
            Visual Portfolio
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Photo & Architectural Gallery
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Immerse yourself in the visual splendor of HotelPavilion Bandung—capturing contemporary colonial elegance, luxury suites, and rooftop sunsets.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded text-xs font-medium transition-all ${
                selectedCategory === cat
                  ? 'bg-[#1B2430] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Image Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxIndex(idx)}
              className="group relative aspect-4/3 rounded-lg overflow-hidden bg-stone-200 cursor-pointer shadow-xs border border-stone-200"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                <span className="text-[10px] uppercase tracking-wider text-[#E6D4B7]">{item.category}</span>
                <h3 className="font-serif text-sm font-bold">{item.title}</h3>
                <div className="absolute top-3 right-3 p-1.5 bg-white/20 backdrop-blur-xs rounded-full">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={() => setActiveLightboxIndex(null)}
        >
          <button
            onClick={() => setActiveLightboxIndex(null)}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div 
            className="max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[activeLightboxIndex].image}
              alt={filteredItems[activeLightboxIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded shadow-2xl"
            />
            <div className="text-center text-white mt-4">
              <span className="text-xs uppercase tracking-widest text-[#B89358]">
                {filteredItems[activeLightboxIndex].category}
              </span>
              <h3 className="font-serif text-lg font-bold">
                {filteredItems[activeLightboxIndex].title}
              </h3>
            </div>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/80 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Sponsored Ads Section */}
      <SponsoredAdsSection />

    </div>
  );
};
