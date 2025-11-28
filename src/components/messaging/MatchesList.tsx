'use client'

import { Profile } from '@/types/profile'
import { Star } from 'lucide-react'

interface Match extends Profile {
    is_super_like?: boolean
}

interface MatchesListProps {
    matches: Match[]
    onMatchClick: (match: Match) => void
}

export default function MatchesList({ matches, onMatchClick }: MatchesListProps) {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 px-4">New Matches</h3>
            <div className="flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide">
                {matches.map((match) => {
                    const photo = match.photos?.[0]?.url || '/placeholder-profile.jpg'
                    const isSuperLike = match.is_super_like

                    return (
                        <button
                            key={match.wallet_address}
                            onClick={() => onMatchClick(match)}
                            className="flex-shrink-0 text-center relative"
                        >
                            <div className={`w-20 h-20 rounded-full overflow-hidden border-4 mb-2 transition-all ${isSuperLike
                                    ? 'border-yellow-400 shadow-lg shadow-yellow-400/50'
                                    : 'border-pink-500'
                                }`}>
                                <img
                                    src={photo}
                                    alt={match.display_name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {isSuperLike && (
                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center border-2 border-white">
                                    <Star className="w-3 h-3 text-white fill-white" />
                                </div>
                            )}
                            <p className="text-sm font-medium text-gray-900 truncate w-20">
                                {match.display_name}
                            </p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
