'use client'

import { Profile } from '@/types/profile'
import { CSSProperties } from 'react'

interface ProfileCardProps {
    profile: Profile
    active?: boolean
    className?: string
    style?: CSSProperties
    onSwipe?: (direction: 'left' | 'right' | 'up') => void
}

export default function ProfileCard({
    profile,
    active = false,
    className = '',
    style = {},
    onSwipe
}: ProfileCardProps) {
    return (
        <div
            className={`relative w-full h-full rounded-3xl overflow-hidden bg-white shadow-xl select-none ${className}`}
            style={style}
        >
            {/* Photo Background */}
            <div className="absolute inset-0">
                <img
                    src={profile.photos[0]?.url || 'https://picsum.photos/600/800'}
                    alt={profile.display_name}
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60" />
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            </div>
        </div>
    )
}
