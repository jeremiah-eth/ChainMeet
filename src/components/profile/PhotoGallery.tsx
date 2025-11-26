'use client'

import { useState } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface PhotoGalleryProps {
    photos: { url: string; sort_order: number }[]
    initialIndex?: number
    onClose: () => void
}

export default function PhotoGallery({ photos, initialIndex = 0, onClose }: PhotoGalleryProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex)

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1))
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0))
    }

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors z-10"
            >
                <X className="w-6 h-6 text-white" />
            </button>

            {/* Photo Counter */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full z-10">
                <span className="text-white font-medium">
                    {currentIndex + 1} / {photos.length}
                </span>
            </div>

            {/* Navigation Buttons */}
            {photos.length > 1 && (
                <>
                    <button
                        onClick={goToPrevious}
                        className="absolute left-4 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors z-10"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute right-4 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors z-10"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>
                </>
            )}

            {/* Photo */}
            <div className="w-full h-full flex items-center justify-center p-4">
                <img
                    src={photos[currentIndex]?.url}
                    alt={`Photo ${currentIndex + 1}`}
                    className="max-w-full max-h-full object-contain"
                />
            </div>

            {/* Dot Indicators */}
            {photos.length > 1 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                    {photos.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                                    ? 'w-8 bg-white'
                                    : 'bg-white/50 hover:bg-white/75'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
