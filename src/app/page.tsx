'use client'

import { useState } from 'react'
import OnboardingCarousel from '@/components/onboarding/OnboardingCarousel'
import AuthOptions from '@/components/onboarding/AuthOptions'
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

    'use client'

    import { useState } from 'react'
    import OnboardingCarousel from '@/components/onboarding/OnboardingCarousel'
    import { Button } from '@/components/ui/Button'
    import AuthOptions from '@/components/auth/AuthOptions'

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

                <AuthOptions
                    onCreateAccount={() => setShowAuth(true)}
                    onSignIn={() => console.log('Sign in clicked')}
                />
            </main>
        )
    }
