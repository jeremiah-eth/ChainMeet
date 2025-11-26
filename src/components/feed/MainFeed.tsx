'use client'

import { useState } from 'react'
import { Heart, X, Star, SlidersHorizontal } from 'lucide-react'

export default function MainFeed() {
    const [showFilters, setShowFilters] = useState(false)

    return (
        <div className="min-h-screen bg-white">
            {/* Top Navigation */}
            <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
                <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                            <Heart className="w-5 h-5 text-white fill-current" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900">ChainMeet</h1>
                    </div>
                    <button
                        onClick={() => setShowFilters(true)}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </header>

            {/* Main Content Area - Card Stack */}
            <main className="pt-20 pb-32 px-4">
                <div className="max-w-md mx-auto">
                    {/* Profile cards will be rendered here */}
                    <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-3xl flex items-center justify-center">
                        <p className="text-gray-400">Loading profiles...</p>
                    </div>
                </div>
            </main>

            {/* Bottom Action Buttons */}
            <div className="fixed bottom-8 left-0 right-0 z-40">
                <div className="max-w-md mx-auto px-4">
                    <div className="flex items-center justify-center gap-6">
                        {/* Pass Button */}
                        <button className="w-16 h-16 bg-white border-2 border-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95">
                            <X className="w-7 h-7 text-red-500" />
                        </button>

                        {/* Super Like Button */}
                        <button className="w-14 h-14 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95">
                            <Star className="w-6 h-6 text-blue-500" />
                        </button>

                        {/* Like Button */}
                        <button className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95">
                            <Heart className="w-7 h-7 text-white fill-current" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
