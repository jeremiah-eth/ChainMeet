'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { supabase } from '@/lib/supabase'
import { Camera, X, Upload, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'

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
            const { data: profile } = await supabase
                .from('profiles')
                .select(`
          *,
          photos(url, sort_order)
        `)
                .eq('wallet_address', address)
                .single()

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
        <div className="max-w-2xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Edit Profile</h2>
                <button
                    onClick={handleSave}
                    disabled={loading || formData.photos.length < 2}
                    className="glass-button flex items-center gap-2"
                >
                    <Save className="w-4 h-4" />
                    {loading ? 'Saving...' : 'Save Changes'}
                </button>
            </div>

            {/* Photos */}
            <div className="glass-panel p-6 space-y-4">
                <h3 className="text-lg font-semibold">Photos (Min 2, Max 4)</h3>
                <div className="grid grid-cols-2 gap-4">
                    {[0, 1, 2, 3].map(i => (
                        <div key={i} className="aspect-square glass-panel flex items-center justify-center relative overflow-hidden">
                            {formData.photos[i] ? (
                                <>
                                    <img src={formData.photos[i]} alt="Upload" className="w-full h-full object-cover rounded-lg" />
                                    <button
                                        onClick={() => removePhoto(i)}
                                        className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </>
                            ) : (
                                <Camera className="text-gray-400" />
                            )}
                        </div>
                    ))}
                </div>
                <button
                    type="button"
                    className="glass-button w-full"
                    onClick={addMockPhoto}
                    disabled={formData.photos.length >= 4}
                >
                    <Upload className="w-4 h-4 inline mr-2" />
                    Add Mock Photo
                </button>
            </div>

            {/* Basic Info */}
            <div className="glass-panel p-6 space-y-4">
                <h3 className="text-lg font-semibold">Basic Info</h3>
                <input
                    type="text"
                    placeholder="Display Name"
                    className="glass-input"
                    value={formData.displayName}
                    onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Age"
                    className="glass-input"
                    value={formData.age}
                    onChange={e => setFormData({ ...formData, age: e.target.value })}
                />
                <select
                    className="glass-input"
                    value={formData.gender}
                    onChange={e => setFormData({ ...formData, gender: e.target.value })}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                <textarea
                    placeholder="Bio"
                    className="glass-input h-24"
                    value={formData.bio}
                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                />
            </div>

            {/* Interests */}
            <div className="glass-panel p-6 space-y-4">
                <h3 className="text-lg font-semibold">Interests</h3>
                <div className="flex gap-2">
                    <input
                        type="text"
                        placeholder="Add interests"
                        className="glass-input"
                        value={currentInterest}
                        onChange={e => setCurrentInterest(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                    />
                    <button
                        type="button"
                        onClick={addInterest}
                        className="glass-button px-4"
                    >
                        Add
                    </button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {formData.interests.map((interest, i) => (
                        <span key={i} className="glass-panel px-3 py-1 text-sm flex items-center gap-2">
                            {interest}
                            <X className="w-3 h-3 cursor-pointer" onClick={() => removeInterest(i)} />
                        </span>
                    ))}
                </div>
            </div>
        </div>
    )
}
