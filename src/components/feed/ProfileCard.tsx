import { Profile } from '@/types/profile'
import { CSSProperties } from 'react'
import { MapPin } from 'lucide-react'
import { PillTag, MatchBadge } from '@/components/shared'




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

            {/* Match Badge */}
            {profile.matchScore !== undefined && (
                <div className="absolute top-4 right-4 z-20">
                    <MatchBadge
                        percentage={profile.matchScore}
                        size="lg"
                        className="shadow-lg"
                    />
                </div>
            )}

            {/* Info Overlay */}

            <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                <div className="flex items-end justify-between mb-2">
                    <div>
                        <h2 className="text-3xl font-bold flex items-center gap-2 drop-shadow-md">
                            {profile.display_name}
                            <span className="text-2xl font-normal opacity-90">{profile.age}</span>
                        </h2>

                        {profile.distance !== undefined && (
                            <div className="flex items-center gap-1 text-sm text-gray-200 mt-1 drop-shadow-sm">
                                <MapPin className="w-4 h-4" />
                                <span>
                                    {profile.distance < 1
                                        ? `${Math.round(profile.distance * 1000)}m away`
                                        : `${Math.round(profile.distance)}km away`
                                    }
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {profile.bio && (
                    <p className="text-gray-200 text-sm line-clamp-2 mb-4 opacity-90 drop-shadow-sm">
                        {profile.bio}
                    </p>
                )}

                {/* Interest Tags */}
                {profile.interests && profile.interests.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {profile.interests.slice(0, 3).map((interest, i) => (
                            <PillTag
                                key={i}
                                size="sm"
                                className="bg-white/20 backdrop-blur-md border-white/30 text-white"
                            >
                                {interest}
                            </PillTag>
                        ))}
                        {profile.interests.length > 3 && (
                            <PillTag
                                size="sm"
                                className="bg-white/20 backdrop-blur-md border-white/30 text-white"
                            >
                                +{profile.interests.length - 3}
                            </PillTag>
                        )}
                    </div>
                )}
            </div>

        </div>
    )
}

