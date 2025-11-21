'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Camera, MapPin, Upload } from 'lucide-react'

export default function Onboarding() {
  const { address, isConnected } = useAccount()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    displayName: '',
    bio: '',
    age: '',
    location: '',
    latitude: null as number | null,
    longitude: null as number | null,
    photos: [] as string[] // URLs
  })

  useEffect(() => {
    if (!isConnected) {
      router.push('/')
    }
  }, [isConnected, router])

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else handleSubmit()
  }

  const handleLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        // Optional: Reverse geocode to get city name
        setFormData(prev => ({ ...prev, latitude, longitude, location: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}` }))
      })
    }
  }

  const handleSubmit = async () => {
    if (!address) return
    setLoading(true)
    
    try {
      // 1. Create Profile
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          wallet_address: address,
          display_name: formData.displayName,
          bio: formData.bio,
          age: parseInt(formData.age),
          location: formData.location,
          latitude: formData.latitude,
          longitude: formData.longitude
        })

      if (profileError) throw profileError

      // 2. Add Photos (Mocking upload for now, assuming URLs provided or skipped)
      // In a real app, we'd upload to Supabase Storage here
      if (formData.photos.length > 0) {
        const photoInserts = formData.photos.map((url, index) => ({
          user_id: address,
          url: url,
          sort_order: index
        }))
        const { error: photoError } = await supabase.from('photos').insert(photoInserts)
        if (photoError) throw photoError
      }

      router.push('/')
    } catch (error) {
      console.error('Onboarding error:', error)
      alert('Failed to create profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-6 text-center">Welcome to ChainMeet</h1>
        
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          {[1, 2, 3].map(i => (
            <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? 'bg-purple-500' : 'bg-gray-700'}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Basic Info</h2>
            <input 
              type="text" 
              placeholder="Display Name" 
              className="glass-input"
              value={formData.displayName}
              onChange={e => setFormData({...formData, displayName: e.target.value})}
            />
            <input 
              type="number" 
              placeholder="Age" 
              className="glass-input"
              value={formData.age}
              onChange={e => setFormData({...formData, age: e.target.value})}
            />
            <textarea 
              placeholder="Bio" 
              className="glass-input h-24"
              value={formData.bio}
              onChange={e => setFormData({...formData, bio: e.target.value})}
            />
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Photos (Min 2)</h2>
            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map(i => (
                <div key={i} className="aspect-square glass-panel flex items-center justify-center cursor-pointer hover:bg-white/5">
                  {formData.photos[i] ? (
                    <img src={formData.photos[i]} alt="Upload" className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Camera className="text-gray-400" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 text-center">Tap to upload (Mocked)</p>
            {/* Mock Button to add photos for testing */}
            <button 
              type="button"
              className="text-sm text-purple-400 underline w-full text-center"
              onClick={() => setFormData(prev => ({...prev, photos: [...prev.photos, `https://picsum.photos/400?random=${Date.now()}`]}))}
            >
              Add Mock Photo
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Location</h2>
            <p className="text-gray-400 text-sm">We use your location to find matches nearby.</p>
            <button 
              onClick={handleLocation}
              className="w-full glass-panel p-4 flex items-center justify-center gap-2 hover:bg-white/5"
            >
              <MapPin className="text-purple-500" />
              {formData.location || "Enable Location"}
            </button>
          </div>
        )}

        <div className="mt-8 flex justify-between">
          {step > 1 && (
            <button onClick={() => setStep(step - 1)} className="text-gray-400">Back</button>
          )}
          <button 
            onClick={handleNext}
            disabled={loading || (step === 2 && formData.photos.length < 2)}
            className="glass-button ml-auto"
          >
            {loading ? 'Saving...' : step === 3 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
