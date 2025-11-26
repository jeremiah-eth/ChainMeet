'use client'

import { useState } from 'react'
import { X, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface FilterModalProps {
    isOpen: boolean
    onClose: () => void
    onApply: (filters: FilterSettings) => void
}

export interface FilterSettings {
    ageRange: [number, number]
    maxDistance: number
    interests: string[]
}

export default function FilterModal({ isOpen, onClose, onApply }: FilterModalProps) {
    const [ageRange, setAgeRange] = useState<[number, number]>([18, 35])
    const [maxDistance, setMaxDistance] = useState(50)

    if (!isOpen) return null

    const handleApply = () => {
        onApply({
            ageRange,
            maxDistance,
            interests: []
        })
        onClose()
    }

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end md:items-center justify-center animate-fade-in">
            <div className="bg-white w-full max-w-md rounded-t-3xl md:rounded-3xl p-6 animate-slide-up">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <SlidersHorizontal className="w-5 h-5 text-gray-900" />
                        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Age Range */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Age Range: {ageRange[0]} - {ageRange[1]}
                    </label>
                    <div className="flex gap-4">
                        <input
                            type="range"
                            min="18"
                            max="100"
                            value={ageRange[0]}
                            onChange={(e) => setAgeRange([parseInt(e.target.value), ageRange[1]])}
                            className="flex-1"
                        />
                        <input
                            type="range"
                            min="18"
                            max="100"
                            value={ageRange[1]}
                            onChange={(e) => setAgeRange([ageRange[0], parseInt(e.target.value)])}
                            className="flex-1"
                        />
                    </div>
                </div>

                {/* Distance */}
                <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                        Maximum Distance: {maxDistance} km
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={maxDistance}
                        onChange={(e) => setMaxDistance(parseInt(e.target.value))}
                        className="w-full"
                    />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8">
                    <Button
                        variant="outline"
                        size="lg"
                        fullWidth
                        onClick={onClose}
                        className="border-2 border-gray-200"
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="default"
                        size="lg"
                        fullWidth
                        onClick={handleApply}
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        Apply Filters
                    </Button>
                </div>
            </div>
        </div>
    )
}
