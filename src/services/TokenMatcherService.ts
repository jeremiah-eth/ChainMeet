import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { ERC20_ABI, ERC721_ABI } from '@/config/abis'

export class TokenMatcherService {
    private client

    constructor() {
        this.client = createPublicClient({
            chain: mainnet,
            transport: http()
        })
    }

    async fetchTokenBalances(address: string) {
        // TODO: Implement
        return []
    }

    async fetchNFTs(address: string) {
        // TODO: Implement
        return []
    }

    calculateMatchScore(userTokens: string[], matchTokens: string[]) {
        // TODO: Implement
        return 0
    }
}

export const tokenMatcher = new TokenMatcherService()
