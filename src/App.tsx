import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { RoomDetailPage } from './pages/RoomDetailPage';
import { DiningPage } from './pages/DiningPage';
import { DiningDetailPage } from './pages/DiningDetailPage';
import { MeetingsPage } from './pages/MeetingsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { OffersPage } from './pages/OffersPage';
import { GalleryPage } from './pages/GalleryPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { BookingPage } from './pages/BookingPage';
import { WishlistPage } from './pages/WishlistPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { getCurrency, setCurrency, CurrencyCode } from './utils/storage';

// Scroll to top on every route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    });
  }, [pathname]);

  return null;
}

export default function App() {
  const [currency, setCur] = useState<CurrencyCode>('IDR');
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    setCur(getCurrency());
  }, []);

  const handleCurrencyChange = (newCode: CurrencyCode) => {
    setCurrency(newCode);
    setCur(newCode);
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-stone-800 font-sans selection:bg-[#B89358]/25 selection:text-stone-900">
        
        {/* Navigation Bar */}
        <Navbar 
          onOpenSearch={() => setSearchModalOpen(true)}
          currency={currency}
          onCurrencyChange={handleCurrencyChange}
        />

        {/* Global Search Dialog Modal */}
        <SearchModal
          isOpen={searchModalOpen}
          onClose={() => setSearchModalOpen(false)}
          currency={currency}
        />

        {/* Dynamic Route Content */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage currency={currency} />} />
            <Route path="/rooms" element={<RoomsPage currency={currency} />} />
            <Route path="/rooms/:slug" element={<RoomDetailPage currency={currency} />} />
            <Route path="/dining" element={<DiningPage />} />
            <Route path="/dining/:slug" element={<DiningDetailPage />} />
            <Route path="/meetings" element={<MeetingsPage />} />
            <Route path="/facilities" element={<FacilitiesPage />} />
            <Route path="/offers" element={<OffersPage currency={currency} />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/booking" element={<BookingPage currency={currency} />} />
            <Route path="/wishlist" element={<WishlistPage currency={currency} />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer />

      </div>
    </HashRouter>
  );
}
