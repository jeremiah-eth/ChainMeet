import React from 'react'
import { Heart, Sparkles } from 'lucide-react'

interface CompatibilityMeterProps {
    score: number
    reasons?: string[]
    className?: string
}

export default function CompatibilityMeter({ score, reasons = [], className = '' }: CompatibilityMeterProps) {
    const getColor = (score: number) => {
        if (score >= 80) return 'from-green-500 to-emerald-600'
        if (score >= 60) return 'from-yellow-500 to-orange-500'
        return 'from-red-500 to-pink-600'
    }

    const getLabel = (score: number) => {
        if (score >= 80) return 'Great Match!'
        if (score >= 60) return 'Good Match'
        return 'Potential Match'
    }

    return (
        <div className={`bg-white rounded-2xl p-4 shadow-sm border border-gray-100 ${className}`}>
            <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-gray-900">AI Compatibility</span>
            </div>

            {/* Progress Bar */}
            <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                    className={`h-full bg-gradient-to-r ${getColor(score)} transition-all duration-1000 ease-out`}
                    style={{ width: `${score}%` }}
                />
            </div>

            {/* Score and Label */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-2xl font-bold text-gray-900">{score}%</span>
                <span className="text-sm font-medium text-gray-600">{getLabel(score)}</span>
            </div>

            {/* Reasons */}
            {reasons.length > 0 && (
                <div className="space-y-1">
                    {reasons.map((reason, index) => (
                        <div key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <Heart className="w-4 h-4 text-pink-500 flex-shrink-0 mt-0.5" />
                            <span>{reason}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
