# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Garage Location - A French vehicle rental frontend application built with React and Vite.

## Development Commands

```bash
npm run dev      # Start dev server (port 3000)
npm run build    # Production build
npm run lint     # ESLint check (strict, no warnings allowed)
npm run preview  # Preview production build
```

## Tech Stack

- **React 18** with functional components and hooks
- **Vite 6** for build tooling
- **React Router 6** for client-side routing
- **Tailwind CSS 3** with custom theme + forms plugin
- **Lucide React** for icons

## Architecture

### Routing Structure
- `/` - Home page with vehicle search and filtering
- `/vehicle/:id` - Vehicle details
- `/booking/:id` - Booking form with price calculation
- `/about` - About page
- `/contact` - Contact form with FAQ

### State Management
Local useState hooks only - no global state library. Component-level state for search/filters, form data, and UI state.

### Data Layer
Static vehicle data in `src/data/vehicles.js` - no backend API integration yet. Forms (booking, contact) show alerts on submission without actual backend calls.

### Component Organization
- `src/pages/` - Route-level page components
- `src/components/` - Reusable UI components
  - `ModernElements.jsx` - Animated background effects (particles, shapes, waves, bubbles, glow, grid)
  - `VehicleGrid.jsx` - Vehicle listing with filtering
  - `Header.jsx` / `Footer.jsx` - Layout components
- `src/data/` - Static data files

## Styling Approach

- Tailwind CSS for utility classes
- Custom CSS in `index.css` for animations and glassmorphism effects
- Custom color palette defined in `tailwind.config.js` (primary blue: #3b82f6)
- Key custom classes: `.btn-primary`, `.btn-secondary`, `.card`, `.glass-card`, `.text-gradient`
- Animation keyframes: `float`, `slideInFromLeft`, `slideInFromRight`, `fadeInUp`, `scaleIn`, `shimmer`, `pulse-glow`

## Vehicle Data Structure

Vehicles have: `id`, `brand`, `model`, `year`, `fuelType`, `transmission`, `seats`, `price` (daily), `description`, `image`, `category`, `available`, `features[]`

Categories: Économique, Compacte, SUV, Luxe, Utilitaire
