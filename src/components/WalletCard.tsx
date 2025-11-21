'use client'

import { useAccount, useBalance, useDisconnect } from 'wagmi'
import { Check, Copy, Send, Download } from 'lucide-react'
import { useState } from 'react'

export default function WalletCard() {
    const { address, isConnected } = useAccount()
    const { data: balance } = useBalance({ address })
    const { disconnect } = useDisconnect()
    const [copied, setCopied] = useState(false)

    if (!isConnected || !address) return null

    const truncateAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }

    const copyAddress = () => {
        navigator.clipboard.writeText(address)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="glass-panel p-6 space-y-4">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Wallet</h3>
                <div className="flex items-center gap-2 text-sm text-green-400">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Verified
                </div>
            </div>

            {/* Address */}
            <div className="space-y-2">
                <label className="text-xs text-gray-400">Address</label>
                <div className="flex items-center gap-2">
                    <code className="flex-1 glass-panel px-3 py-2 text-sm font-mono">
                        {truncateAddress(address)}
                    </code>
                    <button
                        onClick={copyAddress}
                        className="glass-panel p-2 hover:bg-white/5 transition-colors"
                        title="Copy address"
                    >
                        {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                </div>
            </div>

            {/* Balance */}
            <div className="space-y-2">
                <label className="text-xs text-gray-400">Balance</label>
                <div className="glass-panel px-4 py-3">
                    <div className="text-2xl font-bold">
                        {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '0.0000 ETH'}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3">
                <button className="glass-button flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Send
                </button>
                <button className="glass-button flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Receive
                </button>
            </div>

            {/* Disconnect */}
            <button
                onClick={() => disconnect()}
                className="w-full text-sm text-red-400 hover:text-red-300 transition-colors"
            >
                Disconnect Wallet
            </button>
        </div>
    )
}
