import React from 'react'

interface HexagonFrameProps {
    imageUrl: string
    alt: string
    size?: 'sm' | 'md' | 'lg' | 'xl'
    className?: string
}

const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40',
}

export default function HexagonFrame({ imageUrl, alt, size = 'lg', className = '' }: HexagonFrameProps) {
    return (
        <div className={`relative ${sizeClasses[size]} ${className}`}>
            <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                    <clipPath id="hexagon-clip">
                        <polygon points="50 1 95 25 95 75 50 99 5 75 5 25" />
                    </clipPath>
                    <linearGradient id="hexagon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#9333ea" />
                        <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                </defs>

                {/* Gradient border */}
                <polygon
                    points="50 1 95 25 95 75 50 99 5 75 5 25"
                    fill="url(#hexagon-gradient)"
                />

                {/* Inner white border */}
                <polygon
                    points="50 3 93 26 93 74 50 97 7 74 7 26"
                    fill="white"
                />

                {/* Image container */}
                <image
                    href={imageUrl}
                    x="10"
                    y="10"
                    width="80"
                    height="80"
                    clipPath="url(#hexagon-clip)"
                    preserveAspectRatio="xMidYMid slice"
                />
            </svg>

            {/* Verified badge */}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center border-2 border-white">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </div>
        </div>
    )
}
