'use client'

import { useState } from 'react'
import OnboardingCarousel from '@/components/onboarding/OnboardingCarousel'
import AuthOptions from '@/components/onboarding/AuthOptions'
import GenderSelection from '@/components/onboarding/GenderSelection'

type OnboardingStep = 'carousel' | 'auth-options' | 'gender-selection' | 'passions' | 'photos'

export default function Home() {
    const [currentStep, setCurrentStep] = useState<OnboardingStep>('carousel')

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

    const handleGenderSelect = (gender: string) => {
        setRegistrationData(prev => ({ ...prev, gender }))
        setCurrentStep('passions')
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-white p-6">
            {currentStep === 'carousel' && (
                <>
                    <div className="w-full flex-1 flex flex-col items-center justify-center">
                        <OnboardingCarousel slides={slides} />
                    </div>
                    <AuthOptions
                        onCreateAccount={() => setCurrentStep('gender-selection')}
                        onSignIn={() => console.log('Sign in clicked')}
                    />
                </>
            )}

            {currentStep === 'gender-selection' && (
                <GenderSelection
                    onContinue={handleGenderSelect}
                    onBack={() => setCurrentStep('carousel')}
                />
            )}

            {/* Future steps will be added here */}
        </main>
    )
}
