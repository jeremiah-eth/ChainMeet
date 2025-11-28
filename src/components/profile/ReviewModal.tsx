import React, { useState } from 'react'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface ReviewModalProps {
    matchName: string
    onSubmit: (rating: number, comment: string) => void
    onClose: () => void
}

export default function ReviewModal({ matchName, onSubmit, onClose }: ReviewModalProps) {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Rate Your Experience</h2>
                <p className="text-gray-600 mb-4">How was your interaction with {matchName}?</p>

                <div className="flex justify-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <button
                            key={star}
                            onClick={() => setRating(star)}
                            className="transition-transform hover:scale-110"
                        >
                            <Star
                                className={`w-10 h-10 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                    }`}
                            />
                        </button>
                    ))}
                </div>

                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts (optional)"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl mb-4 resize-none"
                    rows={3}
                />

                <div className="flex gap-3">
                    <Button variant="outline" size="lg" fullWidth onClick={onClose}>
                        Skip
                    </Button>
                    <Button
                        variant="default"
                        size="lg"
                        fullWidth
                        onClick={() => onSubmit(rating, comment)}
                        disabled={rating === 0}
                        className="bg-purple-600 hover:bg-purple-700"
                    >
                        Submit Review
                    </Button>
                </div>
            </div>
        </div>
    )
}
