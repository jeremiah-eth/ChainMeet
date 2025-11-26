'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { Heart, MessageCircle, Wallet, Settings, Sparkles } from 'lucide-react'
import SocialFeed from '@/components/SocialFeed'
import ChatInterface from '@/components/ChatInterface'
import WalletCard from '@/components/WalletCard'
import SettingsProfile from '@/components/SettingsProfile'
import { supabase } from '@/lib/supabase'
import Header from '@/components/layout/Header'

type Tab = 'feed' | 'matches' | 'wallet' | 'settings'

export default function Home() {
    const { address, isConnected } = useAccount()
    const router = useRouter()
    const [activeTab, setActiveTab] = useState<Tab>('feed')
    const [hasProfile, setHasProfile] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        checkProfile()
    }, [address, isConnected])

    const checkProfile = async () => {
        if (!isConnected || !address) {
            setLoading(false)
            return
        }

        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('wallet_address')
                .eq('wallet_address', address)
                .single()

            if (data) {
                setHasProfile(true)
            } else {
                router.push('/onboarding')
            }
        } catch (error) {
            console.error('Error checking profile:', error)
            router.push('/onboarding')
        } finally {
            setLoading(false)
        }
    }

    if (!isConnected) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="glass-panel p-12 text-center space-y-6 max-w-md">
                    <div className="flex justify-center">
                        <Sparkles className="w-16 h-16 text-blue-500" />
                    </div>
                    <h1 className="text-4xl font-bold text-gradient">
                        ChainMeet
                    </h1>
                    <p className="text-gray-700">
                        The wallet-based dating app where crypto meets connection
                    </p>
                    <appkit-button />
                    <p className="text-xs text-gray-600">
                        Connect your wallet to get started
                    </p>
                </div>
            </div>
        )
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-gray-600">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Main Content Area */}
                    <div className="lg:col-span-3">
                        {activeTab === 'feed' && <SocialFeed />}
                        {activeTab === 'matches' && <ChatInterface />}
                        {activeTab === 'wallet' && (
                            <div className="max-w-md mx-auto">
                                <WalletCard />
                            </div>
                        )}
                        {activeTab === 'settings' && <SettingsProfile />}
                    </div>

                    {/* Sidebar - Desktop Only */}
                    <div className="hidden lg:block space-y-4">
                        <WalletCard />
                    </div>
                </div>
            </main>

            {/* Bottom Navigation - Mobile */}
            <nav className="fixed bottom-0 left-0 right-0 glass-panel lg:hidden">
                <div className="grid grid-cols-4 gap-1 p-2">
                    <button
                        onClick={() => setActiveTab('feed')}
                        className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${activeTab === 'feed' ? 'bg-blue-500/20 text-blue-600' : 'text-gray-600'
                            }`}
                    >
                        <Heart className="w-6 h-6" />
                        <span className="text-xs">Discover</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('matches')}
                        className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${activeTab === 'matches' ? 'bg-blue-500/20 text-blue-600' : 'text-gray-600'
                            }`}
                    >
                        <MessageCircle className="w-6 h-6" />
                        <span className="text-xs">Matches</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('wallet')}
                        className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${activeTab === 'wallet' ? 'bg-blue-500/20 text-blue-600' : 'text-gray-600'
                            }`}
                    >
                        <Wallet className="w-6 h-6" />
                        <span className="text-xs">Wallet</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('settings')}
                        className={`flex flex-col items-center gap-1 p-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'bg-blue-500/20 text-blue-600' : 'text-gray-600'
                            }`}
                    >
                        <Settings className="w-6 h-6" />
                        <span className="text-xs">Settings</span>
                    </button>
                </div>
            </nav>

            {/* Desktop Tab Navigation */}
            <div className="hidden lg:block fixed top-24 left-8 space-y-2">
                <button
                    onClick={() => setActiveTab('feed')}
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-colors ${activeTab === 'feed' ? 'glass-button' : 'glass-panel hover:bg-white/5'
                        }`}
                >
                    <Heart className="w-5 h-5" />
                    <span>Discover</span>
                </button>
                <button
                    onClick={() => setActiveTab('matches')}
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-colors ${activeTab === 'matches' ? 'glass-button' : 'glass-panel hover:bg-white/5'
                        }`}
                >
                    <MessageCircle className="w-5 h-5" />
                    <span>Matches</span>
                </button>
                <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex items-center gap-3 px-6 py-3 rounded-lg transition-colors ${activeTab === 'settings' ? 'glass-button' : 'glass-panel hover:bg-white/5'
                        }`}
                >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </button>
            </div>
        </div>
    )
}
