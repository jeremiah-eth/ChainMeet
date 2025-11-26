'use client'

import { Bell, Shield, HelpCircle, LogOut, ChevronRight } from 'lucide-react'

interface SettingsProps {
    onClose: () => void
}

export default function Settings({ onClose }: SettingsProps) {
    const settingsSections = [
        {
            title: 'Account Settings',
            items: [
                { icon: Bell, label: 'Notifications', action: () => { } },
                { icon: Shield, label: 'Privacy', action: () => { } },
            ]
        },
        {
            title: 'Support',
            items: [
                { icon: HelpCircle, label: 'Help & Support', action: () => { } },
            ]
        }
    ]

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <header className="sticky top-0 bg-white border-b border-gray-100 z-10">
                <div className="max-w-md mx-auto px-4 py-4 flex items-center justify-between">
                    <button
                        onClick={onClose}
                        className="text-purple-600 font-semibold"
                    >
                        Back
                    </button>
                    <h1 className="text-xl font-bold text-gray-900">Settings</h1>
                    <div className="w-16" /> {/* Spacer for centering */}
                </div>
            </header>

            {/* Content */}
            <main className="max-w-md mx-auto px-4 py-6">
                {settingsSections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-8">
                        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3 px-2">
                            {section.title}
                        </h3>
                        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                            {section.items.map((item, itemIndex) => (
                                <button
                                    key={itemIndex}
                                    onClick={item.action}
                                    className={`w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors ${itemIndex !== section.items.length - 1 ? 'border-b border-gray-100' : ''
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <item.icon className="w-5 h-5 text-gray-600" />
                                        <span className="font-medium text-gray-900">{item.label}</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-gray-400" />
                                </button>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Sign Out Button */}
                <button className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-2xl font-semibold hover:bg-red-100 transition-colors">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>

                {/* App Version */}
                <div className="mt-8 text-center text-sm text-gray-400">
                    Version 1.0.0
                </div>
            </main>
        </div>
    )
}
