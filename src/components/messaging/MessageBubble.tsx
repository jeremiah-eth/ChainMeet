'use client'

interface MessageBubbleProps {
    message: string
    timestamp: Date
    isOwn: boolean
    senderPhoto?: string
}

export default function MessageBubble({ message, timestamp, isOwn, senderPhoto }: MessageBubbleProps) {
    const timeString = timestamp.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })

    if (isOwn) {
        // Outgoing message (right side, purple)
        return (
            <div className="flex justify-end">
                <div className="max-w-[70%]">
                    <div className="bg-purple-600 text-white rounded-2xl rounded-tr-sm px-4 py-2">
                        <p className="text-sm leading-relaxed">{message}</p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 text-right">{timeString}</p>
                </div>
            </div>
        )
    }

    // Incoming message (left side, gray)
    return (
        <div className="flex justify-start gap-2">
            {senderPhoto && (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                    <img
                        src={senderPhoto}
                        alt="Sender"
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <div className="max-w-[70%]">
                <div className="bg-gray-100 text-gray-900 rounded-2xl rounded-tl-sm px-4 py-2">
                    <p className="text-sm leading-relaxed">{message}</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">{timeString}</p>
            </div>
        </div>
    )
}
