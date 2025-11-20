import React, { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { BrowserProvider } from 'ethers';
import type { Eip1193Provider } from 'ethers';
import type { Web3State } from '../types';
import { Web3Context } from './Web3ContextDefinition';

interface Web3ProviderProps {
  children: ReactNode;
}

// Interface estendida para Ethereum Provider com eventos
interface EthereumProvider extends Eip1193Provider {
  on?: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener?: (event: string, handler: (...args: unknown[]) => void) => void;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [web3State, setWeb3State] = useState<Web3State>({
    provider: null,
    signer: null,
    address: null,
    isConnected: false,
    chainId: null,
  });
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      alert('Por favor, instale MetaMask para usar esta aplicação!');
      return;
    }

    try {
      setIsLoading(true);
      const ethereum = window.ethereum as EthereumProvider;

      // Solicita acesso à conta
      const accounts = await ethereum.request?.({
        method: 'eth_requestAccounts',
      }) as string[];

      if (!accounts || accounts.length === 0) {
        throw new Error('Nenhuma conta encontrada');
      }

      const provider = new BrowserProvider(ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
      const network = await provider.getNetwork();
      const chainId = Number(network.chainId);

      setWeb3State({
        provider,
        signer,
        address,
        isConnected: true,
        chainId,
      });

      // Salva no localStorage apenas se conectou com sucesso
      localStorage.setItem('walletConnected', 'true');
      localStorage.setItem('walletAddress', address);
    } catch (error) {
      console.error('Erro ao conectar carteira:', error);
      alert('Erro ao conectar carteira. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const disconnectWallet = () => {
    setWeb3State({
      provider: null,
      signer: null,
      address: null,
      isConnected: false,
      chainId: null,
    });
    localStorage.removeItem('walletConnected');
    localStorage.removeItem('walletAddress');
  };

  // Não reconecta automaticamente - usuário deve conectar manualmente
  // useEffect(() => {
  //   const wasConnected = localStorage.getItem('walletConnected');
  //   if (wasConnected === 'true' && typeof window.ethereum !== 'undefined') {
  //     connectWallet();
  //   }
  // }, []);

  // Listeners para mudanças de conta e rede
  useEffect(() => {
    if (typeof window.ethereum === 'undefined') return;

    const ethereum = window.ethereum as EthereumProvider;

    const handleAccountsChanged = (accounts: unknown) => {
      const accountsArray = accounts as string[];
      if (accountsArray.length === 0) {
        disconnectWallet();
      } else {
        connectWallet();
      }
    };

    const handleChainChanged = () => {
      window.location.reload();
    };

    ethereum.on?.('accountsChanged', handleAccountsChanged);
    ethereum.on?.('chainChanged', handleChainChanged);

    return () => {
      ethereum.removeListener?.('accountsChanged', handleAccountsChanged);
      ethereum.removeListener?.('chainChanged', handleChainChanged);
    };
  }, []);

  return (
    <Web3Context.Provider
      value={{
        ...web3State,
        connectWallet,
        disconnectWallet,
        isLoading,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

// Declaração global para TypeScript
declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}
