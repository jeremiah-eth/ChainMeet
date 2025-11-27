'use client'

import BottomNav from '@/components/layout/BottomNav'
import MessagesList from '@/components/messaging/MessagesList'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

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

export default function MessagesPage() {
    const { address, isConnected } = useAccount()
    const router = useRouter()
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!isConnected) {
            router.push('/')
            return
        }

        const fetchMessages = async () => {
            if (!address) return

            try {
                // Fetch all messages involving the current user
                const { data: messagesData, error } = await supabase
                    .from('messages')
                    .select('*')
                    .or(`sender_id.eq.${address.toLowerCase()},receiver_id.eq.${address.toLowerCase()}`)
                    .order('created_at', { ascending: false })

                if (error) throw error

                if (messagesData) {
                    // Group by conversation partner
                    const conversations = new Map<string, any>()

                    messagesData.forEach(msg => {
                        const partnerId = msg.sender_id === address.toLowerCase() ? msg.receiver_id : msg.sender_id
                        if (!conversations.has(partnerId)) {
                            conversations.set(partnerId, msg)
                        }
                    })

                    const partnerIds = Array.from(conversations.keys())

                    if (partnerIds.length > 0) {
                        // Fetch profiles for partners
                        const { data: profilesData, error: profilesError } = await supabase
                            .from('profiles')
                            .select('wallet_address, display_name, photos(*)')
                            .in('wallet_address', partnerIds)

                        if (profilesError) throw profilesError

                        if (profilesData) {
                            const formattedMessages: Message[] = partnerIds.map(partnerId => {
                                const lastMsg = conversations.get(partnerId)
                                const profile = profilesData.find(p => p.wallet_address === partnerId)
                                const photo = profile?.photos?.sort((a: any, b: any) => a.sort_order - b.sort_order)?.[0]?.url || '/placeholder-profile.jpg'

                                return {
                                    id: lastMsg.id,
                                    profile: {
                                        display_name: profile?.display_name || 'Unknown User',
                                        photo_url: photo
                                    },
                                    last_message: lastMsg.content,
                                    timestamp: new Date(lastMsg.created_at),
                                    unread: !lastMsg.read && lastMsg.receiver_id === address.toLowerCase()
                                }
                            })

                            setMessages(formattedMessages)
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching messages:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchMessages()
    }, [isConnected, address, router])

    const handleMessageClick = (messageId: string) => {
        console.log('Clicked message:', messageId)
        // router.push(`/chat/${messageId}`)
    }

    if (!isConnected) return null

    return (
        <div className="min-h-screen pb-20 bg-white">
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-900">Messages</h1>
                {loading ? (
                    <div className="flex justify-center p-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600" />
                    </div>
                ) : (
                    <MessagesList messages={messages} onMessageClick={handleMessageClick} />
                )}
            </div>
            <BottomNav />
        </div>
    )
}
