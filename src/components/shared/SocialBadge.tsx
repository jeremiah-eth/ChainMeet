import React from 'react'

interface SocialBadgeProps {
    platform: 'ens' | 'farcaster' | 'lens'
    handle?: string
    className?: string
}

export default function SocialBadge({ platform, handle, className = '' }: SocialBadgeProps) {
    const badges = {
        ens: {
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18c-3.87-.96-7-5.54-7-10V8.3l7-3.5 7 3.5V10c0 4.46-3.13 9.04-7 10z" />
                    <path d="M8 10h2v6H8zm3-2h2v8h-2zm3 4h2v4h-2z" />
                </svg>
            ),
            color: 'bg-blue-500',
            label: handle || 'ENS',
        },
        farcaster: {
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.66 6.98a9.932 9.932 0 0 0-3.641-3.64C15.486 2.447 13.813 2 12 2s-3.486.447-5.02 1.34c-1.533.893-2.747 2.107-3.64 3.64S2 10.187 2 12s.446 3.487 1.34 5.02a9.924 9.924 0 0 0 3.641 3.64C8.514 21.553 10.187 22 12 22s3.486-.447 5.02-1.34a9.932 9.932 0 0 0 3.641-3.64C21.554 15.487 22 13.813 22 12s-.446-3.487-1.34-5.02zM12 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8z" />
                    <circle cx="12" cy="12" r="3" />
                </svg>
            ),
            color: 'bg-purple-600',
            label: handle || 'Farcaster',
        },
        lens: {
            icon: (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    <circle cx="12" cy="12" r="5" />
                </svg>
            ),
            color: 'bg-green-500',
            label: handle || 'Lens',
        },
    }

    const badge = badges[platform]

    return (
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full ${badge.color} text-white text-xs font-medium ${className}`}>
            {badge.icon}
            <span>{badge.label}</span>
        </div>
    )
}
