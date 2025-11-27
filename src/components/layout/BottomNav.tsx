'use client'

import { useState } from 'react'
import { Heart, MessageCircle, User, Home, Wallet } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useAppKit } from '@reown/appkit/react'

export default function BottomNav() {
    const router = useRouter()
    const pathname = usePathname()
    const { open } = useAppKit()

    const tabs = [
        { id: 'feed', icon: Home, label: 'Feed', path: '/feed' },
        { id: 'matches', icon: Heart, label: 'Matches', path: '/matches' },
        { id: 'wallet', icon: Wallet, label: 'Wallet', path: 'wallet-action' },
        { id: 'messages', icon: MessageCircle, label: 'Messages', path: '/messages' },
        { id: 'profile', icon: User, label: 'Profile', path: '/profile' },
    ]

    const handleTabClick = (path: string) => {
        if (path === 'wallet-action') {
            open()
        } else {
            router.push(path)
        }
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-bottom">
            <div className="grid grid-cols-5 max-w-md mx-auto">
                {tabs.map((tab) => {
                    const isActive = pathname === tab.path
                    const Icon = tab.icon
                    const isWallet = tab.id === 'wallet'

                    return (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab.path)}
                            className={`flex flex-col items-center gap-1 p-3 transition-colors ${isActive
                                    ? 'text-purple-600'
                                    : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />
                            <span className="text-xs font-medium">{tab.label}</span>
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}
