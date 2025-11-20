import { BrowserProvider, Contract } from 'ethers';
import ArteNFTABI from '../contracts/ArteNFT.abi.json';

/**
 * Obtém o endereço do contrato NFT
 */
export const getNFTContractAddress = (): string => {
  const address = import.meta.env.VITE_NFT_CONTRACT_ADDRESS;
  if (!address || address === '0x0000000000000000000000000000000000000000') {
    throw new Error('Endereço do contrato NFT não configurado. Configure VITE_NFT_CONTRACT_ADDRESS no arquivo .env');
  }
  return address;
};

/**
 * Cria uma instância do contrato NFT
 */
export const getNFTContract = async (provider: BrowserProvider) => {
  const signer = await provider.getSigner();
  const contractAddress = getNFTContractAddress();
  return new Contract(contractAddress, ArteNFTABI, signer);
};

/**
 * Minta um novo NFT de arte
 */
export const mintNFT = async (
  provider: unknown,
  title: string,
  artist: string,
  description: string,
  category: string,
  ipfsHash: string,
  metadataURI: string
): Promise<{
  tokenId: string;
  transactionHash: string;
}> => {
  try {
    const browserProvider = provider as BrowserProvider;
    const contract = await getNFTContract(browserProvider);

    console.log('Mintando NFT de arte na blockchain...');
    console.log('Contrato:', getNFTContractAddress());
    
    const tx = await contract.mintArtwork(
      title,
      artist,
      description,
      category,
      ipfsHash,
      metadataURI
    );

    console.log('Transação enviada:', tx.hash);
    console.log('Aguardando confirmação da transação...');
    
    const receipt = await tx.wait();
    console.log('Transação confirmada!');

    // Procurar evento ArtworkNFTMinted no receipt
    const event = receipt.logs.find((log: { fragment?: { name: string } }) =>
      log.fragment?.name === 'ArtworkNFTMinted'
    );

    const tokenId = event ? event.args[1].toString() : receipt.logs[0].topics[3];

    return {
      tokenId,
      transactionHash: receipt.hash,
    };
  } catch (error) {
    console.error('Erro ao mintar NFT:', error);
    throw new Error('Falha ao criar NFT na blockchain');
  }
};

/**
 * Obtém informações completas de uma obra de arte NFT
 */
export const getArtworkInfo = async (
  provider: BrowserProvider,
  tokenId: string
): Promise<{
  title: string;
  artist: string;
  description: string;
  category: string;
  createdAt: number;
  creator: string;
  ipfsHash: string;
  metadataURI: string;
  owner: string;
}> => {
  try {
    const contract = await getNFTContract(provider);

    const [artwork, owner] = await Promise.all([
      contract.getArtwork(tokenId),
      contract.ownerOf(tokenId),
    ]);

    return {
      title: artwork.title,
      artist: artwork.artist,
      description: artwork.description,
      category: artwork.category,
      createdAt: Number(artwork.createdAt),
      creator: artwork.creator,
      ipfsHash: artwork.ipfsHash,
      metadataURI: artwork.metadataURI,
      owner,
    };
  } catch (error) {
    console.error('Erro ao obter informações da obra:', error);
    throw new Error('Falha ao obter informações da obra de arte');
  }
};

/**
 * Obtém todos os tokens de um artista
 */
export const getArtistTokens = async (
  provider: BrowserProvider,
  artistAddress: string
): Promise<string[]> => {
  try {
    const contract = await getNFTContract(provider);
    const tokens = await contract.getArtistTokens(artistAddress);
    return tokens.map((t: bigint) => t.toString());
  } catch (error) {
    console.error('Erro ao obter tokens do artista:', error);
    return [];
  }
};

/**
 * Obtém informações de um NFT (legado - mantido para compatibilidade)
 */
export const getNFTInfo = async (
  provider: BrowserProvider,
  tokenId: string
): Promise<{
  owner: string;
  tokenURI: string;
}> => {
  try {
    const contract = await getNFTContract(provider);

    const [owner, tokenURI] = await Promise.all([
      contract.ownerOf(tokenId),
      contract.tokenURI(tokenId),
    ]);

    return { owner, tokenURI };
  } catch (error) {
    console.error('Erro ao obter informações do NFT:', error);
    throw new Error('Falha ao obter informações do NFT');
  }
};

/**
 * Obtém o número de NFTs criados por um artista
 */
export const getArtistMintCount = async (
  provider: BrowserProvider,
  artistAddress: string
): Promise<number> => {
  try {
    const contract = await getNFTContract(provider);
    const count = await contract.getMintCount(artistAddress);
    return Number(count);
  } catch (error) {
    console.error('Erro ao obter contagem de mints:', error);
    return 0;
  }
};

/**
 * Obtém o número de NFTs restantes que um artista pode criar
 */
export const getRemainingMints = async (
  provider: BrowserProvider,
  artistAddress: string
): Promise<number> => {
  try {
    const contract = await getNFTContract(provider);
    const remaining = await contract.getRemainingMints(artistAddress);
    return Number(remaining);
  } catch (error) {
    console.error('Erro ao obter mints restantes:', error);
    return 0;
  }
};

/**
 * Obtém o número de NFTs de um endereço (legado - mantido para compatibilidade)
 */
export const getNFTBalance = async (
  provider: BrowserProvider,
  ownerAddress: string
): Promise<number> => {
  try {
    const contract = await getNFTContract(provider);
    const balance = await contract.balanceOf(ownerAddress);
    return Number(balance);
  } catch (error) {
    console.error('Erro ao obter saldo de NFTs:', error);
    return 0;
  }
};

/**
 * Verifica se está na rede correta
 */
export const checkNetwork = async (provider: BrowserProvider): Promise<boolean> => {
  try {
    const network = await provider.getNetwork();
    const expectedChainId = import.meta.env.VITE_CHAIN_ID || '1'; // Mainnet por padrão

    return network.chainId === BigInt(expectedChainId);
  } catch (error) {
    console.error('Erro ao verificar rede:', error);
    return false;
  }
};

/**
 * Solicita troca de rede
 */
export const switchNetwork = async (chainId: number): Promise<void> => {
  if (!window.ethereum) {
    throw new Error('MetaMask não encontrado');
  }

  try {
    await window.ethereum.request?.({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: `0x${chainId.toString(16)}` }],
    });
  } catch (error: unknown) {
    const err = error as { code: number };
    // Rede não adicionada
    if (err.code === 4902) {
      console.error('Rede não está adicionada ao MetaMask');
    }
    throw error;
  }
};
