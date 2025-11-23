import { useState } from 'react'

const INTERESTS_LIST = [
    'DeFi', 'NFTs', 'DAO', 'Gaming', 'Layer 2', 'Privacy',
    'Trading', 'Development', 'Design', 'Marketing', 'Community',
    'Music', 'Art', 'Sports', 'Travel', 'Food'
]

interface InterestSelectorProps {
    selectedInterests: string[]
    onChange: (interests: string[]) => void
    maxInterests?: number
}

export function InterestSelector({ selectedInterests, onChange, maxInterests = 5 }: InterestSelectorProps) {
    const toggleInterest = (interest: string) => {
        if (selectedInterests.includes(interest)) {
            onChange(selectedInterests.filter(i => i !== interest))
        } else {
            if (selectedInterests.length >= maxInterests) return
            onChange([...selectedInterests, interest])
        }
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                {INTERESTS_LIST.map(interest => {
                    const isSelected = selectedInterests.includes(interest)
                    return (
                        <button
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            className={`px-4 py-2 rounded-full text-sm transition-all ${isSelected
                                ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25'
                                : 'glass-panel hover:bg-white/10'
                                }`}
                        >
                            {interest}
                        </button>
                    )
                })}
            </div>
            <p className="text-xs text-gray-400">
                Select up to {maxInterests} interests ({selectedInterests.length}/{maxInterests})
            </p>
        </div>
    )
}
