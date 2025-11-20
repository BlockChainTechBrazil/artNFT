import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, Wallet, LogOut } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';
import { Button } from './Button';

export const Navbar = () => {
  const { address, isConnected, connectWallet, disconnectWallet, isLoading } = useWeb3();

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <motion.nav
      className="shadow-lg sticky top-0 z-50 backdrop-blur-lg bg-white/90"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Palette size={32} className="text-purple-600" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              ArteNFT
            </span>
          </Link>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Início
            </Link>
            <Link
              to="/galeria"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Galeria
            </Link>
            <Link
              to="/upload"
              className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
            >
              Criar NFT
            </Link>
          </div>

          {/* Wallet */}
          <div>
            {isConnected && address ? (
              <div className="flex items-center gap-3">
                <div className="hidden md:block px-4 py-2 bg-purple-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-mono text-purple-700">
                      {formatAddress(address)}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  size="sm"
                >
                  <LogOut size={18} />
                  <span className="hidden md:inline">Desconectar</span>
                </Button>
              </div>
            ) : (
              <Button
                onClick={connectWallet}
                disabled={isLoading}
                variant="primary"
                size="md"
              >
                <Wallet size={20} />
                {isLoading ? 'Conectando...' : 'Conectar Carteira'}
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}; 
