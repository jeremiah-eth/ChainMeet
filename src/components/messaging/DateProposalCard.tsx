import React from 'react'
import { Calendar, Check, X } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface DateProposalCardProps {
    date: string
    time: string
    proposedBy: string
    onAccept: () => void
    onDecline: () => void
    isAccepted?: boolean
    isDeclined?: boolean
}

export default function DateProposalCard({
    date,
    time,
    proposedBy,
    onAccept,
    onDecline,
    isAccepted = false,
    isDeclined = false
}: DateProposalCardProps) {
    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr)
        return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
    }

    return (
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border-2 border-purple-200 mb-4">
            <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                    <div className="font-semibold text-gray-900 mb-1">
                        {proposedBy} proposed a date
                    </div>
                    <div className="text-sm text-gray-600">
                        {formatDate(date)} at {time}
                    </div>
                </div>
            </div>

            {!isAccepted && !isDeclined && (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onDecline}
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                    >
                        <X className="w-4 h-4 mr-1" />
                        Decline
                    </Button>
                    <Button
                        variant="default"
                        size="sm"
                        onClick={onAccept}
                        className="flex-1 bg-purple-600 hover:bg-purple-700"
                    >
                        <Check className="w-4 h-4 mr-1" />
                        Accept
                    </Button>
                </div>
            )}

            {isAccepted && (
                <div className="flex items-center gap-2 text-green-600 font-medium">
                    <Check className="w-5 h-5" />
                    <span>Date Confirmed!</span>
                </div>
            )}

            {isDeclined && (
                <div className="flex items-center gap-2 text-red-600 font-medium">
                    <X className="w-5 h-5" />
                    <span>Date Declined</span>
                </div>
            )}
        </div>
    )
}
