import React, { useState } from 'react'
import { Gift, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface GiftMenuProps {
    onSendGift: (amount: string, token: string) => void
    onClose: () => void
}

export default function GiftMenu({ onSendGift, onClose }: GiftMenuProps) {
    const [selectedGift, setSelectedGift] = useState<{ amount: string, token: string, label: string } | null>(null)

    const gifts = [
        { amount: '0.001', token: 'ETH', label: '☕ Coffee', emoji: '☕' },
        { amount: '0.005', token: 'ETH', label: '🍕 Pizza', emoji: '🍕' },
        { amount: '0.01', token: 'ETH', label: '🌹 Rose', emoji: '🌹' },
        { amount: '0.05', token: 'ETH', label: '💎 Diamond', emoji: '💎' },
        { amount: '5', token: 'USDC', label: '🎁 Gift', emoji: '🎁' },
        { amount: '10', token: 'USDC', label: '🍾 Champagne', emoji: '🍾' },
    ]

    const handleSend = () => {
        if (selectedGift) {
            onSendGift(selectedGift.amount, selectedGift.token)
            onClose()
        }
    }

    return (
        <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl animate-slide-up">
            <div className="max-w-md mx-auto p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                        <Gift className="w-6 h-6 text-purple-600" />
                        <h3 className="text-xl font-bold text-gray-900">Send a Gift</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Gift Options */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                    {gifts.map((gift, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedGift(gift)}
                            className={`p-4 rounded-2xl border-2 transition-all ${selectedGift?.label === gift.label
                                    ? 'border-purple-600 bg-purple-50'
                                    : 'border-gray-200 hover:border-purple-300'
                                }`}
                        >
                            <div className="text-3xl mb-2">{gift.emoji}</div>
                            <div className="font-semibold text-gray-900 text-sm">{gift.label}</div>
                            <div className="text-xs text-gray-500">{gift.amount} {gift.token}</div>
                        </button>
                    ))}
                </div>

                {/* Send Button */}
                <Button
                    variant="default"
                    size="lg"
                    fullWidth
                    onClick={handleSend}
                    disabled={!selectedGift}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white disabled:opacity-50"
                >
                    {selectedGift ? `Send ${selectedGift.label}` : 'Select a Gift'}
                </Button>
            </div>
        </div>
    )
}
