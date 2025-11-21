'use client'

import { useState } from 'react'
import { Heart, X, MessageCircle, Send, Flag, Ban, MapPin, Sparkles } from 'lucide-react'
import { useAccount } from 'wagmi'
import { supabase } from '@/lib/supabase'

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

    const handleLike = async () => {
        if (!address) return

        try {
            await supabase.from('matches').insert({
                user_id_1: address,
                user_id_2: profile.wallet_address,
                status: 'pending'
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
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 glass-panel flex items-center justify-between p-4 border-b border-white/10">
                    <h2 className="text-xl font-bold">Profile</h2>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Photo Gallery */}
                <div className="relative aspect-square">
                    <img
                        src={profile.photos[currentPhotoIndex]?.url || 'https://picsum.photos/600'}
                        alt={profile.display_name}
                        className="w-full h-full object-cover"
                    />
                    {/* Photo Navigation */}
                    {profile.photos.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {profile.photos.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPhotoIndex(i)}
                                    className={`w-2 h-2 rounded-full ${i === currentPhotoIndex ? 'bg-white' : 'bg-white/40'}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Profile Info */}
                <div className="p-6 space-y-6">
                    {/* Header Info */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-3xl font-bold">{profile.display_name}, {profile.age}</h1>
                            {profile.distance && (
                                <div className="flex items-center gap-1 text-gray-400 mt-1">
                                    <MapPin className="w-4 h-4" />
                                    {profile.distance < 1
                                        ? `${Math.round(profile.distance * 1000)}m away`
                                        : `${Math.round(profile.distance)}km away`
                                    }
                                </div>
                            )}
                        </div>
                        {profile.matchScore && (
                            <div className="glass-panel px-4 py-2 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-purple-400" />
                                <span className="text-lg font-bold">{profile.matchScore}%</span>
                            </div>
                        )}
                    </div>

                    {/* About Me */}
                    <div>
                        <h3 className="text-lg font-semibold mb-2">About Me</h3>
                        <p className="text-gray-300">{profile.bio}</p>
                    </div>

                    {/* Interests */}
                    {profile.interests && profile.interests.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold mb-3">Interests</h3>
                            <div className="flex flex-wrap gap-2">
                                {profile.interests.map((interest, i) => (
                                    <span key={i} className="glass-panel px-4 py-2">
                                        {interest}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="grid grid-cols-3 gap-3 pt-4">
                        <button
                            onClick={() => onClose()}
                            className="glass-panel p-4 flex flex-col items-center gap-2 hover:bg-white/5"
                        >
                            <X className="w-6 h-6 text-red-400" />
                            <span className="text-sm">Pass</span>
                        </button>
                        <button
                            onClick={handleLike}
                            className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 flex flex-col items-center gap-2 rounded-lg hover:opacity-90"
                        >
                            <Heart className="w-6 h-6" />
                            <span className="text-sm font-semibold">Like</span>
                        </button>
                        <button
                            className="glass-panel p-4 flex flex-col items-center gap-2 hover:bg-white/5"
                        >
                            <MessageCircle className="w-6 h-6 text-blue-400" />
                            <span className="text-sm">Message</span>
                        </button>
                    </div>

                    {/* Report/Block */}
                    <div className="relative pt-4 border-t border-white/10">
                        <button
                            onClick={() => setShowReportMenu(!showReportMenu)}
                            className="text-sm text-gray-400 hover:text-white flex items-center gap-2"
                        >
                            <Flag className="w-4 h-4" />
                            Report or Block
                        </button>

                        {showReportMenu && (
                            <div className="absolute bottom-full mb-2 glass-panel p-4 space-y-2 min-w-[200px]">
                                <button
                                    onClick={() => handleReport('Inappropriate content')}
                                    className="w-full text-left px-3 py-2 hover:bg-white/5 rounded text-sm"
                                >
                                    Inappropriate content
                                </button>
                                <button
                                    onClick={() => handleReport('Fake profile')}
                                    className="w-full text-left px-3 py-2 hover:bg-white/5 rounded text-sm"
                                >
                                    Fake profile
                                </button>
                                <button
                                    onClick={() => handleReport('Spam')}
                                    className="w-full text-left px-3 py-2 hover:bg-white/5 rounded text-sm"
                                >
                                    Spam
                                </button>
                                <hr className="border-white/10" />
                                <button
                                    onClick={handleBlock}
                                    className="w-full text-left px-3 py-2 hover:bg-white/5 rounded text-sm text-red-400 flex items-center gap-2"
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
