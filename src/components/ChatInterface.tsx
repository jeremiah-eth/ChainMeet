'use client'

import { useState, useEffect, useRef } from 'react'
import { useAccount } from 'wagmi'
import { supabase } from '@/lib/supabase'
import { Send, Circle } from 'lucide-react'

interface Match {
    wallet_address: string
    display_name: string
    photos: { url: string }[]
    unreadCount?: number
}

interface Message {
    id: string
    sender_id: string
    receiver_id: string
    content: string
    created_at: string
    read: boolean
}

export default function ChatInterface() {
    const { address } = useAccount()
    const [matches, setMatches] = useState<Match[]>([])
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null)
    const [messages, setMessages] = useState<Message[]>([])
    const [newMessage, setNewMessage] = useState('')
    const messagesEndRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        fetchMatches()
    }, [address])

    useEffect(() => {
        if (selectedMatch) {
            fetchMessages(selectedMatch.wallet_address)
        }
    }, [selectedMatch])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

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

    const fetchMessages = async (matchId: string) => {
        if (!address) return

        try {
            const { data } = await supabase
                .from('messages')
                .select('*')
                .or(`and(sender_id.eq.${address},receiver_id.eq.${matchId}),and(sender_id.eq.${matchId},receiver_id.eq.${address})`)
                .order('created_at', { ascending: true })

            setMessages(data || [])

            // Mark messages as read
            await supabase
                .from('messages')
                .update({ read: true })
                .eq('receiver_id', address)
                .eq('sender_id', matchId)
        } catch (error) {
            console.error('Error fetching messages:', error)
        }
    }

    const sendMessage = async () => {
        if (!address || !selectedMatch || !newMessage.trim()) return

        try {
            const { data, error } = await supabase
                .from('messages')
                .insert({
                    sender_id: address,
                    receiver_id: selectedMatch.wallet_address,
                    content: newMessage.trim()
                })
                .select()
                .single()

            if (error) throw error

            setMessages(prev => [...prev, data])
            setNewMessage('')
        } catch (error) {
            console.error('Error sending message:', error)
        }
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
            {/* Matches List */}
            <div className="glass-panel p-4 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-4">Matches</h3>
                <div className="space-y-2">
                    {matches.map(match => (
                        <button
                            key={match.wallet_address}
                            onClick={() => setSelectedMatch(match)}
                            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${selectedMatch?.wallet_address === match.wallet_address
                                    ? 'bg-purple-500/20'
                                    : 'hover:bg-white/5'
                                }`}
                        >
                            <img
                                src={match.photos[0]?.url || 'https://picsum.photos/100'}
                                alt={match.display_name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1 text-left">
                                <div className="font-semibold">{match.display_name}</div>
                                {match.unreadCount && match.unreadCount > 0 && (
                                    <div className="text-xs text-purple-400">{match.unreadCount} new</div>
                                )}
                            </div>
                            {match.unreadCount && match.unreadCount > 0 && (
                                <Circle className="w-2 h-2 fill-purple-400 text-purple-400" />
                            )}
                        </button>
                    ))}
                    {matches.length === 0 && (
                        <p className="text-gray-400 text-sm text-center py-8">
                            No matches yet. Start swiping!
                        </p>
                    )}
                </div>
            </div>

            {/* Chat Area */}
            <div className="md:col-span-2 glass-panel flex flex-col">
                {selectedMatch ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-white/10 flex items-center gap-3">
                            <img
                                src={selectedMatch.photos[0]?.url || 'https://picsum.photos/100'}
                                alt={selectedMatch.display_name}
                                className="w-10 h-10 rounded-full object-cover"
                            />
                            <h3 className="font-semibold">{selectedMatch.display_name}</h3>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-4 overflow-y-auto space-y-4">
                            {messages.map(message => (
                                <div
                                    key={message.id}
                                    className={`flex ${message.sender_id === address ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[70%] px-4 py-2 rounded-lg ${message.sender_id === address
                                                ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                                                : 'glass-panel'
                                            }`}
                                    >
                                        <p>{message.content}</p>
                                        <p className="text-xs opacity-60 mt-1">
                                            {new Date(message.created_at).toLocaleTimeString([], {
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="glass-input flex-1"
                                    value={newMessage}
                                    onChange={e => setNewMessage(e.target.value)}
                                    onKeyPress={e => e.key === 'Enter' && sendMessage()}
                                />
                                <button
                                    onClick={sendMessage}
                                    disabled={!newMessage.trim()}
                                    className="glass-button px-4"
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-gray-400">
                        Select a match to start chatting
                    </div>
                )}
            </div>
        </div>
    )
}
