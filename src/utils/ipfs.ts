import { create } from 'ipfs-http-client';
import type { IPFSUploadResult, NFTMetadata } from '../types';

// Configuração do cliente IPFS
// Em produção, use um nó IPFS próprio ou serviço como Infura, Pinata, etc.
const IPFS_GATEWAY = import.meta.env.VITE_IPFS_GATEWAY || 'https://ipfs.io/ipfs/';
const IPFS_API_URL = import.meta.env.VITE_IPFS_API_URL || 'https://ipfs.infura.io:5001';

let ipfsClient: ReturnType<typeof create> | null = null;

try {
  ipfsClient = create({ url: IPFS_API_URL });
} catch (error) {
  console.warn('IPFS client not initialized:', error);
}

/**
 * Faz upload de uma imagem para o IPFS
 */
export const uploadImageToIPFS = async (file: File): Promise<string> => {
  if (!ipfsClient) {
    // Simulação para desenvolvimento
    console.log('Simulando upload de imagem para IPFS...');
    return 'QmSimulatedImageHash123456789';
  }

  try {
    const added = await ipfsClient.add(file);
    return added.path;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw new Error('Falha ao fazer upload da imagem para IPFS');
  }
};

/**
 * Faz upload dos metadados do NFT para o IPFS
 */
export const uploadMetadataToIPFS = async (metadata: NFTMetadata): Promise<string> => {
  if (!ipfsClient) {
    // Simulação para desenvolvimento
    console.log('Simulando upload de metadados para IPFS...');
    return 'QmSimulatedMetadataHash987654321';
  }

  try {
    const metadataJSON = JSON.stringify(metadata);
    const added = await ipfsClient.add(metadataJSON);
    return added.path;
  } catch (error) {
    console.error('Erro ao fazer upload dos metadados:', error);
    throw new Error('Falha ao fazer upload dos metadados para IPFS');
  }
};

/**
 * Processa o upload completo: imagem + metadados para arte NFT
 */
export const processNFTUpload = async (
  file: File,
  metadata: Omit<NFTMetadata, 'image'>
): Promise<IPFSUploadResult> => {
  try {
    // 1. Upload da imagem
    console.log('Fazendo upload da imagem para IPFS...');
    const imageHash = await uploadImageToIPFS(file);
    const imageUrl = `${IPFS_GATEWAY}${imageHash}`;

    // 2. Criar metadados completos com a URL da imagem
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `ipfs://${imageHash}`,
    };

    // 3. Upload dos metadados
    console.log('Fazendo upload dos metadados para IPFS...');
    const metadataHash = await uploadMetadataToIPFS(completeMetadata);
    const metadataUrl = `ipfs://${metadataHash}`;

    return {
      ipfsHash: imageHash,
      imageUrl,
      metadataUrl,
    };
  } catch (error) {
    console.error('Erro ao processar upload do NFT:', error);
    throw error;
  }
};

/**
 * Converte IPFS hash para URL HTTP
 */
export const ipfsHashToUrl = (hash: string): string => {
  if (hash.startsWith('ipfs://')) {
    return hash.replace('ipfs://', IPFS_GATEWAY);
  }
  return `${IPFS_GATEWAY}${hash}`;
};

/**
 * Obtém conteúdo do IPFS
 */
export const getFromIPFS = async (hash: string): Promise<string> => {
  try {
    const response = await fetch(ipfsHashToUrl(hash));
    return await response.text();
  } catch (error) {
    console.error('Erro ao obter dados do IPFS:', error);
    throw new Error('Falha ao obter dados do IPFS');
  }
};
