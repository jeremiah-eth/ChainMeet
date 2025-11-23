'use client'

import { useState, useEffect } from 'react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Camera, MapPin, Upload, X } from 'lucide-react'

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
    gender: '',
    interests: [] as string[],
    photos: [] as string[]
  })

  const [currentInterest, setCurrentInterest] = useState('')

  useEffect(() => {
    if (!isConnected) {
      router.push('/')
    }
  }, [isConnected, router])

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else handleSubmit()
  }

  const canProceed = () => {
    if (step === 1) return formData.displayName && formData.age && formData.bio
    if (step === 2) return formData.photos.length >= 2
    if (step === 3) return formData.latitude !== null && formData.longitude !== null
    return false
  }

  const handleLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        setFormData(prev => ({
          ...prev,
          latitude,
          longitude,
          location: `${latitude.toFixed(2)}, ${longitude.toFixed(2)}`
        }))
      }, (error) => {
        alert('Unable to get location. Please enable location services.')
      })
    } else {
      alert('Geolocation is not supported by your browser.')
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

  const handleSubmit = async () => {
    if (!address) return
    setLoading(true)

    try {
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          wallet_address: address,
          display_name: formData.displayName,
          bio: formData.bio,
          age: parseInt(formData.age),
          location: formData.location,
          latitude: formData.latitude,
          longitude: formData.longitude,
                < div key = { i } className = "aspect-square glass-panel flex items-center justify-center relative overflow-hidden" >
        {
          formData.photos[i] ? (
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
          )
        }
                </div >
              ))
}
            </div >
            <p className="text-xs text-gray-400 text-center">Upload feature coming soon. Using mock photos for now.</p>
            <button
              type="button"
              className="glass-button w-full"
              onClick={addMockPhoto}
              disabled={formData.photos.length >= 4}
            >
              <Upload className="w-4 h-4 inline mr-2" />
              Add Mock Photo
            </button>
          </div >
        )}

{
  step === 3 && (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Location</h2>
      <p className="text-gray-400 text-sm">We use your location to find matches nearby.</p>
      <button
        onClick={handleLocation}
        className={`w-full glass-panel p-4 flex items-center justify-center gap-2 hover:bg-white/5 transition-colors ${formData.latitude ? 'border-purple-500' : ''}`}
      >
        <MapPin className={formData.latitude ? "text-purple-500" : "text-gray-400"} />
        <span>{formData.location || "Enable Location"}</span>
      </button>
      {formData.latitude && (
        <p className="text-xs text-green-400 text-center">✓ Location enabled</p>
      )}
    </div>
  )
}

<div className="mt-8 flex justify-between items-center">
  {step > 1 && (
    <button
      onClick={() => setStep(step - 1)}
      className="text-gray-400 hover:text-white transition-colors"
    >
      Back
    </button>
  )}
  <button
    onClick={handleNext}
    disabled={loading || !canProceed()}
    className="glass-button ml-auto"
  >
    {loading ? 'Saving...' : step === 3 ? 'Finish' : 'Next'}
  </button>
</div>
      </div >
    </div >
  )
}
