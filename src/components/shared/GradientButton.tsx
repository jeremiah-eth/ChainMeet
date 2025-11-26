'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

export interface GradientButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode
    variant?: 'primary' | 'secondary' | 'accent'
    size?: 'sm' | 'md' | 'lg'
    shape?: 'pill' | 'rounded' | 'circular'
    icon?: LucideIcon
    className?: string
}

export default function GradientButton({
    children,
    variant = 'primary',
    size = 'md',
    shape = 'pill',
    icon: Icon,
    className = '',
    ...props
}: GradientButtonProps) {
    const variantClass = `gradient-button-${variant}`

    const sizeClass = shape === 'circular'
        ? `gradient-button-circular${size !== 'md' ? `-${size}` : ''}`
        : `gradient-button-${size}`

    const shapeClass = `gradient-button-${shape}`

    const classes = [
        'gradient-button',
        variantClass,
        sizeClass,
        shapeClass,
        className
    ].filter(Boolean).join(' ')

    return (
        <button className={classes} {...props}>
            {Icon && <Icon className={children ? "w-5 h-5" : "w-6 h-6"} />}
            {children}
        </button>
    )
}
