# FuelNow - Emergency Fuel Delivery MVP

A production-ready MVP web app for emergency fuel delivery service built with Next.js and Tailwind CSS.

## Features

- Landing page with clear value proposition
- Order form with geolocation support
- API routes for order management
- Mobile-first responsive design
- Deployable on Vercel and Netlify

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn

### Installation

1. Clone or download the project
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the app.

### Build for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to a GitHub repository
2. Connect your repo to [Vercel](https://vercel.com)
3. Deploy automatically - Vercel will detect Next.js and configure it

### Netlify

1. Build the project: `npm run build`
2. Upload the `.next` folder and `public` folder to Netlify
3. Set the build command to `npm run build` and publish directory to `.next`

## Project Structure

- `app/page.tsx` - Main landing page with order form
- `app/layout.tsx` - Root layout
- `app/api/orders/route.ts` - API for creating orders
- `app/globals.css` - Global styles with Tailwind

## Environment Variables

No environment variables required for MVP. For production with database, add Firebase or Supabase config.

## Tech Stack

- **Frontend:** Next.js 16, React, TypeScript
- **Styling:** Tailwind CSS v4
- **Backend:** Next.js API Routes (in-memory for MVP)
- **Deployment:** Vercel / Netlify compatible

## Notes

- Orders are stored in memory for demo purposes
- For production, integrate with Firebase Firestore or Supabase
- Geolocation requires user permission
- WhatsApp link uses placeholder number - replace with actual
