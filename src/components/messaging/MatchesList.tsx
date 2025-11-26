'use client'

import { Profile } from '@/types/profile'

interface MatchesListProps {
    matches: Profile[]
    onMatchClick: (match: Profile) => void
}

export default function MatchesList({ matches, onMatchClick }: MatchesListProps) {
    return (
        <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 px-4">New Matches</h3>
            <div className="flex gap-4 overflow-x-auto px-4 pb-2 scrollbar-hide">
                {matches.map((match) => {
                    const photo = match.photos?.[0]?.url || '/placeholder-profile.jpg'
                    return (
                        <button
                            key={match.wallet_address}
                            onClick={() => onMatchClick(match)}
                            className="flex-shrink-0 text-center"
                        >
                            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-pink-500 mb-2">
                                <img
                                    src={photo}
                                    alt={match.display_name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
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
