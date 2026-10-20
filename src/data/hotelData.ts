export interface RoomItem {
  id: string;
  slug: string;
  name: string;
  category: string;
  size: string;
  capacity: string;
  bedType: string;
  priceIdr: number;
  featured: boolean;
  tagline: string;
  description: string;
  image: string;
  gallery: string[];
  amenities: string[];
  highlights: string[];
  rating: number;
  reviewCount: number;
}

export interface DiningVenue {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  cuisine: string;
  location: string;
  hours: string;
  dressCode: string;
  description: string;
  image: string;
  signatureDishes: { name: string; desc: string; price: string }[];
  features: string[];
}

export interface MeetingSpace {
  id: string;
  slug: string;
  name: string;
  area: string;
  capacity: {
    theater: number;
    classroom: number;
    banquet: number;
    uShape: number;
    cocktail: number;
  };
  floor: string;
  description: string;
  image: string;
  features: string[];
}

export interface FacilityItem {
  id: string;
  name: string;
  category: string;
  hours: string;
  location: string;
  description: string;
  image: string;
  highlights: string[];
}

export interface OfferItem {
  id: string;
  slug: string;
  title: string;
  tag: string;
  discount: string;
  validity: string;
  priceStartsIdr: number;
  description: string;
  image: string;
  inclusions: string[];
}

export interface Testimonial {
  id: string;
  author: string;
  origin: string;
  stayDate: string;
  roomType: string;
  rating: number;
  title: string;
  comment: string;
}

export const HOTEL_INFO = {
  name: 'HotelPavilion',
  legalName: 'HotelPavilion Bandung Luxury Hospitality',
  stars: 4.8,
  address: 'Jl. R.E. Martadinata No.68, Citarum, Bandung Wetan, Bandung 40115, West Java, Indonesia',
  phone: '+62 22 8601 2888',
  fax: '+62 22 8601 2889',
  email: 'concierge@hotelpavilion.com',
  checkIn: '14:00',
  checkOut: '12:00',
  totalRooms: 145,
  floors: 12,
  coordinates: {
    lat: -6.908331,
    lng: 107.616212
  }
};

export const ROOMS_DATA: RoomItem[] = [
  {
    id: 'deluxe',
    slug: 'deluxe-room',
    name: 'Deluxe Room',
    category: 'Rooms',
    size: '26 sqm',
    capacity: '2 Adults',
    bedType: '1 King Bed or 2 Single Beds',
    priceIdr: 950000,
    featured: true,
    tagline: 'Timeless Dutch Colonial elegance with contemporary comfort',
    description: 'Designed with modern colonial aesthetics and warm teak accents, our Deluxe Room offers a serene haven overlooking the lively tree-lined Jalan Riau. Features a plush pillow-top mattress, handcrafted vintage suitcase workstation, and a walk-through rainfall shower cubicle.',
    image: '/src/assets/images/room_deluxe_suite_1792482383871.jpg',
    gallery: [
      '/src/assets/images/room_deluxe_suite_1792482383871.jpg',
      '/src/assets/images/hero_hotel_facade_1792482383186.jpg',
      '/src/assets/images/spa_wellness_lagoon_1792482411296.jpg'
    ],
    amenities: [
      'Smart 43" 4K UHD TV',
      'Walk-through rainfall shower cubicle',
      'High-speed fiber Wi-Fi',
      'Vintage suitcase vanity & desk',
      'Window daybed bench with bolster pillows',
      'Artisan tea & French press coffee facilities',
      'In-room mini bar & silent thermoelectric fridge',
      'Digital electronic laptop-sized safe deposit box',
      'Individually controlled whisper-quiet air conditioning'
    ],
    highlights: ['City View', 'Ergonomic Workstation', 'Rain Shower', 'Window Bench'],
    rating: 4.8,
    reviewCount: 142
  },
  {
    id: 'grand-deluxe',
    slug: 'grand-deluxe-room',
    name: 'Grand Deluxe Room',
    category: 'Rooms',
    size: '29 sqm',
    capacity: '2 Adults, 1 Child',
    bedType: '1 California King Bed',
    priceIdr: 1250000,
    featured: true,
    tagline: 'Expanded spatial grandeur with deep soaking marble bathtub',
    description: 'Elevate your stay in the Grand Deluxe Room. Bask in extended proportions featuring an expansive colonial bay window bench, exquisite custom heritage cabinetry, and an indulgent marble-clad bathroom equipped with both a deep soaking tub and separate rainfall cubicle.',
    image: '/src/assets/images/room_deluxe_suite_1792482383871.jpg',
    gallery: [
      '/src/assets/images/room_deluxe_suite_1792482383871.jpg',
      '/src/assets/images/hero_hotel_facade_1792482383186.jpg'
    ],
    amenities: [
      'Deep soaking marble bathtub & rainfall shower',
      'Smart 50" UHD TV with international entertainment',
      'Lavazza espresso capsule machine',
      'Premium organic botanical bath amenities',
      'Integrated dressing vanity with daylight mirror',
      'Plush waffle bathrobes & velvet slippers',
      'High-speed dedicated Wi-Fi access point',
      'Complimentary evening turndown service'
    ],
    highlights: ['Deep Soaking Tub', 'Espresso Machine', 'Expanded Proportions', 'High Floor View'],
    rating: 4.9,
    reviewCount: 98
  },
  {
    id: 'royal-lagoon',
    slug: 'royal-lagoon-suite',
    name: 'Royal Lagoon Suite',
    category: 'Suites',
    size: '34 sqm',
    capacity: '2 Adults',
    bedType: '1 Royal King Bed',
    priceIdr: 2100000,
    featured: true,
    tagline: 'Direct private terrace access into the sparkling azure lagoon pool',
    description: 'The pinnacle of resort luxury nestled in central Bandung. Step directly from your teak-paneled sun terrace straight into the tranquil lagoon swimming pool. Enjoy personalized butler check-in, complimentary afternoon tea, and a private cabana daybed reserved exclusively for your suite.',
    image: '/src/assets/images/spa_wellness_lagoon_1792482411296.jpg',
    gallery: [
      '/src/assets/images/spa_wellness_lagoon_1792482411296.jpg',
      '/src/assets/images/room_deluxe_suite_1792482383871.jpg'
    ],
    amenities: [
      'Direct private pool terrace access',
      'Private poolside sun loungers & daybed',
      'Welcome bottle of sparkling wine & fruit basket',
      'Daily afternoon tea served on your terrace',
      'Custom Marshall Bluetooth high-fidelity speaker',
      'Luxury L\'Occitane en Provence bath amenities',
      'Oversized soaking tub with lagoon garden views'
    ],
    highlights: ['Direct Pool Access', 'Private Sun Deck', 'L\'Occitane Amenities', 'Butler Service'],
    rating: 5.0,
    reviewCount: 76
  },
  {
    id: 'executive-twee',
    slug: 'executive-twee-suite',
    name: 'Executive Twee Suite',
    category: 'Family Suites',
    size: '50 sqm',
    capacity: '4 Adults',
    bedType: '1 King Bed + 2 Twin Beds (2 Bedrooms)',
    priceIdr: 1850000,
    featured: false,
    tagline: 'Distinctive two-bedroom layout with independent living parlor',
    description: 'Drawing inspiration from classic Dutch residential architecture ("Twee" meaning two), this expansive suite features two completely secluded private bedrooms, a central family parlor with lounge sofas, dining nook, and a service pantry. The ultimate setting for families or travel companions.',
    image: '/src/assets/images/room_deluxe_suite_1792482383871.jpg',
    gallery: [
      '/src/assets/images/room_deluxe_suite_1792482383871.jpg',
      '/src/assets/images/restaurant_keuken_dining_1792482382946.jpg'
    ],
    amenities: [
      'Two separate private bedrooms with en-suite access',
      'Spacious living salon with dining table for four',
      'Microwave, sink, and gourmet tea pantry',
      'Two Smart TVs (50" in salon, 43" in master bedroom)',
      'Dual vanity basins & separate powder room',
      'Family game set & children welcome amenities'
    ],
    highlights: ['Two Bedrooms', 'Separate Living Room', 'Pantry & Dining', 'Family Haven'],
    rating: 4.8,
    reviewCount: 64
  },
  {
    id: 'executive-club',
    slug: 'executive-club-room',
    name: 'Executive Club Room',
    category: 'Rooms',
    size: '38 sqm',
    capacity: '2 Adults',
    bedType: '1 King Bed',
    priceIdr: 1650000,
    featured: false,
    tagline: 'Privileged sanctuary with complimentary Club Lounge privileges',
    description: 'Located on the upper floors, Executive Club guests enjoy exclusive access to our 11th-floor Club Lounge, offering complimentary express breakfast, all-day gourmet canapes, evening twilight cocktails, and high-level concierge support.',
    image: '/src/assets/images/room_deluxe_suite_1792482383871.jpg',
    gallery: [
      '/src/assets/images/room_deluxe_suite_1792482383871.jpg',
      '/src/assets/images/rooftop_vesper_lounge_1792482412312.jpg'
    ],
    amenities: [
      'Access to Executive Club Lounge on 11th Floor',
      'Evening cocktails & artisanal canapés (17:30 - 19:30)',
      'Complimentary pressing of 2 garments per day',
      'Private express check-in and check-out',
      'Executive boardroom 2-hour complimentary use',
      'High-speed dedicated Wi-Fi network'
    ],
    highlights: ['Club Lounge Access', 'Evening Cocktails', 'Express Check-In', 'Garment Pressing'],
    rating: 4.9,
    reviewCount: 52
  },
  {
    id: 'the-pavilion-suite',
    slug: 'the-pavilion-suite',
    name: 'The Pavilion Presidential Suite',
    category: 'Presidential Suites',
    size: '75 sqm',
    capacity: '2 Adults, 2 Children',
    bedType: '1 Emperor King Bed',
    priceIdr: 3900000,
    featured: true,
    tagline: 'The crowning jewel of HotelPavilion atop the 12th floor',
    description: 'An architectural tour de force combining grand colonial proportion with ultra-modern luxury. Features a panoramic living salon commanding unmatched 360-degree views of the Tangkuban Perahu mountains and Bandung skyline, dining salon for 6, master bedroom with walk-in dressing wardrobe, and a whirlpool hydrotherapy spa tub.',
    image: '/src/assets/images/room_deluxe_suite_1792482383871.jpg',
    gallery: [
      '/src/assets/images/room_deluxe_suite_1792482383871.jpg',
      '/src/assets/images/rooftop_vesper_lounge_1792482412312.jpg',
      '/src/assets/images/hero_hotel_facade_1792482383186.jpg'
    ],
    amenities: [
      'Whirlpool hydrotherapy jacuzzi tub overlooking the city',
      'Full dining salon with dinner service for six guests',
      'Dedicated 24-hour on-call private butler',
      'Bespoke walk-in dressing room and vanity chamber',
      'Bose Soundbar surround audio system',
      'Complimentary airport limousine roundtrip transfers',
      'Unlimited Vesper Sky Bar VIP access & champagne welcome'
    ],
    highlights: ['Jacuzzi Bath', 'Panoramic 12th Floor Vistas', '24h Butler', 'Airport Limousine'],
    rating: 5.0,
    reviewCount: 38
  }
];

export const DINING_VENUES: DiningVenue[] = [
  {
    id: 'keuken',
    slug: 'keuken-all-day-dining',
    name: 'Keuken All Day Dining',
    tagline: 'Where Dutch-Indonesian culinary heritage meets modern gastronomy',
    cuisine: 'Authentic Indonesian, Dutch Colonial Classics, & Pan-Asian Grill',
    location: 'Ground Floor, HotelPavilion',
    hours: '06:00 - 23:00 Daily (Breakfast: 06:00 - 10:00)',
    dressCode: 'Smart Casual',
    description: 'Named after the traditional Dutch word for kitchen, Keuken is a grand, light-filled brasserie that honours Bandung\'s storied gastronomic heritage. Experience theatre-style open cooking stations, our renowned signature Rawon Buntut Bakar, fresh sourdough, and colonial delicacies.',
    image: '/src/assets/images/restaurant_keuken_dining_1792482382946.jpg',
    signatureDishes: [
      { name: 'Rawon Buntut Bakar Keuken', desc: 'Charcoal-grilled Australian oxtail simmered in dark black kluwek broth, served with salted duck egg and sambal terasi', price: 'IDR 165,000' },
      { name: 'Colonial Dutch Bitterballen & Croquettes', desc: 'Crispy golden slow-braised beef croquettes served with Dijon mustard and fresh pickles', price: 'IDR 75,000' },
      { name: 'Nasi Campur Parahyangan', desc: 'Turmeric spiced rice with shredded ayam suwir, empal serundeng, sambal matah, and crispy prawn crackers', price: 'IDR 125,000' },
      { name: 'Warm Poffertjes with Vanilla Gelato', desc: 'Traditional Dutch mini pancakes dusted with powdered sugar and organic Madagascan vanilla', price: 'IDR 65,000' }
    ],
    features: ['Buffet & A la Carte', 'Live Cooking Stations', 'Outdoor Garden Terrace', 'Private Dining Room for 16']
  },
  {
    id: 'vesper',
    slug: 'vesper-sky-bar-lounge',
    name: 'Vesper Sky Bar & Lounge',
    tagline: '360-degree panoramic skyline vistas atop the 12th floor',
    cuisine: 'Artisan Cocktails, Twilight Tapas, & International Robata Grill',
    location: '12th Floor Rooftop, HotelPavilion',
    hours: '17:00 - 01:00 Daily',
    dressCode: 'Sophisticated Casual (No slippers or athletic wear)',
    description: 'Perched high above the city on our 12th-floor crown, Vesper Sky Bar & Lounge is Bandung\'s most captivating rooftop destination. As the evening sets in, enjoy bespoke cocktails curated by our mixologists, panoramic mountain breezes, and smooth acoustic lounge vibrations.',
    image: '/src/assets/images/rooftop_vesper_lounge_1792482412312.jpg',
    signatureDishes: [
      { name: 'The Pavilion Smoked Negroni', desc: 'Barrel-aged Campari, artisanal London Dry Gin, sweet vermouth, smoked with clove wood', price: 'IDR 155,000' },
      { name: 'Parahyangan Sunset Spritz', desc: 'Prosecco, elderflower liqueur, local kaffir lime, and wild strawberry puree', price: 'IDR 140,000' },
      { name: 'Truffle Wagyu Sliders', desc: 'Trio of Australian Wagyu beef patties with melted Gruyère, black truffle emulsion, brioche buns', price: 'IDR 135,000' },
      { name: 'Crispy Calamari with Kecombrang Aioli', desc: 'Tender squid rings dusted in sea salt and torch ginger blossom dip', price: 'IDR 90,000' }
    ],
    features: ['360° Open-Air View', 'Live Acoustic Sessions Fri-Sun', 'VIP Sunset Cabanas', 'Mixology Masterclasses']
  },
  {
    id: 'koffie',
    slug: 'koffie-story',
    name: 'Koffie Story',
    tagline: 'Artisanal roastery and colonial tea salon',
    cuisine: 'Single-Origin West Java Specialty Coffees, Teas, & Gourmet Pâtisserie',
    location: 'Lobby Level, North Wing',
    hours: '07:00 - 22:00 Daily',
    dressCode: 'Casual',
    description: 'A cozy sanctuary celebrating Java\'s historic coffee traditions. Featuring specialty beans sourced directly from Pangalengan and Ciwidey highlands, brewed via V60, Syphon, or cold drip, complemented by freshly baked croissants and Dutch appeltaart.',
    image: '/src/assets/images/restaurant_keuken_dining_1792482382946.jpg',
    signatureDishes: [
      { name: 'Ciwidey Natural Pour-Over', desc: 'Notes of stone fruit, wild honey, and delicate floral bergamot', price: 'IDR 48,000' },
      { name: 'Pavilion Heritage Iced Coffee', desc: 'Double espresso with organic palm sugar and velvety coconut cream', price: 'IDR 52,000' },
      { name: 'Classic Dutch Appeltaart', desc: 'Warm spiced cinnamon apple tart with cinnamon crumble and vanilla cream', price: 'IDR 58,000' }
    ],
    features: ['Specialty Coffee Bar', 'Afternoon High Tea Sets', 'Fresh Pastry Counter', 'Quiet Co-working Nooks']
  }
];

export const MEETING_SPACES: MeetingSpace[] = [
  {
    id: 'kapoelaga',
    slug: 'kapoelaga-function-hall',
    name: 'Kapoelaga Function Hall',
    area: '240 sqm',
    capacity: {
      theater: 195,
      classroom: 110,
      banquet: 140,
      uShape: 60,
      cocktail: 200
    },
    floor: '2nd Floor, West Wing',
    description: 'Our premier grand hall features majestic 4.5-meter ceilings, acoustically engineered partitions (divisible into Kapoelaga I and Kapoelaga II), dual laser projection systems, and dedicated pre-function foyer for cocktail receptions or registration.',
    image: '/src/assets/images/hero_hotel_facade_1792482383186.jpg',
    features: [
      'Divisible soundproof partitions',
      'Dual 7,000 ANSI lumen laser projection',
      'Integrated JBL digital sound system',
      'Dedicated VIP secretariat room',
      'Pre-function cocktail foyer with bar'
    ]
  },
  {
    id: 'koenjit',
    slug: 'koenjit-meeting-room',
    name: 'Koenjit Meeting Room',
    area: '54 sqm',
    capacity: {
      theater: 50,
      classroom: 30,
      banquet: 35,
      uShape: 24,
      cocktail: 50
    },
    floor: '2nd Floor',
    description: 'Filled with abundant natural sunlight through tall colonial windows, Koenjit is ideal for corporate seminars, workshops, and strategic planning sessions.',
    image: '/src/assets/images/hero_hotel_facade_1792482383186.jpg',
    features: ['Natural daylight windows', 'Smart 75" interactive touch display', 'High-fidelity teleconferencing camera', 'Ergonomic Herman Miller seating']
  },
  {
    id: 'ketoembar',
    slug: 'ketoembar-boardroom',
    name: 'Ketoembar Boardroom',
    area: '32 sqm',
    capacity: {
      theater: 20,
      classroom: 14,
      banquet: 16,
      uShape: 16,
      cocktail: 25
    },
    floor: '3rd Floor',
    description: 'An executive boardroom crafted for confidential board meetings, diplomatic discussions, and high-stakes presentations with integrated Zoom Rooms hardware.',
    image: '/src/assets/images/hero_hotel_facade_1792482383186.jpg',
    features: ['Solid mahogany boardroom table', 'Poly Studio video bar', 'Dedicated executive coffee pantry', 'Private restroom']
  },
  {
    id: 'kajoemanis',
    slug: 'kajoemanis-room',
    name: 'Kajoemanis Room',
    area: '65 sqm',
    capacity: {
      theater: 65,
      classroom: 40,
      banquet: 45,
      uShape: 28,
      cocktail: 70
    },
    floor: '3rd Floor',
    description: 'Flexible conference room equipped with modular tables that easily reconfigure for interactive training, social gatherings, or product exhibitions.',
    image: '/src/assets/images/hero_hotel_facade_1792482383186.jpg',
    features: ['Flexible modular seating setup', 'Wireless screen mirroring', 'Dedicated banquet service team', 'Acoustic carpet flooring']
  }
];

export const FACILITIES_DATA: FacilityItem[] = [
  {
    id: 'lagoon-pool',
    name: 'The Pavilion Lagoon Pool',
    category: 'Recreation',
    hours: '06:00 - 20:00 Daily',
    location: '1st Floor Garden Courtyard',
    description: 'An oasis of tranquility surrounded by tropical palm fronds, natural river stone, and gentle waterfalls. Features an expansive heated lagoon pool for adults, a shallow children\'s splash wading pool, and poolside cabanas.',
    image: '/src/assets/images/spa_wellness_lagoon_1792482411296.jpg',
    highlights: ['Heated tropical water', 'Dedicated shallow kids pool', 'Complimentary towel and refreshment service', 'Direct access from Royal Lagoon Suites']
  },
  {
    id: 'tamarind-spa',
    name: 'Tamarind Heritage Spa & Wellness',
    category: 'Wellness',
    hours: '09:00 - 22:00 Daily',
    location: '2nd Floor Spa Pavilion',
    description: 'Restore vitality with treatments derived from ancient Sundanese royal wellness rituals. We utilize organic botanical oils, soothing lemongrass aromatherapy, and skilled therapeutic techniques for holistic mind-body rejuvenation.',
    image: '/src/assets/images/spa_wellness_lagoon_1792482411296.jpg',
    highlights: ['Single & couples treatment suites', 'Herbal steam sauna & floral jacuzzis', 'Tamarind Signature 90-min Full Body Therapy', 'Foot reflexology lounge']
  },
  {
    id: 'fitness-center',
    name: 'Pavilion Fitness Center',
    category: 'Fitness',
    hours: '24 Hours Access for In-House Guests',
    location: '3rd Floor Mezzanine',
    description: 'Maintain your wellness regimen with cutting-edge Technogym cardio machines, free weight racks, kettlebells, and resistance cables overlooking our tranquil courtyard.',
    image: '/src/assets/images/spa_wellness_lagoon_1792482411296.jpg',
    highlights: ['24/7 keycard access', 'Technogym interactive cardio screens', 'Yoga mats & stability balls', 'Chilled water & fresh towels']
  },
  {
    id: 'business-lounge',
    name: 'Executive Business Center & Concierge',
    category: 'Services',
    hours: '07:00 - 22:00 Daily',
    location: 'Lobby Level',
    description: 'Equipped with Apple iMac workstations, high-speed document printing, courier shipping, secretarial services, and dedicated concierge assistance for local touring.',
    image: '/src/assets/images/hero_hotel_facade_1792482383186.jpg',
    highlights: ['iMac & Windows workstations', 'Wireless color printing & scanning', 'Flight check-in assistance', 'Private phone booths']
  }
];

export const OFFERS_DATA: OfferItem[] = [
  {
    id: 'romantic-skyline',
    slug: 'romantic-skyline-escape',
    title: 'Romantic Skyline Escape at Vesper',
    tag: 'Couples & Honeymoon',
    discount: 'Save 25%',
    validity: 'Valid throughout 2026 & 2027',
    priceStartsIdr: 1850000,
    description: 'Ignite romance in Bandung. Includes a luxury stay in our Deluxe or Grand Deluxe Room, a private 4-course candlelit dinner at Vesper Sky Bar overlooking the city lights, romantic floral bed styling, and complimentary 14:00 late check-out.',
    image: '/src/assets/images/rooftop_vesper_lounge_1792482412312.jpg',
    inclusions: [
      'Overnight stay in selected room category',
      '4-course chef tasting dinner for 2 at Vesper Sky Bar',
      'Welcome champagne or mocktails upon arrival',
      'Romantic rose petal room setup',
      'Daily gourmet buffet breakfast at Keuken for 2',
      'Guaranteed late check-out until 14:00'
    ]
  },
  {
    id: 'weekend-staycation',
    slug: 'bandung-cultural-staycation',
    title: 'Bandung Heritage Weekend Staycation',
    tag: 'Staycation',
    discount: 'Exclusive Rate',
    validity: 'Friday to Sunday Stays',
    priceStartsIdr: 1450000,
    description: 'Immerse yourself in Jalan Riau\'s iconic boutique and cafe culture. Enjoy complimentary breakfast at Keuken, 20% dining credit at Koffie Story, and high-speed Wi-Fi.',
    image: '/src/assets/images/restaurant_keuken_dining_1792482382946.jpg',
    inclusions: [
      'Gourmet international breakfast for 2 adults & 1 child',
      'IDR 150,000 F&B dining credit per stay',
      '15% discount on all Tamarind Spa treatments',
      'Complimentary self-parking and valet service',
      'Heritage walking map of Jalan R.E. Martadinata'
    ]
  },
  {
    id: 'spa-rejuvenation',
    slug: 'tamarind-spa-rejuvenation',
    title: 'Holistic Tamarind Wellness & Spa Retreat',
    tag: 'Wellness',
    discount: 'Package Value',
    validity: 'All Year Round',
    priceStartsIdr: 2200000,
    description: 'Escape daily stress with our comprehensive wellness journey. Indulge in 90 minutes of traditional Indonesian massage for two, herbal body scrub, and relaxation in our mineral whirlpool.',
    image: '/src/assets/images/spa_wellness_lagoon_1792482411296.jpg',
    inclusions: [
      'Stay in Grand Deluxe or Royal Lagoon Suite',
      '90-Minute Tamarind Signature Massage for 2 guests',
      'Herbal welcome tea and wellness elixir on arrival',
      'Healthy vitality breakfast options at Keuken',
      'Unlimited access to heated lagoon pool & steam sauna'
    ]
  },
  {
    id: 'advance-purchase',
    slug: 'advance-purchase-early-bird',
    title: 'Advance Purchase Privilege: Book 14 Days Ahead',
    tag: 'Early Bird',
    discount: '30% Off Best Flexible Rate',
    validity: 'Continuous Availability',
    priceStartsIdr: 850000,
    description: 'Plan your trip to Bandung in advance and secure our most competitive guaranteed direct rates with complimentary room upgrades subject to availability.',
    image: '/src/assets/images/hero_hotel_facade_1792482383186.jpg',
    inclusions: [
      '30% discount on Best Available Rate',
      'Complimentary room upgrade to next category (subject to availability)',
      'Free cancellation up to 72 hours before arrival',
      'Full buffet breakfast included'
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Clara Hartono',
    origin: 'Jakarta, Indonesia',
    stayDate: 'October 2026',
    roomType: 'Royal Lagoon Suite',
    rating: 5,
    title: 'Unbelievable serenity right in the heart of Bandung',
    comment: 'Stepping directly from our room into the lagoon pool felt like being in a tropical resort in Bali, yet we were right on Jalan Riau! The colonial architecture is stunning, and the staff treated us like royalty. Don\'t miss sunset at Vesper Lounge!'
  },
  {
    id: '2',
    author: 'Marcus & Elena Van Der Berg',
    origin: 'Amsterdam, Netherlands',
    stayDate: 'September 2026',
    roomType: 'Grand Deluxe Room',
    rating: 5,
    title: 'A nostalgic and luxurious homage to Dutch-Indonesian history',
    comment: 'The modern colonial details here are done with impeccable taste. The vintage suitcase vanity, high ceilings, and delicious Dutch Bitterballen at Keuken brought back fond memories. Super clean and exceptionally comfortable beds.'
  },
  {
    id: '3',
    author: 'David Tan',
    origin: 'Singapore',
    stayDate: 'August 2026',
    roomType: 'The Pavilion Suite',
    rating: 5,
    title: 'Premier presidential comfort and hospitality',
    comment: 'Booked The Pavilion Suite for an executive retreat. The 360-degree views of the mountain range and Bandung city are unmatched. Our private butler catered to every small detail. Outstanding meeting facilities at Kapoelaga as well.'
  },
  {
    id: '4',
    author: 'Siti Rahmawati',
    origin: 'Surabaya, Indonesia',
    stayDate: 'July 2026',
    roomType: 'Executive Twee Suite',
    rating: 5,
    title: 'Perfect family layout with separate bedrooms',
    comment: 'Finding a two-bedroom hotel suite in Bandung with a living room and dining area was a blessing for our family with two teenagers. Space was generous, the kids loved the pool, and breakfast had incredible variety.'
  }
];

export const FAQS = [
  {
    question: 'What are the check-in and check-out times at HotelPavilion?',
    answer: 'Standard check-in begins at 14:00 (2:00 PM) and check-out is at 12:00 noon. Early check-in and late check-out can be requested upon booking and are subject to availability.'
  },
  {
    question: 'Where is HotelPavilion located?',
    answer: 'HotelPavilion is situated at Jl. R.E. Martadinata No. 68 (also known as Jalan Riau), right in the vibrant heart of Bandung, within walking distance to famous factory outlets, heritage cafes, and minutes from Gedung Sate.'
  },
  {
    question: 'Does the hotel provide airport or train station transfers?',
    answer: 'Yes! We offer private airport limousine and high-speed train (Whoosh Padalarang / Tegalluar Station) transfer services. You can select this add-on during the online booking process or contact our concierge.'
  },
  {
    question: 'Is breakfast included in room reservations?',
    answer: 'You can choose between "Room Only" and "Breakfast Included" rates when making a booking. Our buffet breakfast is hosted daily from 06:00 to 10:00 at Keuken All Day Dining.'
  },
  {
    question: 'What is the dress code and reservation policy for Vesper Sky Bar & Lounge?',
    answer: 'The dress code is Smart Casual (no athletic tank tops or flip-flops). Advance table reservations are recommended for sunset hours (17:00 - 19:00) and weekend evenings.'
  },
  {
    question: 'Are there parking and valet services available?',
    answer: 'Yes, HotelPavilion provides complimentary secure basement parking and 24-hour valet service for all registered in-house hotel guests and dining patrons.'
  }
];

export const GALLERY_ITEMS = [
  { id: '1', title: 'HotelPavilion Exterior & Facade', category: 'Architecture', image: '/src/assets/images/hero_hotel_facade_1792482383186.jpg' },
  { id: '2', title: 'Grand Deluxe King Suite', category: 'Rooms', image: '/src/assets/images/room_deluxe_suite_1792482383871.jpg' },
  { id: '3', title: 'Keuken All Day Dining Brasserie', category: 'Dining', image: '/src/assets/images/restaurant_keuken_dining_1792482382946.jpg' },
  { id: '4', title: 'Vesper Sky Bar 12th Floor Sunset', category: 'Dining', image: '/src/assets/images/rooftop_vesper_lounge_1792482412312.jpg' },
  { id: '5', title: 'Tropical Lagoon Pool & Cabanas', category: 'Facilities', image: '/src/assets/images/spa_wellness_lagoon_1792482411296.jpg' },
  { id: '6', title: 'Tamarind Heritage Spa Suite', category: 'Facilities', image: '/src/assets/images/spa_wellness_lagoon_1792482411296.jpg' },
  { id: '7', title: 'Kapoelaga Grand Function Hall', category: 'Events', image: '/src/assets/images/hero_hotel_facade_1792482383186.jpg' },
  { id: '8', title: 'Heritage Modern Colonial Architecture', category: 'Architecture', image: '/src/assets/images/hero_hotel_facade_1792482383186.jpg' }
];

export const CURRENCY_RATES = {
  IDR: { symbol: 'Rp', rate: 1, label: 'Indonesian Rupiah (IDR)' },
  USD: { symbol: '$', rate: 0.000063, label: 'US Dollar (USD)' },
  SGD: { symbol: 'S$', rate: 0.000085, label: 'Singapore Dollar (SGD)' },
  EUR: { symbol: '€', rate: 0.000058, label: 'Euro (EUR)' }
};

export const SPONSORED_ADS = [
  {
    id: 'whoosh-express',
    title: 'Whoosh High-Speed Rail Transfer',
    tag: 'Official Partner',
    desc: 'Reach Bandung from Jakarta in just 45 minutes. Enjoy exclusive priority taxi pickup from Padalarang Station directly to HotelPavilion.',
    cta: 'Learn More & Schedule',
    link: '#/contact'
  },
  {
    id: 'heritage-coffee',
    title: 'Ciwidey Highland Specialty Roast',
    tag: 'Curated Artisan',
    desc: 'Take home artisanal single-origin coffee beans roasted locally in West Java. Available at Koffie Story lobby boutique.',
    cta: 'View Roastery Collection',
    link: '#/dining/koffie-story'
  },
  {
    id: 'riau-boutiques',
    title: 'Jalan Riau Heritage Shopping Pass',
    tag: 'Local Guide',
    desc: 'Exclusive 15% discount vouchers for premier fashion outlets and artisanal workshops along Jalan R.E. Martadinata for HotelPavilion guests.',
    cta: 'Claim at Concierge',
    link: '#/facilities'
  }
];
