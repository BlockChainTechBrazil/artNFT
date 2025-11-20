import type { IPFSUploadResult, NFTMetadata } from '../types';

// Configuração do Pinata
const PINATA_JWT = import.meta.env.VITE_PINATA_JWT;
const IPFS_GATEWAY = import.meta.env.VITE_IPFS_GATEWAY || 'https://gateway.pinata.cloud/ipfs/';
const PINATA_API_URL = 'https://api.pinata.cloud/pinning/pinFileToIPFS';
const PINATA_JSON_URL = 'https://api.pinata.cloud/pinning/pinJSONToIPFS';

/**
 * Faz upload de uma imagem para o IPFS usando Pinata
 */
export const uploadImageToIPFS = async (file: File): Promise<string> => {
  if (!PINATA_JWT) {
    console.error('PINATA_JWT não configurado');
    throw new Error('Chave JWT do Pinata não configurada');
  }

  try {
    const formData = new FormData();
    formData.append('file', file);

    const metadata = JSON.stringify({
      name: file.name,
    });
    formData.append('pinataMetadata', metadata);

    const response = await fetch(PINATA_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Erro na resposta do Pinata:', error);
      throw new Error(`Erro ao fazer upload: ${response.statusText}`);
    }

    const data = await response.json();
    return data.IpfsHash;
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error);
    throw new Error('Falha ao fazer upload da imagem para IPFS');
  }
};

/**
 * Faz upload dos metadados do NFT para o IPFS usando Pinata
 */
export const uploadMetadataToIPFS = async (metadata: NFTMetadata): Promise<string> => {
  if (!PINATA_JWT) {
    console.error('PINATA_JWT não configurado');
    throw new Error('Chave JWT do Pinata não configurada');
  }

  try {
    const response = await fetch(PINATA_JSON_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PINATA_JWT}`,
      },
      body: JSON.stringify({
        pinataContent: metadata,
        pinataMetadata: {
          name: `${metadata.name}-metadata.json`,
        },
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Erro na resposta do Pinata:', error);
      throw new Error(`Erro ao fazer upload: ${response.statusText}`);
    }

    const data = await response.json();
    return data.IpfsHash;
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
