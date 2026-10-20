import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ROOMS_DATA, 
  HOTEL_INFO 
} from '../data/hotelData';
import { 
  formatPrice, 
  isItemSaved, 
  toggleSavedItemId, 
  addCustomReview, 
  getCustomReviews, 
  CurrencyCode 
} from '../utils/storage';
import { SponsoredAdsSection } from '../components/SponsoredAdsSection';
import { 
  Heart, 
  Maximize2, 
  Users, 
  BedDouble, 
  Check, 
  Star, 
  Calendar, 
  ShieldCheck, 
  ArrowLeft, 
  Share2, 
  Sparkles, 
  Coffee,
  CheckCircle2,
  Tv,
  Wifi,
  Wind
} from 'lucide-react';

interface RoomDetailPageProps {
  currency: CurrencyCode;
}

export const RoomDetailPage: React.FC<RoomDetailPageProps> = ({ currency }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const room = ROOMS_DATA.find((r) => r.slug === slug) || ROOMS_DATA[0];

  const [activeImage, setActiveImage] = useState(room.image);
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  // Booking calculator state
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(tomorrow);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const [checkIn, setCheckIn] = useState(tomorrow.toISOString().split('T')[0]);
  const [checkOut, setCheckOut] = useState(dayAfter.toISOString().split('T')[0]);
  const [ratePlan, setRatePlan] = useState<'room_only' | 'breakfast' | 'spa_package'>('breakfast');
  const [airportTransfer, setAirportTransfer] = useState(false);
  const [romanceSetup, setRomanceSetup] = useState(false);

  // Review modal state
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewOrigin, setReviewOrigin] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewsList, setReviewsList] = useState(getCustomReviews());
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    setActiveImage(room.image);
    setSaved(isItemSaved(room.id));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [room]);

  const handleToggleSave = () => {
    toggleSavedItemId(room.id);
    setSaved(!saved);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  // Calculate nights
  const nights = Math.max(1, Math.round((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 3600 * 24)));

  // Calculate total
  const baseRatePerNight = room.priceIdr;
  const rateMultiplier = ratePlan === 'room_only' ? 0.9 : ratePlan === 'spa_package' ? 1.45 : 1.0;
  const roomCostTotal = baseRatePerNight * rateMultiplier * nights;
  const addOnsTotal = (airportTransfer ? 250000 : 0) + (romanceSetup ? 350000 : 0);
  const grandTotal = Math.round(roomCostTotal + addOnsTotal);

  const handleProceedToBooking = () => {
    const params = new URLSearchParams({
      roomId: room.id,
      checkIn,
      checkOut,
      ratePlan,
      transfer: airportTransfer ? '1' : '0',
      romance: romanceSetup ? '1' : '0'
    });
    navigate(`/booking?${params.toString()}`);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewComment.trim()) return;

    const newRev = {
      id: Date.now().toString(),
      author: reviewAuthor.trim(),
      origin: reviewOrigin.trim() || 'Guest',
      stayDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      roomType: room.name,
      rating: reviewRating,
      title: reviewTitle.trim() || 'Remarkable Stay',
      comment: reviewComment.trim()
    };

    addCustomReview(newRev);
    setReviewsList([newRev, ...reviewsList]);
    setReviewSubmitted(true);
    setTimeout(() => {
      setShowReviewForm(false);
      setReviewSubmitted(false);
      setReviewAuthor('');
      setReviewComment('');
      setReviewTitle('');
    }, 2000);
  };

  // Related other rooms
  const relatedRooms = ROOMS_DATA.filter((r) => r.id !== room.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* Top Breadcrumb & Actions */}
      <div className="bg-white border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Link to="/rooms" className="hover:text-[#9E7A43] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Accommodations</span>
            </Link>
            <span className="text-stone-300">/</span>
            <span className="text-stone-900 font-medium">{room.name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1 hover:text-stone-900 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share'}</span>
            </button>
            <span className="text-stone-300">|</span>
            <button
              onClick={handleToggleSave}
              className="flex items-center gap-1 text-stone-700 hover:text-red-500 transition-colors"
            >
              <Heart className={`w-3.5 h-3.5 ${saved ? 'fill-red-500 text-red-500' : ''}`} />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Gallery Showcase */}
        <div className="space-y-3 mb-10">
          <div className="aspect-16/9 md:aspect-21/9 rounded-lg overflow-hidden bg-stone-900 shadow-md">
            <img
              src={activeImage}
              alt={room.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>
          {room.gallery.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {room.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-28 h-18 rounded overflow-hidden shrink-0 border-2 transition-all ${
                    activeImage === img ? 'border-[#B89358] opacity-100' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${room.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Main Content & Sticky Booking Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Room Details */}
          <div className="lg:col-span-8 space-y-10">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
                <span className="text-[#9E7A43] font-semibold">{room.category}</span>
                <span>·</span>
                <div className="flex items-center gap-1 text-[#B89358]">
                  <Star className="w-3.5 h-3.5 fill-[#B89358]" />
                  <span className="font-semibold">{room.rating}</span>
                  <span className="text-stone-400">({room.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 mb-3">
                {room.name}
              </h1>
              <p className="text-stone-600 text-sm leading-relaxed mb-6 font-light">
                {room.description}
              </p>

              {/* Spatial Specs Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white rounded-lg border border-stone-200 text-xs">
                <div>
                  <span className="text-stone-400 block mb-0.5">Room Size</span>
                  <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Maximize2 className="w-3.5 h-3.5 text-[#B89358]" />
                    {room.size}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">Maximum Guests</span>
                  <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#B89358]" />
                    {room.capacity}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">Bedding</span>
                  <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <BedDouble className="w-3.5 h-3.5 text-[#B89358]" />
                    {room.bedType}
                  </span>
                </div>
                <div>
                  <span className="text-stone-400 block mb-0.5">View</span>
                  <span className="font-semibold text-stone-900 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#B89358]" />
                    City & Courtyard
                  </span>
                </div>
              </div>
            </div>

            {/* Room Amenities */}
            <div className="bg-white p-6 rounded-lg border border-stone-200">
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-4">
                Suite Amenities & Appointments
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {room.amenities.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-stone-700">
                    <Check className="w-3.5 h-3.5 text-[#B89358] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Dutch Colonial Architectural Elements */}
            <div className="bg-stone-100/70 p-6 rounded-lg border border-stone-200">
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                Colonial Architectural Signatures
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Every {room.name} incorporates thoughtful historical nuances: handcrafted teak moldings, vintage luggage table chests reminiscent of European luxury train voyages, sound-insulated colonial window casements, and an integrated walk-through vanity bathroom.
              </p>
            </div>

            {/* Reviews Section */}
            <div className="bg-white p-6 rounded-lg border border-stone-200">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-serif text-xl font-bold text-stone-900">
                    Guest Impressions ({room.reviewCount + reviewsList.filter(r => r.roomType === room.name).length})
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                    <div className="flex text-[#B89358]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#B89358]" />
                      ))}
                    </div>
                    <span>{room.rating} out of 5 based on verified stays</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-3.5 py-1.5 border border-[#B89358] text-[#9E7A43] hover:bg-[#B89358] hover:text-white rounded text-xs font-semibold transition-colors"
                >
                  {showReviewForm ? 'Cancel' : 'Write a Review'}
                </button>
              </div>

              {/* Review submission form */}
              {showReviewForm && (
                <form onSubmit={handleReviewSubmit} className="bg-stone-50 p-4 rounded border border-stone-200 mb-6 space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-700">
                    Share Your Experience
                  </h4>
                  {reviewSubmitted ? (
                    <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Review submitted! Saved locally for your session.</span>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={reviewAuthor}
                          onChange={(e) => setReviewAuthor(e.target.value)}
                          required
                          className="text-xs p-2 bg-white border border-stone-200 rounded focus:outline-none focus:border-[#B89358]"
                        />
                        <input
                          type="text"
                          placeholder="City / Country (e.g. Jakarta, ID)"
                          value={reviewOrigin}
                          onChange={(e) => setReviewOrigin(e.target.value)}
                          className="text-xs p-2 bg-white border border-stone-200 rounded focus:outline-none focus:border-[#B89358]"
                        />
                      </div>
                      <div className="flex items-center gap-2 text-xs text-stone-600">
                        <span>Rating:</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewRating(star)}
                              className="p-1 text-stone-300 hover:text-[#B89358]"
                            >
                              <Star className={`w-4 h-4 ${star <= reviewRating ? 'fill-[#B89358] text-[#B89358]' : ''}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                      <input
                        type="text"
                        placeholder="Headline / Review Title"
                        value={reviewTitle}
                        onChange={(e) => setReviewTitle(e.target.value)}
                        className="w-full text-xs p-2 bg-white border border-stone-200 rounded focus:outline-none focus:border-[#B89358]"
                      />
                      <textarea
                        rows={3}
                        placeholder="What did you love most about your stay?"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        required
                        className="w-full text-xs p-2 bg-white border border-stone-200 rounded focus:outline-none focus:border-[#B89358]"
                      />
                      <button
                        type="submit"
                        className="px-4 py-2 bg-[#1B2430] hover:bg-[#B89358] text-white text-xs font-semibold rounded transition-colors"
                      >
                        Submit Review
                      </button>
                    </>
                  )}
                </form>
              )}

              {/* Sample Reviews */}
              <div className="space-y-4">
                {reviewsList
                  .filter((r) => r.roomType === room.name)
                  .map((rev) => (
                    <div key={rev.id} className="pb-4 border-b border-stone-100 last:border-b-0">
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-stone-900">{rev.author} ({rev.origin})</span>
                        <span className="text-stone-400">{rev.stayDate}</span>
                      </div>
                      <div className="flex text-[#B89358] mb-1">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#B89358]" />
                        ))}
                      </div>
                      <p className="font-medium text-xs text-stone-800 mb-0.5">{rev.title}</p>
                      <p className="text-xs text-stone-600 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Booking Calculator Card */}
          <div className="lg:col-span-4 sticky top-24">
            <div className="bg-white rounded-lg shadow-xl border border-stone-200 p-6 space-y-5">
              
              <div className="pb-4 border-b border-stone-100">
                <span className="text-[10px] uppercase tracking-wider text-stone-400 block">Direct Guaranteed Rate</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-3xl font-bold text-stone-900 tabular-nums">
                    {formatPrice(room.priceIdr, currency)}
                  </span>
                  <span className="text-xs text-stone-500">/ night</span>
                </div>
              </div>

              {/* Date Selection */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-stone-400 mb-1">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded font-medium focus:outline-none focus:border-[#B89358]"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-semibold uppercase text-stone-400 mb-1">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full p-2 bg-stone-50 border border-stone-200 rounded font-medium focus:outline-none focus:border-[#B89358]"
                  />
                </div>
              </div>

              <div className="text-[11px] text-stone-500 text-center font-medium">
                {nights} night{nights > 1 ? 's' : ''} stay
              </div>

              {/* Rate Plan Options */}
              <div className="space-y-2">
                <label className="block text-[10px] font-semibold uppercase text-stone-400">Select Rate Plan</label>
                
                <label className={`block p-2.5 rounded border text-xs cursor-pointer transition-all ${
                  ratePlan === 'breakfast' ? 'border-[#B89358] bg-[#FAF8F5]' : 'border-stone-200 hover:bg-stone-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900">Bed & Keuken Breakfast</span>
                    <input
                      type="radio"
                      name="ratePlan"
                      checked={ratePlan === 'breakfast'}
                      onChange={() => setRatePlan('breakfast')}
                      className="accent-[#B89358]"
                    />
                  </div>
                  <span className="text-[11px] text-stone-500 block mt-0.5">Includes full buffet breakfast for 2 daily</span>
                </label>

                <label className={`block p-2.5 rounded border text-xs cursor-pointer transition-all ${
                  ratePlan === 'room_only' ? 'border-[#B89358] bg-[#FAF8F5]' : 'border-stone-200 hover:bg-stone-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900">Room Only (Save 10%)</span>
                    <input
                      type="radio"
                      name="ratePlan"
                      checked={ratePlan === 'room_only'}
                      onChange={() => setRatePlan('room_only')}
                      className="accent-[#B89358]"
                    />
                  </div>
                  <span className="text-[11px] text-stone-500 block mt-0.5">Flexible accommodation without meals</span>
                </label>

                <label className={`block p-2.5 rounded border text-xs cursor-pointer transition-all ${
                  ratePlan === 'spa_package' ? 'border-[#B89358] bg-[#FAF8F5]' : 'border-stone-200 hover:bg-stone-50'
                }`}>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-stone-900">Spa & Rejuvenation Retreat</span>
                    <input
                      type="radio"
                      name="ratePlan"
                      checked={ratePlan === 'spa_package'}
                      onChange={() => setRatePlan('spa_package')}
                      className="accent-[#B89358]"
                    />
                  </div>
                  <span className="text-[11px] text-stone-500 block mt-0.5">Includes breakfast + 60-min massage for 2</span>
                </label>
              </div>

              {/* Add-ons */}
              <div className="space-y-2 pt-2 border-t border-stone-100">
                <label className="block text-[10px] font-semibold uppercase text-stone-400">Enhance Your Stay</label>
                
                <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={airportTransfer}
                      onChange={(e) => setAirportTransfer(e.target.checked)}
                      className="accent-[#B89358] rounded"
                    />
                    <span>Airport / Whoosh Station Transfer</span>
                  </div>
                  <span className="text-stone-500 font-medium">{formatPrice(250000, currency)}</span>
                </label>

                <label className="flex items-center justify-between text-xs text-stone-700 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={romanceSetup}
                      onChange={(e) => setRomanceSetup(e.target.checked)}
                      className="accent-[#B89358] rounded"
                    />
                    <span>Romantic Floral & Wine Setup</span>
                  </div>
                  <span className="text-stone-500 font-medium">{formatPrice(350000, currency)}</span>
                </label>
              </div>

              {/* Total Summary */}
              <div className="pt-3 border-t border-stone-100 space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Room & Plan ({nights} night{nights > 1 ? 's' : ''})</span>
                  <span>{formatPrice(roomCostTotal, currency)}</span>
                </div>
                {addOnsTotal > 0 && (
                  <div className="flex justify-between text-stone-500">
                    <span>Selected Add-ons</span>
                    <span>{formatPrice(addOnsTotal, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-stone-200">
                  <span>Total Estimated Cost</span>
                  <span className="tabular-nums text-[#9E7A43] font-serif text-lg">
                    {formatPrice(grandTotal, currency)}
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleProceedToBooking}
                className="w-full py-3 bg-[#1B2430] hover:bg-[#B89358] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
              >
                Proceed to Reservation
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B89358]" />
                <span>Instant Confirmation · No hidden fees</span>
              </div>
            </div>
          </div>

        </div>

        {/* Related Accommodations */}
        <div className="mt-20 pt-10 border-t border-stone-200">
          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">
            Other Distinctive Suites You May Enjoy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedRooms.map((r) => (
              <div key={r.id} className="bg-white rounded-lg border border-stone-200 overflow-hidden group">
                <div className="aspect-16/9 overflow-hidden">
                  <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div className="p-4">
                  <h4 className="font-serif font-bold text-stone-900 text-base mb-1">{r.name}</h4>
                  <p className="text-xs text-stone-500 mb-3">{r.size} · {r.capacity}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900">{formatPrice(r.priceIdr, currency)} / night</span>
                    <Link to={`/rooms/${r.slug}`} className="text-xs font-semibold text-[#9E7A43] hover:underline">
                      View Suite →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Sponsored Ads Section */}
      <SponsoredAdsSection />

    </div>
  );
};
