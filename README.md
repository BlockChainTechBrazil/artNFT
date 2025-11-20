# 🎨 ArtToken - Plataforma de Tokenização de Arte

**ArtToken** é uma plataforma revolucionária que permite artistas transformarem suas obras de arte em NFTs (Non-Fungible Tokens) autênticos na blockchain. A plataforma oferece um sistema completo de upload, armazenamento no IPFS e criação de tokens únicos que comprovam a autenticidade e propriedade das obras.

![ArtToken](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.17-38bdf8)

## ✨ Características Principais

### 🖼️ Para Artistas
- **Upload de Obras**: Interface intuitiva com drag & drop para enviar suas criações
- **Criação de NFTs**: Tokenização automática na blockchain
- **Armazenamento IPFS**: Suas obras são armazenadas de forma descentralizada e permanente
- **Metadados Completos**: Informações detalhadas sobre cada obra (título, descrição, categoria, atributos)
- **Prova de Autoria**: Certificado digital imutável na blockchain

### 🌐 Para Colecionadores
- **Galeria Interativa**: Explore obras de arte tokenizadas
- **Filtros Avançados**: Busca por categoria, artista ou palavra-chave
- **Verificação de Autenticidade**: Cada NFT pode ser verificado na blockchain
- **Histórico Completo**: Rastreie todas as transações e propriedade

### 🔐 Tecnologia Blockchain
- **Web3 Integration**: Conexão com carteiras MetaMask
- **Multi-Chain**: Suporte para Ethereum, Polygon e Binance Smart Chain
- **Smart Contracts**: Contratos inteligentes para garantir segurança
- **Transparência**: Todas as transações públicas e verificáveis

## 🚀 Tecnologias Utilizadas

### Frontend
- **React 19.2.0** - Biblioteca UI moderna
- **TypeScript** - Type safety e melhor DX
- **Vite** - Build tool ultra-rápido
- **TailwindCSS 4.1** - Styling utility-first
- **Framer Motion** - Animações fluidas

- **Ethers.js 6.15** - Interação com blockchain
- **ArtToken Smart Contract** - Contrato ERC-721 customizado
- **IPFS HTTP Client** - Armazenamento descentralizado
- **Solidity 0.8.20+** - Linguagem para smart contracts
- **OpenZeppelin** - Bibliotecas seguras para contratos

### Outras Bibliotecas
- **React Router DOM 7.9** - Navegação SPA
- **React Dropzone** - Upload de arquivos
- **Lucide React** - Ícones modernos
- **Firebase** - Backend e autenticação

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn
- MetaMask ou outra carteira Web3

### Passos

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/arttoken.git
cd arttoken
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
```env
# Firebase (opcional - para autenticação adicional)
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_auth_domain
VITE_FIREBASE_PROJECT_ID=seu_project_id

# IPFS
VITE_IPFS_GATEWAY=https://ipfs.io/ipfs/
VITE_IPFS_API_URL=https://ipfs.infura.io:5001

# Blockchain - ArtToken Contract
VITE_NFT_CONTRACT_ADDRESS=0x... # Endereço do contrato deployado
VITE_CHAIN_ID=1 # 1=Ethereum, 11155111=Sepolia, 137=Polygon
```

4. **Deploy do Smart Contract (Primeira vez)**
   
   Veja instruções detalhadas em [`src/contracts/README.md`](src/contracts/README.md)
   
   **Resumo rápido:**
   - Abra [`src/contracts/artenft.sol`](src/contracts/artenft.sol) no Remix IDE
   - Compile com Solidity 0.8.20+
   - Deploy com parâmetros:
   - `_name`: "ArtToken"
     - `_symbol`: "ARTE"
     - `initialOwner`: Seu endereço de carteira
   - Copie o endereço do contrato para `VITE_NFT_CONTRACT_ADDRESS`

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

5. **Acesse a aplicação**
Abra [http://localhost:5173](http://localhost:5173) no seu navegador

## 🎯 Como Usar

### Para Artistas

1. **Conecte sua Carteira**
   - Clique em "Conectar Carteira" no canto superior direito
   - Aprove a conexão no MetaMask

2. **Crie um NFT**
   - Vá para "Criar NFT"
   - Faça upload da sua obra de arte
   - Preencha título, descrição e categoria
   - Clique em "Criar NFT"
   - Aprove a transação na sua carteira

3. **Acompanhe suas Obras**
   - Visualize suas criações na Galeria
   - Veja informações na blockchain
   - Compartilhe com colecionadores

### Para Colecionadores

1. **Explore a Galeria**
   - Navegue pelas obras disponíveis
   - Use filtros para encontrar o que procura
   - Veja detalhes de cada NFT

2. **Verifique Autenticidade**
   - Clique em "Ver na Blockchain"
   - Confirme os metadados no IPFS
   - Veja histórico de propriedade

## 🏗️ Estrutura do Projeto

```
arttoken/
├── public/
├── src/
│   ├── assets/          # Imagens e recursos estáticos
│   │   ├── artes/      # Obras de arte em destaque
│   │   └── banners/    # Banners da homepage
│   ├── components/      # Componentes reutilizáveis
│   │   ├── ArtworkCard.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Footer.tsx
│   │   ├── Icons.tsx
│   │   ├── Navbar.tsx
│   │   └── UploadZone.tsx
│   ├── context/         # Context API
│   │   ├── AppContext.tsx
│   │   ├── Web3Context.tsx
│   │   └── Web3ContextDefinition.tsx
│   ├── contracts/       # Smart Contracts
│   │   ├── artenft.sol      # Contrato principal ERC-721
│   │   ├── ArtToken.abi.json # ABI para integração
│   │   └── README.md        # Documentação do contrato
│   ├── hooks/           # Custom hooks
│   │   └── useWeb3.ts
│   ├── pages/           # Páginas da aplicação
│   │   ├── ClientesPage.tsx
│   │   ├── GaleriaPage.tsx
│   │   ├── HomePage.tsx
│   │   ├── LoginPage.tsx
│   │   └── UploadPage.tsx
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   ├── utils/           # Funções utilitárias
│   │   ├── blockchain.ts    # Interação com contrato
│   │   ├── ipfs.ts          # Upload para IPFS
│   │   └── constants.ts     # Constantes do app
│   ├── App.tsx
│   ├── main.tsx
│   ├── index.css
│   ├── routes.tsx
│   └── firebaseConfig.ts
├── .env.example         # Template de variáveis
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🎨 Funcionalidades Detalhadas

### Vantagens da Tokenização

1. **Autenticidade Garantida** 🛡️
   - Blockchain assegura originalidade
   - Prova imutável de propriedade
   - Histórico completo de transações

2. **Acesso a Investimentos** 💰
   - Fracionamento de obras
   - Democratização do mercado
   - Novos modelos de negócio

3. **Liquidez** 📈
   - Facilita compra e venda
   - Mercado global 24/7
   - Transações instantâneas

4. **Transparência** 🔒
   - Registro público
   - Verificação independente
   - Sem intermediários

5. **Novos Mercados** 🌍
   - Alcance global
   - Artistas emergentes
   - Comunidade engajada

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

## 🌐 Deploy

### Vercel (Recomendado)
```bash
npm i -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload da pasta dist/ no Netlify
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

**Desenvolvido com ❤️ para revolucionar o mercado de arte digital**

---

## 🔮 Próximos Passos

- [ ] Integração com marketplaces (OpenSea, Rarible)
- [ ] Sistema de leilões
- [ ] Royalties automáticos
- [ ] Suporte a vídeos e áudio
- [ ] Perfis de artistas
- [ ] Sistema de comentários e likes
- [ ] Integração com redes sociais
- [ ] Carteira própria integrada
- [ ] Mobile app (React Native)

## 📞 Suporte

Para questões e suporte:
- 📧 Email: suporte@arttoken.com
- 💬 Discord: [Comunidade ArtToken](https://discord.gg/arttoken)
- 🐦 Twitter: [@ArtToken](https://twitter.com/arttoken)

---

⭐ Se este projeto foi útil para você, considere dar uma estrela!
