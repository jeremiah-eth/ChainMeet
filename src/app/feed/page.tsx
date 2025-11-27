'use client'

import SocialFeed from '@/components/SocialFeed'
import BottomNav from '@/components/layout/BottomNav'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function FeedPage() {
    const { address, isConnected } = useAccount()
    const router = useRouter()

    useEffect(() => {
        if (!isConnected) {
            router.push('/')
        }
    }, [isConnected, router])

    if (!isConnected) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-600 text-xl">Connecting...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pb-20">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-4xl font-bold mb-8 text-center text-gradient">
                    Discover Matches
                </h1>
                <SocialFeed />
            </div>
            <BottomNav />
        </div>
    )
}
