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
    nft_pfp_contract?: string
    nft_pfp_token_id?: string
    nft_pfp_url?: string
    nft_pfp_collection?: string
    is_nft_verified?: boolean
    verified_attributes?: Array<{
        type: 'age' | 'asset'
        threshold: string
        verified_at: string
    }>
    distance?: number
    matchScore?: number
    commonTokens?: string[]
    commonNFTs?: string[]
}

