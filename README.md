# 🔥 Phoenix Forge - Decentralized Frontend Resurrection Protocol

**Resurrect abandoned DAO governance dashboards and DeFi protocol frontends as permanent, censorship-resistant Web3 sites on IPFS + ENS**

[![Deploy with PinMe](https://img.shields.io/badge/Deploy%20with-PinMe-red)](https://pinme.eth.limo/)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black)](https://nextjs.org/)
[![IPFS](https://img.shields.io/badge/Storage-IPFS-blue)](https://ipfs.io/)
[![ENS](https://img.shields.io/badge/Naming-ENS-purple)](https://ens.domains/)

## 🎯 Built for PinMe DeFront Hack

Phoenix Forge is the **ultimate tool for creating permanent, decentralized frontends** - perfectly aligned with the PinMe DeFront Hackathon mission.

### The Problem
DAOs and DeFi protocols abandon their frontends when funding runs out. Sites go offline, DNS gets hijacked, and users lose access to critical infrastructure. **Contracts live on; interfaces die.**

### The Solution
Phoenix Forge resurrects dead Web2 sites and deploys them as **permanent Web3 frontends** using:
- 🔐 **IPFS** - Content-addressed, tamper-proof storage
- 🌐 **ENS** - Human-readable, blockchain-based naming
- 🛡️ **Contenthash** - Verifiable, immutable deployment
- 🚀 **eth.limo** - Censorship-resistant HTTP gateway access

## ✨ Features

### Core Functionality
- ✅ **Wayback Machine Integration** - Scrapes archived sites
- ✅ **Web3 Connector Injection** - Adds RainbowKit wallet support
- ✅ **IPFS Pinning** - Real Pinata API uploads
- ✅ **ENS Subdomain Generation** - Automatic `.phoenixforge.eth` subdomains
- ✅ **Contenthash Records** - Sets IPFS CIDs on ENS
- ✅ **eth.limo Gateway Links** - Accessible via HTTP

### Bonus: DeFi/DAO Focus
- 🏛️ Resurrect abandoned DAO governance dashboards
- 💰 Revive deprecated DeFi protocol frontends  
- 📜 Archive historical Web3 applications
- 🔓 Restore censored or blocked sites

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Open http://localhost:3000
```

### Deploy with PinMe

```bash
# Build static export
npm run build

# Deploy to IPFS + ENS
npx pinme upload ./out
```

Your site will be permanently accessible at:
- **ENS**: `phoenixforge.pinme.eth`
- **Gateway**: `https://phoenixforge.pinme.eth.limo`

## 🎮 How to Use

1. **Navigate to `/resurrect`**
2. **Enter a dead URL** (e.g., `https://nouns.wtf`)
3. **Watch the resurrection process**:
   - Scrapes Wayback Machine
   - Injects Web3 connectors
   - Generates static HTML
4. **Click "Commence Pinning"**
5. **Get your permanent eth.limo link!**

## 🏗️ Technical Stack

- **Frontend**: Next.js 15 (App Router) with static export
- **Styling**: Tailwind CSS with custom dark theme
- **Animations**: Framer Motion
- **State**: Zustand
- **Web3**: wagmi + RainbowKit + viem
- **Storage**: IPFS via Pinata API
- **Naming**: ENS subdomains + contenthash
- **Scraping**: Wayback Machine CDX API + Cheerio

## 📦 Project Structure

```
Phoenix-forge/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with Web3Provider
│   ├── page.tsx            # Landing page
│   ├── resurrect/          # Resurrection interface
│   └── gallery/            # Archive gallery
├── components/
│   ├── Navbar.tsx          # Navigation with wallet connect
│   ├── LoadingScreen.tsx   # Boot sequence animation
│   └── ParticleBackground.tsx
├── lib/
│   ├── ipfs.ts             # IPFS pinning (Pinata)
│   ├── ens.ts              # ENS subdomain generation
│   ├── scraper.ts          # Wayback Machine integration
│   ├── wagmi.config.ts     # Web3 configuration
│   └── web3Provider.tsx    # RainbowKit provider
├── views/
│   ├── Landing.tsx         # Hero section
│   ├── Resurrect.tsx       # Main resurrection UI
│   └── Gallery.tsx         # Project archive
├── store.ts                # Zustand state management
└── types.ts                # TypeScript definitions
```

## 🔐 Environment Variables

Create `.env.local`:

```env
# Required for wallet connection
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Optional - for real IPFS uploads
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret
```

**Note:** App works in demo mode without API keys!

## 🏆 Hackathon Alignment

| Criteria | Implementation |
|----------|---------------|
| Decentralized Frontend | Static export, no server needed |
| ENS Integration | Auto-generates subdomains + contenthash |
| IPFS Pinning | Pinata API with CID verification |
| Verifiable Content | Content-addressed with crypto hash |
| Tamper-Proof | Immutable IPFS CIDs |
| Censorship Resistant | eth.limo gateway access |
| **DeFi/DAO Focus (Bonus)** | ✅ **Resurrects DAO/DeFi frontends** |

## 🛠️ Development

### Run Dev Server
```bash
npm run dev
```

### Build Static Export
```bash
npm run build
# Output: ./out directory
```

### Type Check
```bash
npm run lint
```

## 📝 API Integration

### IPFS Upload (with Pinata)
```typescript
import { pinToIPFS } from './lib/ipfs';

const result = await pinToIPFS(htmlContent, 'project-name');
// Returns: { cid, pinataUrl }
```

### ENS Subdomain Generation
```typescript
import { generateENSSubdomain } from './lib/ens';

const ensName = generateENSSubdomain('nouns.wtf');
// Returns: "nouns-wtf.phoenixforge.eth"
```

### Wayback Machine Scraping
```typescript
import { fetchWaybackSnapshot } from './lib/scraper';

const snapshot = await fetchWaybackSnapshot('https://nouns.wtf');
// Returns: { html, url, year }
```

## 🌐 Live Demo

After deploying with PinMe:
- **ENS**: `phoenixforge.pinme.eth`
- **Gateway**: `https://phoenixforge.pinme.eth.limo`
- **IPFS**: `ipfs://{CID}`

## 🔗 Documentation

- [Deploy with PinMe Guide](./DEPLOY_WITH_PINME.md)
- [Web3 Integration](./WEB3_INTEGRATION.md)
- [Quick Start Guide](./WEB3_QUICK_START.md)
- [Wallet Setup](./WALLET_SETUP.md)

## 🎯 Use Cases

1. **DAO Governance Recovery** - Restore abandoned DAO dashboards
2. **DeFi Protocol Archives** - Preserve deprecated trading UIs
3. **Web3 History** - Archive important crypto moments
4. **Censorship Resistance** - Restore blocked sites
5. **Permanent Docs** - Create unkillable documentation

## 🔗 Links

- **PinMe**: https://pinme.eth.limo/
- **ENS Domains**: https://ens.domains/
- **IPFS**: https://ipfs.io/
- **Wayback Machine**: https://archive.org/web/

## 🙏 Built With

- [Next.js](https://nextjs.org/) - React framework
- [RainbowKit](https://www.rainbowkit.com/) - Wallet connection
- [wagmi](https://wagmi.sh/) - React hooks for Ethereum
- [Pinata](https://pinata.cloud/) - IPFS pinning service
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Tailwind CSS](https://tailwindcss.com/) - Styling

## 📄 License

MIT License - feel free to use for your own PinMe deployments!

---

**Made for PinMe DeFront Hack 🔥**

*Proving that decentralized frontends make the web safer, one resurrection at a time.*
