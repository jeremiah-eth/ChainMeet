'use client'

import { useState } from 'react'
import { Heart, X, Star, SlidersHorizontal } from 'lucide-react'
import ProfileCard from './ProfileCard'
import { Profile } from '@/types/profile'

// Sample profiles for demonstration
const SAMPLE_PROFILES: Profile[] = [
    {
        wallet_address: '0x123',
        display_name: 'Sarah',
        age: 28,
        bio: 'Love hiking, coffee, and good conversations. Looking for someone who can keep up with my adventures! 🏔️☕',
        location: 'New York',
        latitude: 40.7128,
        longitude: -74.0060,
        photos: [{ url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah', sort_order: 0 }],
        interests: ['Hiking', 'Coffee', 'Travel', 'Photography', 'Yoga'],
        distance: 3
    },
    {
        wallet_address: '0x456',
        display_name: 'Emma',
        age: 26,
        bio: 'Artist and dog lover. Always looking for new inspiration and good vibes 🎨🐕',
        location: 'Brooklyn',
        latitude: 40.6782,
        longitude: -73.9442,
        photos: [{ url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma', sort_order: 0 }],
        interests: ['Art', 'Dogs', 'Music', 'Cooking'],
        distance: 5
    },
    {
        wallet_address: '0x789',
        display_name: 'Olivia',
        age: 27,
        bio: 'Foodie, traveler, and spontaneous adventurer. Let\'s explore the city together! 🍕✈️',
        location: 'Manhattan',
        latitude: 40.7831,
        longitude: -73.9712,
        photos: [{ url: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia', sort_order: 0 }],
        interests: ['Food', 'Travel', 'Dancing', 'Wine'],
        distance: 2
    }
]

export default function MainFeed() {
    const [profiles, setProfiles] = useState<Profile[]>(SAMPLE_PROFILES)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [showFilters, setShowFilters] = useState(false)

    const handleSwipe = (direction: 'left' | 'right' | 'up') => {
        console.log(`Swiped ${direction} on ${profiles[currentIndex]?.display_name}`)

        // Move to next profile
        if (currentIndex < profiles.length - 1) {
            setCurrentIndex(prev => prev + 1)
        } else {
            // No more profiles
            console.log('No more profiles')
        }
    }

    const handleAction = (action: 'pass' | 'super' | 'like') => {
        const direction = action === 'pass' ? 'left' : 'right'
        handleSwipe(direction)
    }

    const currentProfile = profiles[currentIndex]

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
                    {currentProfile ? (
                        <div className="relative">
                            {/* Background cards (stack effect) */}
                            {profiles.slice(currentIndex + 1, currentIndex + 3).map((profile, index) => (
                                <div
                                    key={profile.wallet_address}
                                    className="absolute inset-0 w-full"
                                    style={{
                                        transform: `scale(${1 - (index + 1) * 0.05}) translateY(${(index + 1) * 10}px)`,
                                        zIndex: -index - 1,
                                        opacity: 1 - (index + 1) * 0.3
                                    }}
                                >
                                    <div className="w-full aspect-[3/4] bg-gray-200 rounded-3xl" />
                                </div>
                            ))}

                            {/* Active card */}
                            <ProfileCard
                                profile={currentProfile}
                                active={true}
                                onSwipe={handleSwipe}
                            />
                        </div>
                    ) : (
                        <div className="relative w-full aspect-[3/4] bg-gray-100 rounded-3xl flex items-center justify-center">
                            <div className="text-center">
                                <p className="text-gray-400 text-lg mb-2">No more profiles</p>
                                <p className="text-gray-300 text-sm">Check back later!</p>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Bottom Action Buttons */}
            <div className="fixed bottom-8 left-0 right-0 z-40">
                <div className="max-w-md mx-auto px-4">
                    <div className="flex items-center justify-center gap-6">
                        {/* Pass Button */}
                        <button
                            onClick={() => handleAction('pass')}
                            disabled={!currentProfile}
                            className="w-16 h-16 bg-white border-2 border-red-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <X className="w-7 h-7 text-red-500" />
                        </button>

                        {/* Super Like Button */}
                        <button
                            onClick={() => handleAction('super')}
                            disabled={!currentProfile}
                            className="w-14 h-14 bg-white border-2 border-blue-500 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Star className="w-6 h-6 text-blue-500" />
                        </button>

                        {/* Like Button */}
                        <button
                            onClick={() => handleAction('like')}
                            disabled={!currentProfile}
                            className="w-16 h-16 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Heart className="w-7 h-7 text-white fill-current" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

