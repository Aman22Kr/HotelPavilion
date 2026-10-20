import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Maximize2, Users, BedDouble, Check, ArrowRight } from 'lucide-react';
import { RoomItem } from '../data/hotelData';
import { formatPrice, isItemSaved, toggleSavedItemId, CurrencyCode } from '../utils/storage';

interface RoomCardProps {
  room: RoomItem;
  currency: CurrencyCode;
  onSavedChange?: () => void;
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, currency, onSavedChange }) => {
  const [saved, setSaved] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setSaved(isItemSaved(room.id));
  }, [room.id]);

  const handleToggleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleSavedItemId(room.id);
    setSaved(!saved);
    if (onSavedChange) onSavedChange();
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border border-stone-200/90 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col group">
      {/* Image Container */}
      <div className="relative aspect-4/3 overflow-hidden bg-stone-100">
        {!imgError ? (
          <img
            src={room.image}
            alt={room.name}
            onError={() => setImgError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-stone-200 text-stone-500 p-4">
            <BedDouble className="w-8 h-8 text-[#B89358] mb-2" />
            <span className="text-xs font-serif font-bold text-stone-700">{room.name}</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleToggleSave}
          aria-label={saved ? 'Remove from saved' : 'Save room to wishlist'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-stone-700 hover:text-red-500 shadow-sm transition-all"
        >
          <Heart className={`w-4 h-4 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Category Label */}
        <div className="absolute bottom-3 left-3 bg-[#121820]/80 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded tracking-wide font-medium">
          {room.category}
        </div>
      </div>

      {/* Content Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Tagline */}
          <Link to={`/rooms/${room.slug}`}>
            <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#9E7A43] transition-colors mb-1">
              {room.name}
            </h3>
          </Link>
          <p className="text-xs text-stone-500 line-clamp-2 mb-4 leading-relaxed">
            {room.tagline}
          </p>

          {/* Room Specs - Typography with separators (Zero-Pill discipline) */}
          <div className="flex items-center gap-2 text-xs text-stone-600 mb-4 pb-4 border-b border-stone-100">
            <span className="flex items-center gap-1">
              <Maximize2 className="w-3.5 h-3.5 text-[#B89358]" />
              {room.size}
            </span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-[#B89358]" />
              {room.capacity}
            </span>
            <span className="text-stone-300">·</span>
            <span className="flex items-center gap-1">
              <BedDouble className="w-3.5 h-3.5 text-[#B89358]" />
              {room.bedType.split(' or ')[0]}
            </span>
          </div>

          {/* Highlights checklist */}
          <div className="space-y-1 mb-5">
            {room.highlights.slice(0, 3).map((hl, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs text-stone-600">
                <Check className="w-3 h-3 text-[#B89358] shrink-0" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Action */}
        <div className="pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-stone-400 block uppercase tracking-wider">Starts From</span>
            <span className="text-base font-bold text-stone-900 font-sans tabular-nums">
              {formatPrice(room.priceIdr, currency)}
            </span>
            <span className="text-[11px] text-stone-500"> / night</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/rooms/${room.slug}`}
              className="px-3 py-2 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded transition-colors"
            >
              Details
            </Link>
            <Link
              to={`/booking?roomId=${room.id}`}
              className="px-3.5 py-2 text-xs font-semibold text-white bg-[#1B2430] hover:bg-[#B89358] rounded transition-colors flex items-center gap-1 shadow-xs"
            >
              <span>Book</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
