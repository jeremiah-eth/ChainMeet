'use client'

import { Sparkles } from 'lucide-react'

export interface MatchBadgeProps {
    percentage: number
    size?: 'sm' | 'md' | 'lg'
    showIcon?: boolean
    animated?: boolean
    className?: string
}

export default function MatchBadge({
    percentage,
    size = 'md',
    showIcon = true,
    animated = true,
    className = ''
}: MatchBadgeProps) {
    const getBadgeVariant = (score: number) => {
        if (score >= 90) return 'match-badge-perfect'
        if (score >= 75) return 'match-badge-high'
        if (score >= 50) return 'match-badge-medium'
        return 'match-badge-low'
    }

    const sizeClass = size !== 'md' ? `match-badge-${size}` : ''
    const variantClass = getBadgeVariant(percentage)
    const animationClass = animated ? 'animate-scale-in' : ''

    const classes = [
        'match-badge',
        sizeClass,
        variantClass,
        animationClass,
        className
    ].filter(Boolean).join(' ')

    return (
        <div className={classes}>
            {showIcon && <Sparkles className={percentage >= 90 ? "animate-pulse" : ""} />}
            <span>{percentage}%</span>
        </div>
    )
}
