'use client'

import { Heart, MessageCircle, Wallet, Settings } from 'lucide-react'

type Tab = 'feed' | 'matches' | 'wallet' | 'settings'

interface BottomNavProps {
    activeTab: Tab
    onTabChange: (tab: Tab) => void
    unreadMatches?: number
}

export default function BottomNav({ activeTab, onTabChange, unreadMatches = 0 }: BottomNavProps) {
    const tabs: { id: Tab; icon: any; label: string }[] = [
        { id: 'feed', icon: Heart, label: 'Discover' },
        { id: 'matches', icon: MessageCircle, label: 'Matches' },
        { id: 'wallet', icon: Wallet, label: 'Wallet' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ]

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-xl border-t border-white/10 lg:hidden z-50 pb-safe">
            <div className="grid grid-cols-4 gap-1 p-2">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    const Icon = tab.icon

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`relative flex flex-col items-center gap-1 p-3 rounded-2xl transition-all duration-300 ${isActive
                                ? 'text-white'
                                : 'text-gray-500 hover:text-gray-300'
                                }`}
                        >
                            {isActive && (
                                <div className="absolute inset-0 bg-white/5 rounded-2xl -z-10 animate-scale-in" />
                            )}

                            <div className={`relative p-1 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`}>
                                <Icon className={`w-6 h-6 ${isActive ? 'fill-current' : ''}`} />

                                {tab.id === 'matches' && unreadMatches > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-gray-900 flex items-center justify-center text-[10px] font-bold text-white animate-bounce">
                                        {unreadMatches}
                                    </span>
                                )}
                            </div>

                            <span className={`text-[10px] font-medium transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 hidden'}`}>
                                {tab.label}
                            </span>

                            {isActive && (
                                <span className="absolute bottom-1 w-1 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                            )}
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}
