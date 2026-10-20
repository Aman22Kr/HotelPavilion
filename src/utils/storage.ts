import { CURRENCY_RATES } from '../data/hotelData';

export type CurrencyCode = keyof typeof CURRENCY_RATES;

export interface BookingRecord {
  id: string;
  referenceCode: string;
  roomId: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  adults: number;
  children: number;
  ratePlan: 'room_only' | 'breakfast' | 'spa_package';
  addOns: string[];
  totalPriceIdr: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequests?: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface RFQRecord {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  eventType: string;
  spaceId: string;
  eventDate: string;
  attendees: number;
  packageType: string;
  notes?: string;
  createdAt: string;
}

export interface StoredReview {
  id: string;
  author: string;
  origin: string;
  stayDate: string;
  roomType: string;
  rating: number;
  title: string;
  comment: string;
}

const STORAGE_KEYS = {
  SAVED_ITEMS: 'hotelpavilion_saved_items',
  BOOKINGS: 'hotelpavilion_bookings',
  RFQ_LEADS: 'hotelpavilion_rfq_leads',
  SEARCH_HISTORY: 'hotelpavilion_search_history',
  CURRENCY: 'hotelpavilion_currency',
  REVIEWS: 'hotelpavilion_user_reviews',
  NEWSLETTER: 'hotelpavilion_newsletter'
};

export function getSavedItemIds(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SAVED_ITEMS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function toggleSavedItemId(id: string): string[] {
  try {
    const current = getSavedItemIds();
    const updated = current.includes(id)
      ? current.filter(item => item !== id)
      : [...current, id];
    localStorage.setItem(STORAGE_KEYS.SAVED_ITEMS, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function isItemSaved(id: string): boolean {
  return getSavedItemIds().includes(id);
}

export function getBookings(): BookingRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveBooking(booking: BookingRecord): void {
  try {
    const current = getBookings();
    const updated = [booking, ...current];
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save booking to localStorage', e);
  }
}

export function cancelBooking(id: string): BookingRecord[] {
  try {
    const current = getBookings();
    const updated = current.map(b => b.id === id ? { ...b, status: 'Cancelled' as const } : b);
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function getRFQLeads(): RFQRecord[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RFQ_LEADS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveRFQLead(rfq: RFQRecord): void {
  try {
    const current = getRFQLeads();
    localStorage.setItem(STORAGE_KEYS.RFQ_LEADS, JSON.stringify([rfq, ...current]));
  } catch (e) {
    console.error('Failed to save RFQ to localStorage', e);
  }
}

export function getSearchHistory(): string[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SEARCH_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addSearchQuery(query: string): string[] {
  try {
    const trimmed = query.trim();
    if (!trimmed) return getSearchHistory();
    const current = getSearchHistory();
    const filtered = current.filter(q => q.toLowerCase() !== trimmed.toLowerCase());
    const updated = [trimmed, ...filtered].slice(0, 8);
    localStorage.setItem(STORAGE_KEYS.SEARCH_HISTORY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function getCurrency(): CurrencyCode {
  try {
    const code = localStorage.getItem(STORAGE_KEYS.CURRENCY) as CurrencyCode;
    return code && CURRENCY_RATES[code] ? code : 'IDR';
  } catch {
    return 'IDR';
  }
}

export function setCurrency(code: CurrencyCode): void {
  try {
    localStorage.setItem(STORAGE_KEYS.CURRENCY, code);
  } catch (e) {
    console.error('Failed to set currency', e);
  }
}

export function formatPrice(priceIdr: number, currency: CurrencyCode = 'IDR'): string {
  const config = CURRENCY_RATES[currency] || CURRENCY_RATES.IDR;
  const converted = priceIdr * config.rate;
  
  if (currency === 'IDR') {
    return `${config.symbol} ${priceIdr.toLocaleString('id-ID')}`;
  }
  return `${config.symbol}${converted.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
}

export function getCustomReviews(): StoredReview[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.REVIEWS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addCustomReview(review: StoredReview): void {
  try {
    const current = getCustomReviews();
    localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify([review, ...current]));
  } catch (e) {
    console.error('Failed to save review', e);
  }
}

export function subscribeNewsletter(email: string): boolean {
  try {
    const list = JSON.parse(localStorage.getItem(STORAGE_KEYS.NEWSLETTER) || '[]');
    if (!list.includes(email)) {
      list.push(email);
      localStorage.setItem(STORAGE_KEYS.NEWSLETTER, JSON.stringify(list));
    }
    return true;
  } catch {
    return false;
  }
}
