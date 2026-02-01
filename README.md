<div align="center">

# 🏠 HireMyRoom

A modern room and apartment booking platform built with React, Vite, and Tailwind CSS.

</div>

## Overview

HireMyRoom is a comprehensive room rental marketplace platform built with React and Tailwind CSS. The application features a public-facing website for browsing properties and role-based dashboards for property owners and guests. Owners can manage their properties, handle bookings, and upload photos, while guests can submit booking requests and track their reservations. The platform includes smooth scroll-triggered animations, advanced filtering, and a fully responsive design optimized for all devices.

## ✨ Features

### Public Features
- **Room Browsing**: Discover rooms categorized by type (Normal, Luxury, VIP, VVIP, Couples)
- **Advanced Search & Filtering**: Search by city, area, room type, and price range
- **Hot & Super Hot Listings**: Highlighted special listings for premium rooms
- **Scroll Reveal Animations**: Smooth fade-in and slide-up animations as content enters the viewport
- **Responsive Design**: Fully responsive UI optimized for mobile, tablet, and desktop
- **Category Navigation**: Easy filtering through room categories
- **Room Details Page**: Detailed view of individual room listings with booking functionality
- **User Authentication**: Login and signup pages with role-based access control

### Role-Based Dashboards

#### 🧑‍💼 Owner Dashboard
- **Dashboard Overview**: Statistics, recent reservations, and quick actions
- **Add Property**: Comprehensive form to list new properties (Hostel/Room/Apartment)
- **Manage Properties**: Table view with edit, delete, status toggle, and photo management
- **Upload Property Photos**: Drag & drop image upload with preview and removal
- **Reservations Management**: Accept/reject booking requests with status filtering
- **Profile Management**: Update account information and settings
- **Admin-Style Layout**: Professional sidebar navigation with responsive mobile menu

#### 🧑‍🦱 Guest Dashboard
- **My Booking Requests**: Track status of sent booking requests (Pending/Accepted/Rejected)
- **My Bookings**: View confirmed bookings with property details and pricing
- **Booking Request Modal**: Integrated booking flow from property listings
- **Profile Management**: Update personal information
- **Clean Tab Navigation**: Simple, user-friendly interface

### Authentication & Authorization
- **Mock Authentication System**: Role-based login (Owner/Guest) for testing
- **Protected Routes**: Automatic redirection based on user role
- **Persistent Sessions**: LocalStorage-based session management
- **Role-Based UI**: Different interfaces for Owners and Guests

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool & dev server
- **Tailwind CSS** 4.1.18 - Utility-first CSS framework
- **React Router DOM** 7.12.0 - Client-side routing with protected routes
- **Lucide React** 0.563.0 - Icon library
- **Intersection Observer API** - Native scroll animation trigger
- **Context API** - Authentication and state management

### Tooling
- **ESLint** 9.39.1 - Code linting and quality
- **Node.js** - Runtime environment

## 📋 Requirements

- **Node.js**: v18.0 or higher
- **Package Manager**: npm 9+ or compatible package manager
- **Browser Support**: Modern browsers with ES6+ and Intersection Observer API support

## 🚀 Setup & Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd HireMyRoom
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory (optional for current development):
```
VITE_APP_NAME=HireMyRoom
```

### 4. Start Development Server
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### 5. Build for Production
```bash
npm run build
```

### 6. Preview Production Build
```bash
npm run preview
```

## 🧪 Testing the Application

### Testing Owner Dashboard
1. Navigate to `/login`
2. Select **"Owner"** role
3. Enter any email and password
4. Click "Login"
5. You'll be redirected to `/owner/dashboard`
6. Explore all owner features:
   - Add a new property
   - Manage existing properties
   - Upload property photos
   - Handle booking requests
   - Update profile

### Testing Guest Dashboard
1. Navigate to `/login`
2. Select **"Guest"** role
3. Enter any email and password
4. Click "Login"
5. You'll be redirected to `/guest/booking-requests`
6. Browse public properties and click "Book Now"
7. Submit booking requests from the modal
8. View booking status and confirmed bookings

### Testing Public Features
1. Browse rooms on the home page
2. Use search and filters
3. View room details
4. Try booking (will prompt login if not authenticated)

## 📝 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot module replacement |
| `npm run build` | Build optimized production bundle to `/dist` |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 📂 Project Architecture

```
HireMyRoom/
├── src/
│   ├── components/
│   │   ├── cards/                    # Room and category card components
│   │   │   ├── RoomCard.jsx          # Room card with booking integration
│   │   │   └── CategoryCard.jsx
│   │   ├── common/                   # Reusable UI components
│   │   │   ├── ScrollReveal.jsx      # Scroll animation wrapper
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Button.jsx
│   │   │   ├── Badge.jsx
│   │   │   └── BookingRequestModal.jsx  # Booking request modal
│   │   ├── layout/                   # Layout components
│   │   │   ├── Navbar.jsx            # Public navbar with auth-aware links
│   │   │   ├── Footer.jsx
│   │   │   ├── OwnerLayout.jsx       # Owner dashboard layout (sidebar + navbar)
│   │   │   └── GuestLayout.jsx       # Guest dashboard layout (tabs)
│   │   └── SCROLL_ANIMATIONS.md
│   ├── pages/                        # Page components
│   │   ├── Home.jsx                  # Landing page with featured rooms
│   │   ├── Rooms.jsx                 # Full rooms listing
│   │   ├── RoomDetails.jsx           # Individual room details with booking
│   │   ├── AboutUs.jsx
│   │   ├── Login.jsx                 # Login with role selection
│   │   ├── Signup.jsx
│   │   ├── owner/                    # Owner dashboard pages
│   │   │   ├── OwnerDashboard.jsx    # Dashboard overview
│   │   │   ├── AddProperty.jsx       # Add new property form
│   │   │   ├── ManageProperties.jsx  # Property management table
│   │   │   ├── UploadPhotos.jsx      # Image upload interface
│   │   │   ├── Reservations.jsx      # Booking requests management
│   │   │   └── Profile.jsx           # Owner profile settings
│   │   └── guest/                    # Guest dashboard pages
│   │       ├── BookingRequests.jsx   # Sent booking requests
│   │       ├── MyBookings.jsx        # Confirmed bookings
│   │       └── GuestProfile.jsx      # Guest profile settings
│   ├── context/                      # React Context providers
│   │   └── AuthContext.jsx           # Authentication context (user, login, logout)
│   ├── hooks/                        # Custom React hooks
│   │   └── useScrollReveal.js        # Intersection Observer hook
│   ├── routes/
│   │   └── AppRoutes.jsx             # Route definitions with protected routes
│   ├── data/                         # Static data
│   │   ├── rooms.js                  # Room listings data
│   │   └── cities.js                 # Available cities data
│   ├── assets/                       # Images and media
│   ├── App.jsx                       # Main app component
│   ├── main.jsx                      # Entry point with AuthProvider
│   ├── index.css                     # Global styles + animations
│   └── App.css
├── public/                           # Static assets
├── vite.config.js                    # Vite configuration
├── eslint.config.js                  # ESLint configuration
├── package.json
├── index.html                        # HTML template
└── README.md
```

### Key Directories

- **`components/`** - Reusable React components organized by type
  - **`cards/`** - Room and category display cards
  - **`common/`** - Shared UI components (buttons, modals, etc.)
  - **`layout/`** - Layout wrappers for public and dashboard pages
- **`pages/`** - Full-page components mapped to routes
  - **`owner/`** - Owner dashboard pages
  - **`guest/`** - Guest dashboard pages
- **`context/`** - React Context providers for global state (authentication)
- **`hooks/`** - Custom React hooks (scroll animations, etc.)
- **`data/`** - Static JSON data for rooms and cities
- **`routes/`** - Route configuration with protected route logic

## 🔄 Application Flow

### Public Flow
```
User Visits App
    ↓
App.jsx renders with AuthProvider & React Router
    ↓
User navigates to pages via Navbar
    ↓
Page components (Home, Rooms, etc.) render
    ↓
Components wrapped in <ScrollReveal> animate when scrolling
    ↓
Users interact with:
    - Search & filter functionality
    - Category selection
    - Room cards (view details or book)
    ↓
If logged in as Guest: Booking modal opens
If not logged in: Redirects to login
```

### Authentication Flow
```
User clicks Login
    ↓
Login page with role selection (Owner/Guest)
    ↓
Mock authentication sets user role
    ↓
User redirected based on role:
    - OWNER → /owner/dashboard
    - GUEST → /guest/booking-requests
    ↓
Protected routes check authentication
    ↓
Navbar shows "Dashboard" link
```

### Owner Dashboard Flow
```
Owner logs in → Owner Dashboard
    ↓
Sidebar navigation with:
    - Dashboard (overview)
    - Add Property (form)
    - Manage Properties (table)
    - Upload Photos (image upload)
    - Reservations (booking management)
    - Profile (settings)
    ↓
All actions use mock data (ready for API integration)
```

### Guest Dashboard Flow
```
Guest logs in → Guest Dashboard
    ↓
Tab navigation with:
    - My Booking Requests (status tracking)
    - My Bookings (confirmed bookings)
    - Profile (settings)
    ↓
From public pages: "Book Now" opens booking modal
    ↓
Booking request submitted (mock) → Appears in requests list
```

## 📖 Scroll Reveal Animations

The project includes a reusable scroll animation system using the native Intersection Observer API:

### Using the Component
```jsx
import ScrollReveal from '../components/common/ScrollReveal';

<ScrollReveal delay={200}>
  <section>Content animates on scroll</section>
</ScrollReveal>
```

### Using the Hook
```jsx
import { useScrollReveal } from '../hooks/useScrollReveal';

const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });
<div ref={ref} className={isVisible ? 'visible' : 'hidden'}>...</div>
```

**Features:**
- Fade-in + slide-up animation (30px translate)
- Customizable delay for staggered effects
- Respects `prefers-reduced-motion` for accessibility
- No layout shift (GPU accelerated transforms)
- Performant with automatic observer cleanup

See [src/components/common/SCROLL_ANIMATIONS.md](src/components/common/SCROLL_ANIMATIONS.md) for complete documentation.

## 🌍 Environment Variables

Currently, no environment variables are required for development. When backend integration is added, the following should be configured:

| Variable | Type | Description | Required |
|----------|------|-------------|----------|
| `VITE_API_BASE_URL` | String | Backend API endpoint | Future |
| `VITE_APP_NAME` | String | Application display name | Optional |

Create `.env.local` in the root directory to override defaults:
```
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🚢 Deployment

### Current Status
**Not yet configured.** The application is ready for deployment once backend integration is complete.

### Recommended Deployment Methods

#### Vercel (Recommended for Vite + React)
1. Push repository to GitHub
2. Connect repo to Vercel at [vercel.com](https://vercel.com)
3. Vercel automatically detects Vite configuration
4. Production build deploys automatically on push

#### Netlify
1. Connect GitHub repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy via Netlify UI or CLI

#### Docker (Custom)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

#### Manual / Traditional Hosting
1. Run `npm run build`
2. Upload `dist/` folder to web server
3. Configure server to serve `index.html` for all routes (SPA routing)


## 🗺️ Routing Structure

### Public Routes
- `/` - Home page with featured rooms
- `/rooms` - All rooms listing with filters
- `/rooms/:id` - Individual room details
- `/login` - Login page with role selection
- `/signup` - Signup page
- `/aboutus` - About page

### Owner Routes (Protected)
- `/owner/dashboard` - Dashboard overview
- `/owner/add-property` - Add new property form
- `/owner/manage-properties` - Property management table
- `/owner/upload-photos` - Image upload interface
- `/owner/reservations` - Booking requests management
- `/owner/profile` - Owner profile settings

### Guest Routes (Protected)
- `/guest/booking-requests` - Sent booking requests
- `/guest/bookings` - Confirmed bookings
- `/guest/profile` - Guest profile settings

### Route Protection
- All `/owner/*` routes require `OWNER` role
- All `/guest/*` routes require `GUEST` role
- Unauthenticated users are redirected to `/login`
- Wrong role redirects to appropriate dashboard

## 🔐 Authentication & Authorization

### Current Implementation (Mock)
- **Mock Authentication**: Role-based login system using Context API
- **LocalStorage Persistence**: User session persists across page refreshes
- **Role-Based Routing**: Automatic redirection based on user role
- **Protected Routes**: Unauthorized access redirects to login

### Authentication Context
The `AuthContext` provides:
- `user` - Current user object with `id`, `email`, `name`, and `role`
- `login(email, password, role)` - Mock login function
- `logout()` - Clear user session

### Protected Routes
Routes are protected using the `ProtectedRoute` component:
- `/owner/*` - Requires `OWNER` role
- `/guest/*` - Requires `GUEST` role
- Unauthenticated users are redirected to `/login`
- Wrong role redirects to appropriate dashboard

### Testing Authentication
1. Navigate to `/login`
2. Select role (Owner or Guest)
3. Enter any email/password (mock auth)
4. Click "Login" to access dashboard

## 🎨 Component Structure

### Owner Dashboard Components

#### OwnerLayout
- **Sidebar Navigation**: Collapsible on mobile, fixed on desktop
- **Top Navbar**: Quick access to public site
- **Responsive Design**: Mobile menu with overlay
- **User Info**: Displays logged-in user details

#### Owner Pages
- **OwnerDashboard**: Statistics cards, recent activity, quick actions
- **AddProperty**: Form with validation (name, type, rooms, location, price, description)
- **ManageProperties**: Data table with actions (edit, delete, status toggle, view photos)
- **UploadPhotos**: Drag & drop interface with image preview and removal
- **Reservations**: Table with filtering (All/Pending/Accepted/Rejected) and action buttons
- **Profile**: Account settings form

### Guest Dashboard Components

#### GuestLayout
- **Top Navbar**: Branding and logout
- **Tab Navigation**: Horizontal tabs for different sections
- **Clean Design**: Minimal, user-friendly interface

#### Guest Pages
- **BookingRequests**: Card grid showing request status with icons
- **MyBookings**: Confirmed bookings with property details and pricing
- **GuestProfile**: Account settings form
- **BookingRequestModal**: Modal component for submitting booking requests

### Shared Components
- **BookingRequestModal**: Reusable modal for booking flow
- **Button**: Consistent button styling with variants
- **Badge**: Status indicators and labels
- **RoomCard**: Enhanced with booking functionality

## 🔮 Future Improvements

### Backend Integration Points
- **Authentication API**: Replace mock auth with real JWT/Token system
- **Property Management API**: CRUD operations for properties
- **Booking API**: Submit and manage booking requests
- **Image Upload API**: Real file upload to cloud storage
- **User Profile API**: Update user information

### Feature Enhancements
- **Real-time Notifications**: WebSocket for booking updates
- **Payment Integration**: Stripe/PayPal for booking payments
- **Reviews & Ratings**: User feedback system
- **Map Integration**: Google Maps for property locations
- **Advanced Search**: Filters by amenities, availability calendar, price range
- **Email Notifications**: Booking confirmations and updates
- **Admin Dashboard**: Super admin panel for platform management
- **Mobile App**: React Native version for iOS and Android
- **Multi-language Support**: i18n for internationalization

## 📄 License

This project is open source. Check `LICENSE` file for details.

---

<div align="center">

Built with ❤️ using React & Vite

</div>
