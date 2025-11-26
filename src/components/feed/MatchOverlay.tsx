'use client'

import { Heart, MessageCircle } from 'lucide-react'
import { Profile } from '@/types/profile'
import { Button } from '@/components/ui/Button'

interface MatchOverlayProps {
    isVisible: boolean
    matchedProfile: Profile | null
    onSendMessage: () => void
    onKeepSwiping: () => void
}

export default function MatchOverlay({
    isVisible,
    matchedProfile,
    onSendMessage,
    onKeepSwiping
}: MatchOverlayProps) {
    if (!isVisible || !matchedProfile) return null

    const primaryPhoto = matchedProfile.photos?.[0]?.url || '/placeholder-profile.jpg'

    return (
        <div className="fixed inset-0 z-50 bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center p-6 animate-fade-in">
            <div className="max-w-md w-full text-center">
                {/* Match Animation */}
                <div className="mb-8 animate-slide-up">
                    <h1 className="text-5xl font-bold text-white mb-4">
                        It's a Match!
                    </h1>
                    <p className="text-white/90 text-lg">
                        You and {matchedProfile.display_name} liked each other
                    </p>
                </div>

                {/* Profile Photo */}
                <div className="relative w-48 h-48 mx-auto mb-8">
                    <div className="absolute inset-0 bg-white rounded-full animate-pulse" />
                    <img
                        src={primaryPhoto}
                        alt={matchedProfile.display_name}
                        className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-2xl"
                    />
                    <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                        <Heart className="w-8 h-8 text-pink-500 fill-current" />
                    </div>
                </div>

                {/* Profile Info */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        {matchedProfile.display_name}, {matchedProfile.age}
                    </h2>
                    {matchedProfile.bio && (
                        <p className="text-white/80 text-sm line-clamp-2">
                            {matchedProfile.bio}
                        </p>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                    <Button
                        variant="default"
                        size="lg"
                        fullWidth
                        onClick={onSendMessage}
                        className="bg-white text-purple-600 hover:bg-gray-100 font-bold"
                    >
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Send Message
                    </Button>
                    <Button
                        variant="outline"
                        size="lg"
                        fullWidth
                        onClick={onKeepSwiping}
                        className="border-2 border-white text-white hover:bg-white/10"
                    >
                        Keep Swiping
                    </Button>
                </div>
            </div>
        </div>
    )
}
