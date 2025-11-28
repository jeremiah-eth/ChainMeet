import React from 'antml:parameter>
import { Crown, Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface PremiumUpgradeModalProps {
    onMint: () => void
    onClose: () => void
}

export default function PremiumUpgradeModal({ onMint, onClose }: PremiumUpgradeModalProps) {
    const features = [
        'Unlimited swipes',
        'See who likes you',
        'Advanced filters',
        'Priority matching',
        'Ad-free experience',
        'Exclusive badge'
    ]

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl max-w-md w-full p-6 border-2 border-yellow-400">
                <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <Crown className="w-10 h-10 text-white" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">ChainMeet Gold</h2>
                <p className="text-center text-gray-600 mb-6">Unlock premium features</p>

                <div className="bg-white rounded-xl p-4 mb-6">
                    <div className="space-y-3">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-3">
                                <Check className="w-5 h-5 text-green-600" />
                                <span className="text-gray-900">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl p-4 mb-6 text-center">
                    <div className="text-3xl font-bold text-gray-900 mb-1">0.05 ETH</div>
                    <div className="text-sm text-gray-600">One-time NFT mint</div>
                </div>

                <div className="flex gap-3">
                    <Button variant="outline" size="lg" fullWidth onClick={onClose}>
                        Maybe Later
                    </Button>
                    <Button
                        variant="default"
                        size="lg"
                        fullWidth
                        onClick={onMint}
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
                    >
                        Mint Gold NFT
                    </Button>
                </div>
            </div>
        </div>
    )
}
