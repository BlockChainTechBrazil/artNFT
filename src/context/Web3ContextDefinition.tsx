import { createContext } from 'react';
import type { Web3State } from '../types';

export interface Web3ContextType extends Web3State {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isLoading: boolean;
}

export const Web3Context = createContext<Web3ContextType | undefined>(undefined);
