'use client'

import { useState } from 'react'
import { X, Plus, Trash2 } from 'lucide-react'
import { Profile } from '@/types/profile'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface EditProfileProps {
    profile: Profile
    onSave: (updatedProfile: Partial<Profile>) => void
    onClose: () => void
}

export default function EditProfile({ profile, onSave, onClose }: EditProfileProps) {
    const [displayName, setDisplayName] = useState(profile.display_name)
    const [age, setAge] = useState(profile.age)
    const [bio, setBio] = useState(profile.bio)
    const [location, setLocation] = useState(profile.location)
    const [interests, setInterests] = useState<string[]>(profile.interests || [])

    const PASSIONS_LIST = [
        'Harry Potter', '90s Kid', 'SoundCloud', 'Spa', 'Self Care',
        'Heavy Metal', 'House Parties', 'Gin Tonic', 'Gymnastics', 'Ludo',
        'Maggi', 'Hot Yoga', 'Biryani', 'Meditation', 'Sushi',
        'Spotify', 'Hockey', 'Basketball', 'Slam Poetry', 'Home Workout',
        'Theater', 'Cafe Hopping', 'Aquarium', 'Sneakers', 'Instagram',
        'Hot Springs', 'Walking', 'Running', 'Travel', 'Language Exchange',
        'Movies', 'Guitarists', 'Social Development', 'Gym', 'Social Media'
    ]

    const toggleInterest = (interest: string) => {
        if (interests.includes(interest)) {
            setInterests(prev => prev.filter(i => i !== interest))
        } else {
            if (interests.length < 5) {
                setInterests(prev => [...prev, interest])
            }
        }
    }

    const handleSave = () => {
        onSave({
            display_name: displayName,
            age,
            bio,
            location,
            interests
        })
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 z-10">
                <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="text-purple-600 font-semibold"
                    >
                        Cancel
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Edit Profile</h1>
                    <button
                        onClick={handleSave}
                        className="text-purple-600 font-semibold"
                    >
                        Save
                    </button>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-md mx-auto px-4 py-6">
                {/* Photos Management */}
                <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Photos</h3>
                    <div className="grid grid-cols-3 gap-2">
                        {profile.photos?.map((photo, index) => (
                            <div
                                key={index}
                                className="relative aspect-square rounded-xl overflow-hidden bg-gray-100 group"
                            >
                                <img
                                    src={photo.url}
                                    alt={`Photo ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <button className="absolute top-2 right-2 p-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Trash2 className="w-4 h-4 text-white" />
                                </button>
                                {index === 0 && (
                                    <div className="absolute bottom-2 left-2 px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                                        Main
                                    </div>
                                )}
                            </div>
                        ))}
                        {profile.photos && profile.photos.length < 6 && (
                            <button className="aspect-square rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center hover:border-purple-600 hover:bg-purple-50 transition-all">
                                <Plus className="w-8 h-8 text-gray-400 mb-1" />
                                <span className="text-xs text-gray-500 font-medium">Add Photo</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-4 mb-8">
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Name
                        </label>
                        <Input
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            placeholder="Your name"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Age
                        </label>
                        <Input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(parseInt(e.target.value))}
                            placeholder="Your age"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Location
                        </label>
                        <Input
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            placeholder="Your location"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            About
                        </label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            placeholder="Tell us about yourself..."
                            rows={4}
                            className="w-full px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                        />
                    </div>
                </div>

                {/* Interests Section */}
                <div className="mb-8">
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Interests ({interests.length}/5)
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {PASSIONS_LIST.map((passion) => {
                            const isSelected = interests.includes(passion)
                            return (
                                <button
                                    key={passion}
                                    onClick={() => toggleInterest(passion)}
                                    className={`px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 ${isSelected
                                            ? "border-purple-600 text-purple-600 bg-purple-50"
                                            : "border-gray-300 text-gray-600 hover:border-gray-400"
                                        }`}
                                >
                                    {passion}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </main>
        </div>
    )
}
