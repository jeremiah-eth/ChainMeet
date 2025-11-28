import React, { useState } from 'react'
import { Filter } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

interface TokenFilterSettingsProps {
    onApply: (tokenAddress: string, minBalance: string) => void
    onClose: () => void
}

export default function TokenFilterSettings({ onApply, onClose }: TokenFilterSettingsProps) {
    const [tokenAddress, setTokenAddress] = useState('')
    const [minBalance, setMinBalance] = useState('')

    const popularTokens = [
        { name: 'USDC', address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', minBalance: '1000' },
        { name: 'WETH', address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', minBalance: '1' },
        { name: 'DAI', address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', minBalance: '1000' },
    ]

    return (
        <div className="bg-white rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-bold text-gray-900">Token Gate Filters</h3>
            </div>

            <p className="text-sm text-gray-600 mb-4">
                Only show profiles of users holding specific tokens
            </p>

            <div className="space-y-4 mb-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Token Address
                    </label>
                    <Input
                        value={tokenAddress}
                        onChange={(e) => setTokenAddress(e.target.value)}
                        placeholder="0x..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Minimum Balance
                    </label>
                    <Input
                        type="number"
                        value={minBalance}
                        onChange={(e) => setMinBalance(e.target.value)}
                        placeholder="1000"
                    />
                </div>
            </div>

            <div className="mb-4">
                <p className="text-xs font-semibold text-gray-700 mb-2">Quick Select:</p>
                <div className="flex gap-2">
                    {popularTokens.map((token) => (
                        <button
                            key={token.address}
                            onClick={() => {
                                setTokenAddress(token.address)
                                setMinBalance(token.minBalance)
                            }}
                            className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-xs font-medium transition-colors"
                        >
                            {token.name}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-3">
                <Button variant="outline" size="lg" fullWidth onClick={onClose}>
                    Cancel
                </Button>
                <Button
                    variant="default"
                    size="lg"
                    fullWidth
                    onClick={() => onApply(tokenAddress, minBalance)}
                    disabled={!tokenAddress || !minBalance}
                    className="bg-purple-600 hover:bg-purple-700"
                >
                    Apply Filter
                </Button>
            </div>
        </div>
    )
}
