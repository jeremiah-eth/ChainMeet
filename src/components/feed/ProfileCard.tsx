'use client'

import { Profile } from '@/types/profile'
import { CSSProperties, useState, useRef } from 'react'
import { MapPin, Info } from 'lucide-react'

interface ProfileCardProps {
    profile: Profile
    active?: boolean
    className?: string
    style?: CSSProperties
    onSwipe?: (direction: 'left' | 'right' | 'up') => void
    onInfoClick?: () => void
}

export default function ProfileCard({
    profile,
    active = false,
    className = '',
    style = {},
    onSwipe,
    onInfoClick
}: ProfileCardProps) {
    const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null)
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
    const cardRef = useRef<HTMLDivElement>(null)

    const handleStart = (clientX: number, clientY: number) => {
        if (!active) return
        setDragStart({ x: clientX, y: clientY })
    }

    const handleMove = (clientX: number, clientY: number) => {
        if (!dragStart || !active) return
        const deltaX = clientX - dragStart.x
        const deltaY = clientY - dragStart.y
        setDragOffset({ x: deltaX, y: deltaY })
    }

    const handleEnd = () => {
        if (!active) return

        const threshold = 100
        if (dragOffset.x > threshold) {
            onSwipe?.('right')
        } else if (dragOffset.x < -threshold) {
            onSwipe?.('left')
        } else if (dragOffset.y < -threshold) {
            onSwipe?.('up')
        }

        setDragStart(null)
        setDragOffset({ x: 0, y: 0 })
    }

    const primaryPhoto = profile.photos?.[0]?.url || '/placeholder-profile.jpg'
    const age = profile.age || 25
    const distance = profile.distance || 5

    const rotation = dragOffset.x * 0.1
    const opacity = 1 - Math.abs(dragOffset.x) / 300

    return (
        <div
            ref={cardRef}
            className={`relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl bg-white touch-none ${className}`}
            style={{
                transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
                opacity,
                transition: dragStart ? 'none' : 'all 0.3s ease',
                cursor: active ? 'grab' : 'default',
                ...style
            }}
            onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
            onMouseMove={(e) => handleMove(e.clientX, e.clientY)}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
            onTouchEnd={handleEnd}
        >
            {/* Profile Photo */}
            <div className="absolute inset-0">
                <img
                    src={primaryPhoto}
                    alt={profile.display_name}
                    className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />
            </div>

            {/* Swipe Indicators */}
            {dragOffset.x > 50 && (
                <div className="absolute top-1/4 right-8 transform rotate-12">
                    <div className="px-6 py-3 border-4 border-green-500 rounded-2xl">
                        <span className="text-4xl font-bold text-green-500">LIKE</span>
                    </div>
                </div>
            )}
            {dragOffset.x < -50 && (
                <div className="absolute top-1/4 left-8 transform -rotate-12">
                    <div className="px-6 py-3 border-4 border-red-500 rounded-2xl">
                        <span className="text-4xl font-bold text-red-500">NOPE</span>
                    </div>
                </div>
            )}

            {/* Info Button */}
            <button
                onClick={onInfoClick}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-colors z-10"
            >
                <Info className="w-5 h-5 text-white" />
            </button>

            {/* Profile Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <div className="flex items-end justify-between mb-2">
                    <div>
                        <h2 className="text-3xl font-bold mb-1">
                            {profile.display_name}, {age}
                        </h2>
                        <div className="flex items-center gap-1 text-sm text-white/90">
                            <MapPin className="w-4 h-4" />
                            <span>{distance} km away</span>
                        </div>
                    </div>
                </div>

                {/* Bio Preview */}
                {profile.bio && (
                    <p className="text-sm text-white/80 line-clamp-2 mt-2">
                        {profile.bio}
                    </p>
                )}

                {/* Interest Tags Preview */}
                {profile.interests && profile.interests.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {profile.interests.slice(0, 3).map((interest, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium"
                            >
                                {interest}
                            </span>
                        ))}
                        {profile.interests.length > 3 && (
                            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                                +{profile.interests.length - 3}
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
