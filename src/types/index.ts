export interface Artist {
  id: string;
  name: string;
  email: string;
  walletAddress: string;
  bio?: string;
  avatar?: string;
  createdAt: Date;
}

export interface Artwork {
  id: string;
  title: string;
  description: string;
  artistId: string;
  artistName: string;
  imageUrl: string;
  ipfsHash: string;
  category: ArtCategory;
  createdAt: Date;
  nftData?: NFTData;
}

export interface NFTData {
  tokenId: string;
  contractAddress: string;
  blockchain: 'ethereum' | 'polygon' | 'binance';
  transactionHash: string;
  mintedAt: Date;
  metadata: NFTMetadata;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  attributes: NFTAttribute[];
  external_url?: string;
  artist: string;
  created_date: string;
}

export interface NFTAttribute {
  trait_type: string;
  value: string | number;
}

export type ArtCategory =
  | 'Pintura'
  | 'Escultura'
  | 'Fotografia'
  | 'Arte Digital'
  | 'Ilustração'
  | 'Arte Abstrata'
  | 'Outro';

export interface UploadArtworkData {
  title: string;
  description: string;
  category: ArtCategory;
  file: File;
  attributes?: NFTAttribute[];
}

export interface IPFSUploadResult {
  ipfsHash: string;
  imageUrl: string;
  metadataUrl: string;
}

export interface Web3State {
  provider: unknown;
  signer: unknown;
  address: string | null;
  isConnected: boolean;
  chainId: number | null;
}
