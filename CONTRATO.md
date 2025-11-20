# Contrato ArtToken - Sepolia Testnet

## 📋 Informações do Contrato

- **Rede:** Sepolia Testnet
- **Endereço:** `0x2aE0B29E064e3DD34fAfAeD36b181c449d2176f1`
- **Chain ID:** 11155111
- **Nome:** ArtToken
- **Símbolo:** ART

## 🔍 Explorador de Blocos

Visualize o contrato no Etherscan Sepolia:
https://sepolia.etherscan.io/address/0x2aE0B29E064e3DD34fAfAeD36b181c449d2176f1

## ⚙️ Configuração do Projeto

O endereço do contrato já está configurado no arquivo `.env`:

```env
VITE_NFT_CONTRACT_ADDRESS=0x2aE0B29E064e3DD34fAfAeD36b181c449d2176f1
VITE_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs/
VITE_PINATA_JWT=your_jwt_token
```

## 🚀 Como Testar

1. **Conectar MetaMask na Sepolia Testnet**
   - Adicione a rede Sepolia no MetaMask
   - Obtenha ETH de teste: https://sepoliafaucet.com/

2. **Criar um NFT**
   - Acesse a página "Create NFT"
   - Conecte sua carteira
   - Faça upload da imagem
   - Preencha os dados (título, artista, descrição, categoria)
   - Clique em "Criar NFT"
   - Confirme a transação no MetaMask

3. **Ver NFTs Criados**
   - Acesse a galeria
   - Veja todos os NFTs criados na plataforma

## 📝 Funções do Contrato

### Para Usuários
- `mintArtwork()` - Criar novo NFT de arte
- `getArtwork(tokenId)` - Ver detalhes de uma obra
- `getArtistTokens(address)` - Ver NFTs de um artista
- `burn(tokenId)` - Queimar seu próprio NFT

### Administrativas (Owner)
- `adminMint()` - Criar NFT para qualquer endereço
- `setMaxMintsPerUser()` - Alterar limite de NFTs por artista

## 💡 Exemplos de Uso

### Criar NFT via Frontend
```typescript
const result = await mintNFT(
  provider,
  "Minha Obra de Arte",
  "Nome do Artista",
  "Descrição detalhada...",
  "Arte Digital",
  "QmIPFSHash...",
  "ipfs://QmMetadataHash..."
);

console.log("Token ID:", result.tokenId);
console.log("Transaction:", result.transactionHash);
```

### Consultar Obra
```typescript
const artwork = await getArtworkInfo(provider, tokenId);
console.log(artwork.title);
console.log(artwork.artist);
console.log(artwork.category);
```

## 🔒 Segurança

- ✅ ReentrancyGuard - Proteção contra ataques de reentrada
- ✅ Ownable - Controle de acesso administrativo
- ✅ Limite de 100 NFTs por artista
- ✅ Validações em todas as funções

## 🎨 Metadados Armazenados

Cada NFT armazena:
- Título da obra
- Nome do artista
- Descrição
- Categoria
- Data de criação
- Endereço do criador
- Hash IPFS da imagem
- URI dos metadados

## 📊 Custos de Gas (Estimados)

- Criar NFT: ~150-200k gas
- Transfer NFT: ~50k gas
- Queimar NFT: ~30k gas

## 🔗 Links Úteis

- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Sepolia Explorer](https://sepolia.etherscan.io/)
- [OpenZeppelin Docs](https://docs.openzeppelin.com/)
