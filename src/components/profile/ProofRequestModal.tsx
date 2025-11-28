'use client'

import { useState } from 'react'
import { X, Shield, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ProofRequestModalProps {
    onClose: () => void
    onVerify: (proofType: 'age' | 'asset', value: string) => Promise<boolean>
}

export default function ProofRequestModal({ onClose, onVerify }: ProofRequestModalProps) {
    const [selectedProof, setSelectedProof] = useState<'age' | 'asset' | null>(null)
    const [inputValue, setInputValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<'success' | 'failed' | null>(null)

    const handleVerify = async () => {
        if (!selectedProof || !inputValue) return

        setLoading(true)
        const success = await onVerify(selectedProof, inputValue)
        setResult(success ? 'success' : 'failed')
        setLoading(false)

        if (success) {
            setTimeout(() => {
                onClose()
            }, 2000)
        }
    }

    const proofTypes = [
        {
            id: 'age' as const,
            title: 'Age Verification',
            description: 'Prove you are over a certain age without revealing your birthdate',
            placeholder: 'Enter minimum age (e.g., 18)',
            icon: '🎂',
        },
        {
            id: 'asset' as const,
            title: 'Asset Verification',
            description: 'Prove your net worth exceeds a threshold without revealing exact amount',
            placeholder: 'Enter minimum value in ETH (e.g., 10)',
            icon: '💰',
        },
    ]

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                        <Shield className="w-6 h-6 text-purple-600" />
                        <h2 className="text-2xl font-bold text-gray-900">ZK Verification</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {result === null ? (
                        <>
                            <p className="text-gray-600 mb-6">
                                Use zero-knowledge proofs to verify attributes without revealing sensitive information.
                            </p>

                            {/* Proof Type Selection */}
                            <div className="space-y-3 mb-6">
                                {proofTypes.map((proof) => (
                                    <button
                                        key={proof.id}
                                        onClick={() => setSelectedProof(proof.id)}
                                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedProof === proof.id
                                                ? 'border-purple-600 bg-purple-50'
                                                : 'border-gray-200 hover:border-purple-300'
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <span className="text-2xl">{proof.icon}</span>
                                            <div className="flex-1">
                                                <div className="font-semibold text-gray-900 mb-1">
                                                    {proof.title}
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    {proof.description}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Input Field */}
                            {selectedProof && (
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder={proofTypes.find(p => p.id === selectedProof)?.placeholder}
                                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                                    />
                                </div>
                            )}

                            {/* Actions */}
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
                                    onClick={handleVerify}
                                    disabled={!selectedProof || !inputValue || loading}
                                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                            Verifying...
                                        </>
                                    ) : (
                                        'Verify'
                                    )}
                                </Button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-8">
                            {result === 'success' ? (
                                <>
                                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Shield className="w-8 h-8 text-green-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Verification Successful!</h3>
                                    <p className="text-gray-600">Your proof has been verified and added to your profile.</p>
                                </>
                            ) : (
                                <>
                                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <X className="w-8 h-8 text-red-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Verification Failed</h3>
                                    <p className="text-gray-600 mb-4">Unable to verify the proof. Please try again.</p>
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={() => setResult(null)}
                                    >
                                        Try Again
                                    </Button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
