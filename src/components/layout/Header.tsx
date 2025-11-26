'use client'

import { Sparkles, Bell } from 'lucide-react'
import { useAccount } from 'wagmi'

export default function Header() {
    const { isConnected } = useAccount()

    return (
        <header className="sticky top-0 z-40 bg-gray-900/80 backdrop-blur-md border-b border-white/10 transition-all duration-300">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-tr from-purple-500 to-pink-500 p-2 rounded-xl shadow-lg shadow-purple-500/20">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
                        ChainMeet
                    </h1>
                </div>

                <div className="flex items-center gap-3">
                    {isConnected && (
                        <button className="p-2 rounded-full hover:bg-white/5 transition-colors relative">
                            <Bell className="w-5 h-5 text-gray-400" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-gray-900"></span>
                        </button>
                    )}
                    <appkit-button />
                </div>
            </div>
        </header>
    )
}
