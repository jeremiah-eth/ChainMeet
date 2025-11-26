'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface PassionsSelectorProps {
    onContinue: (interests: string[]) => void
    onBack: () => void
}

const PASSIONS_LIST = [
    'Harry Potter', '90s Kid', 'SoundCloud', 'Spa', 'Self Care',
    'Heavy Metal', 'House Parties', 'Gin Tonic', 'Gymnastics', 'Ludo',
    'Maggi', 'Hot Yoga', 'Biryani', 'Meditation', 'Sushi',
    'Spotify', 'Hockey', 'Basketball', 'Slam Poetry', 'Home Workout',
    'Theater', 'Cafe Hopping', 'Aquarium', 'Sneakers', 'Instagram',
    'Hot Springs', 'Walking', 'Running', 'Travel', 'Language Exchange',
    'Movies', 'Guitarists', 'Social Development', 'Gym', 'Social Media'
]

export default function PassionsSelector({ onContinue, onBack }: PassionsSelectorProps) {
    const [selectedPassions, setSelectedPassions] = useState<string[]>([])

    const togglePassion = (passion: string) => {
        if (selectedPassions.includes(passion)) {
            setSelectedPassions(prev => prev.filter(p => p !== passion))
        } else {
            if (selectedPassions.length < 5) {
                setSelectedPassions(prev => [...prev, passion])
            }
        }
    }

    return (
        <div className="flex flex-col h-full w-full max-w-md mx-auto p-6 animate-fade-in">
            <div className="flex-1 overflow-y-auto pb-20 scrollbar-hide">
                <button
                    onClick={onBack}
                    className="mb-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    ← Back
                </button>

                <h1 className="text-4xl font-bold mb-2 text-gray-900">Passions</h1>
                <p className="text-gray-500 mb-8">
                    Let everyone know what you're passionate about by adding it to your profile.
                </p>

                <div className="flex flex-wrap gap-3">
                    {PASSIONS_LIST.map((passion) => {
                        const isSelected = selectedPassions.includes(passion)
                        return (
                            <button
                                key={passion}
                                onClick={() => togglePassion(passion)}
                                className={cn(
                                    "px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200",
                                    isSelected
                                        ? "border-purple-600 text-purple-600 bg-purple-50"
                                        : "border-gray-300 text-gray-600 hover:border-gray-400"
                                )}
                            >
                                {passion}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 md:static md:border-0">
                <div className="max-w-md mx-auto">
                    <Button
                        variant="default"
                        size="lg"
                        fullWidth
                        disabled={selectedPassions.length === 0}
                        onClick={() => onContinue(selectedPassions)}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continue ({selectedPassions.length}/5)
                    </Button>
                </div>
            </div>
        </div>
    )
}
