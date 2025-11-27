'use client'

import BottomNav from '@/components/layout/BottomNav'
import MatchesList from '@/components/messaging/MatchesList'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Profile } from '@/types/profile'

export default function MatchesPage() {
    const { address, isConnected } = useAccount()
    const router = useRouter()
    const [matches, setMatches] = useState<Profile[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isConnected) {
            router.push('/')
            return
        }

        const fetchMatches = async () => {
            if (!address) return

            try {
                // Fetch accepted matches where current user is either user_1 or user_2
                const { data: matchesData, error } = await supabase
                    .from('matches')
                    .select(`
                        user_id_1,
                        user_id_2
                    `)
                    .or(`user_id_1.eq.${address.toLowerCase()},user_id_2.eq.${address.toLowerCase()}`)
                    .eq('status', 'accepted')

                if (error) throw error

                if (matchesData) {
                    // Extract the OTHER user's ID from each match
                    const matchedUserIds = matchesData.map(match =>
                        match.user_id_1 === address.toLowerCase() ? match.user_id_2 : match.user_id_1
                    )

                    if (matchedUserIds.length > 0) {
                        // Fetch profiles for these users
                        const { data: profilesData, error: profilesError } = await supabase
                            .from('profiles')
                            .select('*, photos(*)')
                            .in('wallet_address', matchedUserIds)

                        if (profilesError) throw profilesError

                        if (profilesData) {
                            const formattedProfiles: Profile[] = profilesData.map(p => ({
                                ...p,
                                photos: p.photos?.sort((a: any, b: any) => a.sort_order - b.sort_order) || []
                            }))
                            setMatches(formattedProfiles)
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching matches:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchMatches()
    }, [isConnected, address, router])

    const handleMatchClick = (match: Profile) => {
        // Navigate to chat or profile
        console.log('Clicked match:', match)
        // router.push(`/chat/${match.wallet_address}`)
    }

    if (!isConnected) return null

    return (
        <div className="min-h-screen pb-20 bg-white">
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">Matches</h1>
                {loading ? (
                    <div className="flex justify-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
                    </div>
                ) : (
                    <MatchesList matches={matches} onMatchClick={handleMatchClick} />
                )}
            </div>
            <BottomNav />
        </div>
    )
}
