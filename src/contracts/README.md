# ArteNFT Smart Contract

## Descrição

Contrato inteligente ERC-721 para criação e gerenciamento de NFTs de obras de arte digitais. Permite que artistas criem tokens únicos de suas criações, armazenando metadados completos na blockchain.

## Características

- **ERC-721 Completo**: Compatível com o padrão NFT mais utilizado
- **Metadados On-Chain**: Armazena título, artista, descrição, categoria e timestamps
- **Controle de Minting**: Limite configurável de NFTs por artista (padrão: 100)
- **IPFS Integration**: Suporta armazenamento de imagens e metadados no IPFS
- **Ownership**: Sistema de propriedade com transferências seguras
- **Query Functions**: Funções para consultar obras e tokens por artista

## Estrutura de Dados

### ArtworkMetadata
```solidity
struct ArtworkMetadata {
    string title;           // Título da obra
    string artist;          // Nome do artista
    string description;     // Descrição da obra
    string category;        // Categoria (Arte Digital, Fotografia, etc)
    uint256 createdAt;      // Timestamp de criação
    address creator;        // Endereço do criador
    string ipfsHash;        // Hash IPFS da imagem
    string metadataURI;     // URI completa dos metadados no IPFS
}
```

## Funções Principais

### mintArtwork
Cria um novo NFT de obra de arte.

```solidity
function mintArtwork(
    string memory title,
    string memory artist,
    string memory description,
    string memory category,
    string memory ipfsHash,
    string memory metadataURI
) public returns (uint256)
```

**Parâmetros:**
- `title`: Título da obra de arte
- `artist`: Nome do artista
- `description`: Descrição detalhada da obra
- `category`: Categoria da arte (ex: "Arte Digital", "Fotografia")
- `ipfsHash`: Hash IPFS da imagem
- `metadataURI`: URI completa dos metadados JSON no IPFS (formato: `ipfs://QmHash...`)

**Retorna:** ID do token criado (tokenId)

**Emite:** `ArtworkNFTMinted(artist, tokenId, title, ipfsHash, metadataURI)`

### getArtwork
Obtém os metadados completos de uma obra.

```solidity
function getArtwork(uint256 tokenId) public view returns (ArtworkMetadata memory)
```

### getArtistTokens
Obtém todos os tokens criados por um artista específico.

```solidity
function getArtistTokens(address artist) public view returns (uint256[] memory)
```

### getMintCount
Retorna quantos NFTs um artista já criou.

```solidity
function getMintCount(address user) public view returns (uint256)
```

### getRemainingMints
Retorna quantos NFTs um artista ainda pode criar.

```solidity
function getRemainingMints(address user) public view returns (uint256)
```

## Deploy

### Requisitos
- Solidity ^0.8.20
- OpenZeppelin Contracts

### Parâmetros do Constructor
```solidity
constructor(
    string memory _name,      // "ArteNFT"
    string memory _symbol,    // "ARTE"
    address initialOwner      // Endereço do proprietário do contrato
)
```

### Exemplo de Deploy (Hardhat)
```javascript
const ArteNFT = await ethers.getContractFactory("ArteNFT");
const arteNFT = await ArteNFT.deploy("ArteNFT", "ARTE", ownerAddress);
await arteNFT.deployed();
console.log("ArteNFT deployed to:", arteNFT.address);
```

### Exemplo de Deploy (Remix)
1. Compile o contrato com Solidity 0.8.20+
2. Na aba Deploy, selecione "Injected Provider - MetaMask"
3. Preencha os parâmetros:
   - `_NAME`: "ArteNFT"
   - `_SYMBOL`: "ARTE"
   - `INITIALOWNER`: Seu endereço de carteira
4. Clique em "Deploy" e confirme na MetaMask

## Integração com Frontend

### 1. Configurar variáveis de ambiente
```env
VITE_NFT_CONTRACT_ADDRESS=0xSeuEndereçoDoContrato
VITE_CHAIN_ID=1
```

### 2. Usar as funções do blockchain.ts
```typescript
import { mintNFT, getArtworkInfo } from './utils/blockchain';

// Criar NFT
const result = await mintNFT(
  provider,
  "Minha Obra",
  "Artista Nome",
  "Descrição da obra",
  "Arte Digital",
  "QmImageHash123...",
  "ipfs://QmMetadataHash456..."
);

// Obter informações
const artwork = await getArtworkInfo(provider, tokenId);
```

## Segurança

- ✅ ReentrancyGuard protege contra ataques de reentrada
- ✅ Ownable permite funções administrativas seguras
- ✅ Validações em todos os inputs
- ✅ Limite de minting por usuário
- ✅ Apenas owner pode modificar limites

## Gas Optimization

- Usa `_nextTokenId` privado para economia de gas
- Armazenamento eficiente de arrays de tokens por artista
- Eventos otimizados para indexação

## Eventos

```solidity
event ArtworkNFTMinted(
    address indexed artist,
    uint256 indexed tokenId,
    string title,
    string ipfsHash,
    string metadataURI
);

event ArtworkNFTBurned(uint256 indexed tokenId);

event MaxMintsPerUserUpdated(uint256 newLimit);
```

## Licença

MIT
