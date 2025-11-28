import React, { useState } from 'react'
import { Shield, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface StakingModalProps {
    requiredStake: string
    onStake: (amount: string) => Promise<void>
    onClose: () => void
}

export default function StakingModal({ requiredStake, onStake, onClose }: StakingModalProps) {
    const [loading, setLoading] = useState(false)

    const handleStake = async () => {
        setLoading(true)
        try {
            await onStake(requiredStake)
            onClose()
        } catch (error) {
            console.error('Staking failed:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                        <Shield className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">Stake to Chat</h2>
                        <p className="text-sm text-gray-600">Anti-spam protection</p>
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <div className="flex gap-2">
                        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div className="text-sm text-blue-900">
                            <p className="font-semibold mb-1">How it works:</p>
                            <ul className="space-y-1 text-blue-800">
                                <li>• Stake {requiredStake} ETH to send your first message</li>
                                <li>• If they reply, your stake is returned</li>
                                <li>• If reported for spam, stake is slashed</li>
                                <li>• Protects against unwanted messages</li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Stake Amount</span>
                        <span className="text-2xl font-bold text-gray-900">{requiredStake} ETH</span>
                    </div>
                    <div className="text-xs text-gray-500">
                        ≈ ${(parseFloat(requiredStake) * 2000).toFixed(2)} USD
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        size="lg"
                        fullWidth
                        onClick={onClose}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="default"
                        size="lg"
                        fullWidth
                        onClick={handleStake}
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        {loading ? 'Staking...' : 'Stake & Continue'}
                    </Button>
                </div>
            </div>
        </div>
    )
}
