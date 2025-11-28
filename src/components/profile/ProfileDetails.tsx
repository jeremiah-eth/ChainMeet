'use client'

import { X, MapPin, Briefcase, GraduationCap, Home } from 'lucide-react'
import { Profile } from '@/types/profile'
import { useState, useEffect } from 'react'
import { resolveENS, ENSData } from '@/lib/ens'
import SocialBadge from '@/components/shared/SocialBadge'

interface ProfileDetailsProps {
    profile: Profile
    onClose: () => void
}

export default function ProfileDetails({ profile, onClose }: ProfileDetailsProps) {
    const [ensData, setEnsData] = useState<ENSData | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadENS = async () => {
            const data = await resolveENS(profile.wallet_address)
            setEnsData(data)
            setLoading(false)
        }
        loadENS()
    }, [profile.wallet_address])

    return (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto animate-slide-up">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 z-10">
                <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">Profile</h1>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-md mx-auto px-4 py-6">
                {/* Photos Grid */}
                <div className="grid grid-cols-3 gap-2 mb-6">
                    {profile.photos?.map((photo, index) => (
                        <div
                            key={index}
                            className="aspect-square rounded-xl overflow-hidden bg-gray-100"
                        >
                            <img
                                src={photo.url}
                                alt={`Photo ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                </div>

                {/* Name & Age */}
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        {profile.display_name}, {profile.age}
                    </h2>

                    {/* Social Badges */}
                    {!loading && ensData?.name && (
                        <div className="flex flex-wrap gap-2 mb-3">
                            <SocialBadge platform="ens" handle={ensData.name} />
                            {ensData.twitter && (
                                <SocialBadge platform="farcaster" handle={`@${ensData.twitter}`} />
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-1 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{profile.location}</span>
                        {profile.distance && <span className="text-gray-400">• {profile.distance} km away</span>}
                    </div>
                </div>

                {/* About */}
                {profile.bio && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">About</h3>
                        <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
                    </div>
                )}

                {/* Interests */}
                {profile.interests && profile.interests.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Interests</h3>
                        <div className="flex flex-wrap gap-2">
                            {profile.interests.map((interest, index) => (
                                <span
                                    key={index}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium"
                                >
                                    {interest}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Additional Info Sections (Placeholder) */}
                <div className="space-y-4">
                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                        <Briefcase className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                            <div className="font-semibold text-gray-900">Work</div>
                            <div className="text-sm text-gray-600">Add your job title</div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                        <GraduationCap className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                            <div className="font-semibold text-gray-900">Education</div>
                            <div className="text-sm text-gray-600">Add your school</div>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl">
                        <Home className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                            <div className="font-semibold text-gray-900">Lives in</div>
                            <div className="text-sm text-gray-600">{profile.location}</div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
