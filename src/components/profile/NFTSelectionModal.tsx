'use client'

import { useState, useEffect } from 'react'
import { X, Loader2 } from 'lucide-react'
import { useAccount } from 'wagmi'
import { fetchUserNFTs, NFT } from '@/lib/nft'
import { Button } from '@/components/ui/Button'

interface NFTSelectionModalProps {
    onSelect: (nft: NFT) => void
    onClose: () => void
}

export default function NFTSelectionModal({ onSelect, onClose }: NFTSelectionModalProps) {
    const { address } = useAccount()
    const [nfts, setNfts] = useState<NFT[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)

    useEffect(() => {
        const loadNFTs = async () => {
            if (!address) return

            setLoading(true)
            const userNFTs = await fetchUserNFTs(address)
            setNfts(userNFTs)
            setLoading(false)
        }

        loadNFTs()
    }, [address])

    const handleSelect = () => {
        if (selectedNFT) {
            onSelect(selectedNFT)
            onClose()
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                    <h2 className="text-2xl font-bold text-gray-900">Select NFT Profile Picture</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5 text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 text-purple-600 animate-spin mb-4" />
                            <p className="text-gray-500">Loading your NFTs...</p>
                        </div>
                    ) : nfts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12">
                            <p className="text-gray-500 mb-2">No NFTs found in your wallet</p>
                            <p className="text-sm text-gray-400">Make sure you're connected to the correct wallet</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-4">
                            {nfts.map((nft, index) => (
                                <button
                                    key={`${nft.contractAddress}-${nft.tokenId}`}
                                    onClick={() => setSelectedNFT(nft)}
                                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${selectedNFT?.contractAddress === nft.contractAddress &&
                                            selectedNFT?.tokenId === nft.tokenId
                                            ? 'border-purple-600 ring-2 ring-purple-600 ring-offset-2'
                                            : 'border-gray-200 hover:border-purple-300'
                                        }`}
                                >
                                    <img
                                        src={nft.imageUrl}
                                        alt={nft.name}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                                        <p className="text-white text-xs font-medium truncate">{nft.name}</p>
                                        <p className="text-white/70 text-xs truncate">{nft.collectionName}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-gray-100">
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
                            onClick={handleSelect}
                            disabled={!selectedNFT}
                            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                        >
                            Use as Profile Picture
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
