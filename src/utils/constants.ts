/**
 * Constantes da aplicação ArtToken
 */

// Redes blockchain suportadas
export const SUPPORTED_NETWORKS = {
  ETHEREUM_MAINNET: {
    id: 1,
    name: 'Ethereum Mainnet',
    currency: 'ETH',
    explorer: 'https://etherscan.io',
  },
  POLYGON: {
    id: 137,
    name: 'Polygon',
    currency: 'MATIC',
    explorer: 'https://polygonscan.com',
  },
  BINANCE: {
    id: 56,
    name: 'Binance Smart Chain',
    currency: 'BNB',
    explorer: 'https://bscscan.com',
  },
  // Testnets
  GOERLI: {
    id: 5,
    name: 'Goerli Testnet',
    currency: 'ETH',
    explorer: 'https://goerli.etherscan.io',
  },
  MUMBAI: {
    id: 80001,
    name: 'Mumbai Testnet',
    currency: 'MATIC',
    explorer: 'https://mumbai.polygonscan.com',
  },
};

// Categorias de arte
export const ART_CATEGORIES = [
  'Pintura',
  'Escultura',
  'Fotografia',
  'Arte Digital',
  'Ilustração',
  'Arte Abstrata',
  'Outro',
] as const;

// Configurações de upload
export const UPLOAD_CONFIG = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ACCEPTED_FORMATS: ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp'],
  ACCEPTED_EXTENSIONS: ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
};

// Mensagens de erro
export const ERROR_MESSAGES = {
  WALLET_NOT_CONNECTED: 'Por favor, conecte sua carteira primeiro!',
  WRONG_NETWORK: 'Por favor, mude para a rede correta',
  FILE_TOO_LARGE: 'Arquivo muito grande. Tamanho máximo: 10MB',
  INVALID_FORMAT: 'Formato de arquivo inválido',
  UPLOAD_FAILED: 'Falha ao fazer upload. Tente novamente',
  MINT_FAILED: 'Falha ao criar NFT. Tente novamente',
  IPFS_FAILED: 'Falha ao conectar com IPFS',
};

// Mensagens de sucesso
export const SUCCESS_MESSAGES = {
  NFT_CREATED: 'NFT criado com sucesso!',
  WALLET_CONNECTED: 'Carteira conectada!',
  UPLOAD_COMPLETE: 'Upload concluído!',
};

// URLs e links
export const LINKS = {
  GITHUB: 'https://github.com/seu-usuario/arttoken',
  TWITTER: 'https://twitter.com/arttoken',
  DISCORD: 'https://discord.gg/arttoken',
  INSTAGRAM: 'https://instagram.com/arttoken',
  DOCS: 'https://docs.arttoken.com',
  OPENSEA: 'https://opensea.io',
  RARIBLE: 'https://rarible.com',
};

// Animações
export const ANIMATION_VARIANTS = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  },
  slideDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
};

// Durações de transição
export const TRANSITION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
};
