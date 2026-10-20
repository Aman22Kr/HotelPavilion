import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ROOMS_DATA, HOTEL_INFO, OFFERS_DATA } from '../data/hotelData';
import { 
  saveBooking, 
  getBookings, 
  cancelBooking, 
  BookingRecord, 
  formatPrice, 
  CurrencyCode 
} from '../utils/storage';
import { SponsoredAdsSection } from '../components/SponsoredAdsSection';
import { 
  Calendar, 
  Users, 
  BedDouble, 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  Download, 
  Printer, 
  AlertCircle, 
  X, 
  Sparkles,
  ArrowRight,
  Clock,
  Car
} from 'lucide-react';

interface BookingPageProps {
  currency: CurrencyCode;
}

export const BookingPage: React.FC<BookingPageProps> = ({ currency }) => {
  const [searchParams] = useSearchParams();

  // Helper date defaults
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(tomorrow);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const initialCheckIn = searchParams.get('checkIn') || tomorrow.toISOString().split('T')[0];
  const initialCheckOut = searchParams.get('checkOut') || dayAfter.toISOString().split('T')[0];
  const initialRoomId = searchParams.get('roomId') || 'deluxe';
  const initialPlan = (searchParams.get('ratePlan') as any) || 'breakfast';
  const initialTab = searchParams.get('tab') || 'book';

  const [activeTab, setActiveTab] = useState<'book' | 'lookup'>(initialTab === 'lookup' ? 'lookup' : 'book');

  // Step state: 1: Details & Room, 2: Add-ons & Guest info, 3: Confirmed voucher
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [selectedRoomId, setSelectedRoomId] = useState(initialRoomId);
  const [adults, setAdults] = useState(parseInt(searchParams.get('adults') || '2') || 2);
  const [children, setChildren] = useState(0);
  const [ratePlan, setRatePlan] = useState<'room_only' | 'breakfast' | 'spa_package'>(initialPlan);
  const [promoCode, setPromoCode] = useState(searchParams.get('promo') || '');

  // Add-ons
  const [addTransfer, setAddTransfer] = useState(searchParams.get('transfer') === '1');
  const [addRomance, setAddRomance] = useState(searchParams.get('romance') === '1');
  const [addAfternoonTea, setAddAfternoonTea] = useState(false);

  // Guest Details
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');

  // Confirmed booking state
  const [confirmedBooking, setConfirmedBooking] = useState<BookingRecord | null>(null);

  // Lookup state
  const [bookingsList, setBookingsList] = useState<BookingRecord[]>([]);

  useEffect(() => {
    setBookingsList(getBookings());
  }, []);

  const selectedRoom = ROOMS_DATA.find((r) => r.id === selectedRoomId) || ROOMS_DATA[0];

  // Calculate nights
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.max(1, Math.round((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24)));

  // Calculate pricing
  const rateMultiplier = ratePlan === 'room_only' ? 0.9 : ratePlan === 'spa_package' ? 1.45 : 1.0;
  const promoDiscount = promoCode.trim().toUpperCase() === 'PAVILIONVIP' ? 0.15 : 0;
  
  const roomBaseTotal = selectedRoom.priceIdr * rateMultiplier * nights;
  const discountAmount = Math.round(roomBaseTotal * promoDiscount);
  const discountedRoomTotal = roomBaseTotal - discountAmount;

  const transferCost = addTransfer ? 250000 : 0;
  const romanceCost = addRomance ? 350000 : 0;
  const teaCost = addAfternoonTea ? 120000 : 0;
  const addOnsTotal = transferCost + romanceCost + teaCost;

  const grandTotalIdr = Math.round(discountedRoomTotal + addOnsTotal);

  const handleCreateReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestEmail.trim() || !guestPhone.trim()) return;

    const referenceCode = 'HPV-' + Math.floor(100000 + Math.random() * 900000);
    const addOnNames: string[] = [];
    if (addTransfer) addOnNames.push('Whoosh/Airport Limousine Transfer');
    if (addRomance) addOnNames.push('Romantic Floral & Wine Setup');
    if (addAfternoonTea) addOnNames.push('Koffie Story High Tea');

    const newBooking: BookingRecord = {
      id: Date.now().toString(),
      referenceCode,
      roomId: selectedRoom.id,
      roomName: selectedRoom.name,
      checkIn,
      checkOut,
      nights,
      adults,
      children,
      ratePlan,
      addOns: addOnNames,
      totalPriceIdr: grandTotalIdr,
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
      guestPhone: guestPhone.trim(),
      specialRequests: specialRequests.trim(),
      status: 'Confirmed',
      createdAt: new Date().toISOString()
    };

    saveBooking(newBooking);
    setConfirmedBooking(newBooking);
    setBookingsList(getBookings());
    setStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelReservation = (bookingId: string) => {
    if (window.confirm('Are you sure you wish to cancel this reservation?')) {
      const updated = cancelBooking(bookingId);
      setBookingsList(updated);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* Header Banner */}
      <section className="bg-[#121820] text-white py-14 sm:py-16 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B89358] mb-2 block">
            Direct Reservation Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            HotelPavilion Reservations
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto font-light leading-relaxed">
            Reserve your accommodations with guaranteed best direct rates, complimentary welcome beverages, and flexible terms.
          </p>

          {/* Mode Switch Tabs */}
          <div className="flex justify-center gap-2 mt-6">
            <button
              onClick={() => {
                setActiveTab('book');
                setStep(1);
              }}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'book'
                  ? 'bg-[#B89358] text-stone-900 shadow-sm'
                  : 'bg-white/10 text-stone-300 hover:bg-white/20'
              }`}
            >
              New Reservation
            </button>
            <button
              onClick={() => setActiveTab('lookup')}
              className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
                activeTab === 'lookup'
                  ? 'bg-[#B89358] text-stone-900 shadow-sm'
                  : 'bg-white/10 text-stone-300 hover:bg-white/20'
              }`}
            >
              My Reservations ({bookingsList.length})
            </button>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {activeTab === 'lookup' ? (
          /* My Bookings Lookup Section */
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-stone-900">
                  Your Stored Reservations
                </h2>
                <p className="text-xs text-stone-500">
                  Active and past bookings saved in your browser local storage.
                </p>
              </div>
              <button
                onClick={() => {
                  setActiveTab('book');
                  setStep(1);
                }}
                className="px-4 py-2 bg-[#1B2430] hover:bg-[#B89358] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                + Book Another Room
              </button>
            </div>

            {bookingsList.length > 0 ? (
              <div className="space-y-4">
                {bookingsList.map((b) => (
                  <div
                    key={b.id}
                    className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#B89358]">
                          {b.referenceCode}
                        </span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded ${
                          b.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                      <h3 className="font-serif text-lg font-bold text-stone-900">
                        {b.roomName}
                      </h3>
                      <div className="text-xs text-stone-600 flex flex-wrap gap-x-4 gap-y-1">
                        <span>Check-In: <strong>{b.checkIn}</strong></span>
                        <span>Check-Out: <strong>{b.checkOut}</strong></span>
                        <span>Duration: <strong>{b.nights} night(s)</strong></span>
                        <span>Guests: <strong>{b.adults} adult(s)</strong></span>
                      </div>
                      <div className="text-xs text-stone-500">
                        Guest: {b.guestName} ({b.guestEmail})
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end justify-between gap-3 pt-4 md:pt-0 border-t md:border-t-0 border-stone-100">
                      <div className="text-right">
                        <span className="text-[10px] text-stone-400 block uppercase">Total Paid / Due</span>
                        <span className="font-serif text-xl font-bold text-stone-900">
                          {formatPrice(b.totalPriceIdr, currency)}
                        </span>
                      </div>
                      {b.status === 'Confirmed' && (
                        <button
                          onClick={() => handleCancelReservation(b.id)}
                          className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 rounded border border-red-200 font-medium transition-colors"
                        >
                          Cancel Booking
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 text-center rounded-xl border border-stone-200">
                <Calendar className="w-10 h-10 text-stone-300 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-stone-800 mb-1">
                  No Reservations Found in Local Storage
                </h3>
                <p className="text-xs text-stone-500 mb-4 max-w-sm mx-auto">
                  You have not booked any rooms on this browser yet. Use the reservation form to simulate your stay.
                </p>
                <button
                  onClick={() => setActiveTab('book')}
                  className="px-5 py-2.5 bg-[#1B2430] hover:bg-[#B89358] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Create New Reservation
                </button>
              </div>
            )}
          </div>
        ) : step === 3 && confirmedBooking ? (
          /* Confirmation Screen Voucher */
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-stone-200 p-8 sm:p-10 shadow-lg space-y-6 animate-in zoom-in-95 duration-200">
            <div className="text-center pb-6 border-b border-stone-200">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                <Check className="w-6 h-6" />
              </div>
              <span className="text-xs uppercase tracking-widest text-[#B89358] font-semibold block mb-1">
                Reservation Confirmed
              </span>
              <h2 className="font-serif text-3xl font-bold text-stone-900 mb-1">
                We Look Forward to Welcoming You
              </h2>
              <p className="text-xs text-stone-500">
                A confirmation has been stored in your device's browser memory.
              </p>
            </div>

            {/* Voucher Details Card */}
            <div className="bg-[#FAF8F5] p-6 rounded-lg border border-stone-200/80 space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-stone-200">
                <div>
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Booking Reference</span>
                  <span className="font-mono text-base font-bold text-stone-900">
                    {confirmedBooking.referenceCode}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Status</span>
                  <span className="font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px]">
                    Confirmed
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Room Category</span>
                  <span className="font-bold text-stone-900 text-sm">{confirmedBooking.roomName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Plan Selected</span>
                  <span className="font-medium text-stone-800 capitalize">
                    {confirmedBooking.ratePlan.replace('_', ' ')}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Check-In</span>
                  <span className="font-medium text-stone-800">{confirmedBooking.checkIn} (from 14:00)</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Check-Out</span>
                  <span className="font-medium text-stone-800">{confirmedBooking.checkOut} (until 12:00)</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Guest Name</span>
                  <span className="font-medium text-stone-800">{confirmedBooking.guestName}</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase">Contact</span>
                  <span className="font-medium text-stone-800">{confirmedBooking.guestPhone}</span>
                </div>
              </div>

              {confirmedBooking.addOns.length > 0 && (
                <div className="pt-3 border-t border-stone-200">
                  <span className="text-stone-400 block text-[10px] uppercase mb-1">Add-on Services</span>
                  <div className="space-y-0.5 text-stone-700">
                    {confirmedBooking.addOns.map((ao, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-[#B89358]" />
                        <span>{ao}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-stone-200 flex items-center justify-between font-bold text-stone-900 text-sm">
                <span>Total Amount</span>
                <span className="text-[#9E7A43] font-serif text-lg tabular-nums">
                  {formatPrice(confirmedBooking.totalPriceIdr, currency)}
                </span>
              </div>
            </div>

            {/* Disclaimer & Actions */}
            <div className="bg-amber-50 p-4 rounded border border-amber-200 text-xs text-amber-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <p>
                <strong>Demo Simulation Notice:</strong> This reservation is stored locally on your device's browser memory (localStorage). No live credit card charge or payment was processed.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-stone-200">
              <button
                onClick={handlePrint}
                className="w-full sm:w-auto px-4 py-2 border border-stone-300 hover:bg-stone-50 rounded text-xs font-semibold flex items-center justify-center gap-2 text-stone-700"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Voucher Summary</span>
              </button>

              <div className="flex gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setActiveTab('lookup')}
                  className="w-full sm:w-auto px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-semibold"
                >
                  View in My Bookings
                </button>
                <Link
                  to="/"
                  className="w-full sm:w-auto px-4 py-2 bg-[#1B2430] hover:bg-[#B89358] text-white rounded text-xs font-semibold text-center"
                >
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Step-by-Step Booking Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left 8 cols: Form Steps */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Step indicator */}
              <div className="flex items-center gap-3 text-xs font-semibold">
                <button
                  onClick={() => setStep(1)}
                  className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${
                    step === 1 ? 'border-[#B89358] text-stone-900' : 'border-transparent text-stone-400'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px]">1</span>
                  <span>Dates & Accommodation</span>
                </button>
                <span className="text-stone-300">→</span>
                <button
                  onClick={() => setStep(2)}
                  className={`flex items-center gap-2 pb-2 border-b-2 transition-all ${
                    step === 2 ? 'border-[#B89358] text-stone-900' : 'border-transparent text-stone-400'
                  }`}
                >
                  <span className="w-5 h-5 rounded-full bg-stone-100 flex items-center justify-center text-[10px]">2</span>
                  <span>Guest Details & Add-ons</span>
                </button>
              </div>

              {step === 1 ? (
                /* STEP 1: Dates & Rooms Selection */
                <div className="space-y-6">
                  {/* Dates & Guests Box */}
                  <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      1. Stay Dates & Guests
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                      <div>
                        <label className="block text-stone-500 font-medium mb-1">Check-in</label>
                        <input
                          type="date"
                          value={checkIn}
                          onChange={(e) => setCheckIn(e.target.value)}
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-500 font-medium mb-1">Check-out</label>
                        <input
                          type="date"
                          value={checkOut}
                          min={checkIn}
                          onChange={(e) => setCheckOut(e.target.value)}
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-500 font-medium mb-1">Adults</label>
                        <select
                          value={adults}
                          onChange={(e) => setAdults(parseInt(e.target.value))}
                          aria-label="Adult Guests"
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                        >
                          <option value={1}>1 Adult</option>
                          <option value={2}>2 Adults</option>
                          <option value={3}>3 Adults</option>
                          <option value={4}>4 Adults</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-stone-500 font-medium mb-1">Children</label>
                        <select
                          value={children}
                          onChange={(e) => setChildren(parseInt(e.target.value))}
                          aria-label="Child Guests"
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                        >
                          <option value={0}>None</option>
                          <option value={1}>1 Child</option>
                          <option value={2}>2 Children</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Room Selection */}
                  <div className="space-y-4">
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      2. Choose Your Suite
                    </h3>

                    <div className="space-y-3">
                      {ROOMS_DATA.map((r) => {
                        const isSelected = selectedRoomId === r.id;
                        return (
                          <div
                            key={r.id}
                            onClick={() => setSelectedRoomId(r.id)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                              isSelected
                                ? 'border-[#B89358] bg-[#FAF8F5] ring-1 ring-[#B89358]'
                                : 'border-stone-200 bg-white hover:border-stone-300'
                            }`}
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={r.image}
                                alt={r.name}
                                className="w-20 h-16 object-cover rounded-lg shrink-0"
                              />
                              <div>
                                <h4 className="font-serif text-base font-bold text-stone-900">
                                  {r.name}
                                </h4>
                                <p className="text-xs text-stone-500 line-clamp-1">
                                  {r.size} · {r.capacity} · {r.bedType}
                                </p>
                                <span className="text-[11px] text-[#9E7A43] font-medium block mt-0.5">
                                  {r.highlights.slice(0, 2).join(' · ')}
                                </span>
                              </div>
                            </div>

                            <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-stone-100">
                              <span className="font-serif text-lg font-bold text-stone-900 tabular-nums">
                                {formatPrice(r.priceIdr, currency)}
                              </span>
                              <span className="text-[10px] text-stone-400">/ night</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Rate Plan Selection */}
                  <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      3. Select Rate Plan
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <label className={`p-4 rounded-lg border text-xs cursor-pointer transition-all ${
                        ratePlan === 'breakfast' ? 'border-[#B89358] bg-[#FAF8F5] font-semibold' : 'border-stone-200 hover:bg-stone-50'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-stone-900">Bed & Breakfast</span>
                          <input
                            type="radio"
                            name="plan"
                            checked={ratePlan === 'breakfast'}
                            onChange={() => setRatePlan('breakfast')}
                            className="accent-[#B89358]"
                          />
                        </div>
                        <p className="text-[11px] text-stone-500 font-normal">
                          Includes full buffet breakfast at Keuken for 2 guests daily.
                        </p>
                      </label>

                      <label className={`p-4 rounded-lg border text-xs cursor-pointer transition-all ${
                        ratePlan === 'room_only' ? 'border-[#B89358] bg-[#FAF8F5] font-semibold' : 'border-stone-200 hover:bg-stone-50'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-stone-900">Room Only (Save 10%)</span>
                          <input
                            type="radio"
                            name="plan"
                            checked={ratePlan === 'room_only'}
                            onChange={() => setRatePlan('room_only')}
                            className="accent-[#B89358]"
                          />
                        </div>
                        <p className="text-[11px] text-stone-500 font-normal">
                          Best flexible room-only rate without breakfast.
                        </p>
                      </label>

                      <label className={`p-4 rounded-lg border text-xs cursor-pointer transition-all ${
                        ratePlan === 'spa_package' ? 'border-[#B89358] bg-[#FAF8F5] font-semibold' : 'border-stone-200 hover:bg-stone-50'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-stone-900">Spa Retreat Bundle</span>
                          <input
                            type="radio"
                            name="plan"
                            checked={ratePlan === 'spa_package'}
                            onChange={() => setRatePlan('spa_package')}
                            className="accent-[#B89358]"
                          />
                        </div>
                        <p className="text-[11px] text-stone-500 font-normal">
                          Buffet breakfast + 60-min Tamarind massage for 2.
                        </p>
                      </label>
                    </div>
                  </div>

                  {/* Proceed to Step 2 Button */}
                  <button
                    onClick={() => setStep(2)}
                    className="w-full py-3 bg-[#1B2430] hover:bg-[#B89358] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-xs"
                  >
                    <span>Continue to Guest Details & Add-ons</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                /* STEP 2: Guest Details & Add-ons Form */
                <form onSubmit={handleCreateReservation} className="space-y-6">
                  {/* Add-ons */}
                  <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      Optional Concierge Add-ons
                    </h3>
                    <div className="space-y-3 text-xs">
                      <label className="flex items-center justify-between p-3 rounded border border-stone-200 hover:bg-stone-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={addTransfer}
                            onChange={(e) => setAddTransfer(e.target.checked)}
                            className="accent-[#B89358] rounded w-4 h-4"
                          />
                          <div>
                            <span className="font-semibold text-stone-900 block">Whoosh / Airport Limousine Pickup</span>
                            <span className="text-stone-500">Private driver directly to HotelPavilion lobby</span>
                          </div>
                        </div>
                        <span className="font-semibold text-stone-800">{formatPrice(250000, currency)}</span>
                      </label>

                      <label className="flex items-center justify-between p-3 rounded border border-stone-200 hover:bg-stone-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={addRomance}
                            onChange={(e) => setAddRomance(e.target.checked)}
                            className="accent-[#B89358] rounded w-4 h-4"
                          />
                          <div>
                            <span className="font-semibold text-stone-900 block">Romantic Rose Petal & Wine Styling</span>
                            <span className="text-stone-500">Curated room styling for anniversaries and honeymoons</span>
                          </div>
                        </div>
                        <span className="font-semibold text-stone-800">{formatPrice(350000, currency)}</span>
                      </label>

                      <label className="flex items-center justify-between p-3 rounded border border-stone-200 hover:bg-stone-50 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={addAfternoonTea}
                            onChange={(e) => setAddAfternoonTea(e.target.checked)}
                            className="accent-[#B89358] rounded w-4 h-4"
                          />
                          <div>
                            <span className="font-semibold text-stone-900 block">Koffie Story High Tea for Two</span>
                            <span className="text-stone-500">Delicate French-Indonesian pastries and specialty pour-over</span>
                          </div>
                        </div>
                        <span className="font-semibold text-stone-800">{formatPrice(120000, currency)}</span>
                      </label>
                    </div>
                  </div>

                  {/* Guest Information */}
                  <div className="bg-white p-6 rounded-xl border border-stone-200 shadow-xs space-y-4">
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      Primary Guest Information
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-stone-600 font-medium mb-1">Full Name *</label>
                        <input
                          type="text"
                          placeholder="e.g. Maya Indrawati"
                          value={guestName}
                          onChange={(e) => setGuestName(e.target.value)}
                          required
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 font-medium mb-1">Email Address *</label>
                        <input
                          type="email"
                          placeholder="you@email.com"
                          value={guestEmail}
                          onChange={(e) => setGuestEmail(e.target.value)}
                          required
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label className="block text-stone-600 font-medium mb-1">Phone / WhatsApp Number *</label>
                        <input
                          type="tel"
                          placeholder="+62 812-xxxx-xxxx"
                          value={guestPhone}
                          onChange={(e) => setGuestPhone(e.target.value)}
                          required
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                        />
                      </div>
                      <div>
                        <label className="block text-stone-600 font-medium mb-1">Promo Code (Optional)</label>
                        <input
                          type="text"
                          placeholder="Try code: PAVILIONVIP"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                        />
                      </div>
                    </div>

                    <div className="text-xs">
                      <label className="block text-stone-600 font-medium mb-1">Special In-Room Requests</label>
                      <textarea
                        rows={3}
                        placeholder="High floor room preference, non-smoking, late check-in time..."
                        value={specialRequests}
                        onChange={(e) => setSpecialRequests(e.target.value)}
                        className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded text-xs font-semibold"
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      className="flex-1 py-3 bg-[#1B2430] hover:bg-[#B89358] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                    >
                      Confirm Reservation Voucher
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right 4 cols: Sticky Reservation Summary */}
            <div className="lg:col-span-4 sticky top-24">
              <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-md space-y-4">
                <h3 className="font-serif text-lg font-bold text-stone-900 pb-3 border-b border-stone-100">
                  Stay Summary
                </h3>

                <div className="flex gap-3">
                  <img
                    src={selectedRoom.image}
                    alt={selectedRoom.name}
                    className="w-20 h-16 object-cover rounded"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-bold text-stone-900">{selectedRoom.name}</h4>
                    <span className="text-[11px] text-stone-500 block">{selectedRoom.size}</span>
                    <span className="text-[11px] text-[#9E7A43] font-medium capitalize">
                      Plan: {ratePlan.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 pt-3 border-t border-stone-100 text-xs text-stone-600">
                  <div className="flex justify-between">
                    <span>Dates:</span>
                    <span className="font-medium text-stone-900">{checkIn} to {checkOut}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span className="font-medium text-stone-900">{nights} night(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Guests:</span>
                    <span className="font-medium text-stone-900">{adults} Adult(s){children > 0 ? `, ${children} Child` : ''}</span>
                  </div>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-stone-100 text-xs">
                  <div className="flex justify-between text-stone-500">
                    <span>Room Charges:</span>
                    <span>{formatPrice(roomBaseTotal, currency)}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-700">
                      <span>VIP Promo Discount (15%):</span>
                      <span>-{formatPrice(discountAmount, currency)}</span>
                    </div>
                  )}

                  {addOnsTotal > 0 && (
                    <div className="flex justify-between text-stone-500">
                      <span>Concierge Add-ons:</span>
                      <span>{formatPrice(addOnsTotal, currency)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-stone-200">
                    <span>Total Amount:</span>
                    <span className="font-serif text-lg text-[#9E7A43] tabular-nums">
                      {formatPrice(grandTotalIdr, currency)}
                    </span>
                  </div>
                </div>

                <div className="bg-stone-50 p-3 rounded text-[11px] text-stone-500 space-y-1">
                  <div className="flex items-center gap-1.5 text-stone-700">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B89358]" />
                    <span>Free cancellation up to 48h prior</span>
                  </div>
                  <div>• Check-in from 14:00 PM</div>
                  <div>• Check-out until 12:00 PM</div>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Sponsored Ads Section */}
      <SponsoredAdsSection />

    </div>
  );
};
