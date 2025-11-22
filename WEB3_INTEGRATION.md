# Web3 Integration Guide for PhoenixForge

This guide explains how to use the newly integrated Web3 features in your PhoenixForge project.

## ✅ Features Integrated

### 1. **Wallet Connection (wagmi + RainbowKit)**
- Multi-chain support (Ethereum, Polygon, Optimism, Arbitrum)
- Modern wallet connection UI
- ENS name and avatar support

### 2. **IPFS Integration**
- Pinata for file/JSON pinning
- Infura IPFS client support
- Automatic CID generation
- Contenthash encoding for ENS

### 3. **ENS Integration**
- ENS name resolution
- Reverse ENS lookup
- Avatar fetching
- Subdomain generation for resurrected projects

### 4. **Archive Scraping**
- Wayback Machine snapshot fetching
- GitHub repository scraping
- HTML parsing and asset extraction
- Web3 connector injection
- URL cleaning and optimization

### 5. **On-Chain Data**
- Treasury balance queries
- DAO statistics fetching
- Token holder counting
- Contract verification checking

### 6. **Contenthash Generation**
- Real CID generation from content
- ENS-compatible contenthash format
- Cryptographic verification

---

## 📦 Installation

The following packages have been added to your `package.json`:

```bash
npm install wagmi viem @rainbow-me/rainbowkit @tanstack/react-query \
  ipfs-http-client cheerio axios crypto-js
```

**Note:** If you encounter disk space issues, try:
```bash
npm cache clean --force
npm install --legacy-peer-deps
```

---

## 🔧 Setup Instructions

### Step 1: Environment Variables

Create `.env.local` file (copy from `.env.local.example`):

```env
# Required for Wallet Connection
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Required for IPFS Pinning (choose one)
NEXT_PUBLIC_PINATA_API_KEY=your_pinata_key
NEXT_PUBLIC_PINATA_API_SECRET=your_pinata_secret

# Optional
NEXT_PUBLIC_ETHERSCAN_API_KEY=your_etherscan_key
NEXT_PUBLIC_GITHUB_TOKEN=your_github_token
```

**Get API Keys:**
- WalletConnect: https://cloud.walletconnect.com/
- Pinata: https://pinata.cloud/
- Etherscan: https://etherscan.io/apis

### Step 2: Wrap App with Web3Provider

Update `app/layout.tsx`:

```tsx
import { Web3Provider } from '@/lib/web3Provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
```

---

## 🎯 Usage Examples

### 1. Connect Wallet

Update `components/Navbar.tsx` to use RainbowKit:

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit';

// Replace the wallet button with:
<ConnectButton 
  chainStatus="icon"
  showBalance={false}
/>
```

### 2. Pin to IPFS

In `store.ts`, replace mock pinning:

```tsx
import { pinToIPFS } from '@/lib/ipfs';
import { generateENSSubdomain } from '@/lib/ens';

finalizePin: async () => {
  const { currentProject } = get();
  
  // Real IPFS pinning
  const htmlContent = `<!DOCTYPE html>...`; // Resurrected HTML
  const { cid, contenthash } = await pinToIPFS(htmlContent, {
    name: currentProject?.name,
    description: 'Resurrected by PhoenixForge',
  });
  
  const ensName = generateENSSubdomain(currentProject?.name || '');
  
  set({
    currentProject: {
      ...currentProject!,
      ipfsHash: cid,
      ens: ensName,
      status: 'pinned',
    }
  });
}
```

### 3. Scrape Wayback Machine

In resurrection flow:

```tsx
import { fetchWaybackSnapshot, parseHTML, cleanHTML, injectWeb3Connectors } from '@/lib/scraper';

startResurrection: async (url) => {
  addLog('CONNECTING_ARCHIVE_NODES...');
  
  // Fetch from Wayback
  const html = await fetchWaybackSnapshot(url);
  
  if (html) {
    addLog('SNAPSHOT_FOUND', 'success');
    
    // Parse and clean
    const { metadata } = parseHTML(html, url);
    const cleaned = cleanHTML(html);
    const enhanced = injectWeb3Connectors(cleaned);
    
    addLog('INJECTING_WAGMI_CONNECTORS...', 'success');
    
    // Continue with resurrection...
  }
}
```

### 4. Display On-Chain Data

In preview/gallery:

```tsx
import { fetchDAOStats } from '@/lib/onchain';
import { useEffect, useState } from 'react';

const [daoStats, setDaoStats] = useState(null);

useEffect(() => {
  fetchDAOStats('0x...').then(setDaoStats);
}, []);

return (
  <div className="stats">
    <p>Treasury: ${daoStats?.treasuryBalance}</p>
    <p>Proposals: {daoStats?.proposalCount}</p>
  </div>
);
```

### 5. Resolve ENS

```tsx
import { resolveENS, getENSAvatar } from '@/lib/ens';

const address = await resolveENS('vitalik.eth');
const avatar = await getENSAvatar('vitalik.eth');
```

---

## 🔌 Integration Points

### Components to Update:

1. **`components/Navbar.tsx`**
   - Replace wallet button with RainbowKit's ConnectButton
   - Show ENS name when connected

2. **`store.ts`**
   - Replace `startResurrection` with real Wayback fetching
   - Replace `finalizePin` with real IPFS pinning
   - Add ENS subdomain generation

3. **`views/Resurrect.tsx`**
   - Add real-time scraping logs
   - Show actual IPFS CID in success modal
   - Add "View on IPFS" link

4. **`views/Gallery.tsx`**
   - Fetch real DAO stats for cards
   - Add verification badges for on-chain data
   - Enable filtering by chain

5. **`views/Landing.tsx`**
   - Add live treasury stats in preview section
   - Show real resurrection count from on-chain

---

## 🧪 Testing

### Mock Mode (Default)
All functions have fallbacks for development without API keys:
- IPFS: Generates mock CIDs
- ENS: Returns mock subdomains
- Scraper: Uses local samples

### Production Mode
Set all environment variables to enable real functionality.

---

## 📚 API Reference

### IPFS Functions (`lib/ipfs.ts`)
- `pinToIPFS(content, metadata)` - Pin content and get CID
- `uploadToPinata(file)` - Upload file to Pinata
- `generateContenthash(cid)` - Convert CID to ENS contenthash

### ENS Functions (`lib/ens.ts`)
- `resolveENS(name)` - Get address from ENS
- `getENSName(address)` - Reverse lookup
- `generateENSSubdomain(name)` - Create subdomain
- `getENSAvatar(name)` - Fetch avatar

### Scraper Functions (`lib/scraper.ts`)
- `fetchWaybackSnapshot(url)` - Get archived page
- `parseHTML(html, baseUrl)` - Extract assets
- `injectWeb3Connectors(html)` - Add wagmi support
- `searchWaybackSnapshots(url)` - Find all snapshots
- `fetchGitHubRepo(owner, repo)` - Get GitHub files

### On-Chain Functions (`lib/onchain.ts`)
- `fetchDAOStats(address)` - Get treasury/proposal data
- `useTreasuryBalance(address)` - React hook for balance
- `fetchTokenHolders(address)` - Get holder count
- `isContractVerified(address)` - Check verification

---

## ⚠️ Important Notes

1. **API Rate Limits**: Wayback Machine and GitHub have rate limits. Cache results when possible.

2. **IPFS Costs**: Pinata charges for storage. Use wisely or implement quota management.

3. **ENS Ownership**: Setting contenthash requires ENS ownership. The mock version logs but doesn't execute.

4. **Security**: Never commit API keys. Use `.env.local` (gitignored).

5. **Fallbacks**: All functions handle errors gracefully and return mock data when APIs fail.

---

## 🚀 Next Steps

1. Install dependencies: `npm install --legacy-peer-deps`
2. Configure environment variables
3. Wrap app with Web3Provider
4. Update components to use real functions
5. Test with real wallet and IPFS
6. Deploy to production

---

## 📞 Support

If you encounter issues:
1. Check console for error messages
2. Verify API keys are correct
3. Ensure sufficient disk space for `node_modules`
4. Try `npm cache clean --force`

For Web3 specific issues:
- wagmi docs: https://wagmi.sh/
- RainbowKit: https://www.rainbowkit.com/
- viem: https://viem.sh/
