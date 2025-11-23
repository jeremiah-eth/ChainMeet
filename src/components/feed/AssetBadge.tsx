import { Coins } from 'lucide-react'

interface AssetBadgeProps {
    symbol: string
    type: 'token' | 'nft'
}

export function AssetBadge({ symbol, type }: AssetBadgeProps) {
    return (
        <div className="flex items-center gap-1 bg-purple-500/20 px-2 py-1 rounded-full text-xs border border-purple-500/30">
            <Coins className="w-3 h-3 text-purple-400" />
            <span className="font-medium text-purple-100">{symbol}</span>
        </div>
    )
}
