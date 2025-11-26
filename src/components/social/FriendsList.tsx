'use client'

import { Profile } from '@/types/profile'
import { UserPlus, MessageCircle } from 'lucide-react'

interface FriendsListProps {
    friends: Profile[]
    onMessageClick: (friend: Profile) => void
}

export default function FriendsList({ friends, onMessageClick }: FriendsListProps) {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 z-10">
                <div className="max-w-md mx-auto px-4 py-4">
                    <h1 className="text-xl font-bold text-gray-900">Friends</h1>
                </div>
            </header>

            {/* Friends Grid */}
            <main className="max-w-md mx-auto px-4 py-6">
                <div className="grid grid-cols-2 gap-4">
                    {friends.map((friend) => {
                        const photo = friend.photos?.[0]?.url || '/placeholder-profile.jpg'
                        return (
                            <div
                                key={friend.wallet_address}
                                className="bg-white border border-gray-200 rounded-2xl p-4 text-center"
                            >
                                <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3">
                                    <img
                                        src={photo}
                                        alt={friend.display_name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <h3 className="font-semibold text-gray-900 mb-1 truncate">
                                    {friend.display_name}, {friend.age}
                                </h3>
                                <p className="text-xs text-gray-500 mb-3 truncate">
                                    {friend.location}
                                </p>
                                <button
                                    onClick={() => onMessageClick(friend)}
                                    className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-full text-sm font-medium hover:bg-purple-700 transition-colors"
                                >
                                    <MessageCircle className="w-4 h-4" />
                                    Message
                                </button>
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}
