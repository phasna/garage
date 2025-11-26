# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

GarageLocation is a French vehicle rental platform with a React frontend and Symfony API Platform backend. The project is in active development with the frontend (V1) completed and the backend API being built but not yet integrated.

## Repository Structure

This is a monorepo with two main directories:
- `frontend/` - React 18 + Vite SPA
- `backend/` - Symfony 7.3 + API Platform REST API

## Frontend (React + Vite)

### Development Commands

```bash
cd frontend
npm install              # Install dependencies
npm run dev             # Start dev server (http://localhost:3000)
npm run build           # Production build
npm run lint            # ESLint (strict: max 0 warnings)
npm run preview         # Preview production build
```

### Tech Stack

- React 18 with functional components
- Vite 6 for build tooling
- React Router 6.29 for routing
- Tailwind CSS 3.4 with custom theme
- Lucide React 0.460 for icons
- EmailJS for contact form
- SweetAlert2 for alerts

### Architecture

**Routing:**
- `/` - Home page with vehicle search and filtering
- `/vehicle/:id` - Vehicle details page
- `/booking/:id` - Booking form with price calculation
- `/about` - About page
- `/contact` - Contact form with EmailJS integration
- `/en-travaux` - Work in progress page

**State Management:**
No global state library. Uses local useState hooks for:
- Search and filter state
- Form data
- UI state (mobile menu, modals)

**Data Layer:**
Currently uses static data from `src/data/vehicles.js`. The backend API exists but is not yet integrated into the frontend.

**Component Structure:**
- `src/pages/` - Route components (Home, VehicleDetails, Booking, About, Contact, WorkInProgress)
- `src/components/` - Reusable components
  - `Header.jsx` - Navigation with mobile menu
  - `Footer.jsx` - Site footer
  - `VehicleGrid.jsx` - Vehicle listing with filtering
  - `ModernElements.jsx` - Animated background effects (particles, shapes, waves, bubbles, glow, grid)
- `src/data/vehicles.js` - Static vehicle data (12 vehicles)

### Styling

Tailwind CSS with custom configuration:
- Custom color palette: primary (blue scale), secondary (gray scale)
- Font family: Inter
- Custom animations: float, slideInFromLeft/Right, fadeInUp, scaleIn, shimmer, pulse-glow
- Custom classes: `.btn-primary`, `.btn-secondary`, `.card`, `.glass-card`, `.text-gradient`
- Glassmorphism effects using backdrop-filter

### Data Structures

**Vehicle object:**
```javascript
{
  id: number,
  brand: string,
  model: string,
  year: number,
  fuelType: "Essence" | "Diesel" | "Électrique" | "Hybride",
  transmission: "Manuelle" | "Automatique",
  seats: number,
  pricePerDay: number,
  description: string,
  imageUrl: string,
  category: "Économique" | "Compacte" | "Berline" | "SUV" | "Électrique" | "Luxe" | "Utilitaire",
  isAvailable: boolean,
  features: string[] // References to equipment keys
}
```

## Backend (Symfony + API Platform)

### Development Commands

```bash
cd backend
composer install                              # Install PHP dependencies
symfony serve                                 # Start dev server (http://localhost:8000)
php bin/console doctrine:migrations:migrate   # Run migrations
php bin/console app:init-data                 # Create admin + equipments
php bin/console app:init-data --with-vehicles # Create admin + equipments + demo vehicles
php bin/console app:init-data --with-vehicles --reset  # Reset all data
php bin/console make:entity                   # Create/update entity
php bin/console make:migration                # Generate migration
```

### Tech Stack

- PHP 8.2+
- Symfony 7.1
- API Platform 4.1 for REST API
- Doctrine ORM with SQLite database
- Nelmio CORS Bundle for CORS handling
- Lexik JWT Authentication Bundle for admin authentication

### Architecture

**Entities:**
- `Vehicle` - Vehicle information with equipment many-to-many relationship
- `Equipment` - Equipment/features that can be assigned to vehicles (GPS, camera, etc.)
- `User` - Admin users with JWT authentication

**API Structure:**
- **Public API** (`/api/*`): Vehicles and equipments (read-only)
- **Admin API** (`/api/admin/*`): Full CRUD on vehicles and equipments (requires JWT token)
- **Auth API**: Login, password reset, change password

**Key Features:**
- Vehicle availability management with unavailability reasons (Casse, Maintenance, Réservée)
- Equipment system with codes, names, and emoji icons
- Admin authentication with JWT tokens
- Password reset using garage code (`GARAGE_CODE` env variable)
- Default admin account: username `admin`, password `admin123`

**Data Validation:**

Vehicle:
- fuelType: `Essence`, `Diesel`, `Électrique`, `Hybride` (capitalized in backend)
- transmission: `Manuelle`, `Automatique` (capitalized in backend)
- category: `Économique`, `Compacte`, `Berline`, `SUV`, `Électrique`, `Luxe`, `Utilitaire` (capitalized)
- Relationships: Many-to-Many with Equipment

Equipment:
- Predefined codes: `gps`, `regulateur`, `camera_recul`, `radar_stationnement`, etc.
- Each has name, code, and emoji icon

**Database:**
SQLite stored at `backend/var/data.db`. No Docker required.

**CORS:**
Configured via nelmio_cors bundle. Origin configured via `CORS_ALLOW_ORIGIN` environment variable.

### Entity Relationships

- `Vehicle` has many `Equipment` (ManyToMany via vehicle_equipment join table)
- `Equipment` belongs to many `Vehicle` (ManyToMany)

### Important Notes

1. **API Not Integrated:** The backend API is fully functional but not yet connected to the frontend. Frontend currently uses static data from `src/data/vehicles.js`.

2. **French Language:** All user-facing content is in French. Entity values use French with proper capitalization.

3. **Authentication:**
   - Backend has JWT-based admin authentication system
   - Default credentials: `admin` / `admin123` (change in production)
   - Password reset requires garage code (env: `GARAGE_CODE=GARAGE2024`)
   - JWT tokens expire after 1 hour

4. **Database:**
   - Backend uses SQLite (not PostgreSQL)
   - Database file: `backend/var/data.db`
   - No Docker required for development
   - Initialize with `php bin/console app:init-data`

5. **Equipment System:**
   - Backend has full Equipment entity with many-to-many relationship to Vehicle
   - Frontend has matching equipment definitions in `vehicles.js`
   - Equipment codes must match between frontend and backend (e.g., `gps`, `camera_recul`)

## Integration Notes

When integrating frontend with backend:

**Data Model Differences:**
- Frontend uses `price` property, backend uses `pricePerDay` (both are numbers)
- Frontend uses `available` property, backend uses `isAvailable`
- Frontend uses `imageUrl` property (same as backend)
- Frontend `features` array contains equipment codes; backend has `equipments` relationship with full Equipment objects

**Case Consistency:**
The backend has been updated to use capitalized French values (matching frontend):
- ✅ Categories: `Économique`, `Compacte`, `Berline`, `SUV`, etc. (capitalized in both)
- ✅ Fuel types: `Essence`, `Diesel`, `Électrique`, `Hybride` (capitalized in both)
- ✅ Transmission: `Manuelle`, `Automatique` (capitalized in both)

**API Endpoints to Use:**
- Public vehicles: `GET /api/vehicles` (read-only)
- Public vehicle details: `GET /api/vehicles/{id}`
- Public equipments: `GET /api/equipments`
- Categories list: `GET /api/categories`

**Admin Features Not in Frontend:**
- Vehicle availability management with reasons (Casse, Maintenance, Réservée)
- Full CRUD on vehicles and equipments via `/api/admin/*` endpoints

See `backend/CLAUDE.md` for complete API documentation including all admin endpoints.
