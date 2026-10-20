# HotelPavilion — Modern Colonial Luxury Hotel

> Recreated from reference website: **[De Paviljoen Bandung](https://depavilion.com/)**  
> GitHub Username: **Aman22kr**  
> Deployment Platform: **GitHub Pages (Static SPA)**

---

## 🏛 Overview

**HotelPavilion** is a high-fidelity, multi-page static web application recreating the luxury hospitality experience of De Paviljoen Bandung. Rising 12 storeys in the heart of Bandung along historic Jalan R.E. Martadinata (Jalan Riau), the property marries early 20th-century Dutch Colonial architecture with contemporary Indonesian luxury.

---

## 🌟 Key Features & Subpages

1. **Home (`/`)**:
   - Hero banner with genuine architectural facade photo and live trust markers.
   - Quick Booking search widget with check-in/out, guests, and instant rate lookup.
   - Dutch Colonial architectural heritage narrative with dedicated video archival frame.
   - Featured accommodations carousel (Deluxe, Grand Deluxe, Royal Lagoon, The Pavilion Suite).
   - Culinary spotlights for **Keuken All Day Dining** and **Vesper Sky Bar & Lounge**.
   - Holistic wellness preview (Lagoon swimming pool & Tamarind Spa).
   - Verified guest testimonials with star ratings.
   - Bottom sponsored partner spotlight section.

2. **Rooms & Suites (`/rooms` & `/rooms/:slug`)**:
   - Category filters: All, Rooms, Suites, Family Suites, Presidential Suites.
   - Dynamic sorting: Featured, Price (Low/High), Guest Rating.
   - Detail pages with multi-angle gallery, specifications (area in sqm, bed configuration, capacity, view).
   - Real-time interactive booking calculator with custom nights, rate plan options (Room Only vs. Bed & Breakfast vs. Spa Retreat), and concierge add-ons.
   - Verified guest impressions with an interactive "Write a Review" form saved directly to `localStorage`.

3. **Dining & Lounges (`/dining` & `/dining/:slug`)**:
   - Detailed coverage of **Keuken All Day Dining**, **Vesper Sky Bar & Lounge** (12th floor rooftop), and **Koffie Story** (heritage single-origin roast salon).
   - Operating hours, location, dress codes, and signature dish pricing.
   - Interactive **Table Reservation System** with date, time, party size, and dietary preferences stored in `localStorage`.

4. **Meetings & Events (`/meetings`)**:
   - Four dedicated halls: **Kapoelaga Function Hall** (divisible I & II, up to 195 pax), **Koenjit Room**, **Ketoembar Boardroom**, and **Kajoemanis Room**.
   - Seating layout capacity matrix (Theater, Classroom, Banquet, U-Shape, Cocktail).
   - Corporate and residential meeting packages.
   - Interactive **Request for Proposal (RFQ)** form with real-time logging.

5. **Facilities & Wellness (`/facilities`)**:
   - The Pavilion Lagoon Pool (heated tropical waters and poolside cabanas).
   - Tamarind Heritage Spa & Wellness with full traditional Sundanese treatment menu.
   - 24/7 Technogym Fitness Center and Executive Business Center.

6. **Special Offers & Packages (`/offers`)**:
   - Romantic Skyline Escape at Vesper, Bandung Weekend Staycation, Tamarind Wellness Retreat, and Advance Purchase Early Bird deals.
   - Clear inclusions and instant booking pre-fill links.

7. **Visual Gallery (`/gallery`)**:
   - Filterable photo collection by Architecture, Rooms, Dining, Facilities, and Events.
   - Fullscreen interactive lightbox modal with keyboard navigation.

8. **Our Heritage & Story (`/about`)**:
   - Detailed architectural backstory on the Dutch colonial era of Jalan Riau, Bandung.
   - Archival documentary video player frame.
   - Sustainability standards and West Java master craftsmanship.

9. **Contact & Concierge (`/contact`)**:
   - Address, telephone, email, and transit distances (Whoosh High-Speed Rail, Central Railway Station, Airport, Gedung Sate).
   - Concierge inquiry message transmitter.
   - Interactive searchable FAQ accordion.

10. **Reservation Engine (`/booking`)**:
    - Complete multi-step reservation booking process.
    - Rate calculation, add-ons (airport limousine, romantic floral setup, high tea), and unique reference generation (`HPV-XXXXXX`).
    - Printable summary voucher.
    - **"My Reservations"** lookup tab with active cancellation support.

11. **Saved Wishlist (`/wishlist`)**:
    - Bookmark favorite accommodations with real-time badge count across the navbar.

12. **Global Instant Search (`SearchModal`)**:
    - Live search across all rooms, dining, meeting venues, and packages with history chips.

13. **Currency Switcher**:
    - Live exchange conversion between **IDR (Rp)**, **USD ($)**, **SGD (S$)**, and **EUR (€)**.

14. **Bottom Partner Spotlight (Ads)**:
    - Dedicated sponsored affiliate / regional partner section on every page.

---

## 🛠 Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) + TypeScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Typography**: Cormorant Garamond (Colonial Serif) + Plus Jakarta Sans (Clean Modern Sans)
- **Routing**: `react-router-dom` with `HashRouter` (guarantees flawless direct navigation, subpaths, and refreshes on static GitHub Pages)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: Smooth CSS transitions & Framer Motion
- **Data Persistence**: Browser `localStorage` (Namespaced: `hotelpavilion_*`)

---

## 💾 Local Storage Architecture

All user actions persist on the client side without requiring a backend server:
- `hotelpavilion_saved_items`: Array of favorited room IDs
- `hotelpavilion_bookings`: Array of confirmed room reservations & vouchers
- `hotelpavilion_table_reservations`: Table reservations at Keuken or Vesper
- `hotelpavilion_rfq_leads`: Corporate event and meeting quotation drafts
- `hotelpavilion_user_reviews`: User-submitted guest ratings and impressions
- `hotelpavilion_search_history`: Recent search terms
- `hotelpavilion_currency`: User's preferred currency code (`IDR`, `USD`, `SGD`, `EUR`)
- `hotelpavilion_newsletter`: Subscribed email addresses

> **Notice**: LocalStorage data is stored strictly in the visitor's local browser and device. Simulated payments and reservations do not process actual credit card transactions.

---

## 🚀 Deployment Instructions (GitHub Pages)

### Method 1: Automated GitHub Actions (Recommended)

1. Push this repository to GitHub under username `Aman22kr` (e.g. `https://github.com/Aman22kr/hotelpavilion`).
2. In your repository settings on GitHub, navigate to **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, choose **GitHub Actions**.
4. The workflow file at `.github/workflows/deploy.yml` will automatically build the project and publish it to:
   ```
   https://Aman22kr.github.io/hotelpavilion/
   ```

### Method 2: Manual Terminal Deployment via `gh-pages`

1. Clone and install dependencies:
   ```bash
   npm install
   ```
2. Run local development server:
   ```bash
   npm run dev
   ```
3. Build and publish to GitHub Pages:
   ```bash
   npm run deploy
   ```

---

## ⚙️ Quick Settings (Reusing for Another Hotel Brand)

To adapt this codebase for another hotel or resort:
1. Open `src/data/hotelData.ts` and modify `HOTEL_INFO` (name, address, coordinates, stars).
2. Update rooms in `ROOMS_DATA` and dining venues in `DINING_VENUES`.
3. In `package.json`, update `"homepage"` and `"name"`.
4. In `index.html` and `metadata.json`, update the brand title and descriptions.
