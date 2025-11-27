'use client'

import { useState, useEffect } from 'react'
import { useAppKit } from '@reown/appkit/react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import OnboardingCarousel from '@/components/onboarding/OnboardingCarousel'
import AuthOptions from '@/components/onboarding/AuthOptions'
import GenderSelection from '@/components/onboarding/GenderSelection'
import PassionsSelector from '@/components/onboarding/PassionsSelector'
import PhotoUpload from '@/components/onboarding/PhotoUpload'
import { supabase } from '@/lib/supabase'

type OnboardingStep = 'carousel' | 'auth-options' | 'gender-selection' | 'passions' | 'photos'
type AuthMode = 'create' | 'signin' | null

export default function Home() {
    const [currentStep, setCurrentStep] = useState<OnboardingStep>('carousel')
    const [authMode, setAuthMode] = useState<AuthMode>(null)
    const { open } = useAppKit()
    const { address, isConnected } = useAccount()
    const router = useRouter()

    // Temporary state to hold registration data
    const [registrationData, setRegistrationData] = useState({
        gender: '',
        interests: [] as string[],
        photos: [] as File[]
    })

    const slides = [
        {
            id: 1,
            image: '/onboarding-1.png',
            title: 'Algorithm',
            description: 'Users going through a vetting process to ensure you never match with bots.',
        },
        {
            id: 2,
            image: '/onboarding-2.png',
            title: 'Matches',
            description: 'We match you with people that have a large array of similar interests.',
        },
        {
            id: 3,
            image: '/onboarding-3.png',
            title: 'Premium',
            description: 'Sign up today and enjoy the first month of premium benefits on us.',
        },
    ]

    // Check if user exists when wallet connects
    useEffect(() => {
        const checkUserProfile = async () => {
            if (isConnected && address && authMode) {
                try {
                    const { data: profile, error } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('wallet_address', address.toLowerCase())
                        .single()

                    if (error && error.code !== 'PGRST116') {
                        console.error('Error checking profile:', error)
                        return
                    }

                    if (profile) {
                        // User exists - sign them in
                        console.log('Existing user found:', profile)
                        router.push('/feed')
                    } else if (authMode === 'create') {
                        // New user - start onboarding
                        setCurrentStep('gender-selection')
                    } else {
                        // Sign in but no profile exists
                        alert('No account found. Please create an account first.')
                        setAuthMode(null)
                    }
                } catch (err) {
                    console.error('Error:', err)
                }
            }
        }

        checkUserProfile()
    }, [isConnected, address, authMode, router])

    const handleCreateAccount = () => {
        setAuthMode('create')
        open()
    }

    const handleSignIn = () => {
        setAuthMode('signin')
        open()
    }

    const handleGenderSelect = (gender: string) => {
        setRegistrationData(prev => ({ ...prev, gender }))
        setCurrentStep('passions')
    }

    const handlePassionsSelect = (interests: string[]) => {
        setRegistrationData(prev => ({ ...prev, interests }))
        setCurrentStep('photos')
    }

    const handlePhotosUpload = async (photos: File[]) => {
        setRegistrationData(prev => ({ ...prev, photos }))

        if (!address) {
            alert('Wallet not connected')
            return
        }

        try {
            // Upload photos to Supabase Storage
            const photoUrls: { url: string; sort_order: number }[] = []

            for (let i = 0; i < photos.length; i++) {
                const file = photos[i]
                const fileName = `${address}/${Date.now()}_${i}.jpg`

                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('profile-photos')
                    .upload(fileName, file)

                if (uploadError) {
                    console.error('Upload error:', uploadError)
                    continue
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('profile-photos')
                    .getPublicUrl(fileName)

                photoUrls.push({ url: publicUrl, sort_order: i })
            }

            // Create profile in database
            const { error: insertError } = await supabase
                .from('profiles')
                .insert({
                    wallet_address: address.toLowerCase(),
                    display_name: 'User', // TODO: Add name input
                    age: 25, // TODO: Add age input
                    bio: '', // TODO: Add bio input
                    location: 'Unknown', // TODO: Add location
                    interests: registrationData.interests,
                    photos: photoUrls,
                })

            if (insertError) {
                console.error('Insert error:', insertError)
                alert('Failed to create profile. Please try again.')
                return
            }

            // Navigate to feed
            router.push('/feed')
        } catch (err) {
            console.error('Error creating profile:', err)
            alert('An error occurred. Please try again.')
        }
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-white p-6">
            {currentStep === 'carousel' && (
                <>
                    <div className="w-full flex-1 flex flex-col items-center justify-center">
                        <OnboardingCarousel slides={slides} />
                    </div>
                    <AuthOptions
                        onCreateAccount={handleCreateAccount}
                        onSignIn={handleSignIn}
                    />
                </>
            )}

            {currentStep === 'gender-selection' && (
                <GenderSelection
                    onContinue={handleGenderSelect}
                    onBack={() => setCurrentStep('carousel')}
                />
            )}

            {currentStep === 'passions' && (
                <PassionsSelector
                    onContinue={handlePassionsSelect}
                    onBack={() => setCurrentStep('gender-selection')}
                />
            )}

            {currentStep === 'photos' && (
                <PhotoUpload
                    onContinue={handlePhotosUpload}
                    onBack={() => setCurrentStep('passions')}
                />
            )}
        </main>
    )
}
