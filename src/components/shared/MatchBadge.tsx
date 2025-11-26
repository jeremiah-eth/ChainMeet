'use client'

import { Sparkles } from 'lucide-react'

export interface MatchBadgeProps {
    percentage: number
    size?: 'sm' | 'md' | 'lg'
    showIcon?: boolean
    className?: string
}

export default function MatchBadge({
    percentage,
    size = 'md',
    showIcon = true,
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

    const classes = [
        'match-badge',
        sizeClass,
        variantClass,
        className
    ].filter(Boolean).join(' ')

    return (
        <div className={classes}>
            {showIcon && <Sparkles />}
            <span>{percentage}%</span>
        </div>
    )
}
