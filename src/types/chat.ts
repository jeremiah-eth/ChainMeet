import { Database } from './supabase'

export type Message = Database['public']['Tables']['messages']['Row']
export type Profile = Database['public']['Tables']['profiles']['Row']

export interface ChatState {
    messages: Message[]
    isLoading: boolean
    error: string | null
}

export interface ChatSubscription {
    unsubscribe: () => void
}
