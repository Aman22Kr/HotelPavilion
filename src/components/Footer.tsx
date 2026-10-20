import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { HOTEL_INFO } from '../data/hotelData';
import { subscribeNewsletter } from '../utils/storage';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      subscribeNewsletter(email.trim());
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-[#121820] text-stone-300 pt-16 pb-8 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Heritage Overview */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <span className="font-serif text-2xl font-bold tracking-tight text-white hover:text-[#B89358] transition-colors">
                HotelPavilion
              </span>
            </Link>
            <p className="text-xs text-stone-400 leading-relaxed mb-5">
              A 12-storey modern colonial sanctuary nestled on historic Jalan R.E. Martadinata. Blending classic Dutch colonial architectural elegance with warm Indonesian hospitality, 145 luxury rooms, and world-class culinary experiences.
            </p>
            <div className="flex items-center gap-2 text-xs text-[#B89358]">
              <Award className="w-4 h-4 shrink-0" />
              <span>4.8 / 5.0 TripAdvisor Luxury Boutique Winner</span>
            </div>
          </div>

          {/* Quick Subpages Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Explore Our Hotel
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/rooms" className="text-stone-400 hover:text-[#B89358] transition-colors">
                  Rooms & Suites (Deluxe to Presidential)
                </Link>
              </li>
              <li>
                <Link to="/dining" className="text-stone-400 hover:text-[#B89358] transition-colors">
                  Keuken Dining & Vesper Sky Lounge
                </Link>
              </li>
              <li>
                <Link to="/meetings" className="text-stone-400 hover:text-[#B89358] transition-colors">
                  Kapoelaga Function Hall & Meetings
                </Link>
              </li>
              <li>
                <Link to="/facilities" className="text-stone-400 hover:text-[#B89358] transition-colors">
                  Lagoon Pool & Tamarind Spa
                </Link>
              </li>
              <li>
                <Link to="/offers" className="text-stone-400 hover:text-[#B89358] transition-colors">
                  Special Packages & Staycation Deals
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-stone-400 hover:text-[#B89358] transition-colors">
                  Photo & Architecture Gallery
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-stone-400 hover:text-[#B89358] transition-colors">
                  Our Story & Colonial Heritage
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-stone-400 hover:text-[#B89358] transition-colors">
                  Directions, Map & Concierge
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Location Details */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Concierge & Address
            </h4>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B89358] shrink-0 mt-0.5" />
                <span>{HOTEL_INFO.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B89358] shrink-0" />
                <a href="tel:+622286012888" className="hover:text-[#B89358] transition-colors">
                  {HOTEL_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B89358] shrink-0" />
                <a href="mailto:concierge@hotelpavilion.com" className="hover:text-[#B89358] transition-colors">
                  {HOTEL_INFO.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#B89358] shrink-0" />
                <span>Check-in: 14:00 · Check-out: 12:00</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Club & Privileges */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-2">
              Pavilion Privilege Club
            </h4>
            <p className="text-xs text-stone-400 leading-relaxed mb-4">
              Subscribe to receive exclusive secret staycation rates, rooftop event invitations, and seasonal chef tasting menus.
            </p>
            {subscribed ? (
              <div className="bg-emerald-950/60 border border-emerald-700/50 rounded p-3 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>Thank you for subscribing! Your secret promo code has been saved.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="w-full bg-stone-900 border border-stone-700 text-white placeholder-stone-500 rounded px-3 py-2 text-xs focus:outline-none focus:border-[#B89358] transition-colors"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-3 bg-[#B89358] hover:bg-[#9E7A43] text-stone-900 hover:text-white rounded text-xs font-semibold flex items-center transition-colors"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-500">
                  <ShieldCheck className="w-3 h-3 text-[#B89358]" />
                  <span>No spam. Persistent state saved in local storage.</span>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar: Copyright & GitHub username credit */}
        <div className="pt-8 border-t border-stone-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} {HOTEL_INFO.legalName}. All rights reserved.</span>
            <span>·</span>
            <span>Recreated for GitHub: <span className="text-stone-300 font-medium">Aman22kr</span></span>
          </div>
          <div className="flex items-center gap-4 text-stone-400">
            <Link to="/about" className="hover:text-stone-200">Heritage</Link>
            <Link to="/contact" className="hover:text-stone-200">Directions</Link>
            <Link to="/booking?tab=lookup" className="hover:text-stone-200">Lookup Booking</Link>
            <a 
              href="#top" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-[#B89358] transition-colors"
            >
              Back to Top ↑
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
