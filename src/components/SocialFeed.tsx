'use client'

import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { supabase } from '@/lib/supabase'
import { Heart, MapPin, Sparkles } from 'lucide-react'
import { tokenMatcher } from '@/services/TokenMatcherService'
import { AssetBadge } from '@/components/feed/AssetBadge'

interface Profile {
    wallet_address: string
    display_name: string
    age: number
    bio: string
    location: string
    latitude: number | null
    longitude: number | null
    interests: string[]
    photos: { url: string; sort_order: number }[]
    distance?: number
    matchScore?: number
    commonTokens?: string[]
    commonNFTs?: string[]
}

export default function SocialFeed() {
    const { address } = useAccount()
    const [profiles, setProfiles] = useState<Profile[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null)
    const [matchScores, setMatchScores] = useState<Record<string, number>>({})
    const [commonAssets, setCommonAssets] = useState<Record<string, { tokens: string[], nfts: string[] }>>({})

    useEffect(() => {
        fetchProfiles()
    }, [address])

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
                const myNFTs = await tokenMatcher.fetchNFTs(address)

                const scores: Record<string, number> = {}
                const assets: Record<string, { tokens: string[], nfts: string[] }> = {}

                for (const profile of enrichedProfiles) {
                    const theirTokens = await tokenMatcher.fetchTokenBalances(profile.wallet_address)
                    const theirNFTs = await tokenMatcher.fetchNFTs(profile.wallet_address)

                    const tokenScore = tokenMatcher.calculateMatchScore(myTokens, theirTokens)
                    scores[profile.wallet_address] = tokenScore

                    assets[profile.wallet_address] = {
                        tokens: myTokens.filter(t => theirTokens.includes(t)),
                        nfts: myNFTs.filter(n => theirNFTs.includes(n))
                    }
                }
                setMatchScores(scores)
                setCommonAssets(assets)
            }

        } catch (error) {
            console.error('Error fetching profiles:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleLike = async (profileId: string) => {
        if (!address) return

        try {
            await supabase.from('matches').insert({
                user_id_1: address,
                user_id_2: profileId,
                status: 'pending'
            })

            // Remove from feed
            setProfiles(prev => prev.filter(p => p.wallet_address !== profileId))
        } catch (error) {
            console.error('Error liking profile:', error)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-400">Loading profiles...</div>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Discover</h2>
                <button className="glass-panel px-4 py-2 text-sm">
                    Filters
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {profiles.map(profile => {
                    const totalScore = (profile.matchScore || 0) + (matchScores[profile.wallet_address] || 0)

                    return (
                        <div
                            key={profile.wallet_address}
                            className="glass-panel overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                            onClick={() => setSelectedProfile(profile)}
                        >
                            {/* Photo */}
                            <div className="aspect-square relative">
                                <img
                                    src={profile.photos[0]?.url || 'https://picsum.photos/400'}
                                    alt={profile.display_name}
                                    className="w-full h-full object-cover"
                                />
                                {/* Match Score Badge */}
                                <div className="absolute top-3 right-3 glass-panel px-3 py-1 flex items-center gap-1">
                                    <Sparkles className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm font-semibold">{Math.min(100, totalScore)}%</span>
                                </div>
                                {/* Like Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleLike(profile.wallet_address)
                                    }}
                                    className="absolute bottom-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-full hover:scale-110 transition-transform"
                                >
                                    <Heart className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Info */}
                            <div className="p-4 space-y-2">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold">
                                        {profile.display_name}, {profile.age}
                                    </h3>
                                </div>

                                {profile.distance && (
                                    <div className="flex items-center gap-1 text-sm text-gray-400">
                                        <MapPin className="w-4 h-4" />
                                        {profile.distance < 1
                                            ? `${Math.round(profile.distance * 1000)}m away`
                                            : `${Math.round(profile.distance)}km away`
                                        }
                                    </div>
                                )}

                                <p className="text-sm text-gray-300 line-clamp-2">{profile.bio}</p>

                                {/* Common Assets */}
                                {commonAssets[profile.wallet_address] && (
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {commonAssets[profile.wallet_address].tokens.map(token => (
                                            <AssetBadge key={token} symbol={token} type="token" />
                                        ))}
                                        {commonAssets[profile.wallet_address].nfts.map(nft => (
                                            <AssetBadge key={nft} symbol={nft} type="nft" />
                                        ))}
                                    </div>
                                )}

                                {profile.interests && profile.interests.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {profile.interests.slice(0, 3).map((interest, i) => (
                                            <span key={i} className="text-xs glass-panel px-2 py-1">
                                                {interest}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>

            {profiles.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                    <p>No profiles found. Check back later!</p>
                </div>
            )}
        </div>
    )
}
