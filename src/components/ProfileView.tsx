'use client'

import { useState } from 'react'
import { Heart, X, MessageCircle, Send, Flag, Ban, MapPin, Sparkles } from 'lucide-react'
import { useAccount } from 'wagmi'
import { supabase } from '@/lib/supabase'
import { MatchBadge, PillTag } from '@/components/shared'
import SwipeActions from '@/components/feed/SwipeActions'


interface ProfileViewProps {
    profile: {
        wallet_address: string
        display_name: string
        age: number
        bio: string
        location: string
        interests: string[]
        photos: { url: string }[]
        distance?: number
        matchScore?: number
    }
    onClose: () => void
}

export default function ProfileView({ profile, onClose }: ProfileViewProps) {
    const { address } = useAccount()
    const [showReportMenu, setShowReportMenu] = useState(false)
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)

    const handleLike = async (isSuperLike = false) => {
        if (!address) return

        try {
            await supabase.from('matches').insert({
                user_id_1: address,
                user_id_2: profile.wallet_address,
                status: 'pending',
                is_super_like: isSuperLike
            })
            onClose()
        } catch (error) {
            console.error('Error liking profile:', error)
        }
    }

    const handleBlock = async () => {
        if (!address) return
        if (!confirm(`Block ${profile.display_name}? They won't be able to see your profile.`)) return

        try {
            await supabase.from('blocked_users').insert({
                blocker_id: address,
                blocked_id: profile.wallet_address
            })
            onClose()
        } catch (error) {
            console.error('Error blocking user:', error)
        }
    }

    const handleReport = async (reason: string) => {
        if (!address) return

        try {
            await supabase.from('reports').insert({
                reporter_id: address,
                reported_id: profile.wallet_address,
                reason
            })
            alert('Report submitted. Thank you for keeping ChainMeet safe.')
            setShowReportMenu(false)
        } catch (error) {
            console.error('Error reporting user:', error)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-gray-900 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-white/10 animate-scale-in">
                {/* Header */}
                <div className="sticky top-0 bg-gray-900/95 backdrop-blur-md flex items-center justify-between p-4 border-b border-white/10 z-20">
                    <h2 className="text-xl font-bold text-gradient">Profile Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Photo Gallery */}
                <div className="relative aspect-[3/4] md:aspect-square">
                    <img
                        src={profile.photos[currentPhotoIndex]?.url || 'https://picsum.photos/600'}
                        alt={profile.display_name}
                        className="w-full h-full object-cover"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent" />

                    {/* Photo Navigation */}
                    {profile.photos.length > 1 && (
                        <div className="absolute top-4 left-0 right-0 flex gap-1 px-4">
                            {profile.photos.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPhotoIndex(i)}
                                    className={`h-1 flex-1 rounded-full transition-all ${i === currentPhotoIndex ? 'bg-white' : 'bg-white/30'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Profile Info */}
                <div className="p-6 space-y-8 -mt-20 relative z-10">
                    {/* Header Info */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-4xl font-bold mb-1">{profile.display_name}, {profile.age}</h1>
                            {profile.distance && (
                                <div className="flex items-center gap-1 text-gray-400">
                                    <MapPin className="w-4 h-4" />
                                    {profile.distance < 1
                                        ? `${Math.round(profile.distance * 1000)}m away`
                                        : `${Math.round(profile.distance)}km away`
                                    }
                                </div>
                            )}
                        </div>
                        {profile.matchScore && (
                            <MatchBadge percentage={profile.matchScore} size="lg" />
                        )}
                    </div>

                    {/* About Me */}
                    <div>
                        <h3 className="text-lg font-semibold mb-3 text-gray-300">About Me</h3>
                        <p className="text-gray-200 leading-relaxed text-lg">{profile.bio}</p>
                    </div>

                    {/* Interests */}
                    {profile.interests && profile.interests.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3 text-gray-300">Interests</h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.interests.map((interest, i) => (
                                    <PillTag key={i} size="md" className="bg-white/5 border-white/10">
                                        {interest}
                                    </PillTag>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex justify-center pt-4 pb-8">
                        <SwipeActions
                            onPass={() => onClose()}
                            onLike={() => handleLike(false)}
                            onSuperLike={() => handleLike(true)}
                        />
                    </div>

                    {/* Report/Block */}
                    <div className="relative pt-6 border-t border-white/10 flex justify-center">
                        <button
                            onClick={() => setShowReportMenu(!showReportMenu)}
                            className="text-sm text-gray-500 hover:text-gray-300 flex items-center gap-2 transition-colors"
                        >
                            <Flag className="w-4 h-4" />
                            Report or Block {profile.display_name}
                        </button>

                        {showReportMenu && (
                            <div className="absolute bottom-full mb-2 bg-gray-800 rounded-xl border border-white/10 p-2 shadow-xl min-w-[200px] animate-scale-in">
                                <button
                                    onClick={() => handleReport('Inappropriate content')}
                                    className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg text-sm transition-colors"
                                >
                                    Inappropriate content
                                </button>
                                <button
                                    onClick={() => handleReport('Fake profile')}
                                    className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg text-sm transition-colors"
                                >
                                    Fake profile
                                </button>
                                <button
                                    onClick={() => handleReport('Spam')}
                                    className="w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg text-sm transition-colors"
                                >
                                    Spam
                                </button>
                                <div className="h-px bg-white/10 my-1" />
                                <button
                                    onClick={handleBlock}
                                    className="w-full text-left px-4 py-3 hover:bg-red-500/10 rounded-lg text-sm text-red-400 flex items-center gap-2 transition-colors"
                                >
                                    <Ban className="w-4 h-4" />
                                    Block User
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

