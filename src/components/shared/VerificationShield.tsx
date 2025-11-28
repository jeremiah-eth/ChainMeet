import React from 'react'
import { Shield } from 'lucide-react'

interface VerificationShieldProps {
    attributes?: Array<{
        type: 'age' | 'asset'
        threshold: string
    }>
    size?: 'sm' | 'md'
    className?: string
}

export default function VerificationShield({ attributes, size = 'md', className = '' }: VerificationShieldProps) {
    if (!attributes || attributes.length === 0) return null

    const sizeClasses = {
        sm: 'w-5 h-5',
        md: 'w-6 h-6',
    }

    return (
        <div className={`inline-flex items-center gap-1 ${className}`}>
            {attributes.map((attr, index) => (
                <div
                    key={index}
                    className={`${sizeClasses[size]} bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center border-2 border-white shadow-sm`}
                    title={`Verified: ${attr.type === 'age' ? '18+' : `${attr.threshold}+ ETH`}`}
                >
                    <Shield className={`${size === 'sm' ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-white`} />
                </div>
            ))}
        </div>
    )
}
