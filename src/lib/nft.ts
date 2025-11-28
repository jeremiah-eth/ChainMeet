import { Alchemy, Network, NftFilters } from 'alchemy-sdk';

const config = {
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || 'demo', // Replace with your API key
    network: Network.ETH_MAINNET, // Or ETH_SEPOLIA for testing
};

const alchemy = new Alchemy(config);

export interface NFT {
    contractAddress: string;
    tokenId: string;
    name: string;
    imageUrl: string;
    collectionName: string;
}

export const fetchUserNFTs = async (address: string): Promise<NFT[]> => {
    try {
        const nfts = await alchemy.nft.getNftsForOwner(address, {
            excludeFilters: [NftFilters.SPAM],
        });

        return nfts.ownedNfts.map((nft) => ({
            contractAddress: nft.contract.address,
            tokenId: nft.tokenId,
            name: nft.name || `#${nft.tokenId}`,
            imageUrl: nft.image.cachedUrl || nft.image.originalUrl || '',
            collectionName: nft.contract.name || 'Unknown Collection',
        })).filter(nft => nft.imageUrl); // Only return NFTs with images
    } catch (error) {
        console.error('Error fetching NFTs:', error);
        return [];
    }
};
