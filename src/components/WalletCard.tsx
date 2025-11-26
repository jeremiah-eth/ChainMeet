'use client'

import { useAccount, useBalance, useDisconnect } from 'wagmi'
import { Check, Copy, Send, Download } from 'lucide-react'
import { useState } from 'react'
import { formatUnits } from 'viem'

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
        <div className="glass-panel p-6 space-y-6 rounded-3xl relative overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl -z-10" />

            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gradient">Wallet</h3>
                <div className="flex items-center gap-2 text-xs font-medium text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Verified
                </div>
            </div>

            {/* Balance */}
            <div className="text-center py-4">
                <label className="text-xs text-gray-400 uppercase tracking-wider">Total Balance</label>
                <div className="text-4xl font-bold text-white mt-1">
                    {balance ? `${parseFloat(formatUnits(balance.value, balance.decimals)).toFixed(4)}` : '0.0000'}
                    <span className="text-lg text-gray-400 ml-2">{balance?.symbol || 'ETH'}</span>
                </div>
            </div>

            {/* Address */}
            <div className="bg-white/5 rounded-2xl p-1 flex items-center justify-between pl-4 border border-white/5">
                <code className="text-sm font-mono text-gray-300">
                    {truncateAddress(address)}
                </code>
                <button
                    onClick={copyAddress}
                    className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gray-400 hover:text-white"
                    title="Copy address"
                >
                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                </button>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-4">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-xl text-white font-semibold shadow-lg hover:shadow-purple-500/25 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                    <Send className="w-4 h-4" />
                    Send
                </button>
                <button className="bg-white/10 border border-white/10 p-3 rounded-xl text-white font-semibold hover:bg-white/20 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" />
                    Receive
                </button>
            </div>

            {/* Disconnect */}
            <button
                onClick={() => disconnect()}
                className="w-full text-xs text-red-400 hover:text-red-300 transition-colors py-2 opacity-60 hover:opacity-100"
            >
                Disconnect Wallet
            </button>
        </div>
    )
}

