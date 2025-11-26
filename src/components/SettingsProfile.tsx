'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { supabase } from '@/lib/supabase'
import { Camera, X, Upload, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface Photo {
    url: string
    sort_order: number
}

interface Profile {
    display_name: string | null
    bio: string | null
    age: number | null
    location: string | null
    gender: string | null
    interests: string[] | null
    photos: Photo[]
}

export default function SettingsProfile() {
    const { address } = useAccount()
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        displayName: '',
        bio: '',
        age: '',
        location: '',
        gender: '',
        interests: [] as string[],
        photos: [] as string[]
    })
    const [currentInterest, setCurrentInterest] = useState('')

    useEffect(() => {
        fetchProfile()
    }, [address])

    const fetchProfile = async () => {
        if (!address) return

        try {
            const { data } = await supabase
                .from('profiles')
                .select(`
          *,
          photos(url, sort_order)
        `)
                .eq('wallet_address', address)
                .single()

            const profile = data as unknown as Profile

            if (profile) {
                setFormData({
                    displayName: profile.display_name || '',
                    bio: profile.bio || '',
                    age: profile.age?.toString() || '',
                    location: profile.location || '',
                    gender: profile.gender || '',
                    interests: profile.interests || [],
                    photos: profile.photos?.sort((a, b) => a.sort_order - b.sort_order).map(p => p.url) || []
                })
            }
        } catch (error) {
            console.error('Error fetching profile:', error)
        }
    }

    const addInterest = () => {
        if (currentInterest.trim() && formData.interests.length < 10) {
            setFormData(prev => ({
                ...prev,
                interests: [...prev.interests, currentInterest.trim()]
            }))
            setCurrentInterest('')
        }
    }

    const removeInterest = (index: number) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.filter((_, i) => i !== index)
        }))
    }

    const addMockPhoto = () => {
        if (formData.photos.length < 4) {
            setFormData(prev => ({
                ...prev,
                photos: [...prev.photos, `https://picsum.photos/400?random=${Date.now()}`]
            }))
        }
    }

    const removePhoto = (index: number) => {
        setFormData(prev => ({
            ...prev,
            photos: prev.photos.filter((_, i) => i !== index)
        }))
    }

    const handleSave = async () => {
        if (!address) return
        if (formData.photos.length < 2) {
            alert('Please add at least 2 photos')
            return
        }

        setLoading(true)

        try {
            const { error: profileError } = await supabase
                .from('profiles')
                .update({
                    display_name: formData.displayName,
                    bio: formData.bio,
                    age: parseInt(formData.age),
                    location: formData.location,
                    gender: formData.gender,
                    interests: formData.interests
                })
                .eq('wallet_address', address)

            if (profileError) throw profileError

            // Delete existing photos
            await supabase
                .from('photos')
                .delete()
                .eq('user_id', address)

            // Insert new photos
            if (formData.photos.length > 0) {
                const photoInserts = formData.photos.map((url, index) => ({
                    user_id: address,
                    url: url,
                    sort_order: index
                }))
                const { error: photoError } = await supabase.from('photos').insert(photoInserts)
                if (photoError) throw photoError
            }

            alert('Profile updated successfully!')
        } catch (error) {
            console.error('Error updating profile:', error)
            alert('Failed to update profile. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-24">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold text-gradient">Edit Profile</h2>
                <button
                    onClick={handleSave}
                    disabled={loading || formData.photos.length < 2}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-full text-white font-semibold shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {/* Photos */}
            <div className="glass-panel p-6 space-y-4 rounded-3xl">
                <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">Photos</h3>
                    <span className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full">Min 2 • Max 4</span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map(i => (
                        <div key={i} className="aspect-[3/4] glass-panel rounded-2xl flex items-center justify-center relative overflow-hidden group border-2 border-dashed border-white/10 hover:border-purple-500/50 transition-colors">
                            {formData.photos[i] ? (
                                <>
                                    <img src={formData.photos[i]} alt="Upload" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            onClick={() => removePhoto(i)}
                                            className="bg-red-500 rounded-full p-2 text-white hover:scale-110 transition-transform"
                                        >
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                    <div className="absolute bottom-2 left-2 bg-black/60 px-2 py-1 rounded text-xs text-white font-mono">
                                        #{i + 1}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center p-4">
                                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-2 text-gray-400 group-hover:text-purple-400 group-hover:bg-purple-500/10 transition-colors">
                                        <Camera className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs text-gray-500">Tap to upload</span>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    className="w-full py-3 rounded-xl border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium text-gray-300 flex items-center justify-center gap-2"
                    onClick={addMockPhoto}
                    disabled={formData.photos.length >= 4}
                >
                    <Upload className="w-4 h-4" />
                    Add Mock Photo
                </button>
            </div>

            {/* Basic Info */}
            <div className="glass-panel p-6 space-y-6 rounded-3xl">
                <h3 className="text-xl font-bold text-white">Basic Info</h3>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-gray-400 ml-2 mb-1 block">Display Name</label>
                        <input
                            type="text"
                            placeholder="Your name"
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                            value={formData.displayName}
                            onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-gray-400 ml-2 mb-1 block">Age</label>
                            <input
                                type="number"
                                placeholder="18+"
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                value={formData.age}
                                onChange={e => setFormData({ ...formData, age: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-400 ml-2 mb-1 block">Gender</label>
                            <select
                                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all appearance-none"
                                value={formData.gender}
                                onChange={e => setFormData({ ...formData, gender: e.target.value })}
                            >
                                <option value="" className="bg-gray-900">Select Gender</option>
                                <option value="male" className="bg-gray-900">Male</option>
                                <option value="female" className="bg-gray-900">Female</option>
                                <option value="other" className="bg-gray-900">Other</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs text-gray-400 ml-2 mb-1 block">Bio</label>
                        <textarea
                            placeholder="Tell us about yourself..."
                            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all h-32 resize-none"
                            value={formData.bio}
                            onChange={e => setFormData({ ...formData, bio: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            {/* Interests */}
            <div className="glass-panel p-6 space-y-6 rounded-3xl">
                <h3 className="text-xl font-bold text-white">Interests</h3>

                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Add an interest (e.g. Crypto, Hiking)"
                        className="flex-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                        value={currentInterest}
                        onChange={e => setCurrentInterest(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                    />
                    <button
                        type="button"
                        onClick={addInterest}
                        className="bg-white/10 hover:bg-white/20 text-white px-6 rounded-xl font-medium transition-colors"
                    >
                        Add
                    </button>
                </div>

                <div className="flex flex-wrap gap-2">
                    {formData.interests.map((interest, i) => (
                        <span key={i} className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-white px-4 py-2 rounded-full text-sm flex items-center gap-2 group hover:border-purple-500/50 transition-all">
                            {interest}
                            <button
                                onClick={() => removeInterest(i)}
                                className="hover:text-red-400 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </span>
                    ))}
                    {formData.interests.length === 0 && (
                        <p className="text-gray-500 text-sm italic">No interests added yet</p>
                    )}
                </div>
            </div>
        </div>
    )
}
