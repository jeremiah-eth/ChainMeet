'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface GenderSelectionProps {
    onContinue: (gender: string) => void
    onBack: () => void
}

export default function GenderSelection({ onContinue, onBack }: GenderSelectionProps) {
    const [selectedGender, setSelectedGender] = useState<string | null>(null)

    const genders = [
        { id: 'woman', label: 'Woman' },
        { id: 'man', label: 'Man' },
        { id: 'non-binary', label: 'Non-binary' },
    ]

    return (
        <div className="flex flex-col h-full w-full max-w-md mx-auto p-6 animate-fade-in">
            <div className="flex-1">
                <button
                    onClick={onBack}
                    className="mb-8 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    ← Back
                </button>

                <h1 className="text-4xl font-bold mb-12 text-gray-900">I am a</h1>

                <div className="space-y-4">
                    {genders.map((gender) => (
                        <button
                            key={gender.id}
                            onClick={() => setSelectedGender(gender.id)}
                            className={cn(
                                "w-full p-4 text-left text-lg font-medium rounded-2xl border-2 transition-all duration-200 flex justify-between items-center",
                                selectedGender === gender.id
                                    ? "border-purple-600 text-purple-600 bg-purple-50"
                                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                            )}
                        >
                            {gender.label}
                            {selectedGender === gender.id && (
                                <Check className="w-5 h-5 text-purple-600" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="pb-8">
                <Button
                    variant="default"
                    size="lg"
                    fullWidth
                    disabled={!selectedGender}
                    onClick={() => selectedGender && onContinue(selectedGender)}
                    className="bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Continue
                </Button>
            </div>
        </div>
    )
}
