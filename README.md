<div align="center">

# 🏠 HireMyRoom

A modern room and apartment booking platform built with React, Vite, and Tailwind CSS.

</div>

## Overview

HireMyRoom is a responsive room rental marketplace where users can browse, search, and discover rooms across different categories and cities. The application features smooth scroll-triggered animations, advanced filtering, and a clean, mobile-friendly interface.

## ✨ Features

- **Room Browsing**: Discover rooms categorized by type (Normal, Luxury, VIP, VVIP, Couples)
- **Advanced Search & Filtering**: Search by city, area, room type, and price range
- **Hot & Super Hot Listings**: Highlighted special listings for premium rooms
- **Scroll Reveal Animations**: Smooth fade-in and slide-up animations as content enters the viewport
- **Responsive Design**: Fully responsive UI optimized for mobile, tablet, and desktop
- **Category Navigation**: Easy filtering through room categories
- **Room Details Page**: Detailed view of individual room listings
- **User Authentication Pages**: Login and signup page templates ready for backend integration

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI library
- **Vite** 7.2.4 - Build tool & dev server
- **Tailwind CSS** 4.1.18 - Utility-first CSS framework
- **React Router DOM** 7.12.0 - Client-side routing
- **Intersection Observer API** - Native scroll animation trigger

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
│   │   ├── cards/              # Room and category card components
│   │   │   ├── RoomCard.jsx
│   │   │   └── CategoryCard.jsx
│   │   ├── common/             # Reusable UI components
│   │   │   ├── ScrollReveal.jsx      # Scroll animation wrapper
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Button.jsx
│   │   │   └── Badge.jsx
│   │   ├── layout/             # Layout components
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   └── SCROLL_ANIMATIONS.md
│   ├── pages/                  # Page components
│   │   ├── Home.jsx            # Landing page with featured rooms
│   │   ├── Rooms.jsx           # Full rooms listing
│   │   ├── RoomDetails.jsx     # Individual room details
│   │   ├── AboutUs.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── hooks/                  # Custom React hooks
│   │   └── useScrollReveal.js  # Intersection Observer hook for animations
│   ├── routes/
│   │   └── AppRoutes.jsx       # Route definitions
│   ├── data/                   # Static data
│   │   ├── rooms.js            # Room listings data
│   │   └── cities.js           # Available cities data
│   ├── assets/                 # Images and media
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   ├── index.css               # Global styles + animations
│   └── App.css
├── public/                     # Static assets
├── vite.config.js              # Vite configuration
├── eslint.config.js            # ESLint configuration
├── package.json
├── index.html                  # HTML template
└── README.md
```

### Key Directories

- **`components/`** - Reusable React components organized by type
- **`pages/`** - Full-page components mapped to routes
- **`hooks/`** - Custom React hooks (scroll animations, etc.)
- **`data/`** - Static JSON data for rooms and cities
- **`routes/`** - Route configuration and navigation setup

## 🔄 Application Flow

```
User Visits App
    ↓
App.jsx renders with React Router
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
[Backend API integration point - ready for future implementation]
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


## 🔮 Future Improvements

- **Backend Integration**: Connect to API for dynamic room data and user authentication
- **Booking System**: Implement reservation and payment processing
- **User Accounts**: Real user authentication with profile management
- **Reviews & Ratings**: User reviews and star ratings for rooms
- **Map Integration**: Google Maps integration for location display
- **Image Gallery**: Multi-image uploads and gallery for each room
- **Notifications**: Email/push notifications for bookings and updates
- **Admin Dashboard**: Management panel for room owners and admins
- **Advanced Search**: Filters by amenities, availability calendar, price range
- **Mobile App**: React Native version for iOS and Android

## 📄 License

This project is open source. Check `LICENSE` file for details.

---

<div align="center">

Built with ❤️ using React & Vite

</div>
