// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title ArtToken - NFT para obras de arte digitais
 * @dev Contrato ERC721 que permite que artistas criem NFTs de suas obras de arte
 */
contract ArtToken is ERC721, ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 private _nextTokenId = 1;

    // Estrutura para armazenar metadados da arte
    struct ArtworkMetadata {
        string title; // Título da obra
        string artist; // Nome do artista
        string description; // Descrição da obra
        string category; // Categoria (Arte Digital, Fotografia, etc)
        uint256 createdAt; // Timestamp de criação
        address creator; // Endereço do criador
        string ipfsHash; // Hash IPFS da imagem
        string metadataURI; // URI completa dos metadados no IPFS
    }

    // Mapping de tokenId para metadados da arte
    mapping(uint256 => ArtworkMetadata) public artworks;

    // Mapping para controlar quantos NFTs cada artista criou
    mapping(address => uint256) public artistMintCount;
    mapping(address => uint256[]) public artistTokens; // Tokens de cada artista

    uint256 public maxMintsPerUser = 100; // Limite por artista

    event ArtworkNFTMinted(
        address indexed artist,
        uint256 indexed tokenId,
        string title,
        string ipfsHash,
        string metadataURI
    );
    event ArtworkNFTBurned(uint256 indexed tokenId);
    event MaxMintsPerUserUpdated(uint256 newLimit);

    constructor(
        string memory _name,
        string memory _symbol,
        address initialOwner
    ) ERC721(_name, _symbol) Ownable(initialOwner) {}

    /**
     * @dev Criar NFT de obra de arte
     * @param title Título da obra
     * @param artist Nome do artista
     * @param description Descrição da obra
     * @param category Categoria da obra
     * @param ipfsHash Hash IPFS da imagem
     * @param metadataURI URI completa dos metadados no IPFS
     */
    function mintArtwork(
        string memory title,
        string memory artist,
        string memory description,
        string memory category,
        string memory ipfsHash,
        string memory metadataURI
    ) public nonReentrant returns (uint256) {
        require(bytes(title).length > 0, "ArtToken: title cannot be empty");
        require(bytes(artist).length > 0, "ArtToken: artist cannot be empty");
        require(
            bytes(ipfsHash).length > 0,
            "ArtToken: IPFS hash cannot be empty"
        );
        require(
            bytes(metadataURI).length > 0,
            "ArtToken: metadata URI cannot be empty"
        );
        require(
            artistMintCount[msg.sender] < maxMintsPerUser,
            "ArtToken: max mints per artist exceeded"
        );

        uint256 tokenId = _nextTokenId++;
        artistMintCount[msg.sender]++;
        artistTokens[msg.sender].push(tokenId);

        // Armazenar metadados da arte
        artworks[tokenId] = ArtworkMetadata({
            title: title,
            artist: artist,
            description: description,
            category: category,
            createdAt: block.timestamp,
            creator: msg.sender,
            ipfsHash: ipfsHash,
            metadataURI: metadataURI
        });

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, metadataURI);

        emit ArtworkNFTMinted(
            msg.sender,
            tokenId,
            title,
            ipfsHash,
            metadataURI
        );
        return tokenId;
    }

    /**
     * @dev Função administrativa para mintar para qualquer endereço (apenas owner)
     */
    function adminMint(
        address to,
        string memory title,
        string memory artist,
        string memory description,
        string memory category,
        string memory ipfsHash,
        string memory metadataURI
    ) public onlyOwner nonReentrant returns (uint256) {
        require(to != address(0), "ArtToken: cannot mint to zero address");
        require(bytes(title).length > 0, "ArtToken: title cannot be empty");
        require(
            bytes(metadataURI).length > 0,
            "ArtToken: metadata URI cannot be empty"
        );

        uint256 tokenId = _nextTokenId++;
        artistTokens[to].push(tokenId);

        artworks[tokenId] = ArtworkMetadata({
            title: title,
            artist: artist,
            description: description,
            category: category,
            createdAt: block.timestamp,
            creator: to,
            ipfsHash: ipfsHash,
            metadataURI: metadataURI
        });

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadataURI);

        emit ArtworkNFTMinted(to, tokenId, title, ipfsHash, metadataURI);
        return tokenId;
    }

    /**
     * @dev Atualizar limite de mints por usuário (apenas owner)
     */
    function setMaxMintsPerUser(uint256 _maxMints) public onlyOwner {
        maxMintsPerUser = _maxMints;
        emit MaxMintsPerUserUpdated(_maxMints);
    }

    /**
     * @dev Queimar NFT (apenas o dono do token)
     */
    function burn(uint256 tokenId) public {
        require(
            ownerOf(tokenId) == msg.sender,
            "ArtToken: caller is not token owner"
        );
        _burn(tokenId);
        delete artworks[tokenId]; // Limpar metadados
        emit ArtworkNFTBurned(tokenId);
    }

    /**
     * @dev Atualizar URI do token (apenas o dono do token ou owner do contrato)
     */
    function updateTokenURI(uint256 tokenId, string memory newURI) public {
        require(
            ownerOf(tokenId) == msg.sender || owner() == msg.sender,
            "ArtToken: caller is not token owner or contract owner"
        );
        require(bytes(newURI).length > 0, "ArtToken: URI cannot be empty");

        _setTokenURI(tokenId, newURI);
        artworks[tokenId].metadataURI = newURI;
    }

    /**
     * @dev Obter metadados completos de uma obra
     */
    function getArtwork(
        uint256 tokenId
    ) public view returns (ArtworkMetadata memory) {
        require(
            ownerOf(tokenId) != address(0),
            "ArtToken: token does not exist"
        );
        return artworks[tokenId];
    }

    /**
     * @dev Obter todos os tokens de um artista
     */
    function getArtistTokens(
        address artist
    ) public view returns (uint256[] memory) {
        return artistTokens[artist];
    }

    /**
     * @dev Ver quantos NFTs um artista já criou
     */
    function getMintCount(address user) public view returns (uint256) {
        return artistMintCount[user];
    }

    /**
     * @dev Ver quantos mints restam para um artista
     */
    function getRemainingMints(address user) public view returns (uint256) {
        uint256 used = artistMintCount[user];
        if (used >= maxMintsPerUser) {
            return 0;
        }
        return maxMintsPerUser - used;
    }

    /**
     * @dev Ver próximo token ID
     */
    function getNextTokenId() public view returns (uint256) {
        return _nextTokenId;
    }

    /**
     * @dev Overrides necessários
     */
    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
