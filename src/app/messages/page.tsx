'use client'

import BottomNav from '@/components/layout/BottomNav'
import MessagesList from '@/components/messaging/MessagesList'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function MessagesPage() {
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
                <h1 className="text-2xl font-bold mb-6 text-gray-900">Messages</h1>
                <MessagesList />
            </div>
            <BottomNav />
        </div>
    )
}
