'use client'

import { Heart, MessageCircle, Wallet, Settings } from 'lucide-react'

type Tab = 'feed' | 'matches' | 'wallet' | 'settings'

interface SidebarProps {
    activeTab: Tab
    onTabChange: (tab: Tab) => void
    unreadMatches?: number
}

export default function Sidebar({ activeTab, onTabChange, unreadMatches = 0 }: SidebarProps) {
    const tabs: { id: Tab; icon: any; label: string }[] = [
        { id: 'feed', icon: Heart, label: 'Discover' },
        { id: 'matches', icon: MessageCircle, label: 'Matches' },
        { id: 'wallet', icon: Wallet, label: 'Wallet' },
        { id: 'settings', icon: Settings, label: 'Settings' },
    ]

    return (
        <aside className="hidden lg:block fixed top-24 left-8 w-64 space-y-4">
            <div className="glass-panel p-4 rounded-3xl space-y-2">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id
                    const Icon = tab.icon

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${isActive
                                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white shadow-lg border border-purple-500/20'
                                : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'
                                }`}
                        >
                            <div className={`p-2 rounded-xl transition-all duration-300 ${isActive
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-md'
                                : 'bg-white/5 group-hover:bg-white/10'
                                }`}>
                                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
                            </div>

                            <span className="font-semibold tracking-wide">{tab.label}</span>

                            {tab.id === 'matches' && unreadMatches > 0 && (
                                <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                                    {unreadMatches}
                                </span>
                            )}

                            {isActive && (
                                <div className="absolute left-0 w-1 h-8 bg-gradient-to-b from-purple-500 to-pink-500 rounded-r-full" />
                            )}
                        </button>
                    )
                })}
            </div>

            {/* Premium Promo Card */}
            <div className="glass-panel p-6 rounded-3xl mt-6 relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-lg font-bold text-white mb-2 relative z-10">Go Premium</h3>
                <p className="text-sm text-gray-400 mb-4 relative z-10">Unlock unlimited swipes and see who likes you!</p>
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold text-sm shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105 active:scale-95 relative z-10">
                    Upgrade Now
                </button>
            </div>
        </aside>
    )
}
