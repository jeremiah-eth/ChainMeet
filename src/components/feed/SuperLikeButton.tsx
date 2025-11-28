import React from 'react'
import { Star } from 'lucide-react'

interface SuperLikeButtonProps {
    onClick: () => void
    disabled?: boolean
    className?: string
}

export default function SuperLikeButton({ onClick, disabled = false, className = '' }: SuperLikeButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`relative group ${className}`}
        >
            <div className="relative w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100">
                <Star className="w-8 h-8 text-white fill-white animate-pulse" />

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300" />
            </div>

            {/* Label */}
            <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-blue-600 whitespace-nowrap">
                SUPER LIKE
            </span>
        </button>
    )
}
