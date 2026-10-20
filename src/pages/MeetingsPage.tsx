import React, { useState } from 'react';
import { MEETING_SPACES } from '../data/hotelData';
import { saveRFQLead, RFQRecord } from '../utils/storage';
import { SponsoredAdsSection } from '../components/SponsoredAdsSection';
import { 
  Users, 
  Calendar, 
  Maximize2, 
  Check, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Layers, 
  Tv, 
  Coffee 
} from 'lucide-react';

export const MeetingsPage: React.FC = () => {
  const [selectedSpace, setSelectedSpace] = useState(MEETING_SPACES[0].id);

  // RFQ Form State
  const [companyName, setCompanyName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Corporate Meeting');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendees, setAttendees] = useState(30);
  const [packageType, setPackageType] = useState('full_day');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const activeSpaceObj = MEETING_SPACES.find((s) => s.id === selectedSpace) || MEETING_SPACES[0];

  const handleRFQSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !email || !phone) return;

    const rfq: RFQRecord = {
      id: 'RFQ-' + Date.now().toString().slice(-6),
      companyName: companyName.trim() || 'Private Event',
      contactName: contactName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      eventType,
      spaceId: selectedSpace,
      eventDate,
      attendees,
      packageType,
      notes: notes.trim(),
      createdAt: new Date().toISOString()
    };

    saveRFQLead(rfq);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setCompanyName('');
      setContactName('');
      setEmail('');
      setPhone('');
      setNotes('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      
      {/* Page Header */}
      <section className="bg-[#121820] text-white py-16 sm:py-20 border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#B89358] mb-3 block">
            Conferences, Banquets & Celebrations
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Meetings & Events
          </h1>
          <p className="text-xs sm:text-sm text-stone-300 max-w-2xl mx-auto font-light leading-relaxed">
            Four versatile modern colonial meeting halls spanning 349 sqm of event space, featuring Kapoelaga Function Hall for up to 195 guests, cutting-edge hybrid AV, and dedicated event banqueting.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        
        {/* Venues Showcase Tabs */}
        <div>
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B89358] font-semibold block mb-1">
                Function Spaces
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Explore Event Capacities & Layouts
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {MEETING_SPACES.map((space) => (
                <button
                  key={space.id}
                  onClick={() => setSelectedSpace(space.id)}
                  className={`px-3.5 py-1.5 rounded text-xs font-medium transition-all ${
                    selectedSpace === space.id
                      ? 'bg-[#1B2430] text-white shadow-xs'
                      : 'bg-white text-stone-700 border border-stone-200 hover:bg-stone-50'
                  }`}
                >
                  {space.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Space Detail Card */}
          <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            <div className="lg:col-span-6 relative aspect-16/10 lg:aspect-auto">
              <img
                src={activeSpaceObj.image}
                alt={activeSpaceObj.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#121820]/80 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded">
                {activeSpaceObj.floor} · {activeSpaceObj.area}
              </div>
            </div>

            <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900 mb-2">
                  {activeSpaceObj.name}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed mb-6">
                  {activeSpaceObj.description}
                </p>

                {/* Capacity breakdown table */}
                <div className="mb-6">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-2">
                    Seating Layout Capacities
                  </span>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 text-center text-xs">
                    <div className="p-2 bg-stone-50 rounded border border-stone-100">
                      <span className="text-stone-400 block text-[10px]">Theater</span>
                      <span className="font-bold text-stone-900">{activeSpaceObj.capacity.theater} pax</span>
                    </div>
                    <div className="p-2 bg-stone-50 rounded border border-stone-100">
                      <span className="text-stone-400 block text-[10px]">Classroom</span>
                      <span className="font-bold text-stone-900">{activeSpaceObj.capacity.classroom} pax</span>
                    </div>
                    <div className="p-2 bg-stone-50 rounded border border-stone-100">
                      <span className="text-stone-400 block text-[10px]">Banquet</span>
                      <span className="font-bold text-stone-900">{activeSpaceObj.capacity.banquet} pax</span>
                    </div>
                    <div className="p-2 bg-stone-50 rounded border border-stone-100">
                      <span className="text-stone-400 block text-[10px]">U-Shape</span>
                      <span className="font-bold text-stone-900">{activeSpaceObj.capacity.uShape} pax</span>
                    </div>
                    <div className="p-2 bg-stone-50 rounded border border-stone-100">
                      <span className="text-stone-400 block text-[10px]">Cocktail</span>
                      <span className="font-bold text-stone-900">{activeSpaceObj.capacity.cocktail} pax</span>
                    </div>
                  </div>
                </div>

                {/* Features list */}
                <div className="space-y-1.5 mb-6">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400 block mb-1">
                    Room Equipment
                  </span>
                  {activeSpaceObj.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-stone-700">
                      <Check className="w-3.5 h-3.5 text-[#B89358] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100">
                <a
                  href="#rfq-form"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9E7A43] hover:underline"
                >
                  <span>Request Proposal for {activeSpaceObj.name} ↓</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Meeting Packages Grid */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest text-[#B89358] font-semibold block mb-1">
              Curated Packages
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Corporate & Social Meeting Packages
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg border border-stone-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-[#9E7A43]">Half Day Meeting</span>
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-1 mb-2">The Executive Half-Day</h3>
                <p className="text-xs text-stone-500 mb-4">Ideal for morning seminars or afternoon strategy sessions.</p>
                <div className="space-y-2 text-xs text-stone-600 mb-6">
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#B89358]" /> 4 hours meeting room usage</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#B89358]" /> 1 curated coffee break with Dutch snacks</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#B89358]" /> 1 buffet lunch or dinner at Keuken</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#B89358]" /> Standard laser projector & sound</div>
                </div>
              </div>
              <div className="pt-4 border-t border-stone-100">
                <span className="text-xs font-bold text-stone-900">IDR 385,000 / person</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border-2 border-[#B89358] shadow-md flex flex-col justify-between relative">
              <div className="absolute -top-3 right-4 bg-[#B89358] text-stone-900 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                Most Popular
              </div>
              <div>
                <span className="text-xs font-semibold text-[#9E7A43]">Full Day Meeting</span>
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-1 mb-2">The Heritage Full-Day</h3>
                <p className="text-xs text-stone-500 mb-4">Complete day package for intensive corporate conferences.</p>
                <div className="space-y-2 text-xs text-stone-600 mb-6">
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#B89358]" /> 8 hours meeting room usage</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#B89358]" /> 2 artisan coffee breaks + specialty sweets</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#B89358]" /> Gourmet international lunch buffet at Keuken</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#B89358]" /> High-definition projector & wireless mics</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#B89358]" /> Meeting stationery & candy mints</div>
                </div>
              </div>
              <div className="pt-4 border-t border-stone-100">
                <span className="text-xs font-bold text-stone-900">IDR 485,000 / person</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-stone-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-semibold text-[#9E7A43]">Residential Full Board</span>
                <h3 className="font-serif text-xl font-bold text-stone-900 mt-1 mb-2">The Colonial Residential</h3>
                <p className="text-xs text-stone-500 mb-4">All-inclusive stay and meeting bundle with accommodation.</p>
                <div className="space-y-2 text-xs text-stone-600 mb-6">
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#B89358]" /> Luxury room stay (twin share or single)</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#B89358]" /> 2 coffee breaks, 1 lunch & 1 dinner</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#B89358]" /> Full day 8 hours room usage</div>
                  <div className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-[#B89358]" /> Access to swimming pool & fitness center</div>
                </div>
              </div>
              <div className="pt-4 border-t border-stone-100">
                <span className="text-xs font-bold text-stone-900">Starts IDR 1,150,000 / person</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Request for Proposal (RFQ) Form */}
        <div id="rfq-form" className="bg-white rounded-xl border border-stone-200 p-8 sm:p-10 shadow-sm">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs uppercase tracking-widest text-[#B89358] font-semibold block mb-1">
                Direct Event Consultation
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                Request a Custom Event Proposal
              </h2>
              <p className="text-xs sm:text-sm text-stone-500 mt-2">
                Provide your event specifications and our event banqueting specialists will respond within 24 hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 bg-emerald-50 text-emerald-950 rounded-lg border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-serif text-xl font-bold">Proposal Request Received!</h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you, <span className="font-semibold">{contactName}</span>. Your event inquiry has been logged into your browser session storage. Our sales director will contact you via {email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRFQSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="e.g. Acme Corporation or Private"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Contact Person *</label>
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      required
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Email Address *</label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                    />
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      placeholder="+62 812-xxxx-xxxx"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Event Type</label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                    >
                      <option value="Corporate Meeting">Corporate Meeting</option>
                      <option value="Annual Conference">Annual Conference</option>
                      <option value="Wedding Gala">Wedding Reception</option>
                      <option value="Social Banquet">Social Banquet / Birthday</option>
                      <option value="Training Seminar">Training Seminar</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Preferred Space</label>
                    <select
                      value={selectedSpace}
                      onChange={(e) => setSelectedSpace(e.target.value)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                    >
                      {MEETING_SPACES.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.area})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-stone-600 font-medium mb-1">Expected Attendees</label>
                    <input
                      type="number"
                      min={5}
                      max={250}
                      value={attendees}
                      onChange={(e) => setAttendees(parseInt(e.target.value) || 10)}
                      className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Additional Requirements / Dietary Notes</label>
                  <textarea
                    rows={3}
                    placeholder="Specific setup needs, AV gear, breakout rooms, date flexibility..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full p-2.5 bg-stone-50 border border-stone-200 rounded focus:bg-white focus:outline-none focus:border-[#B89358]"
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-stone-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#B89358]" />
                    <span>Inquiry saved to local browser records</span>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1B2430] hover:bg-[#B89358] text-white rounded text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                  >
                    Submit Event Inquiry
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>

      {/* Sponsored Ads Section */}
      <SponsoredAdsSection />

    </div>
  );
};
