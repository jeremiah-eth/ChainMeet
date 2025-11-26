'use client'

import { Check, CheckCheck } from 'lucide-react'

export interface MessageBubbleProps {
    content: string
    timestamp: Date | string
    isSender: boolean
    status?: 'sent' | 'delivered' | 'read'
    className?: string
}

export default function MessageBubble({
    content,
    timestamp,
    isSender,
    status = 'sent',
    className = ''
}: MessageBubbleProps) {
    const bubbleClass = isSender
        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-none'
        : 'bg-white/10 backdrop-blur-md text-white rounded-tl-none border border-white/10'

    const alignClass = isSender ? 'ml-auto' : 'mr-auto'

    const formatTime = (date: Date | string) => {
        return new Date(date).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    }

    return (
        <div className={`flex flex-col max-w-[80%] ${alignClass} ${className}`}>
            <div className={`px-4 py-3 rounded-2xl shadow-md ${bubbleClass}`}>
                <p className="text-sm md:text-base leading-relaxed break-words">
                    {content}
                </p>
            </div>
            <div className={`flex items-center gap-1 mt-1 px-1 ${isSender ? 'justify-end' : 'justify-start'}`}>
                <span className="text-[10px] text-gray-400">
                    {formatTime(timestamp)}
                </span>
                {isSender && (
                    <span className="text-[10px] text-gray-400 flex items-center">
                        {status === 'read' ? (
                            <CheckCheck className="w-3 h-3 text-blue-400" />
                        ) : (
                            <Check className="w-3 h-3 opacity-60" />
                        )}
                    </span>
                )}
            </div>
        </div>
    )
}
