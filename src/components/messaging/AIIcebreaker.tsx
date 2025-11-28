import React, { useState } from 'react'
import { Sparkles, Loader2 } from 'lucide-react'
import { generateIcebreaker } from '@/lib/aiMatching'

interface AIIcebreakerProps {
    matchName: string
    sharedInterests: string[]
    onSelect: (message: string) => void
}

export default function AIIcebreaker({ matchName, sharedInterests, onSelect }: AIIcebreakerProps) {
    const [suggestion, setSuggestion] = useState<string>('')
    const [loading, setLoading] = useState(false)

    const handleGenerate = async () => {
        setLoading(true)
        const icebreaker = await generateIcebreaker(matchName, sharedInterests)
        setSuggestion(icebreaker)
        setLoading(false)
    }

    return (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-200">
            <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-gray-900">AI Icebreaker</span>
            </div>

            {!suggestion ? (
                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 disabled:opacity-50 transition-colors"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 inline mr-2 animate-spin" />
                            Generating...
                        </>
                    ) : (
                        'Generate Opener'
                    )}
                </button>
            ) : (
                <div>
                    <p className="text-sm text-gray-700 mb-2 italic">"{suggestion}"</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => onSelect(suggestion)}
                            className="flex-1 px-3 py-1.5 bg-purple-600 text-white rounded-lg text-xs font-medium hover:bg-purple-700 transition-colors"
                        >
                            Use This
                        </button>
                        <button
                            onClick={handleGenerate}
                            className="flex-1 px-3 py-1.5 bg-white text-purple-600 border border-purple-600 rounded-lg text-xs font-medium hover:bg-purple-50 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
