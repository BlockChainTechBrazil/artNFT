import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, Loader, CheckCircle, AlertCircle } from 'lucide-react';
import { UploadZone } from '../components/UploadZone';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useWeb3 } from '../hooks/useWeb3';
import { processNFTUpload } from '../utils/ipfs';
import { mintNFT } from '../utils/blockchain';
import type { ArtCategory } from '../types';

export const UploadPage = () => {
  const navigate = useNavigate();
  const { isConnected, address, provider } = useWeb3();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ArtCategory>('Arte Digital');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const categories: ArtCategory[] = [
    'Pintura',
    'Escultura',
    'Fotografia',
    'Arte Digital',
    'Ilustração',
    'Arte Abstrata',
    'Outro',
  ];

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setUploadError(null);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !address) {
      setUploadError('Por favor, conecte sua carteira primeiro!');
      return;
    }

    if (!selectedFile || !title || !description) {
      setUploadError('Por favor, preencha todos os campos!');
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    try {
      // 1. Upload da imagem e metadados para IPFS
      console.log('Processando upload para IPFS...');
      const uploadResult = await processNFTUpload(selectedFile, {
        name: title,
        description,
        artist: address || 'Unknown Artist',
        created_date: new Date().toISOString(),
        attributes: [
          { trait_type: 'Category', value: category },
          { trait_type: 'Artist Address', value: address || 'Unknown' },
        ],
        external_url: window.location.origin + '/galeria',
      });

      console.log('Upload IPFS concluído:', uploadResult);

      // 2. Mint do NFT na blockchain
      console.log('Criando NFT na blockchain...');
      const nftResult = await mintNFT(
        provider,
        title,
        address || 'Unknown Artist',
        description,
        category,
        uploadResult.ipfsHash,
        uploadResult.metadataUrl
      );

      console.log('NFT criado com sucesso:', nftResult);
      setUploadSuccess(true);

      // Redireciona para galeria após 2 segundos
      setTimeout(() => {
        navigate('/galeria');
      }, 2000);

    } catch (error) {
      console.error('Erro ao fazer upload:', error);
      setUploadError(
        error instanceof Error
          ? error.message
          : 'Erro ao criar NFT. Tente novamente.'
      );
    } finally {
      setIsUploading(false);
    }
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <Card className="max-w-md text-center">
          <AlertCircle size={64} className="mx-auto mb-4 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Carteira Não Conectada
          </h2>
          <p className="text-gray-600 mb-6">
            Você precisa conectar sua carteira para criar NFTs.
          </p>
          <p className="text-sm text-gray-500">
            Clique em "Conectar Carteira" no canto superior direito.
          </p>
        </Card>
      </div>
    );
  }

  if (uploadSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <Card className="max-w-md text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <CheckCircle size={80} className="mx-auto mb-6 text-green-500" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              NFT Criado com Sucesso!
            </h2>
            <p className="text-gray-600 mb-4">
              Sua obra de arte foi tokenizada e está na blockchain.
            </p>
            <p className="text-sm text-gray-500">
              Redirecionando para a galeria...
            </p>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Crie Seu NFT
          </h1>
          <p className="text-xl text-gray-600">
            Transforme sua obra de arte em um token único na blockchain
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-8">
            {/* Upload Zone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Imagem da Obra
                </h3>
                <UploadZone
                  onFileSelect={handleFileSelect}
                  selectedFile={selectedFile}
                  onRemove={handleRemoveFile}
                />
              </Card>
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <label className="block text-xl font-semibold text-gray-800 mb-4">
                  Título da Obra
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Noite Estrelada Digital"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
                  required
                />
              </Card>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <label className="block text-xl font-semibold text-gray-800 mb-4">
                  Descrição
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Conte a história por trás da sua obra..."
                  rows={5}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg resize-none"
                  required
                />
              </Card>
            </motion.div>

            {/* Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card>
                <label className="block text-xl font-semibold text-gray-800 mb-4">
                  Categoria
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as ArtCategory)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none text-lg"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </Card>
            </motion.div>

            {/* Error Message */}
            {uploadError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-red-50 border-2 border-red-200 rounded-lg p-4 flex items-center gap-3"
              >
                <AlertCircle className="text-red-500" size={24} />
                <p className="text-red-700">{uploadError}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center"
            >
              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isUploading || !selectedFile || !title || !description}
              >
                {isUploading ? (
                  <>
                    <Loader className="animate-spin" size={24} />
                    Criando NFT...
                  </>
                ) : (
                  <>
                    <UploadIcon size={24} />
                    Criar NFT
                  </>
                )}
              </Button>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};
