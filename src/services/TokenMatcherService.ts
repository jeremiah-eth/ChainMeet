import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import { ERC20_ABI, ERC721_ABI } from '@/config/abis'
import { TOKENS } from '@/config/constants'

export class TokenMatcherService {
    private client

    constructor() {
        this.client = createPublicClient({
            chain: mainnet,
            transport: http()
        })
    }

    async fetchTokenBalances(address: string) {
        const balances: string[] = []

        for (const [symbol, tokenAddress] of Object.entries(TOKENS)) {
            try {
                const balance = await this.client.readContract({
                    address: tokenAddress as `0x${string}`,
                    abi: ERC20_ABI,
                    functionName: 'balanceOf',
                    args: [address as `0x${string}`]
                })

                if (balance > 0n) {
                    balances.push(symbol)
                }
            } catch (error) {
                console.error(`Error fetching ${symbol} balance:`, error)
            }
        }

        return balances
    }

    async fetchNFTs(address: string) {
        // Mock NFT collections for now, or add to constants
        const NFT_COLLECTIONS = {
            'Bored Ape': '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D',
            'CryptoPunks': '0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB'
        }

        const nfts: string[] = []

        for (const [name, contractAddress] of Object.entries(NFT_COLLECTIONS)) {
            try {
                const balance = await this.client.readContract({
                    address: contractAddress as `0x${string}`,
                    abi: ERC721_ABI,
                    functionName: 'balanceOf',
                    args: [address as `0x${string}`]
                })

                if (balance > 0n) {
                    nfts.push(name)
                }
            } catch (error) {
                console.error(`Error fetching ${name} balance:`, error)
            }
        }

        return nfts
    }

    calculateMatchScore(userTokens: string[], matchTokens: string[]) {
        let score = 0
        const sharedTokens = userTokens.filter(token => matchTokens.includes(token))

        // Base score for shared tokens
        score += sharedTokens.length * 10

        // Cap boost at 50 points
        return Math.min(score, 50)
    }
}

export const tokenMatcher = new TokenMatcherService()
