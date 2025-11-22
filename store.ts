import { create } from 'zustand';
import { Project, ResurrectionState, TerminalLog } from './types';
import { v4 as uuidv4 } from 'uuid';

// Mock gallery data
export const GALLERY_MOCK: Project[] = [
  {
    id: '1',
    name: 'Nouns DAO Legacy',
    originalUrl: 'nouns.wtf',
    status: 'pinned',
    description: 'Resurrected governance dashboard from V1 era. Optimized for IPFS.',
    previewImage: 'https://picsum.photos/id/1/400/300',
    rebornImage: 'https://picsum.photos/id/2/400/300',
    ens: 'nouns-v1.eth',
    ipfsHash: 'QmXyZ...',
    lastActive: '2021',
    votes: 420,
    tags: ['DAO', 'GOV', 'LEGACY']
  },
  {
    id: '2',
    name: 'DeFi Kingdom Alpha',
    originalUrl: 'defikingdoms.com',
    status: 'pinned',
    description: 'Lost alpha interface for jewel liquidity pools. Restored on-chain data.',
    previewImage: 'https://picsum.photos/id/12/400/300',
    rebornImage: 'https://picsum.photos/id/28/400/300',
    ens: 'dfk-alpha.eth',
    ipfsHash: 'QmAbC...',
    lastActive: '2022',
    votes: 1337,
    tags: ['DEFI', 'GAMEFI', 'ALPHA']
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
    
    // Simulation sequence
    await new Promise(r => setTimeout(r, 800));
    addLog('CONNECTING_ARCHIVE_NODES...', 'info');
    updateProgress(20);
    
    await new Promise(r => setTimeout(r, 1000));
    addLog('SNAPSHOT_FOUND [COUNT: 14] YEAR: 2022', 'success');
    updateProgress(40);
    
    await new Promise(r => setTimeout(r, 800));
    addLog('EXTRACTING_ASSETS >> main.chunk.js, styles.css', 'warning');
    updateProgress(60);
    
    await new Promise(r => setTimeout(r, 1200));
    addLog('REHYDRATING_REACT_TREE...', 'info');
    addLog('INJECTING_WAGMI_CONNECTORS...', 'success');
    updateProgress(90);
    
    await new Promise(r => setTimeout(r, 500));
    addLog('BUILD_COMPLETE. READY_FOR_ENHANCEMENT.', 'success');
    updateProgress(100);
    
    setStep('preview');
  },

  finalizePin: async () => {
    const { addLog, setStep, currentProject } = get();
    setStep('pinning');
    addLog('INIT_PINME_PROTOCOL...', 'info');
    
    await new Promise(r => setTimeout(r, 1000));
    addLog('GENERATING_STATIC_EXPORT [NEXT.JS]...', 'info');
    
    await new Promise(r => setTimeout(r, 1000));
    addLog('CALCULATING_CID_HASH...', 'warning');
    
    await new Promise(r => setTimeout(r, 1200));
    addLog('UPLOADING_TO_IPFS_SWARM...', 'info');
    addLog('PINNING_SUCCESSFUL. CID: QmPhoenixR3bornXyZ', 'success');
    addLog('REGISTERING_ENS_SUBDOMAIN...', 'success');
    
    if (currentProject) {
      set({
        currentProject: {
          ...currentProject,
          status: 'pinned',
          ens: `phoenix-${currentProject.name.substring(0, 5)}.eth`,
          ipfsHash: 'QmPhoenixR3bornXyZ'
        }
      });
    }
    
    await new Promise(r => setTimeout(r, 500));
    setStep('complete');
  },

  reset: () => set({ step: 'input', logs: [], progress: 0, currentProject: null })
}));