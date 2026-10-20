import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Bed, Utensils, Calendar, Sparkles, ArrowRight, History } from 'lucide-react';
import { ROOMS_DATA, DINING_VENUES, MEETING_SPACES, OFFERS_DATA } from '../data/hotelData';
import { getSearchHistory, addSearchQuery, formatPrice, CurrencyCode } from '../utils/storage';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, currency }) => {
  const [query, setQuery] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setHistory(getSearchHistory());
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;

    const matchedRooms = ROOMS_DATA.filter(r => 
      r.name.toLowerCase().includes(q) || 
      r.tagline.toLowerCase().includes(q) || 
      r.amenities.some(a => a.toLowerCase().includes(q))
    );

    const matchedDining = DINING_VENUES.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.cuisine.toLowerCase().includes(q) ||
      d.tagline.toLowerCase().includes(q)
    );

    const matchedMeetings = MEETING_SPACES.filter(m => 
      m.name.toLowerCase().includes(q) || 
      m.description.toLowerCase().includes(q)
    );

    const matchedOffers = OFFERS_DATA.filter(o => 
      o.title.toLowerCase().includes(q) || 
      o.tag.toLowerCase().includes(q) || 
      o.description.toLowerCase().includes(q)
    );

    return {
      rooms: matchedRooms,
      dining: matchedDining,
      meetings: matchedMeetings,
      offers: matchedOffers,
      totalCount: matchedRooms.length + matchedDining.length + matchedMeetings.length + matchedOffers.length
    };
  }, [query]);

  const handleSelectResult = (path: string, searchWord?: string) => {
    if (searchWord || query.trim()) {
      addSearchQuery(searchWord || query.trim());
    }
    onClose();
    navigate(path);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-start justify-center p-4 pt-16 sm:pt-24 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-lg shadow-2xl border border-stone-200 w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-stone-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-stone-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search rooms, dining, event spaces, special offers..."
            className="w-full text-base font-sans text-stone-900 placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 hover:bg-stone-100 rounded text-stone-400 hover:text-stone-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs px-2.5 py-1 bg-stone-100 hover:bg-stone-200 rounded text-stone-600 font-medium"
          >
            Esc
          </button>
        </div>

        {/* Content Area */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-5">
          {!query.trim() ? (
            <div>
              {history.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2">
                    <History className="w-3.5 h-3.5" />
                    <span>Recent Searches</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {history.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => setQuery(item)}
                        className="px-3 py-1 bg-stone-100 hover:bg-stone-200 rounded-full text-xs text-stone-700 transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-3 block">
                  Quick Discovery
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    onClick={() => handleSelectResult('/rooms', 'Rooms')}
                    className="p-3 text-left bg-stone-50 hover:bg-stone-100 rounded border border-stone-100 group transition-all"
                  >
                    <Bed className="w-4 h-4 text-[#B89358] mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold text-stone-800 block">Rooms & Suites</span>
                    <span className="text-[11px] text-stone-500">6 Categories</span>
                  </button>
                  <button
                    onClick={() => handleSelectResult('/dining', 'Dining')}
                    className="p-3 text-left bg-stone-50 hover:bg-stone-100 rounded border border-stone-100 group transition-all"
                  >
                    <Utensils className="w-4 h-4 text-[#B89358] mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold text-stone-800 block">Dining & Bars</span>
                    <span className="text-[11px] text-stone-500">Keuken & Vesper</span>
                  </button>
                  <button
                    onClick={() => handleSelectResult('/meetings', 'Meetings')}
                    className="p-3 text-left bg-stone-50 hover:bg-stone-100 rounded border border-stone-100 group transition-all"
                  >
                    <Calendar className="w-4 h-4 text-[#B89358] mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold text-stone-800 block">Meetings</span>
                    <span className="text-[11px] text-stone-500">Kapoelaga Hall</span>
                  </button>
                  <button
                    onClick={() => handleSelectResult('/offers', 'Offers')}
                    className="p-3 text-left bg-stone-50 hover:bg-stone-100 rounded border border-stone-100 group transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-[#B89358] mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-xs font-semibold text-stone-800 block">Special Offers</span>
                    <span className="text-[11px] text-stone-500">Staycation Packages</span>
                  </button>
                </div>
              </div>
            </div>
          ) : searchResults && searchResults.totalCount > 0 ? (
            <div className="space-y-5">
              {/* Rooms results */}
              {searchResults.rooms.length > 0 && (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2 block">
                    Rooms & Suites ({searchResults.rooms.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.rooms.map((room) => (
                      <button
                        key={room.id}
                        onClick={() => handleSelectResult(`/rooms/${room.slug}`)}
                        className="w-full text-left p-2.5 rounded hover:bg-stone-50 flex items-center justify-between border border-transparent hover:border-stone-200 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={room.image}
                            alt={room.name}
                            className="w-12 h-10 object-cover rounded"
                          />
                          <div>
                            <h4 className="text-xs font-semibold text-stone-900 group-hover:text-[#9E7A43] transition-colors">
                              {room.name}
                            </h4>
                            <p className="text-[11px] text-stone-500 line-clamp-1">
                              {room.size} · {room.bedType} · {formatPrice(room.priceIdr, currency)}/night
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dining results */}
              {searchResults.dining.length > 0 && (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2 block">
                    Dining & Lounges ({searchResults.dining.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.dining.map((venue) => (
                      <button
                        key={venue.id}
                        onClick={() => handleSelectResult(`/dining/${venue.slug}`)}
                        className="w-full text-left p-2.5 rounded hover:bg-stone-50 flex items-center justify-between border border-transparent hover:border-stone-200 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={venue.image}
                            alt={venue.name}
                            className="w-12 h-10 object-cover rounded"
                          />
                          <div>
                            <h4 className="text-xs font-semibold text-stone-900 group-hover:text-[#9E7A43] transition-colors">
                              {venue.name}
                            </h4>
                            <p className="text-[11px] text-stone-500 line-clamp-1">
                              {venue.cuisine} · {venue.location}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Meeting venues */}
              {searchResults.meetings.length > 0 && (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2 block">
                    Meetings & Spaces ({searchResults.meetings.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.meetings.map((m) => (
                      <button
                        key={m.id}
                        onClick={() => handleSelectResult('/meetings')}
                        className="w-full text-left p-2.5 rounded hover:bg-stone-50 flex items-center justify-between border border-transparent hover:border-stone-200 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <Calendar className="w-5 h-5 text-[#B89358]" />
                          <div>
                            <h4 className="text-xs font-semibold text-stone-900 group-hover:text-[#9E7A43] transition-colors">
                              {m.name}
                            </h4>
                            <p className="text-[11px] text-stone-500">
                              {m.area} · Up to {m.capacity.theater} guests
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Special offers */}
              {searchResults.offers.length > 0 && (
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-stone-400 mb-2 block">
                    Special Offers ({searchResults.offers.length})
                  </span>
                  <div className="space-y-1.5">
                    {searchResults.offers.map((offer) => (
                      <button
                        key={offer.id}
                        onClick={() => handleSelectResult('/offers')}
                        className="w-full text-left p-2.5 rounded hover:bg-stone-50 flex items-center justify-between border border-transparent hover:border-stone-200 transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <Sparkles className="w-5 h-5 text-[#B89358]" />
                          <div>
                            <h4 className="text-xs font-semibold text-stone-900 group-hover:text-[#9E7A43] transition-colors">
                              {offer.title}
                            </h4>
                            <p className="text-[11px] text-stone-500">
                              {offer.tag} · {offer.discount}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-stone-600 mb-1">No results found for "{query}"</p>
              <p className="text-xs text-stone-400">Try searching for "deluxe", "lagoon", "keuken", "vesper", or "spa"</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Search HotelPavilion directory</span>
          <button
            onClick={() => handleSelectResult('/rooms', query || 'All Rooms')}
            className="text-[#9E7A43] hover:underline font-medium"
          >
            Browse all accommodations →
          </button>
        </div>
      </div>
    </div>
  );
};
