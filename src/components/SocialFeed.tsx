'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { supabase } from '@/lib/supabase'
import { tokenMatcher } from '@/services/TokenMatcherService'
import ProfileCard from '@/components/feed/ProfileCard'
import SwipeActions from '@/components/feed/SwipeActions'
import { Profile } from '@/types/profile'




export default function SocialFeed() {
    const { address } = useAccount()
    const [profiles, setProfiles] = useState<Profile[]>([])
    const [loading, setLoading] = useState(true)
    const [matchScores, setMatchScores] = useState<Record<string, number>>({})
    const [showMatchAnimation, setShowMatchAnimation] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        fetchProfiles()
    }, [address])

    // ... (keep existing calculateDistance and fetchProfiles logic) ...
    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371 // Earth's radius in km
        const dLat = (lat2 - lat1) * Math.PI / 180
        const dLon = (lon2 - lon1) * Math.PI / 180
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
        return R * c
    }

    const fetchProfiles = async () => {
        try {
            // Get current user's profile
            const { data: currentUser } = await supabase
                .from('profiles')
                .select('latitude, longitude, interests')
                .eq('wallet_address', address)
                .single()

            // Get blocked users
            const { data: blockedData } = await supabase
                .from('blocked_users')
                .select('blocked_id')
                .eq('blocker_id', address)

            const blockedIds = blockedData?.map((b: { blocked_id: string }) => b.blocked_id) || []

            // Fetch profiles with photos
            const { data: profilesData, error } = await supabase
                .from('profiles')
                .select(`
          *,
          photos(url, sort_order)
        `)
                .neq('wallet_address', address)
                .not('wallet_address', 'in', `(${blockedIds.join(',')})`)
                .order('created_at', { ascending: false })

            if (error) throw error

            // Calculate distances and initial match scores
            const enrichedProfiles = profilesData?.map((profile: any) => {
                let distance = null
                let matchScore = 0

                if (currentUser?.latitude && currentUser?.longitude && profile.latitude && profile.longitude) {
                    distance = calculateDistance(
                        currentUser.latitude,
                        currentUser.longitude,
                        profile.latitude,
                        profile.longitude
                    )
                }

                // Boost match score based on shared interests
                if (currentUser?.interests && profile.interests) {
                    const sharedInterests = profile.interests.filter((i: string) =>
                        currentUser.interests.includes(i)
                    ).length
                    matchScore += sharedInterests * 5
                }

                return {
                    ...profile,
                    photos: profile.photos?.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order) || [],
                    distance,
                    matchScore
                }
            }) || []

            setProfiles(enrichedProfiles)

            // Calculate token match scores asynchronously
            if (address && enrichedProfiles.length > 0) {
                const myTokens = await tokenMatcher.fetchTokenBalances(address)

                const scores: Record<string, number> = {}

                for (const profile of enrichedProfiles) {
                    const theirTokens = await tokenMatcher.fetchTokenBalances(profile.wallet_address)
                    const tokenScore = tokenMatcher.calculateMatchScore(myTokens, theirTokens)
                    scores[profile.wallet_address] = tokenScore
                }
                setMatchScores(scores)
            }

        } catch (error) {
            console.error('Error fetching profiles:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleSwipe = async (direction: 'left' | 'right' | 'up') => {
        if (!address || currentIndex >= profiles.length) return

        const profile = profiles[currentIndex]
        const isLike = direction === 'right'
        const isSuperLike = direction === 'up'

        // Advance to next card
        setCurrentIndex(prev => prev + 1)

        if (isLike || isSuperLike) {
            // Show animation
            setShowMatchAnimation(true)
            setTimeout(() => setShowMatchAnimation(false), 2000)

            try {
                await supabase.from('matches').insert({
                    user_id_1: address,
                    user_id_2: profile.wallet_address,
                    status: 'pending',
                    is_super_like: isSuperLike
                })
            } catch (error) {
                console.error('Error liking profile:', error)
            }
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[600px]">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    const currentProfile = profiles[currentIndex]
    const nextProfile = profiles[currentIndex + 1]

    if (!currentProfile) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[600px] text-center p-8">
                <div className="text-6xl mb-4">🎉</div>
                <h2 className="text-2xl font-bold mb-2">You're all caught up!</h2>
                <p className="text-gray-500">Check back later for more profiles.</p>
            </div>
        )
    }

    return (
        <div className="max-w-md mx-auto h-[700px] flex flex-col relative">
            {showMatchAnimation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none bg-black/20 backdrop-blur-sm animate-fade-in">
                    <div className="animate-match text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-lg">
                        ✨ It's a Match! ✨
                    </div>
                </div>
            )}

            <div className="flex items-center justify-between mb-4 px-4">
                <h2 className="text-2xl font-bold text-gradient">Discover</h2>
                <button className="glass-panel px-4 py-2 text-sm hover:bg-white/10 transition-colors">
                    Filters
                </button>
            </div>

            {/* Card Stack */}
            <div className="flex-1 relative w-full mb-6">
                {/* Next Card (Background) */}
                {nextProfile && (
                    <div className="absolute inset-0 transform scale-95 translate-y-4 opacity-60 pointer-events-none">
                        <ProfileCard
                            profile={{
                                ...nextProfile,
                                matchScore: (nextProfile.matchScore || 0) + (matchScores[nextProfile.wallet_address] || 0)
                            }}
                        />
                    </div>
                )}

                {/* Current Card (Foreground) */}
                <div className="absolute inset-0 z-10">
                    <ProfileCard
                        profile={{
                            ...currentProfile,
                            matchScore: (currentProfile.matchScore || 0) + (matchScores[currentProfile.wallet_address] || 0)
                        }}
                        active={true}
                        onSwipe={handleSwipe}
                        className="shadow-2xl"
                    />
                </div>
            </div>

            {/* Swipe Actions */}
            <div className="pb-4">
                <SwipeActions
                    onPass={() => handleSwipe('left')}
                    onLike={() => handleSwipe('right')}
                    onSuperLike={() => handleSwipe('up')}
                />
            </div>
        </div>
    )
}

