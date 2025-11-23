export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    wallet_address: string
                    display_name: string | null
                    bio: string | null
                    age: number | null
                    location: string | null
                    latitude: number | null
                    longitude: number | null
                    gender: string | null
                    interests: string[] | null
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    wallet_address: string
                    display_name?: string | null
                    bio?: string | null
                    age?: number | null
                    location?: string | null
                    latitude?: number | null
                    longitude?: number | null
                    gender?: string | null
                    interests?: string[] | null
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    wallet_address?: string
                    display_name?: string | null
                    bio?: string | null
                    age?: number | null
                    location?: string | null
                    latitude?: number | null
                    longitude?: number | null
                    gender?: string | null
                    interests?: string[] | null
                    created_at?: string
                    updated_at?: string
                }
            }
            photos: {
                Row: {
                    id: string
                    user_id: string
                    url: string
                    sort_order: number | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    url: string
                    sort_order?: number | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    url?: string
                    sort_order?: number | null
                    created_at?: string
                }
            }
            matches: {
                Row: {
                    id: string
                    user_id_1: string
                    user_id_2: string
                    status: 'pending' | 'accepted' | 'rejected' | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id_1: string
                    user_id_2: string
                    status?: 'pending' | 'accepted' | 'rejected' | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id_1?: string
                    user_id_2?: string
                    status?: 'pending' | 'accepted' | 'rejected' | null
                    created_at?: string
                }
            }
            messages: {
                Row: {
                    id: string
                    sender_id: string
                    receiver_id: string
                    content: string
                    read: boolean | null
                    created_at: string
                }
                Insert: {
                    id?: string
                    sender_id: string
                    receiver_id: string
                    content: string
                    read?: boolean | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    sender_id?: string
                    receiver_id?: string
                    content?: string
                    read?: boolean | null
                    created_at?: string
                }
            }
            blocked_users: {
                Row: {
                    id: string
                    blocker_id: string
                    blocked_id: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    blocker_id: string
                    blocked_id: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    blocker_id?: string
                    blocked_id?: string
                    created_at?: string
                }
            }
            reports: {
                Row: {
                    id: string
                    reporter_id: string
                    reported_id: string
                    reason: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    reporter_id: string
                    reported_id: string
                    reason: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    reporter_id?: string
                    reported_id?: string
                    reason?: string
                    created_at?: string
                }
            }
            tips: {
                Row: {
                    id: string
                    sender_id: string
                    receiver_id: string
                    amount: string
                    tx_hash: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    sender_id: string
                    receiver_id: string
                    amount: string
                    tx_hash: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    sender_id?: string
                    receiver_id?: string
                    amount?: string
                    tx_hash?: string
                    created_at?: string
                }
            }
        }
    }
}
