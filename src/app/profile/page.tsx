'use client'

import BottomNav from '@/components/layout/BottomNav'
import UserProfile from '@/components/profile/UserProfile'
import EditProfile from '@/components/profile/EditProfile'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Profile } from '@/types/profile'

export default function ProfilePage() {
    const { address, isConnected } = useAccount()
    const router = useRouter()
    const [profile, setProfile] = useState<Profile | null>(null)
    const [loading, setLoading] = useState(true)
    const [isEditing, setIsEditing] = useState(false)

    useEffect(() => {
        if (!isConnected) {
            router.push('/')
            return
        }

        const fetchProfile = async () => {
            if (!address) return

            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*, photos(*)')
                    .eq('wallet_address', address.toLowerCase())
                    .single()

                if (error) throw error

                if (data) {
                    // Transform photos to match Profile interface
                    const formattedProfile: Profile = {
                        ...data,
                        photos: data.photos?.sort((a: any, b: any) => a.sort_order - b.sort_order) || []
                    }
                    setProfile(formattedProfile)
                }
            } catch (error) {
                console.error('Error fetching profile:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [isConnected, address, router])

    const handleSaveProfile = async (updatedData: Partial<Profile>) => {
        if (!address || !profile) return

        try {
            const { error } = await supabase
                .from('profiles')
                .update({
                    display_name: updatedData.display_name,
                    age: updatedData.age,
                    bio: updatedData.bio,
                    location: updatedData.location,
                    interests: updatedData.interests
                })
                .eq('wallet_address', address.toLowerCase())

            if (error) throw error

            setProfile(prev => prev ? { ...prev, ...updatedData } : null)
            setIsEditing(false)
        } catch (error) {
            console.error('Error updating profile:', error)
            alert('Failed to update profile. Please try again.')
        }
    }

    if (!isConnected || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
            </div>
        )
    }

    if (!profile) {
        return null // Or show error/empty state
    }

    return (
        <div className="min-h-screen pb-20 bg-white">
            {isEditing ? (
                <EditProfile
                    profile={profile}
                    onSave={handleSaveProfile}
                    onClose={() => setIsEditing(false)}
                />
            ) : (
                <UserProfile
                    profile={profile}
                    onEdit={() => setIsEditing(true)}
                    onSettings={() => console.log('Settings')}
                />
            )}
            <BottomNav />
        </div>
    )
}
