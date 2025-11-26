'use client'

import { X, Heart, Star } from 'lucide-react'

interface SwipeActionsProps {
    onLike?: () => void
    onPass?: () => void
    onSuperLike?: () => void
    disabled?: boolean
    className?: string
}

export default function SwipeActions({
    onLike,
    onPass,
    onSuperLike,
    disabled = false,
    className = ''
}: SwipeActionsProps) {
    return (
        <div className={`flex items-center justify-center gap-6 ${className}`}>
            {/* Pass Button */}
            <button
                onClick={onPass}
                disabled={disabled}
                className="action-button action-button-lg action-button-pass"
                aria-label="Pass"
            >
                <X className="w-8 h-8" />
            </button>

            {/* Super Like Button */}
            <button
                onClick={onSuperLike}
                disabled={disabled}
                className="action-button action-button-sm action-button-super"
                aria-label="Super Like"
            >
                <Star className="w-5 h-5 fill-white" />
            </button>

            {/* Like Button */}
            <button
                onClick={onLike}
                disabled={disabled}
                className="action-button action-button-lg action-button-like"
                aria-label="Like"
            >
                <Heart className="w-8 h-8 fill-white" />
            </button>
        </div>
    )
}
