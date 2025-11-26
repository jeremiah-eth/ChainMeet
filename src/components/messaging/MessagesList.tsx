'use client'

import { formatDistanceToNow } from 'date-fns'

interface Message {
    id: string
    profile: {
        display_name: string
        photo_url: string
    }
    last_message: string
    timestamp: Date
    unread: boolean
}

interface MessagesListProps {
    messages: Message[]
    onMessageClick: (messageId: string) => void
}

export default function MessagesList({ messages, onMessageClick }: MessagesListProps) {
    return (
        <div className="divide-y divide-gray-100">
            {messages.map((message) => (
                <button
                    key={message.id}
                    onClick={() => onMessageClick(message.id)}
                    className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors"
                >
                    {/* Profile Photo */}
                    <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 rounded-full overflow-hidden">
                            <img
                                src={message.profile.photo_url}
                                alt={message.profile.display_name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {message.unread && (
                            <div className="absolute top-0 right-0 w-3 h-3 bg-purple-600 rounded-full border-2 border-white" />
                        )}
                    </div>

                    {/* Message Info */}
                    <div className="flex-1 min-w-0 text-left">
                        <div className="flex items-center justify-between mb-1">
                            <h4 className={`font-semibold truncate ${message.unread ? 'text-gray-900' : 'text-gray-600'}`}>
                                {message.profile.display_name}
                            </h4>
                            <span className="text-xs text-gray-400 flex-shrink-0 ml-2">
                                {formatDistanceToNow(message.timestamp, { addSuffix: true })}
                            </span>
                        </div>
                        <p className={`text-sm truncate ${message.unread ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                            {message.last_message}
                        </p>
                    </div>
                </button>
            ))}
        </div>
    )
}
