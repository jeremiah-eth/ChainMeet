'use client'

import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

export interface PillTagProps {
    children: ReactNode
    size?: 'sm' | 'md' | 'lg'
    color?: 'purple' | 'pink' | 'yellow' | 'green' | 'default'
    icon?: LucideIcon
    iconPosition?: 'left' | 'right'
    clickable?: boolean
    selected?: boolean
    onClick?: () => void
    className?: string
}

export default function PillTag({
    children,
    size = 'md',
    color = 'default',
    icon: Icon,
    iconPosition = 'left',
    clickable = false,
    selected = false,
    onClick,
    className = ''
}: PillTagProps) {
    const sizeClass = {
        sm: 'pill-tag-sm',
        md: 'pill-tag-md',
        lg: 'pill-tag-lg'
    }[size]

    const colorClass = color !== 'default' ? `pill-tag-${color}` : ''

    const interactiveClass = clickable ? 'pill-tag-clickable' : ''
    const selectedClass = selected ? 'pill-tag-selected' : ''

    const classes = [
        'pill-tag',
        sizeClass,
        colorClass,
        interactiveClass,
        selectedClass,
        className
    ].filter(Boolean).join(' ')

    return (
        <span
            className={classes}
            onClick={clickable ? onClick : undefined}
            role={clickable ? 'button' : undefined}
            tabIndex={clickable ? 0 : undefined}
        >
            {Icon && iconPosition === 'left' && <Icon />}
            {children}
            {Icon && iconPosition === 'right' && <Icon />}
        </span>
    )
}
