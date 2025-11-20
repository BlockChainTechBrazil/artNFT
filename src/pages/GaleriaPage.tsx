import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter } from 'lucide-react';
import { ArtworkCard } from '../components/ArtworkCard';
import type { Artwork, ArtCategory } from '../types';

export const GaleriaPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ArtCategory | 'Todas'>('Todas');

  // Dados de exemplo - em produção, isso viria do Firebase/blockchain
  const mockArtworks: Artwork[] = [
    {
      id: '1',
      title: 'Horizonte Digital',
      description: 'Uma exploração das fronteiras entre o físico e o digital através de cores vibrantes e formas abstratas.',
      artistId: '1',
      artistName: 'Ana Silva',
      imageUrl: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800',
      ipfsHash: 'QmX1...',
      category: 'Arte Digital',
      createdAt: new Date('2024-01-15'),
      nftData: {
        tokenId: '12345',
        contractAddress: '0x1234...5678',
        blockchain: 'ethereum',
        transactionHash: '0xabc...def',
        mintedAt: new Date('2024-01-15'),
        metadata: {
          name: 'Horizonte Digital',
          description: 'Uma exploração das fronteiras...',
          image: 'ipfs://QmX1...',
          attributes: [
            { trait_type: 'Categoria', value: 'Arte Digital' },
            { trait_type: 'Ano', value: 2024 },
          ],
          artist: 'Ana Silva',
          created_date: '2024-01-15',
        },
      },
    },
    {
      id: '2',
      title: 'Sonhos de Neon',
      description: 'Inspirado pela estética cyberpunk, esta obra captura a essência das metrópoles futuristas.',
      artistId: '2',
      artistName: 'Carlos Santos',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
      ipfsHash: 'QmY2...',
      category: 'Arte Digital',
      createdAt: new Date('2024-02-01'),
      nftData: {
        tokenId: '12346',
        contractAddress: '0x1234...5678',
        blockchain: 'polygon',
        transactionHash: '0xdef...ghi',
        mintedAt: new Date('2024-02-01'),
        metadata: {
          name: 'Sonhos de Neon',
          description: 'Inspirado pela estética cyberpunk...',
          image: 'ipfs://QmY2...',
          attributes: [
            { trait_type: 'Categoria', value: 'Arte Digital' },
            { trait_type: 'Estilo', value: 'Cyberpunk' },
          ],
          artist: 'Carlos Santos',
          created_date: '2024-02-01',
        },
      },
    },
    {
      id: '3',
      title: 'Natureza Abstrata',
      description: 'Uma interpretação moderna das formas orgânicas encontradas na natureza.',
      artistId: '3',
      artistName: 'Marina Costa',
      imageUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
      ipfsHash: 'QmZ3...',
      category: 'Arte Abstrata',
      createdAt: new Date('2024-02-10'),
    },
    {
      id: '4',
      title: 'Retrato Urbano',
      description: 'Capturas autênticas da vida nas ruas da cidade grande.',
      artistId: '4',
      artistName: 'Pedro Oliveira',
      imageUrl: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
      ipfsHash: 'QmW4...',
      category: 'Fotografia',
      createdAt: new Date('2024-02-15'),
      nftData: {
        tokenId: '12347',
        contractAddress: '0x1234...5678',
        blockchain: 'ethereum',
        transactionHash: '0xghi...jkl',
        mintedAt: new Date('2024-02-15'),
        metadata: {
          name: 'Retrato Urbano',
          description: 'Capturas autênticas...',
          image: 'ipfs://QmW4...',
          attributes: [
            { trait_type: 'Categoria', value: 'Fotografia' },
            { trait_type: 'Local', value: 'São Paulo' },
          ],
          artist: 'Pedro Oliveira',
          created_date: '2024-02-15',
        },
      },
    },
    {
      id: '5',
      title: 'Cores do Cerrado',
      description: 'Uma homenagem à biodiversidade do cerrado brasileiro através de pinceladas expressivas.',
      artistId: '5',
      artistName: 'Julia Ferreira',
      imageUrl: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800',
      ipfsHash: 'QmV5...',
      category: 'Pintura',
      createdAt: new Date('2024-02-20'),
    },
    {
      id: '6',
      title: 'Geometria Fractal',
      description: 'Explorando padrões matemáticos através da arte digital generativa.',
      artistId: '6',
      artistName: 'Roberto Lima',
      imageUrl: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800',
      ipfsHash: 'QmU6...',
      category: 'Arte Digital',
      createdAt: new Date('2024-03-01'),
      nftData: {
        tokenId: '12348',
        contractAddress: '0x1234...5678',
        blockchain: 'polygon',
        transactionHash: '0xjkl...mno',
        mintedAt: new Date('2024-03-01'),
        metadata: {
          name: 'Geometria Fractal',
          description: 'Explorando padrões matemáticos...',
          image: 'ipfs://QmU6...',
          attributes: [
            { trait_type: 'Categoria', value: 'Arte Digital' },
            { trait_type: 'Técnica', value: 'Generativa' },
          ],
          artist: 'Roberto Lima',
          created_date: '2024-03-01',
        },
      },
    },
  ];

  const categories: (ArtCategory | 'Todas')[] = [
    'Todas',
    'Pintura',
    'Escultura',
    'Fotografia',
    'Arte Digital',
    'Ilustração',
    'Arte Abstrata',
    'Outro',
  ];

  const filteredArtworks = mockArtworks.filter((artwork) => {
    const matchesSearch =
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.artistName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === 'Todas' || artwork.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Galeria de NFTs
          </h1>
          <p className="text-xl text-gray-600">
            Descubra obras de arte únicas tokenizadas na blockchain
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 max-w-6xl mx-auto"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6">
            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Buscar
              </label>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por título, artista ou descrição..."
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Categories */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Filter size={16} />
                Categoria
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`
                      px-4 py-2 rounded-lg font-medium transition-all
                      ${selectedCategory === cat
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {cat}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <p className="text-gray-600">
            Exibindo <span className="font-bold text-purple-600">{filteredArtworks.length}</span>{' '}
            {filteredArtworks.length === 1 ? 'obra' : 'obras'}
          </p>
        </div>

        {/* Artworks Grid */}
        {filteredArtworks.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {filteredArtworks.map((artwork, index) => (
              <motion.div
                key={artwork.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
              >
                <ArtworkCard artwork={artwork} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-gray-500 text-lg">
              Nenhuma obra encontrada com os filtros selecionados.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};
