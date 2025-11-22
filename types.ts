export interface Project {
  id: string;
  name: string;
  originalUrl: string;
  status: 'dead' | 'scanning' | 'rebuilding' | 'ready' | 'pinning' | 'pinned';
  description?: string;
  previewImage?: string;
  rebornImage?: string;
  ens?: string;
  ipfsHash?: string;
  lastActive?: string;
  votes?: number;
  tags: string[];
}

export interface TerminalLog {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
}

export interface ResurrectionState {
  currentProject: Project | null;
  logs: TerminalLog[];
  progress: number;
  step: 'input' | 'scanning' | 'preview' | 'pinning' | 'complete';
  
  setStep: (step: ResurrectionState['step']) => void;
  addLog: (message: string, type?: TerminalLog['type']) => void;
  updateProgress: (val: number) => void;
  startResurrection: (url: string) => void;
  finalizePin: () => Promise<void>;
  reset: () => void;
}