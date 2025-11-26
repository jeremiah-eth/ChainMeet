'use client'

import { useState } from 'react'
import { ArrowLeft, MoreVertical, Send } from 'lucide-react'
import { Profile } from '@/types/profile'

interface ChatRoomProps {
    profile: Profile
    onBack: () => void
}

export default function ChatRoom({ profile, onBack }: ChatRoomProps) {
    const [message, setMessage] = useState('')

    const handleSend = () => {
        if (message.trim()) {
            // TODO: Send message logic
            console.log('Sending:', message)
            setMessage('')
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
            {/* Header */}
            <header className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                    <button
                        onClick={onBack}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-gray-900" />
                    </button>
                    <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                            src={profile.photos?.[0]?.url || '/placeholder-profile.jpg'}
                            alt={profile.display_name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="font-semibold text-gray-900">{profile.display_name}</h2>
                        <p className="text-xs text-gray-500">Active now</p>
                    </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>
            </header>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4">
                <div className="max-w-md mx-auto space-y-4">
                    {/* Messages will be rendered here */}
                    <div className="text-center text-gray-400 text-sm py-8">
                        Start the conversation!
                    </div>
                </div>
            </div>

            {/* Input Area */}
            <div className="border-t border-gray-100 p-4">
                <div className="max-w-md mx-auto flex items-center gap-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-600"
                    />
                    <button
                        onClick={handleSend}
                        disabled={!message.trim()}
                        className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-5 h-5 text-white" />
                    </button>
                </div>
            </div>
        </div>
    )
}
