import React from 'react'
import { Gift } from 'lucide-react'

interface GiftMessageBubbleProps {
    amount: string
    token: string
    emoji: string
    isSent: boolean
    timestamp: string
}

export default function GiftMessageBubble({ amount, token, emoji, isSent, timestamp }: GiftMessageBubbleProps) {
    return (
        <div className={`flex ${isSent ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-xs ${isSent ? 'bg-gradient-to-r from-purple-600 to-pink-600' : 'bg-gray-100'} rounded-2xl p-4 shadow-md`}>
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                        <span className="text-2xl">{emoji}</span>
                    </div>
                    <div>
                        <div className={`font-semibold ${isSent ? 'text-white' : 'text-gray-900'}`}>
                            {isSent ? 'Gift Sent!' : 'Gift Received!'}
                        </div>
                        <div className={`text-sm ${isSent ? 'text-white/80' : 'text-gray-600'}`}>
                            {amount} {token}
                        </div>
                    </div>
                </div>
                <div className={`flex items-center gap-1 text-xs ${isSent ? 'text-white/60' : 'text-gray-500'}`}>
                    <Gift className="w-3 h-3" />
                    <span>{timestamp}</span>
                </div>
            </div>
        </div>
    )
}
