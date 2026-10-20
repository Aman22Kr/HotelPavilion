import React, { useState } from 'react';
import { HOTEL_INFO, FAQS } from '../data/hotelData';
import { SponsoredAdsSection } from '../components/SponsoredAdsSection';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle, 
  Compass, 
  Train, 
  Plane, 
  Car,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Inquiry');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [faqSearch, setFaqSearch] = useState('');

  const filteredFaqs = FAQS.filter(f => 
    f.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
    f.answer.toLowerCase().includes(faqSearch.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const inquiries = JSON.parse(localStorage.getItem('hotelpavilion_contact_inquiries') || '[]');
    const newInquiry = {
      id: 'INQ-' + Date.now().toString().slice(-6),
      name,
      email,
      phone,
      subject,
      message,
      createdAt: new Date().toISOString()
    };
    localStorage.setItem('hotelpavilion_contact_inquiries', JSON.stringify([newInquiry, ...inquiries]));
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* Page Header */}
      <section className="bg-[#121820] text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B89358] mb-3 block">
            We Are At Your Service
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Contact & Concierge
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Reach our 24-hour concierge team for bespoke itinerary planning, airport limousine transfers, or dining reservations.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Info & Inquiry Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs">
              <h2 className="font-serif text-2xl font-bold text-stone-900 mb-6">
                Direct Contact Details
              </h2>
              
              <div className="space-y-5 text-xs text-stone-600">
                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-stone-100 rounded text-[#B89358] shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block mb-0.5">Hotel Address</span>
                    <p className="leading-relaxed">{HOTEL_INFO.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-stone-100 rounded text-[#B89358] shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block mb-0.5">Telephone</span>
                    <p><a href="tel:+622286012888" className="hover:text-[#9E7A43]">{HOTEL_INFO.phone}</a></p>
                    <p className="text-stone-400 mt-0.5">Fax: {HOTEL_INFO.fax}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-stone-100 rounded text-[#B89358] shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block mb-0.5">Electronic Mail</span>
                    <p><a href="mailto:concierge@hotelpavilion.com" className="hover:text-[#9E7A43]">{HOTEL_INFO.email}</a></p>
                    <p className="text-stone-400 mt-0.5">Reservations: booking@hotelpavilion.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="p-2 bg-stone-100 rounded text-[#B89358] shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-stone-900 block mb-0.5">Check-In / Out Times</span>
                    <p>Check-In: 14:00 (2:00 PM)</p>
                    <p>Check-Out: 12:00 (Noon)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Travel Connections Card */}
            <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
              <h3 className="font-serif text-lg font-bold text-stone-900 mb-4 flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#B89358]" />
                <span>Transit & Landmark Distances</span>
              </h3>
              <div className="space-y-3 text-xs text-stone-600">
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="flex items-center gap-1.5 font-medium text-stone-800">
                    <Train className="w-3.5 h-3.5 text-[#B89358]" />
                    Whoosh High-Speed Train (Padalarang)
                  </span>
                  <span className="text-stone-500">25 mins drive</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="flex items-center gap-1.5 font-medium text-stone-800">
                    <Train className="w-3.5 h-3.5 text-[#B89358]" />
                    Bandung Central Railway Station
                  </span>
                  <span className="text-stone-500">10 mins drive</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                  <span className="flex items-center gap-1.5 font-medium text-stone-800">
                    <Plane className="w-3.5 h-3.5 text-[#B89358]" />
                    Husein Sastranegara Airport (BDO)
                  </span>
                  <span className="text-stone-500">15 mins drive</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-medium text-stone-800">
                    <Car className="w-3.5 h-3.5 text-[#B89358]" />
                    Gedung Sate Historical Monument
                  </span>
                  <span className="text-stone-500">3 mins (600m)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-stone-200 p-8 sm:p-10 shadow-xs">
            <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2">
              Send a Message to Concierge
            </h2>
            <p className="text-xs text-stone-500 mb-6">
              Our front office and guest relations team will attend to your request promptly.
            </p>

            {submitted ? (
              <div className="p-8 bg-emerald-50 text-emerald-950 rounded-lg border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold">Inquiry Sent Successfully!</h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you, <span className="font-semibold">{name}</span>. Your message has been safely saved in your local storage session. We look forward to welcoming you to HotelPavilion.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Your Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Maya Indrawati"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      placeholder="you@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+62 812-xxxx-xxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Subject</label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Room Reservation">Room Reservation Assistance</option>
                      <option value="Airport Limousine">Airport / Whoosh Limousine Request</option>
                      <option value="Dining & Rooftop">Dining & Vesper Rooftop Booking</option>
                      <option value="Tamarind Spa">Tamarind Spa Treatment Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Message *</label>
                  <textarea
                    rows={5}
                    placeholder="How may our concierge assist your upcoming stay in Bandung?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#1B2430] hover:bg-[#B89358] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs flex items-center gap-2"
                  >
                    <span>Transmit Message to Concierge</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

        {/* Interactive Location Visualizer */}
        <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs">
          <div className="p-6 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B89358] font-semibold block mb-1">
                Hotel Coordinates
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                Strategic Heart of Jalan Riau
              </h3>
            </div>
            <a
              href="https://maps.google.com/?q=Hotel+De+Paviljoen+Bandung"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 border border-stone-300 hover:border-[#B89358] text-stone-800 rounded text-xs font-semibold transition-colors"
            >
              <Compass className="w-3.5 h-3.5 text-[#B89358]" />
              <span>Open in Google Maps ↗</span>
            </a>
          </div>

          {/* Interactive Map Visual Placeholder */}
          <div className="p-8 bg-stone-100 flex flex-col items-center justify-center text-center space-y-3">
            <MapPin className="w-10 h-10 text-[#B89358]" />
            <h4 className="font-serif text-lg font-bold text-stone-900">
              HotelPavilion Bandung · 6.9083° S, 107.6162° E
            </h4>
            <p className="text-xs text-stone-600 max-w-lg leading-relaxed">
              Directly accessible from Jalan R.E. Martadinata with spacious underground valet parking. Surrounding neighborhood features famous heritage cafe houses, lifestyle dining, and prominent factory outlets.
            </p>
          </div>
        </div>

        {/* Frequently Asked Questions Accordion */}
        <div className="bg-white rounded-xl border border-stone-200 p-8 sm:p-10 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs uppercase tracking-widest text-[#B89358] font-semibold block mb-1">
              Guest Assistance
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mb-2">
              Frequently Asked Questions
            </h2>
            <div className="max-w-md mx-auto mt-4">
              <input
                type="text"
                placeholder="Search FAQs (check-in, parking, pool...)"
                value={faqSearch}
                onChange={(e) => setFaqSearch(e.target.value)}
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
              />
            </div>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-stone-200 rounded-lg overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 bg-stone-50 hover:bg-stone-100 transition-colors"
                  >
                    <span className="text-xs sm:text-sm font-semibold text-stone-900">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-stone-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="p-4 bg-white text-xs text-stone-600 leading-relaxed border-t border-stone-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Sponsored Ads Section */}
      <SponsoredAdsSection />

    </div>
  );
};
