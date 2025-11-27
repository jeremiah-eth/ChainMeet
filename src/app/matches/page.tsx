'use client'

import BottomNav from '@/components/layout/BottomNav'
import MatchesList from '@/components/messaging/MatchesList'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function MatchesPage() {
    const { isConnected } = useAccount()
    const router = useRouter()

    useEffect(() => {
        if (!isConnected) {
            router.push('/')
        }
    }, [isConnected, router])

    if (!isConnected) {
        return null
    }

    return (
        <div className="min-h-screen pb-20 bg-white">
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">Matches</h1>
                <MatchesList />
            </div>
            <BottomNav />
        </div>
    )
}
