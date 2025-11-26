'use client'

import { User, Settings as SettingsIcon, Edit, LogOut } from 'lucide-react'
import { Profile } from '@/types/profile'
import { Button } from '@/components/ui/Button'

interface UserProfileProps {
    profile: Profile
    onEdit?: () => void
    onSettings?: () => void
}

export default function UserProfile({ profile, onEdit, onSettings }: UserProfileProps) {
    const primaryPhoto = profile.photos?.[0]?.url || '/placeholder-profile.jpg'

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-50">
                <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-bold text-gray-900">Profile</h1>
                    <button
                        onClick={onSettings}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <SettingsIcon className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </header>

            {/* Profile Content */}
            <main className="pt-20 pb-8 px-4">
                <div className="max-w-md mx-auto">
                    {/* Profile Photo */}
                    <div className="relative w-32 h-32 mx-auto mb-4">
                        <img
                            src={primaryPhoto}
                            alt={profile.display_name}
                            className="w-full h-full rounded-full object-cover border-4 border-gray-100"
                        />
                        <button
                            onClick={onEdit}
                            className="absolute bottom-0 right-0 w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-lg hover:bg-purple-700 transition-colors"
                        >
                            <Edit className="w-5 h-5 text-white" />
                        </button>
                    </div>

                    {/* Name & Age */}
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-900 mb-1">
                            {profile.display_name}, {profile.age}
                        </h2>
                        <p className="text-gray-500">{profile.location}</p>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-gray-50 rounded-2xl p-4 text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
                            <div className="text-xs text-gray-500">Matches</div>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-4 text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
                            <div className="text-xs text-gray-500">Likes</div>
                        </div>
                        <div className="bg-gray-50 rounded-2xl p-4 text-center">
                            <div className="text-2xl font-bold text-gray-900 mb-1">0</div>
                            <div className="text-xs text-gray-500">Views</div>
                        </div>
                    </div>

                    {/* About Section */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                        <p className="text-gray-600 leading-relaxed">{profile.bio}</p>
                    </div>

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

                    {/* Photos Grid */}
                    {profile.photos && profile.photos.length > 1 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-3">Photos</h3>
                            <div className="grid grid-cols-3 gap-2">
                                {profile.photos.map((photo, index) => (
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
                        </div>
                    )}

                    {/* Actions */}
                    <div className="space-y-3 mt-8">
                        <Button
                            variant="outline"
                            size="lg"
                            fullWidth
                            onClick={onEdit}
                            className="border-2 border-gray-200 text-gray-900 hover:bg-gray-50"
                        >
                            <Edit className="w-5 h-5 mr-2" />
                            Edit Profile
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            fullWidth
                            className="border-2 border-red-200 text-red-600 hover:bg-red-50"
                        >
                            <LogOut className="w-5 h-5 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}
