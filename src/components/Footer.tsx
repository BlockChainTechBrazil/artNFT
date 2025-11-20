import { motion } from 'framer-motion';
import { Palette, Github, Twitter, Instagram } from 'lucide-react';

export const Footer = () => (
  <footer className="bg-gray-900 text-white mt-20">
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo e Descrição */}
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Palette size={28} className="text-purple-500" />
            <span className="text-2xl font-bold">ArteNFT</span>
          </div>
          <p className="text-gray-400 mb-4">
            Transformando arte em NFTs autênticos na blockchain.
            Conectando artistas ao futuro digital.
          </p>
        </div>

        {/* Links Rápidos */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/" className="hover:text-purple-400 transition-colors">
                Início
              </a>
            </li>
            <li>
              <a href="/galeria" className="hover:text-purple-400 transition-colors">
                Galeria
              </a>
            </li>
            <li>
              <a href="/upload" className="hover:text-purple-400 transition-colors">
                Criar NFT
              </a>
            </li>
          </ul>
        </div>

        {/* Redes Sociais */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Siga-nos</h3>
          <div className="flex gap-4">
            <motion.a
              href="#"
              className="text-gray-400 hover:text-purple-400"
              whileHover={{ scale: 1.2, y: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Twitter size={24} />
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-purple-400"
              whileHover={{ scale: 1.2, y: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Instagram size={24} />
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-purple-400"
              whileHover={{ scale: 1.2, y: -3 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Github size={24} />
            </motion.a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
        <p>&copy; 2025 ArteNFT. Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
);
