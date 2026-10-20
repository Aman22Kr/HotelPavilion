import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Users, BedDouble, Tag, ArrowRight } from 'lucide-react';
import { ROOMS_DATA } from '../data/hotelData';

interface QuickBookingBarProps {
  className?: string;
  defaultRoomId?: string;
}

export const QuickBookingBar: React.FC<QuickBookingBarProps> = ({ className = '', defaultRoomId }) => {
  const navigate = useNavigate();

  // Helper date defaults
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 3);

  const formatDateForInput = (d: Date) => d.toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(formatDateForInput(tomorrow));
  const [checkOut, setCheckOut] = useState(formatDateForInput(dayAfter));
  const [roomId, setRoomId] = useState(defaultRoomId || 'all');
  const [adults, setAdults] = useState('2');
  const [promoCode, setPromoCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      roomId,
      adults,
      ...(promoCode ? { promo: promoCode.trim() } : {})
    });
    navigate(`/booking?${params.toString()}`);
  };

  return (
    <div className={`bg-white rounded-lg shadow-xl border border-stone-200/90 p-4 sm:p-5 ${className}`}>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
        {/* Check-In */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#B89358]" />
            <span>Check-in Date</span>
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="w-full text-xs font-medium text-stone-900 bg-stone-50 border border-stone-200 rounded px-3 py-2.5 focus:bg-white focus:outline-none focus:border-[#B89358] transition-colors"
          />
        </div>

        {/* Check-Out */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#B89358]" />
            <span>Check-out Date</span>
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full text-xs font-medium text-stone-900 bg-stone-50 border border-stone-200 rounded px-3 py-2.5 focus:bg-white focus:outline-none focus:border-[#B89358] transition-colors"
          />
        </div>

        {/* Room Category */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1.5">
            <BedDouble className="w-3.5 h-3.5 text-[#B89358]" />
            <span>Accommodation</span>
          </label>
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full text-xs font-medium text-stone-900 bg-stone-50 border border-stone-200 rounded px-3 py-2.5 focus:bg-white focus:outline-none focus:border-[#B89358] transition-colors"
          >
            <option value="all">Any Room / Best Rate</option>
            {ROOMS_DATA.map((room) => (
              <option key={room.id} value={room.id}>
                {room.name} ({room.size})
              </option>
            ))}
          </select>
        </div>

        {/* Guests / Promo */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-1.5 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-[#B89358]" />
            <span>Guests</span>
          </label>
          <div className="flex gap-2">
            <select
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              className="w-1/2 text-xs font-medium text-stone-900 bg-stone-50 border border-stone-200 rounded px-2 py-2.5 focus:bg-white focus:outline-none focus:border-[#B89358] transition-colors"
            >
              <option value="1">1 Adult</option>
              <option value="2">2 Adults</option>
              <option value="3">3 Adults</option>
              <option value="4">4 Adults</option>
            </select>
            <input
              type="text"
              placeholder="Promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-1/2 text-xs text-stone-900 bg-stone-50 border border-stone-200 rounded px-2 py-2.5 placeholder-stone-400 focus:bg-white focus:outline-none focus:border-[#B89358] transition-colors"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full h-[38px] bg-[#1B2430] hover:bg-[#B89358] text-white rounded text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <span>Check Rates</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>
    </div>
  );
};
