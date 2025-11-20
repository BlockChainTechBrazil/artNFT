import { useContext } from 'react';
import { Web3Context } from '../context/Web3ContextDefinition';

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 deve ser usado dentro de Web3Provider');
  }
  return context;
};
