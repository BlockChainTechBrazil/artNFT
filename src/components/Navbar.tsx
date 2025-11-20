import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Palette, Wallet, LogOut, Globe } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { useState, useEffect, useRef } from 'react';

export const Navbar = () => {
  const { address, isConnected, connectWallet, disconnectWallet, isLoading } = useWeb3();
  const { t, i18n } = useTranslation();
  const [showLanguages, setShowLanguages] = useState(false);
  const languageRef = useRef<HTMLDivElement>(null);

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setShowLanguages(false);
  };

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (languageRef.current && !languageRef.current.contains(event.target as Node)) {
        setShowLanguages(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  return (
    <motion.nav
      className="shadow-lg sticky top-0 z-50 backdrop-blur-lg bg-white/90 dark:bg-gray-900/90 transition-colors duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between min-w-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Palette size={32} className="text-purple-600 dark:text-purple-400" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              ArtToken
            </span>
          </Link>

          {/* Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
            >
              {t('nav.home')}
            </Link>
            <Link
              to="/galeria"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
            >
              {t('nav.gallery')}
            </Link>
            <Link
              to="/upload"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 font-medium transition-colors"
            >
              {t('nav.createNFT')}
            </Link>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 min-w-0">
            {/* Language Selector */}
            <div className="relative" ref={languageRef}>
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title="Change Language"
              >
                <div className="flex items-center gap-2">
                  <Globe size={20} className="text-gray-700 dark:text-gray-300" />
                  <span className="text-sm hidden lg:inline text-gray-700 dark:text-gray-300">
                    {currentLanguage.flag}
                  </span>
                </div>
              </button>

              {showLanguages && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                      <span>{lang.flag}</span>
                      <span className="text-gray-700 dark:text-gray-300">{lang.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Theme toggle removed */}

            {/* Wallet */}
            {isConnected && address ? (
              <div className="flex items-center gap-3">
                <div className="hidden md:block px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-mono text-purple-700 dark:text-purple-300">
                      {formatAddress(address)}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={disconnectWallet}
                  variant="outline"
                  size="sm"
                  className="px-3 py-1 h-10 md:h-auto whitespace-nowrap"
                >
                  <LogOut size={18} />
                  <span className="hidden md:inline">{t('nav.disconnect')}</span>
                </Button>
              </div>
            ) : (
                <Button
                  onClick={connectWallet}
                  disabled={isLoading}
                  variant="primary"
                  size="md"
                  className="px-3 py-1 h-10 md:h-auto"
                  aria-label={t('nav.connectWallet')}
                >
                  <Wallet size={20} />
                  <span className="hidden sm:inline ml-2">{isLoading ? 'Conectando...' : t('nav.connectWallet')}</span>
                </Button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}; 
