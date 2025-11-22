# 🔥 Deploy Phoenix Forge with PinMe

This project is ready to be deployed as a **permanent, decentralized frontend** using PinMe!

## 🚀 Quick Deploy

### Method 1: PinMe CLI (Recommended)

```bash
# Install PinMe globally
npm install -g pinme

# Build the static export
npm run build

# Deploy to IPFS + ENS
pinme upload ./out
```

This will:
- ✅ Upload your built frontend to IPFS
- ✅ Pin it permanently
- ✅ Create an ENS subdomain (e.g., `phoenixforge.pinme.eth`)
- ✅ Set the contenthash record
- ✅ Make it accessible via `phoenixforge.pinme.eth.limo`

### Method 2: PinMe Web Interface

1. Visit **https://pinme.eth.limo/**
2. Build your project: `npm run build`
3. Drag and drop the `./out` folder
4. Get your permanent ENS subdomain!

## 📦 Build Command

```bash
npm run build
```

This creates a static export in the `./out` directory, optimized for IPFS deployment.

## 🎯 What Makes Phoenix Forge Perfect for PinMe DeFront Hack

### 1. **Decentralized Frontend Resurrection**
Phoenix Forge resurrects dead Web2 frontends and deploys them as **permanent Web3 frontends** using:
- ✅ IPFS for content storage
- ✅ ENS for naming and discoverability  
- ✅ Contenthash records for verifiable delivery
- ✅ eth.limo gateway for censorship-resistant access

### 2. **Built for DeFi/DAO Use Cases** (Bonus Points!)
- Resurrect abandoned DAO governance dashboards
- Bring back deprecated DeFi protocol frontends
- Archive historical Web3 app versions
- Create permanent documentation sites

### 3. **Real IPFS Integration**
Uses actual Pinata API for:
- Content pinning
- CID generation
- Gateway access
- Long-term storage

### 4. **ENS Subdomain Management**
Automatically generates ENS subdomains:
- Pattern: `{project-name}.phoenixforge.eth`
- Sets contenthash records
- Provides eth.limo gateway links

### 5. **Static Export Ready**
Configured for `output: 'export'` in Next.js:
- No server-side rendering needed
- Pure HTML/CSS/JS output
- IPFS-compatible file structure
- Optimized for permanent storage

## 🏆 Hackathon Submission Points

### Core Features
- [x] **PinMe Integration** - Built to deploy with PinMe
- [x] **IPFS Pinning** - Real IPFS upload via Pinata
- [x] **ENS Contenthash** - Sets ENS contenthash records
- [x] **Tamper-Proof** - Content-addressed IPFS CIDs
- [x] **Censorship Resistant** - Accessible via eth.limo

### Bonus Features (DeFi/DAO Focus)
- [x] **DAO Dashboard Resurrection** - Revives abandoned DAO frontends
- [x] **DeFi Protocol Archives** - Preserves deprecated DeFi UIs
- [x] **Web3 Wallet Integration** - RainbowKit for wallet connections
- [x] **On-Chain Data Display** - Shows treasury balances, DAO stats
- [x] **Permanent Archive Gallery** - Browse all resurrected projects

## 🔐 Environment Setup (Optional)

For full functionality, add these to `.env.local`:

```env
# Required for PinMe/RainbowKit
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Optional - for real IPFS uploads in the app itself
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret
```

**Note:** Even without API keys, the app works in demo mode!

## 📖 How It Works

### User Flow:
1. User enters a dead Web2 URL (e.g., old DAO site)
2. Phoenix Forge scrapes Wayback Machine
3. Injects Web3 connectors (RainbowKit, wagmi)
4. Uploads to IPFS via Pinata
5. Generates ENS subdomain name
6. Creates contenthash record
7. Shows eth.limo gateway link
8. Site is now permanent and uncensorable!

### Technical Stack:
- **Frontend**: Next.js 15 with static export
- **Web3**: wagmi + RainbowKit + viem
- **Storage**: IPFS via Pinata API
- **Naming**: ENS subdomains + contenthash
- **Gateway**: eth.limo for HTTP access
- **Scraping**: Wayback Machine CDX API

## 🎨 Demo Workflow

```bash
# 1. Start development
npm run dev

# 2. Navigate to /resurrect
# 3. Enter URL: https://nouns.wtf
# 4. Watch the resurrection process
# 5. Click "Commence Pinning"
# 6. Get permanent eth.limo link!
```

## 📊 Project Structure

```
Phoenix-forge/
├── app/              # Next.js 15 App Router pages
├── components/       # UI components (Navbar, LoadingScreen)
├── views/            # Main views (Landing, Resurrect, Gallery)
├── lib/              # Core utilities
│   ├── ipfs.ts       # IPFS pinning logic
│   ├── ens.ts        # ENS subdomain generation
│   ├── scraper.ts    # Wayback Machine integration
│   ├── wagmi.config.ts   # Web3 configuration
│   └── web3Provider.tsx  # RainbowKit provider
├── store.ts          # Zustand state management
├── types.ts          # TypeScript definitions
└── out/              # Static export (after build)
```

## 🌐 Live Demo Links

After deploying with PinMe, your site will be accessible at:

- **ENS Domain**: `phoenixforge.pinme.eth`
- **Gateway**: `https://phoenixforge.pinme.eth.limo`
- **IPFS**: `ipfs://{CID}`

## 🎯 Judging Criteria Alignment

| Criteria | Implementation |
|----------|---------------|
| **Decentralized Frontend** | ✅ Static export, IPFS-hosted |
| **ENS Integration** | ✅ Subdomain generation + contenthash |
| **IPFS Pinning** | ✅ Pinata API with CID verification |
| **Verifiable Content** | ✅ Content-addressed with cryptographic hash |
| **Tamper-Proof** | ✅ Immutable IPFS CIDs |
| **Censorship Resistant** | ✅ eth.limo gateway access |
| **DeFi/DAO Focus (Bonus)** | ✅ Resurrects DAO/DeFi frontends |

## 💡 Use Cases

1. **DAO Governance Recovery** - Bring back abandoned DAO dashboards
2. **DeFi Protocol Archives** - Preserve deprecated trading interfaces
3. **Web3 History Preservation** - Archive important crypto moments
4. **Censorship Circumvention** - Restore blocked Web3 sites
5. **Permanent Documentation** - Create unkillable docs/wikis

## 🚨 Important Notes

- The `out/` directory is gitignored (created during build)
- Static export means no API routes (all data fetching is client-side)
- Images are unoptimized for IPFS compatibility
- All Web3 functionality works purely on the frontend

## 🎁 Extra Features

- **RainbowKit Wallet Connection** - Multi-wallet support
- **Framer Motion Animations** - Smooth, professional UI
- **Terminal-Style Logging** - Real-time deployment feedback
- **Split Preview Comparison** - See before/after resurrection
- **Gallery Archive** - Browse all resurrected projects
- **Responsive Design** - Works on mobile and desktop

## 📝 Submission Checklist

- [x] Built with Next.js static export
- [x] Configured for PinMe deployment
- [x] IPFS integration implemented
- [x] ENS subdomain generation
- [x] eth.limo gateway links
- [x] Wallet connection (RainbowKit)
- [x] DeFi/DAO focused use case
- [x] README with deployment instructions
- [x] Demo-ready workflow

## 🏁 Ready to Deploy!

```bash
npm run build
pinme upload ./out
```

Your Phoenix Forge will live forever on IPFS + ENS! 🔥
