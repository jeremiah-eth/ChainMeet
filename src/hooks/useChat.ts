import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Message } from '@/types/chat'

export function useChat(matchId: string | null) {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        if (!matchId) {
            setMessages([])
            return
        }

        const fetchMessages = async () => {
            try {
                setLoading(true)
                const { data, error } = await supabase
                    .from('messages')
                    .select('*')
                    .or(`and(sender_id.eq.${matchId},receiver_id.eq.${matchId}),and(sender_id.eq.${matchId},receiver_id.eq.${matchId})`)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        // Subscribe to new messages
        const channel = supabase
            .channel(`chat:${matchId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `sender_id=eq.${matchId}`,
                },
                (payload) => {
                    const newMessage = payload.new as Message
                    setMessages((prev) => [...prev, newMessage])
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [matchId])

    const sendMessage = async (content: string, senderId: string) => {
        if (!matchId || !content.trim()) return

        try {
            const { error } = await supabase
                .from('messages')
                .insert({
                    sender_id: senderId,
                    receiver_id: matchId,
                    content: content.trim()
                })

            if (error) throw error
        } catch (err) {
            console.error('Error sending message:', err)
            setError('Failed to send message')
        }
    }

    const broadcastTyping = async (senderId: string) => {
        if (!matchId) return

        await supabase.channel(`chat:${matchId}`).send({
            type: 'broadcast',
            event: 'typing',
            payload: { sender_id: senderId }
        })
    }

    const markAsRead = async (senderId: string) => {
        if (!matchId) return

        try {
            await supabase
                .from('messages')
                .update({ read: true })
                .eq('receiver_id', senderId) // The current user is the receiver
                .eq('sender_id', matchId)
                .eq('read', false)
        } catch (err) {
            console.error('Error marking messages as read:', err)
        }
    }

    return {
        messages,
        loading,
        error,
        sendMessage,
        setMessages,
        isTyping,
        broadcastTyping,
        markAsRead
    }
}
