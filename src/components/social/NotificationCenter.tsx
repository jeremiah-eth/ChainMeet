'use client'

import { Bell, Heart, MessageCircle, UserPlus, X } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

interface Notification {
    id: string
    type: 'like' | 'match' | 'message' | 'friend_request'
    profile: {
        display_name: string
        photo_url: string
    }
    message: string
    timestamp: Date
    read: boolean
}

interface NotificationCenterProps {
    notifications: Notification[]
    onNotificationClick: (id: string) => void
    onClose: () => void
}

export default function NotificationCenter({ notifications, onNotificationClick, onClose }: NotificationCenterProps) {
    const getIcon = (type: Notification['type']) => {
        switch (type) {
            case 'like':
                return <Heart className="w-5 h-5 text-pink-500 fill-current" />
            case 'match':
                return <Heart className="w-5 h-5 text-purple-600 fill-current" />
            case 'message':
                return <MessageCircle className="w-5 h-5 text-blue-500" />
            case 'friend_request':
                return <UserPlus className="w-5 h-5 text-green-500" />
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-white">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100">
                <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Bell className="w-5 h-5 text-gray-900" />
                        <h1 className="text-xl font-bold text-gray-900">Notifications</h1>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
            </header>

            {/* Notifications List */}
            <main className="max-w-md mx-auto">
                <div className="divide-y divide-gray-100">
                    {notifications.map((notification) => (
                        <button
                            key={notification.id}
                            onClick={() => onNotificationClick(notification.id)}
                            className={`w-full flex items-start gap-3 p-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-purple-50' : ''
                                }`}
                        >
                            {/* Profile Photo */}
                            <div className="relative flex-shrink-0">
                                <div className="w-12 h-12 rounded-full overflow-hidden">
                                    <img
                                        src={notification.profile.photo_url}
                                        alt={notification.profile.display_name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                    {getIcon(notification.type)}
                                </div>
                            </div>

                            {/* Notification Content */}
                            <div className="flex-1 min-w-0 text-left">
                                <p className="text-sm text-gray-900 mb-1">
                                    <span className="font-semibold">{notification.profile.display_name}</span>
                                    {' '}
                                    {notification.message}
                                </p>
                                <p className="text-xs text-gray-400">
                                    {formatDistanceToNow(notification.timestamp, { addSuffix: true })}
                                </p>
                            </div>

                            {/* Unread Indicator */}
                            {!notification.read && (
                                <div className="w-2 h-2 bg-purple-600 rounded-full flex-shrink-0 mt-2" />
                            )}
                        </button>
                    ))}
                </div>
            </main>
        </div>
    )
}
