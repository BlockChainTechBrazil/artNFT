import { motion } from 'framer-motion';
import { Github, Twitter, Instagram } from 'lucide-react';
import logo from '../assets/logo/logo-art.png';
import { useTranslation } from 'react-i18next';

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 dark:bg-black text-white mt-20 transition-colors duration-300">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="ArtToken" className="w-10 h-10 object-contain" />
                <span className="text-2xl font-bold">ArtToken</span>
              </div>
            <p className="text-gray-400 dark:text-gray-500 mb-4">
              {t('footer.description')}
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-gray-400 dark:text-gray-500">
              <li>
                <a href="/" className="hover:text-purple-400 dark:hover:text-purple-300 transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="/galeria" className="hover:text-purple-400 dark:hover:text-purple-300 transition-colors">
                  {t('nav.gallery')}
                </a>
              </li>
              <li>
                <a href="/upload" className="hover:text-purple-400 dark:hover:text-purple-300 transition-colors">
                  {t('nav.createNFT')}
                </a>
              </li>
            </ul>
          </div>

          {/* Redes Sociais */}
          <div>
            <h3 className="text-lg font-semibold mb-4">{t('footer.community')}</h3>
            <div className="flex gap-4">
              <motion.a
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-purple-400 dark:hover:text-purple-300"
                whileHover={{ scale: 1.2, y: -3 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Twitter size={24} />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-purple-400 dark:hover:text-purple-300"
                whileHover={{ scale: 1.2, y: -3 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Instagram size={24} />
              </motion.a>
              <motion.a
                href="#"
                className="text-gray-400 dark:text-gray-500 hover:text-purple-400 dark:hover:text-purple-300"
                whileHover={{ scale: 1.2, y: -3 }}
                transition={{ type: 'spring', stiffness: 400 }}
              >
                <Github size={24} />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 dark:border-gray-900 mt-8 pt-8 text-center text-gray-400 dark:text-gray-500">
          <p>&copy; 2025 Blockchaintech Brazil. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};
