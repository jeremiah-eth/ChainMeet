'use client'

import { useState } from 'react'
import OnboardingCarousel from '@/components/onboarding/OnboardingCarousel'
import { Button } from '@/components/ui/Button'

export default function Home() {
    const [showAuth, setShowAuth] = useState(false)

    const slides = [
        {
            id: 1,
            image: '/onboarding-1.png', // Placeholder
            title: 'Algorithm',
            description: 'Users going through a vetting process to ensure you never match with bots.',
        },
        {
            id: 2,
            image: '/onboarding-2.png', // Placeholder
            title: 'Matches',
            description: 'We match you with people that have a large array of similar interests.',
        },
        {
            id: 3,
            image: '/onboarding-3.png', // Placeholder
            title: 'Premium',
            description: 'Sign up today and enjoy the first month of premium benefits on us.',
        },
    ]

    return (
        <main className="flex min-h-screen flex-col items-center justify-between bg-white p-6">
            <div className="w-full flex-1 flex flex-col items-center justify-center">
                <OnboardingCarousel slides={slides} />
            </div>

            <div className="w-full max-w-xs space-y-4 mb-8">
                <Button
                    variant="default"
                    size="lg"
                    fullWidth
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full"
                    onClick={() => setShowAuth(true)}
                >
                    Create an account
                </Button>
                <div className="text-center">
                    <span className="text-gray-500 text-sm">Already have an account? </span>
                    <button className="text-purple-600 font-bold text-sm hover:underline">
                        Sign In
                    </button>
                </div>
            </div>
        </main>
    )
}
