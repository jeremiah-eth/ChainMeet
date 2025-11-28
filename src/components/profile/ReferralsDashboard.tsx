import React, { useEffect, useState } from 'react'
import { Share2, Gift, Copy } from 'lucide-react'
import { getReferralStats } from '@/lib/referrals'
import { Button } from '@/components/ui/Button'

interface ReferralsDashboardProps {
    userAddress: string
}

export default function ReferralsDashboard({ userAddress }: ReferralsDashboardProps) {
    const [stats, setStats] = useState({ code: '', referrals: 0, rewards: '0' })
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        const loadStats = async () => {
            const data = await getReferralStats(userAddress)
            setStats(data)
        }
        loadStats()
    }, [userAddress])

    const copyCode = () => {
        navigator.clipboard.writeText(stats.code)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
                <Share2 className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-bold text-gray-900">Referral Program</h3>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-600 mb-2">Your Referral Code</p>
                <div className="flex items-center gap-2">
                    <code className="flex-1 text-2xl font-bold text-purple-600">{stats.code}</code>
                    <button
                        onClick={copyCode}
                        className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <Copy className="w-5 h-5 text-gray-600" />
                    </button>
                </div>
                {copied && <p className="text-xs text-green-600 mt-1">Copied!</p>}
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{stats.referrals}</div>
                    <div className="text-sm text-gray-600">Referrals</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold text-gray-900">{stats.rewards} ETH</div>
                    <div className="text-sm text-gray-600">Rewards</div>
                </div>
            </div>

            <Button
                variant="default"
                size="lg"
                fullWidth
                className="bg-purple-600 hover:bg-purple-700"
            >
                <Gift className="w-4 h-4 mr-2" />
                Claim Rewards
            </Button>
        </div>
    )
}
