'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

interface OnboardingSlide {
    id: number
    image: string
    title: string
    description: string
}

interface OnboardingCarouselProps {
    slides: OnboardingSlide[]
    onComplete?: () => void
}

export default function OnboardingCarousel({ slides, onComplete }: OnboardingCarouselProps) {
    const [activeIndex, setActiveIndex] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)

    const handleScroll = () => {
        if (scrollRef.current) {
            const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth)
            setActiveIndex(index)
        }
    }

    const scrollTo = (index: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                left: index * scrollRef.current.clientWidth,
                behavior: 'smooth'
            })
        }
    }

    return (
        <div className="flex flex-col h-full w-full relative">
            {/* Carousel Container */}
            <div
                ref={scrollRef}
                onScroll={handleScroll}
                className="flex-1 flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {slides.map((slide) => (
                    <div
                        key={slide.id}
                        className="min-w-full h-full flex flex-col items-center justify-center p-8 snap-center"
                    >
                        <div className="w-full max-w-xs aspect-square bg-gray-100 rounded-3xl mb-12 flex items-center justify-center overflow-hidden">
                            {/* Placeholder for actual image */}
                            <img
                                src={slide.image}
                                alt={slide.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
                            {slide.title}
                        </h2>
                        <p className="text-gray-500 text-center text-lg leading-relaxed max-w-xs">
                            {slide.description}
                        </p>
                    </div>
                ))}
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 pb-8">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollTo(index)}
                        className={cn(
                            "w-2 h-2 rounded-full transition-all duration-300",
                            activeIndex === index
                                ? "w-8 bg-purple-600"
                                : "bg-gray-300 hover:bg-gray-400"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}
