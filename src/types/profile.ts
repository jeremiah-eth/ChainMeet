export interface Profile {
    wallet_address: string
    display_name: string
    age: number
    bio: string
    location: string
    latitude: number | null
    longitude: number | null
    interests: string[]
    photos: { url: string; sort_order: number }[]
    distance?: number
    matchScore?: number
    commonTokens?: string[]
    commonNFTs?: string[]
}
