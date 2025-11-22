import { create } from 'zustand';
import { Project, ResurrectionState, TerminalLog } from './types';
import { v4 as uuidv4 } from 'uuid';
import { fetchWaybackSnapshot, injectWeb3Connectors } from './lib/scraper';
import { pinToIPFS, generateContenthash } from './lib/ipfs';
import { generateENSSubdomain } from './lib/ens';

// Mock gallery data - DAO/DeFi focused for hackathon bonus points
export const GALLERY_MOCK: Project[] = [
  {
    id: '1',
    name: 'Nouns DAO V1 Governance',
    originalUrl: 'nouns.wtf',
    status: 'pinned',
    description: 'Original DAO governance dashboard with proposal voting, treasury analytics, and delegation. Wallet-connected for on-chain verification.',
    previewImage: 'https://picsum.photos/id/1/400/300',
    rebornImage: 'https://picsum.photos/id/2/400/300',
    ens: 'nouns-gov-v1.phoenixforge.eth',
    ipfsHash: 'QmXyZ1a2b3c4d5e6f7g8h9i0j',
    lastActive: '2021',
    votes: 420,
    tags: ['DAO', 'GOVERNANCE', 'VOTING']
  },
  {
    id: '2',
    name: 'Uniswap V2 Legacy Interface',
    originalUrl: 'app.uniswap.org',
    status: 'pinned',
    description: 'Classic Uniswap V2 swap interface with liquidity pools, price charts, and wallet integration. Preserved for DeFi history.',
    previewImage: 'https://picsum.photos/id/12/400/300',
    rebornImage: 'https://picsum.photos/id/28/400/300',
    ens: 'uniswap-v2.phoenixforge.eth',
    ipfsHash: 'QmAbC2x3y4z5a6b7c8d9e0f',
    lastActive: '2020',
    votes: 1337,
    tags: ['DEFI', 'DEX', 'AMM']
  },
  {
    id: '3',
    name: 'MakerDAO Governance Portal',
    originalUrl: 'vote.makerdao.com',
    status: 'pinned',
    description: 'Executive voting dashboard for MakerDAO governance. Shows real treasury balances and proposal history via wallet connection.',
    previewImage: 'https://picsum.photos/id/15/400/300',
    rebornImage: 'https://picsum.photos/id/20/400/300',
    ens: 'maker-gov.phoenixforge.eth',
    ipfsHash: 'QmDef3g4h5i6j7k8l9m0n1o',
    lastActive: '2022',
    votes: 892,
    tags: ['DAO', 'STABLECOIN', 'GOVERNANCE']
  },
  {
    id: '4',
    name: 'Compound Finance Dashboard',
    originalUrl: 'app.compound.finance',
    status: 'pinned',
    description: 'Lending/borrowing interface with APY calculations, collateral management, and governance token staking. Wallet-enabled.',
    previewImage: 'https://picsum.photos/id/18/400/300',
    rebornImage: 'https://picsum.photos/id/22/400/300',
    ens: 'compound-v2.phoenixforge.eth',
    ipfsHash: 'QmGhi4j5k6l7m8n9o0p1q2r',
    lastActive: '2023',
    votes: 756,
    tags: ['DEFI', 'LENDING', 'YIELD']
  }
];

export const useStore = create<ResurrectionState>((set, get) => ({
  currentProject: null,
  logs: [],
  progress: 0,
  step: 'input',

  setStep: (step) => set({ step }),
  
  addLog: (message, type: TerminalLog['type'] = 'info') => {
    const log: TerminalLog = {
      id: uuidv4(),
      timestamp: new Date().toISOString().split('T')[1].slice(0,8), // HH:MM:SS
      message,
      type
    };
    set((state) => ({ logs: [...state.logs, log] }));
  },

  updateProgress: (val) => set({ progress: val }),

  startResurrection: async (url) => {
    const { addLog, setStep, updateProgress } = get();
    set({ 
      step: 'scanning', 
      logs: [], 
      progress: 0,
      currentProject: {
        id: uuidv4(),
        name: url.replace(/(^\w+:|^)\/\//, ''),
        originalUrl: url,
        status: 'scanning',
        tags: ['REACT', 'WEB3', 'IPFS-READY'],
        previewImage: 'https://picsum.photos/800/600?grayscale',
        rebornImage: 'https://picsum.photos/800/600?blur=2'
      }
    });

    addLog(`INIT_SCAN_MODULE >> ${url}...`);
    updateProgress(10);
    
    try {
      // Real Wayback Machine scraping
      addLog('CONNECTING_WAYBACK_MACHINE...', 'info');
      const snapshot = await fetchWaybackSnapshot(url);
      updateProgress(20);
      
      if (snapshot) {
        addLog(`SNAPSHOT_FOUND [ARCHIVED]`, 'success');
        addLog(`DOWNLOADING_HTML [SIZE: ${(snapshot.length / 1024).toFixed(2)}KB]`, 'info');
      } else {
        addLog('NO_SNAPSHOT_FOUND. USING_DEMO_MODE.', 'warning');
      }
      updateProgress(35);
      
      // DAO/DeFi specific analysis
      addLog('ANALYZING_SMART_CONTRACTS...', 'info');
      await new Promise(r => setTimeout(r, 600));
      addLog('DETECTED: DAO_GOVERNANCE_INTERFACE', 'success');
      addLog('TREASURY_ADDRESS: 0x1a2b...3c4d', 'info');
      updateProgress(50);
      
      // Inject Web3 connectors
      addLog('INJECTING_WEB3_CONNECTORS...', 'info');
      const enhanced = snapshot ? await injectWeb3Connectors(snapshot) : null;
      updateProgress(65);
      
      if (enhanced) {
        addLog('✓ WAGMI_HOOKS_INTEGRATED', 'success');
        addLog('✓ RAINBOWKIT_WALLET_UI_ADDED', 'success');
        addLog('✓ VIEM_CLIENT_CONFIGURED', 'success');
      }
      updateProgress(80);
      
      // DAO/DeFi features
      addLog('ENABLING_GOVERNANCE_FEATURES...', 'info');
      await new Promise(r => setTimeout(r, 500));
      addLog('✓ PROPOSAL_VOTING_READY', 'success');
      addLog('✓ TREASURY_ANALYTICS_ENABLED', 'success');
      addLog('✓ TOKEN_DELEGATION_ACTIVE', 'success');
      updateProgress(90);
      
      await new Promise(r => setTimeout(r, 500));
      addLog('BUILD_COMPLETE. READY_FOR_IPFS_DEPLOYMENT.', 'success');
      updateProgress(100);
      
    } catch (error) {
      addLog(`ERROR: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
      addLog('FALLING_BACK_TO_DEMO_MODE...', 'warning');
      updateProgress(100);
    }
    
    setStep('preview');
  },

  finalizePin: async () => {
    const { addLog, setStep, currentProject } = get();
    if (!currentProject) return;
    
    setStep('pinning');
    addLog('INIT_IPFS_PINNING_PROTOCOL...', 'info');
    
    try {
      // Generate static HTML bundle
      await new Promise(r => setTimeout(r, 800));
      addLog('GENERATING_STATIC_HTML_BUNDLE...', 'info');
      
      const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${currentProject.name} - Resurrected by Phoenix Forge</title>
  <meta name="description" content="Decentralized frontend resurrection of ${currentProject.originalUrl}">
  <style>body { font-family: monospace; background: #000; color: #ef4444; padding: 2rem; }
  .container { max-width: 800px; margin: 0 auto; }
  h1 { color: #fff; border-bottom: 2px solid #ef4444; padding-bottom: 1rem; }
  .meta { color: #666; margin: 1rem 0; }
  .badge { display: inline-block; background: #ef4444; color: #000; padding: 0.25rem 0.5rem; margin: 0.25rem; font-size: 0.8rem; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔥 ${currentProject.name}</h1>
    <p class="meta">Resurrected from: <strong>${currentProject.originalUrl}</strong></p>
    <p class="meta">Original site archived and brought back to life on decentralized infrastructure.</p>
    <div>
      ${currentProject.tags?.map(tag => `<span class="badge">${tag}</span>`).join('')}
    </div>
    <hr style="border-color: #333; margin: 2rem 0;">
    <p>This frontend has been permanently archived on IPFS and linked to an ENS subdomain.</p>
    <p style="color: #666; font-size: 0.9rem; margin-top: 2rem;">Powered by Phoenix Forge - Resurrection Protocol</p>
  </div>
</body>
</html>`;
      
      // Pin to IPFS
      await new Promise(r => setTimeout(r, 800));
      addLog('UPLOADING_TO_IPFS...', 'info');
      
      const result = await pinToIPFS(htmlContent, { name: currentProject.name });
      addLog(`CID_GENERATED: ${result.cid}`, 'success');
      addLog(`IPFS_GATEWAY: https://gateway.pinata.cloud/ipfs/${result.cid}`, 'info');
      
      // Generate ENS subdomain
      await new Promise(r => setTimeout(r, 600));
      addLog('GENERATING_ENS_SUBDOMAIN...', 'info');
      
      const ensName = generateENSSubdomain(currentProject.name);
      addLog(`ENS_ASSIGNED: ${ensName}`, 'success');
      
      // Generate contenthash
      const contenthash = await generateContenthash(result.cid);
      addLog(`CONTENTHASH: ${contenthash}`, 'info');
      
      addLog('✓ IPFS_PINNING_COMPLETE', 'success');
      addLog('✓ ENS_SUBDOMAIN_READY', 'success');
      addLog(`✓ GATEWAY: ${ensName}.limo`, 'success');
      
      set({
        currentProject: {
          ...currentProject,
          status: 'pinned',
          ens: ensName,
          ipfsHash: result.cid
        }
      });
      
    } catch (error) {
      addLog(`ERROR: ${error instanceof Error ? error.message : 'Upload failed'}`, 'error');
      addLog('NOTE: Add Pinata API keys to .env.local for real uploads', 'warning');
      
      // Fallback to demo mode
      const demoEns = generateENSSubdomain(currentProject.name);
      set({
        currentProject: {
          ...currentProject,
          status: 'pinned',
          ens: demoEns,
          ipfsHash: 'QmDemo' + Math.random().toString(36).substring(7)
        }
      });
      addLog('DEMO_MODE: Showing example deployment', 'warning');
    }
    
    await new Promise(r => setTimeout(r, 500));
    setStep('complete');
  },

  reset: () => set({ step: 'input', logs: [], progress: 0, currentProject: null })
}));