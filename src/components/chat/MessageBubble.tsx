import { Check, CheckCheck } from 'lucide-react'
import { Message } from '@/types/chat'

interface MessageBubbleProps {
    message: Message
    isOwnMessage: boolean
}

export function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
    return (
        <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
            <div
                className={`max-w-[70%] px-4 py-2 rounded-lg ${isOwnMessage
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                    : 'glass-panel'
                    }`}
            >
                <p>{message.content}</p>
                <div className="flex items-center justify-end gap-1 mt-1">
                    <p className="text-xs opacity-60">
                        {new Date(message.created_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                        })}
                    </p>
                    {isOwnMessage && (
                        message.read ? (
                            <CheckCheck className="w-3 h-3 text-blue-400" />
                        ) : (
                            <Check className="w-3 h-3 opacity-60" />
                        )
                    )}
                </div>
            </div>
        </div>
    )
}
