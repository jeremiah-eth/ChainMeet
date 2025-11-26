'use client'

import { useState, useEffect, useRef } from 'react'
import { useAccount } from 'wagmi'
import { supabase } from '@/lib/supabase'
import { Send, Circle, Check, CheckCheck, Heart, MessageCircle } from 'lucide-react'
import { useChat } from '@/hooks/useChat'
import MessageBubble from './chat/MessageBubble'


interface Match {
    wallet_address: string
    display_name: string
    photos: { url: string }[]
    unreadCount?: number
}

export default function ChatInterface() {
    const { address } = useAccount()
    const [matches, setMatches] = useState<Match[]>([])
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
    const [newMessage, setNewMessage] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const { messages, sendMessage, isTyping, broadcastTyping, markAsRead } = useChat(selectedMatch?.wallet_address || null)

    useEffect(() => {
        fetchMatches()
    }, [address])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, isTyping])

    useEffect(() => {
        if (selectedMatch && address) {
            markAsRead(address)
        }
    }, [messages, selectedMatch, address])

    const fetchMatches = async () => {
        if (!address) return

        try {
            const { data: matchesData } = await supabase
                .from('matches')
                .select('*')
                .or(`user_id_1.eq.${address},user_id_2.eq.${address}`)
                .eq('status', 'accepted')

            if (!matchesData) return

            const matchIds = matchesData.map(m =>
                m.user_id_1 === address ? m.user_id_2 : m.user_id_1
            )

            const { data: profilesData } = await supabase
                .from('profiles')
                .select(`
          wallet_address,
          display_name,
          photos(url, sort_order)
        `)
                .in('wallet_address', matchIds)

            setMatches(profilesData || [])
        } catch (error) {
            console.error('Error fetching matches:', error)
        }
    }

    const handleSendMessage = async () => {
        if (!address || !selectedMatch || !newMessage.trim()) return

        await sendMessage(newMessage, address)
        setNewMessage('')
    }

    const handleTyping = () => {
        if (address) {
            broadcastTyping(address)
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[700px]">
            {/* Matches List */}
            <div className="glass-panel p-4 overflow-y-auto rounded-3xl">
                <h3 className="text-xl font-bold mb-6 text-gradient px-2">Matches</h3>
                <div className="space-y-2">
                    {matches.map(match => (
                        <button
                            key={match.wallet_address}
                            onClick={() => setSelectedMatch(match)}
                            className={`w-full flex items-center gap-3 p-3 rounded-2xl transition-all duration-300 ${selectedMatch?.wallet_address === match.wallet_address
                                ? 'bg-white/10 shadow-lg border border-white/10'
                                : 'hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            <div className="relative">
                                <img
                                    src={match.photos[0]?.url || 'https://picsum.photos/100'}
                                    alt={match.display_name}
                                    className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
                                />
                                {match.unreadCount && match.unreadCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-gray-900" />
                                )}
                            </div>
                            <div className="flex-1 text-left">
                                <div className="font-semibold text-white">{match.display_name}</div>
                                {match.unreadCount && match.unreadCount > 0 ? (
                                    <div className="text-xs text-purple-400 font-medium">{match.unreadCount} new messages</div>
                                ) : (
                                    <div className="text-xs text-gray-400">Tap to chat</div>
                                )}
                            </div>
                        </button>
                    ))}
                    {matches.length === 0 && (
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Heart className="w-8 h-8 text-gray-600" />
                            </div>
                            <p className="text-gray-400 text-sm">
                                No matches yet.<br />Start swiping to find people!
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 glass-panel flex flex-col rounded-3xl overflow-hidden border border-white/10">
                {selectedMatch ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-white/10 flex items-center gap-4 bg-white/5 backdrop-blur-md">
                            <div className="relative">
                                <img
                                    src={selectedMatch.photos[0]?.url || 'https://picsum.photos/100'}
                                    alt={selectedMatch.display_name}
                                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                                />
                                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900" />
                            </div>
                            <div>
                                <h3 className="font-bold text-lg">{selectedMatch.display_name}</h3>
                                <p className="text-xs text-green-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    Online now
                                </p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-6 overflow-y-auto space-y-6 bg-black/20">
                            {messages.map(message => (
                                <MessageBubble
                                    key={message.id}
                                    content={message.content}
                                    timestamp={message.created_at}
                                    isSender={message.sender_id === address}
                                    status={message.read ? 'read' : 'delivered'}
                                />
                            ))}
                            {isTyping && (
                                <div className="flex justify-start animate-fade-in">
                                    <div className="bg-white/10 backdrop-blur-md px-4 py-3 rounded-2xl rounded-tl-none border border-white/10">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-md">
                            <div className="flex gap-3 items-center">
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Type a message..."
                                        className="w-full bg-black/20 border border-white/10 rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all"
                                        value={newMessage}
                                        onChange={e => {
                                            setNewMessage(e.target.value)
                                            handleTyping()
                                        }}
                                        onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                                    />
                                </div>
                                <button
                                    onClick={handleSendMessage}
                                    disabled={!newMessage.trim()}
                                    className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-full text-white shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                                >
                                    <Send className="w-5 h-5 ml-0.5" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                            <MessageCircle className="w-12 h-12 text-white/20" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">Your Messages</h3>
                        <p className="max-w-xs">Select a match from the list to start chatting or keep swiping to find new people!</p>
                    </div>
                )}
            </div>
        </div>
    )
}

