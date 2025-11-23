import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Message } from '@/types/chat'

export function useChat(matchId: string | null) {
    const [messages, setMessages] = useState<Message[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!matchId) {
            setMessages([])
            return
        }
        // TODO: fetch initial messages
    }, [matchId])

    return {
        messages,
        loading,
        error,
        setMessages
    }
}
