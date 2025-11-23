'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAccount, useSignMessage } from 'wagmi'
import { supabase } from '@/lib/supabase'
import { PhotoUploader } from '@/components/onboarding/PhotoUploader'
import { InterestSelector } from '@/components/onboarding/InterestSelector'
import { generateVerificationMessage } from '@/lib/auth'

export default function Onboarding() {
  const router = useRouter()
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    displayName: '',
    age: '',
    bio: '',
    location: '',
    photos: [] as string[],
    interests: [] as string[]
  })

  useEffect(() => {
    if (!address) {
      router.push('/')
    }
  }, [address, router])

  const handleNext = () => {
    setStep(prev => prev + 1)
  }

  const handleBack = () => {
    setStep(prev => prev - 1)
  }

  const handleSubmit = async () => {
    if (!address) return
    setLoading(true)

    try {
      // Verify wallet ownership
      const message = generateVerificationMessage(address)
      const signature = await signMessageAsync({ message })

      // Create profile
      const { error } = await supabase
        .from('profiles')
        .upsert({
          wallet_address: address,
          display_name: formData.displayName,
          age: parseInt(formData.age),
          bio: formData.bio,
          location: formData.location,
          interests: formData.interests,
          is_verified: true
        })

      if (error) throw error

      // Save photos
      if (formData.photos.length > 0) {
        const photosData = formData.photos.map((url, index) => ({
          user_id: address,
          url,
          sort_order: index
        }))

        const { error: photosError } = await supabase
          .from('photos')
          .insert(photosData)

        if (photosError) throw photosError
      }

      router.push('/feed')
    } catch (error) {
      console.error('Error creating profile:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white p-6">
      <div className="max-w-md mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            Create Profile
          </h1>
          <p className="text-gray-400">Step {step} of 3</p>
        </div>

        <div className="glass-panel p-6 space-y-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Display Name</label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={e => setFormData({ ...formData, displayName: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                  placeholder="CryptoKing"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={e => setFormData({ ...formData, age: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
                  placeholder="25"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  value={formData.bio}
                  onChange={e => setFormData({ ...formData, bio: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 h-24"
                  placeholder="Tell us about yourself..."
                />
              </div>
              <button
                onClick={handleNext}
                disabled={!formData.displayName || !formData.age}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Add Photos</h3>
              {address && (
                <PhotoUploader
                  userId={address}
                  onPhotosChange={photos => setFormData({ ...formData, photos })}
                  maxPhotos={1}
                />
              )}
              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 bg-white/10 py-3 rounded-lg font-bold hover:bg-white/20"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={formData.photos.length === 0}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Select Interests</h3>
              <InterestSelector
                selectedInterests={formData.interests}
                onChange={interests => setFormData({ ...formData, interests })}
              />
              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  className="flex-1 bg-white/10 py-3 rounded-lg font-bold hover:bg-white/20"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={loading || formData.interests.length === 0}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? 'Creating Profile...' : 'Complete Profile'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
