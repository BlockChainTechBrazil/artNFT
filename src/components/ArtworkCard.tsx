import { motion } from 'framer-motion';
import type { Artwork } from '../types';
import { ExternalLink, Calendar, User } from 'lucide-react';

interface ArtworkCardProps {
  artwork: Artwork;
  onClick?: () => void;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({ artwork, onClick }) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer group"
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      onClick={onClick}
    >
      {/* Imagem */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-purple-100 to-blue-100">
        <img
          src={artwork.imageUrl}
          alt={artwork.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Badge de Categoria */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-semibold text-purple-600">
            {artwork.category}
          </span>
        </div>

        {/* Badge NFT */}
        {artwork.nftData && (
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full text-xs font-bold flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              NFT Mintado
            </span>
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors">
          {artwork.title}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {artwork.description}
        </p>

        {/* Informações do Artista */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <User size={16} />
          <span className="font-medium">{artwork.artistName}</span>
        </div>

        {/* Data de Criação */}
        <div className="flex items-center gap-2 mb-4 text-sm text-gray-500">
          <Calendar size={16} />
          <span>{new Date(artwork.createdAt).toLocaleDateString('pt-BR')}</span>
        </div>

        {/* NFT Info */}
        {artwork.nftData && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-500">
                <div className="font-semibold text-gray-700">Token ID</div>
                <div className="font-mono">{artwork.nftData.tokenId}</div>
              </div>

              <motion.a
                href={`https://etherscan.io/tx/${artwork.nftData.transactionHash}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-purple-600 hover:text-purple-700 text-sm font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Ver na Blockchain
                <ExternalLink size={14} />
              </motion.a>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
