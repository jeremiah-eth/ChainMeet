import { cookieStorage, createStorage } from '@wagmi/core'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum } from '@reown/appkit/networks'

// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const networks = [mainnet, arbitrum]

// Set up Wagmi Adapter with minimal connectors
export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: true,
    projectId,
    networks,
    connectors: [] // Use only Reown's built-in connectors, not Wagmi's default ones
})

export const config = wagmiAdapter.wagmiConfig

