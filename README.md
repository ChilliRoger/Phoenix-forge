# PhoenixForge - Next.js

Industrial-grade Web3 resurrection tool. Decentralized frontend recovery pinned to IPFS/ENS.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create environment file:
```bash
cp .env.local.example .env.local
```

3. Add your Gemini API key to `.env.local`:
```
GEMINI_API_KEY=your_api_key_here
NEXT_PUBLIC_API_KEY=your_api_key_here
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:
```bash
npm run build
npm start
```

## Migration from Vite to Next.js

This project has been migrated from Vite to Next.js App Router while preserving all existing components:

### Changes Made:
- ✅ Updated to Next.js 15 with App Router
- ✅ Replaced React Router with Next.js navigation
- ✅ Converted all components to Client Components (`'use client'`)
- ✅ Added Tailwind CSS with PostCSS
- ✅ Preserved all existing components without modification
- ✅ Maintained the same routing structure (`/`, `/resurrect`, `/gallery`)

### Project Structure:
```
app/
  ├── layout.tsx          # Root layout with fonts
  ├── app-layout.tsx      # App wrapper with loading screen
  ├── page.tsx            # Home page (Landing)
  ├── resurrect/
  │   └── page.tsx        # Resurrect page
  └── gallery/
      └── page.tsx        # Gallery page

components/             # All original components (unchanged)
views/                  # All original views (unchanged)
```

## Tech Stack

- **Next.js 15** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **Lucide React** - Icons

## License

MIT
