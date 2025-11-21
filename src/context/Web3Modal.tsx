'use client'

import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { mainnet, arbitrum } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { wagmiAdapter, projectId } from '@/config'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

// Set up queryClient
const queryClient = new QueryClient()

if (!projectId) {
    throw new Error('Project ID is not defined')
}

// Set up metadata
const metadata = {
    name: 'ChainMeet',
    description: 'Wallet-Based Dating App',
    url: 'https://chainmeet.app', // origin must match your domain & subdomain
    icons: ['https://avatars.githubusercontent.com/u/37784886']
}

// Create the modal
createAppKit({
    adapters: [wagmiAdapter],
    projectId,
    networks: [mainnet, arbitrum],
    defaultNetwork: mainnet,
    metadata: metadata,
    features: {
        analytics: true, // Optional - defaults to your Cloud configuration
        email: true, // default to true
        socials: ['google', 'x', 'github', 'discord', 'apple'],
        emailShowWallets: true, // default to true
    },
    themeMode: 'dark'
})

export default function Web3ModalProvider({
    children,
    cookies
}: {
    children: ReactNode
    cookies: string | null
}) {
    const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies)

    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </WagmiProvider>
    )
}
