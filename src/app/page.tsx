'use client'

import { useState } from 'react'
import { useAppKit } from '@reown/appkit/react'
import OnboardingCarousel from '@/components/onboarding/OnboardingCarousel'
import AuthOptions from '@/components/onboarding/AuthOptions'
import GenderSelection from '@/components/onboarding/GenderSelection'
import PassionsSelector from '@/components/onboarding/PassionsSelector'
import PhotoUpload from '@/components/onboarding/PhotoUpload'

type OnboardingStep = 'carousel' | 'auth-options' | 'gender-selection' | 'passions' | 'photos'

export default function Home() {
    const [currentStep, setCurrentStep] = useState<OnboardingStep>('carousel')
    const { open } = useAppKit()

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

    const handleWalletConnect = () => {
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

    const handlePhotosUpload = (photos: File[]) => {
        setRegistrationData(prev => ({ ...prev, photos }))
        // TODO: Navigate to main app or complete registration
        console.log('Registration complete:', { ...registrationData, photos })
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-white p-6">
            {currentStep === 'carousel' && (
                <>
                    <div className="w-full flex-1 flex flex-col items-center justify-center">
                        <OnboardingCarousel slides={slides} />
                    </div>
                    <AuthOptions
                        onCreateAccount={handleWalletConnect}
                        onSignIn={handleWalletConnect}
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
