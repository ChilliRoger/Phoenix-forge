# Phoenix Forge

<div align="center">

**Decentralized Frontend Resurrection Protocol**

[![Deploy with PinMe](https://img.shields.io/badge/Deploy%20with-PinMe-red)](https://pinme.eth.limo/)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2015-black)](https://nextjs.org/)
[![IPFS](https://img.shields.io/badge/Storage-IPFS-blue)](https://ipfs.io/)
[![ENS](https://img.shields.io/badge/Naming-ENS-purple)](https://ens.domains/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

*Resurrect abandoned DAO governance dashboards and DeFi protocol frontends as permanent, censorship-resistant Web3 sites on IPFS + ENS*

</div>

---

## Overview

Phoenix Forge is a decentralized frontend resurrection platform designed to preserve critical Web3 infrastructure. When DAO governance dashboards and DeFi protocol interfaces go offline due to funding constraints, domain expiration, or team dissolution, Phoenix Forge ensures these essential tools remain permanently accessible through IPFS and ENS.

### The Problem

Smart contracts are immutable and live forever on the blockchain, but their frontend interfaces are vulnerable to centralized hosting failures. When DAO funding runs out, domains expire, or teams disband, members lose access to critical governance tools, treasury management interfaces, and protocol dashboards—effectively locking users out of their on-chain assets.

### The Solution

Phoenix Forge addresses this critical infrastructure gap by:

- **Archiving** abandoned frontends from the Wayback Machine
- **Enhancing** them with modern Web3 wallet connectors
- **Deploying** to IPFS for permanent, tamper-proof storage
- **Linking** via ENS subdomains for human-readable access
- **Enabling** censorship-resistant access through eth.limo gateways

---

## Features

### Core Capabilities

- ✅ **Wayback Machine Integration** - Automated scraping of archived sites
- ✅ **Web3 Connector Injection** - RainbowKit wallet support integration
- ✅ **IPFS Pinning** - Real-time uploads via Pinata API
- ✅ **ENS Subdomain Generation** - Automatic subdomain creation
- ✅ **Contenthash Records** - Verifiable IPFS CID linking
- ✅ **Static Export** - Fully decentralized, no server required

### DAO/DeFi Focus

- 🏛️ **Governance Dashboard Recovery** - Restore abandoned DAO voting interfaces
- 💰 **Protocol Frontend Preservation** - Archive deprecated DeFi UIs
- 📜 **Historical Archive** - Preserve important Web3 application versions
- 🔓 **Censorship Resistance** - Restore blocked or removed sites

---

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- WalletConnect Project ID (for wallet connections)
- Pinata API credentials (optional, for real IPFS uploads)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/phoenix-forge.git
cd phoenix-forge

# Install dependencies
npm install --legacy-peer-deps

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build static export
npm run build

# Output will be in ./out directory
```

### Deployment

```bash
# Install PinMe CLI globally
npm install -g pinme

# Deploy to IPFS + ENS
pinme upload ./out
```

Your site will be permanently accessible via:
- **ENS Domain**: `phoenixforge.pinme.eth`
- **Gateway URL**: `https://phoenixforge.pinme.eth.limo`
- **IPFS CID**: `ipfs://{CID}`

---

## Usage

### Resurrecting a Frontend

1. Navigate to the `/resurrect` page
2. Enter the URL of the abandoned site (e.g., `https://nouns.wtf`)
3. Monitor the resurrection process:
   - Wayback Machine snapshot retrieval
   - Web3 connector injection
   - Static HTML generation
   - IPFS pinning
4. Click "Commence Pinning" to finalize
5. Receive permanent access links (ENS, IPFS, Gateway)

### Gallery

Browse all resurrected projects in the `/gallery` page, featuring:
- Filter by category (DAO, DeFi, Governance, etc.)
- Search functionality
- Sort by popularity or recency
- View deployment details

---

## Technical Architecture

### Stack

- **Framework**: Next.js 15 (App Router) with static export
- **Language**: TypeScript 5.8+
- **Styling**: Tailwind CSS 3.4+
- **State Management**: Zustand 5.0+
- **Animations**: Framer Motion 12.23+
- **Web3**: wagmi 2.12+, viem 2.21+, RainbowKit 2.1+
- **Storage**: IPFS via Pinata API
- **Scraping**: Cheerio + Wayback Machine CDX API

### Project Structure

```
phoenix-forge/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout with Web3Provider
│   ├── app-layout.tsx     # App wrapper component
│   ├── page.tsx           # Landing page route
│   ├── resurrect/         # Resurrection interface
│   └── gallery/           # Archive gallery
├── components/            # Reusable UI components
│   ├── Navbar.tsx         # Navigation with wallet connect
│   ├── LoadingScreen.tsx  # Boot sequence animation
│   ├── ParticleBackground.tsx
│   └── ui/                # UI primitives
├── lib/                   # Core utilities
│   ├── ipfs.ts           # IPFS pinning logic
│   ├── ens.ts            # ENS subdomain generation
│   ├── scraper.ts        # Wayback Machine integration
│   ├── wagmi.config.ts   # Web3 configuration
│   └── web3Provider.tsx  # RainbowKit provider
├── views/                 # Page-level views
│   ├── Landing.tsx       # Hero section
│   ├── Resurrect.tsx     # Main resurrection UI
│   └── Gallery.tsx       # Project archive
├── store.ts              # Zustand state management
└── types.ts              # TypeScript definitions
```

---

## Configuration

### Environment Variables

Create a `.env.local` file:

```env
# Required for wallet connection
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Optional - for real IPFS uploads
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_key
NEXT_PUBLIC_PINATA_SECRET_KEY=your_pinata_secret

# Optional - for enhanced features
NEXT_PUBLIC_ETHERSCAN_API_KEY=your_etherscan_key
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
NEXT_PUBLIC_RPC_URL=your_rpc_url
```

**Note**: The application works in demo mode without API keys, but real IPFS uploads require Pinata credentials.

### API Keys

- **WalletConnect**: Get your Project ID from [cloud.walletconnect.com](https://cloud.walletconnect.com/)
- **Pinata**: Sign up at [pinata.cloud](https://pinata.cloud/) for IPFS pinning
- **Etherscan**: Optional, for on-chain data queries
- **GitHub**: Optional, for repository scraping

---

## API Reference

### IPFS Functions

```typescript
import { pinToIPFS } from '@/lib/ipfs';

// Pin content to IPFS
const result = await pinToIPFS(htmlContent, {
  name: 'project-name',
  description: 'Resurrected by Phoenix Forge'
});
// Returns: { cid, contenthash }
```

### ENS Functions

```typescript
import { generateENSSubdomain, resolveENS } from '@/lib/ens';

// Generate subdomain
const ensName = generateENSSubdomain('nouns.wtf');
// Returns: "nouns-wtf.phoenixforge.eth"

// Resolve ENS to address
const address = await resolveENS('vitalik.eth');
```

### Scraper Functions

```typescript
import { fetchWaybackSnapshot, injectWeb3Connectors } from '@/lib/scraper';

// Fetch archived page
const html = await fetchWaybackSnapshot('https://nouns.wtf');

// Inject Web3 connectors
const enhanced = injectWeb3Connectors(html);
```

---

## Use Cases

### 1. DAO Governance Recovery
Restore abandoned DAO dashboards with voting interfaces, treasury analytics, and proposal management tools.

### 2. DeFi Protocol Archives
Preserve deprecated DeFi protocol frontends for historical reference and user access.

### 3. Web3 History Preservation
Archive important moments in Web3 history, ensuring they remain accessible for future generations.

### 4. Censorship Resistance
Restore blocked or removed sites through decentralized infrastructure.

### 5. Permanent Documentation
Create unkillable documentation sites that survive hosting failures.

---

## Hackathon Alignment

Built for the **PinMe DeFront Hack**, Phoenix Forge meets all core criteria:

| Criteria | Implementation |
|----------|----------------|
| **Decentralized Frontend** | ✅ Static export, no server required |
| **ENS Integration** | ✅ Auto-generates subdomains + contenthash |
| **IPFS Pinning** | ✅ Pinata API with CID verification |
| **Verifiable Content** | ✅ Content-addressed with cryptographic hash |
| **Tamper-Proof** | ✅ Immutable IPFS CIDs |
| **Censorship Resistant** | ✅ eth.limo gateway access |
| **DeFi/DAO Focus (Bonus)** | ✅ **Resurrects DAO/DeFi frontends** |

---

## Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build static export
npm run start        # Start production server (if needed)

# Code Quality
npm run lint         # Run ESLint
```

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Documentation

- [Deploy with PinMe Guide](./DEPLOY_WITH_PINME.md)
- [Web3 Integration Guide](./WEB3_INTEGRATION.md)
- [Quick Start Guide](./WEB3_QUICK_START.md)
- [Wallet Setup](./WALLET_SETUP.md)

---

## Resources

- **PinMe**: [pinme.eth.limo](https://pinme.eth.limo/)
- **ENS Domains**: [ens.domains](https://ens.domains/)
- **IPFS**: [ipfs.io](https://ipfs.io/)
- **Wayback Machine**: [archive.org/web](https://archive.org/web/)

---


