import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DINING_VENUES } from '../data/hotelData';
import { SponsoredAdsSection } from '../components/SponsoredAdsSection';
import { Clock, MapPin, Wine, Utensils, Coffee, Check, ArrowRight, Calendar, Users, CheckCircle2 } from 'lucide-react';

export const DiningPage: React.FC = () => {
  const [reserveVenue, setReserveVenue] = useState<string | null>(null);
  const [resDate, setResDate] = useState(new Date().toISOString().split('T')[0]);
  const [resTime, setResTime] = useState('19:00');
  const [resGuests, setResGuests] = useState('2');
  const [resName, setResName] = useState('');
  const [resPhone, setResPhone] = useState('');
  const [resNotes, setResNotes] = useState('');
  const [resSubmitted, setResSubmitted] = useState(false);

  const handleTableReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resName || !resPhone) return;

    // Save reservation to local storage
    const existing = JSON.parse(localStorage.getItem('hotelpavilion_table_reservations') || '[]');
    const newRes = {
      id: 'RES-' + Date.now().toString().slice(-6),
      venue: reserveVenue,
      date: resDate,
      time: resTime,
      guests: resGuests,
      name: resName,
      phone: resPhone,
      notes: resNotes,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('hotelpavilion_table_reservations', JSON.stringify([newRes, ...existing]));
    setResSubmitted(true);
    setTimeout(() => {
      setReserveVenue(null);
      setResSubmitted(false);
      setResName('');
      setResPhone('');
      setResNotes('');
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* Header Banner */}
      <section className="bg-[#121820] text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B89358] mb-3 block">
            Culinary Heritage & Rooftop Vistas
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Dining & Lounges
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            From the bustling open kitchen of Keuken All Day Dining to the panoramic starlight at Vesper Sky Bar, embark on an authentic gastronomic journey in the heart of Bandung.
          </p>
        </div>
      </section>

      {/* Venues Showcase List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {DINING_VENUES.map((venue, idx) => {
          const isReversed = idx % 2 === 1;
          return (
            <div
              key={venue.id}
              className={`bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch`}
            >
              {/* Image side */}
              <div className={`lg:col-span-6 relative aspect-16/10 lg:aspect-auto ${isReversed ? 'lg:order-2' : ''}`}>
                <img
                  src={venue.image}
                  alt={venue.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-[#121820]/80 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded font-medium">
                  {venue.location}
                </div>
              </div>

              {/* Text & Specs side */}
              <div className={`lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between ${isReversed ? 'lg:order-1' : ''}`}>
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#9E7A43] font-semibold mb-2">
                    <span>{venue.cuisine}</span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
                    {venue.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500 italic mb-4 font-serif">
                    "{venue.tagline}"
                  </p>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                    {venue.description}
                  </p>

                  {/* Details box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded border border-stone-200/80 text-xs mb-6">
                    <div className="flex items-center gap-2 text-stone-700">
                      <Clock className="w-3.5 h-3.5 text-[#B89358] shrink-0" />
                      <span>{venue.hours}</span>
                    </div>
                    <div className="flex items-center gap-2 text-stone-700">
                      <Utensils className="w-3.5 h-3.5 text-[#B89358] shrink-0" />
                      <span>{venue.dressCode}</span>
                    </div>
                  </div>

                  {/* Signature Highlights */}
                  <div className="mb-6">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-2">
                      Signature Specialties
                    </span>
                    <div className="space-y-1.5">
                      {venue.signatureDishes.slice(0, 3).map((dish, i) => (
                        <div key={i} className="flex items-baseline justify-between text-xs pb-1 border-b border-stone-100 last:border-0">
                          <span className="font-medium text-stone-900">{dish.name}</span>
                          <span className="text-[#9E7A43] font-semibold ml-2 tabular-nums">{dish.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-3 pt-4 border-t border-stone-100">
                  <button
                    onClick={() => setReserveVenue(venue.name)}
                    className="px-4 py-2 bg-[#1B2430] hover:bg-[#B89358] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    Reserve Table
                  </button>
                  <Link
                    to={`/dining/${venue.slug}`}
                    className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    <span>View Menu</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Table Reservation Modal */}
      {reserveVenue && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl border border-stone-200 w-full max-w-lg p-6 animate-in fade-in zoom-in-95 duration-150">
            <h3 className="font-serif text-2xl font-bold text-stone-900 mb-1">
              Table Reservation
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              Reserve your dining table at <span className="font-semibold text-stone-800">{reserveVenue}</span>.
            </p>

            {resSubmitted ? (
              <div className="p-6 bg-emerald-50 text-emerald-900 rounded border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-base">Table Request Confirmed</h4>
                <p className="text-xs text-emerald-700">
                  Our food & beverage concierge has received your request. Saved in your local browser records.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTableReservation} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-500 font-medium mb-1">Date</label>
                    <input
                      type="date"
                      value={resDate}
                      onChange={(e) => setResDate(e.target.value)}
                      required
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded focus:outline-none focus:border-[#B89358]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-500 font-medium mb-1">Time</label>
                    <select
                      value={resTime}
                      onChange={(e) => setResTime(e.target.value)}
                      aria-label="Reservation Time"
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded focus:outline-none focus:border-[#B89358]"
                    >
                      <option value="12:00">12:00 PM (Lunch)</option>
                      <option value="13:00">01:00 PM (Lunch)</option>
                      <option value="17:30">05:30 PM (Sunset)</option>
                      <option value="18:30">06:30 PM (Sunset)</option>
                      <option value="19:30">07:30 PM (Dinner)</option>
                      <option value="20:30">08:30 PM (Dinner)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-stone-500 font-medium mb-1">Guests</label>
                    <select
                      value={resGuests}
                      onChange={(e) => setResGuests(e.target.value)}
                      aria-label="Number of Guests"
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded focus:outline-none focus:border-[#B89358]"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="4">4 Persons</option>
                      <option value="6">6 Persons</option>
                      <option value="8+">8+ Group</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-500 font-medium mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+62 812-xxxx-xxxx"
                      value={resPhone}
                      onChange={(e) => setResPhone(e.target.value)}
                      required
                      className="w-full p-2 bg-stone-50 border border-stone-200 rounded focus:outline-none focus:border-[#B89358]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-500 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="Guest Name"
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    required
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded focus:outline-none focus:border-[#B89358]"
                  />
                </div>

                <div>
                  <label className="block text-stone-500 font-medium mb-1">Special Dietary / Seating Requests</label>
                  <textarea
                    rows={2}
                    placeholder="Window seat, anniversary candle, vegetarian..."
                    value={resNotes}
                    onChange={(e) => setResNotes(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded focus:outline-none focus:border-[#B89358]"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setReserveVenue(null)}
                    className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#1B2430] hover:bg-[#B89358] text-white rounded font-semibold uppercase tracking-wider"
                  >
                    Confirm Table Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Sponsored Ads Section */}
      <SponsoredAdsSection />

    </div>
  );
};
