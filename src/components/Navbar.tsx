import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Search, 
  Heart, 
  Menu, 
  X, 
  Calendar, 
  Globe, 
  Check, 
  ChevronDown 
} from 'lucide-react';
import { HOTEL_INFO, CURRENCY_RATES } from '../data/hotelData';
import { getCurrency, setCurrency, getSavedItemIds, CurrencyCode } from '../utils/storage';

interface NavbarProps {
  onOpenSearch: () => void;
  currency: CurrencyCode;
  onCurrencyChange: (c: CurrencyCode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSearch, currency, onCurrencyChange }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateSavedCount = () => {
      setSavedCount(getSavedItemIds().length);
    };
    updateSavedCount();
    window.addEventListener('storage', updateSavedCount);
    const interval = setInterval(updateSavedCount, 1500);
    return () => {
      window.removeEventListener('storage', updateSavedCount);
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Rooms & Suites', path: '/rooms' },
    { name: 'Dining', path: '/dining' },
    { name: 'Meetings & Events', path: '/meetings' },
    { name: 'Facilities', path: '/facilities' },
    { name: 'Offers', path: '/offers' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleCurrencySelect = (code: CurrencyCode) => {
    setCurrency(code);
    onCurrencyChange(code);
    setCurrencyDropdownOpen(false);
  };

  return (
    <>
      {/* Top Announcement & Utility Bar */}
      <div className="bg-[#121820] text-stone-300 text-xs border-b border-stone-800/80 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <a 
              href="tel:+622286012888" 
              className="flex items-center gap-1.5 hover:text-[#B89358] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#B89358]" />
              <span>+62 22 8601 2888</span>
            </a>
            <span className="text-stone-700">|</span>
            <a 
              href="mailto:concierge@hotelpavilion.com" 
              className="flex items-center gap-1.5 hover:text-[#B89358] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#B89358]" />
              <span>concierge@hotelpavilion.com</span>
            </a>
            <span className="text-stone-700">|</span>
            <span className="flex items-center gap-1.5 text-stone-400">
              <MapPin className="w-3.5 h-3.5 text-[#B89358]" />
              <span>Jl. R.E. Martadinata No. 68, Bandung</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Currency Selector */}
            <div className="relative">
              <button
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="flex items-center gap-1.5 py-1 px-2 rounded hover:bg-stone-800 transition-colors text-stone-300 hover:text-white"
                title="Change display currency"
              >
                <Globe className="w-3.5 h-3.5 text-[#B89358]" />
                <span className="font-medium">{currency}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {currencyDropdownOpen && (
                <div 
                  className="absolute right-0 mt-1 w-44 bg-white text-stone-800 rounded shadow-lg border border-stone-200 z-50 py-1"
                  onMouseLeave={() => setCurrencyDropdownOpen(false)}
                >
                  {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map((cCode) => (
                    <button
                      key={cCode}
                      onClick={() => handleCurrencySelect(cCode)}
                      className="w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-stone-50 transition-colors"
                    >
                      <span className={cCode === currency ? 'font-semibold text-[#9E7A43]' : ''}>
                        {CURRENCY_RATES[cCode].label}
                      </span>
                      {cCode === currency && <Check className="w-3.5 h-3.5 text-[#9E7A43]" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <span className="text-stone-700">|</span>

            {/* My Bookings Lookup */}
            <Link 
              to="/booking?tab=lookup" 
              className="hover:text-[#B89358] transition-colors flex items-center gap-1"
            >
              <Calendar className="w-3.5 h-3.5 text-[#B89358]" />
              <span>My Reservations</span>
            </Link>

            <span className="text-stone-700">|</span>

            {/* Saved Wishlist */}
            <Link 
              to="/wishlist" 
              className="hover:text-[#B89358] transition-colors flex items-center gap-1.5"
            >
              <Heart className={`w-3.5 h-3.5 ${savedCount > 0 ? 'fill-[#B89358] text-[#B89358]' : 'text-stone-400'}`} />
              <span>Saved ({savedCount})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Top Navigation Header */}
      <header 
        className={`sticky top-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-300 border-b ${
          scrolled ? 'border-stone-200/90 shadow-sm py-3' : 'border-stone-100 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            
            {/* Zone 1: Wordmark Brand Lockup */}
            <Link 
              to="/" 
              className="flex items-center gap-2 group whitespace-nowrap shrink-0"
            >
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 group-hover:text-[#9E7A43] transition-colors">
                HotelPavilion
              </span>
            </Link>

            {/* Zone 2: Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-stone-700">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || 
                  (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`whitespace-nowrap shrink-0 transition-colors pb-0.5 border-b-2 ${
                      isActive 
                        ? 'border-[#B89358] text-stone-900 font-semibold' 
                        : 'border-transparent hover:border-stone-400 hover:text-stone-900'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action Zone */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Search Modal Trigger */}
              <button
                onClick={onOpenSearch}
                aria-label="Open search dialog"
                className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors"
                title="Search rooms, dining, and offers"
              >
                <Search className="w-4 h-4" />
              </button>

              {/* Saved Mobile Shortcut */}
              <Link
                to="/wishlist"
                aria-label="Saved items"
                className="lg:hidden p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-100 rounded-full transition-colors relative"
              >
                <Heart className={`w-4 h-4 ${savedCount > 0 ? 'fill-[#B89358] text-[#B89358]' : ''}`} />
                {savedCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-[#B89358] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {savedCount}
                  </span>
                )}
              </Link>

              {/* Primary Book CTA */}
              <Link
                to="/booking"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B2430] hover:bg-[#B89358] transition-colors rounded shadow-xs whitespace-nowrap shrink-0"
              >
                Book Your Stay
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                className="lg:hidden p-2 text-stone-700 hover:bg-stone-100 rounded"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-2 mb-4">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                      isActive 
                        ? 'bg-stone-100 text-[#9E7A43] font-semibold' 
                        : 'text-stone-700 hover:bg-stone-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </div>

            <div className="pt-3 border-t border-stone-100 flex flex-col gap-3">
              <div className="flex items-center justify-between text-xs text-stone-600 px-3">
                <span>Display Currency:</span>
                <div className="flex items-center gap-1">
                  {(Object.keys(CURRENCY_RATES) as CurrencyCode[]).map((cCode) => (
                    <button
                      key={cCode}
                      onClick={() => handleCurrencySelect(cCode)}
                      className={`px-2 py-0.5 rounded text-xs font-medium ${
                        currency === cCode 
                          ? 'bg-[#1B2430] text-white' 
                          : 'bg-stone-100 text-stone-700'
                      }`}
                    >
                      {cCode}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-stone-600 px-3">
                <Link to="/booking?tab=lookup" className="text-stone-700 hover:text-[#9E7A43]">
                  Lookup Reservations
                </Link>
                <Link to="/wishlist" className="text-stone-700 hover:text-[#9E7A43]">
                  Wishlist ({savedCount})
                </Link>
              </div>

              <Link
                to="/booking"
                className="w-full text-center py-2.5 px-4 text-xs font-semibold uppercase tracking-wider text-white bg-[#1B2430] hover:bg-[#B89358] transition-colors rounded shadow-xs"
              >
                Book Your Stay
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
