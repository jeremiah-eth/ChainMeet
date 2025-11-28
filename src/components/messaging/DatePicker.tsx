import React, { useState } from 'react'
import { Calendar, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface DatePickerProps {
    onSelectDate: (date: string, time: string) => void
    onClose: () => void
}

export default function DatePicker({ onSelectDate, onClose }: DatePickerProps) {
    const [selectedDate, setSelectedDate] = useState('')
    const [selectedTime, setSelectedTime] = useState('')

    const handleConfirm = () => {
        if (selectedDate && selectedTime) {
            onSelectDate(selectedDate, selectedTime)
        }
    }

    const timeSlots = [
        '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM',
        '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
    ]

    return (
        <div className="bg-white rounded-2xl p-6 max-w-md mx-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Propose a Date</h3>

            {/* Date Selection */}
            <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    Select Date
                </label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
            </div>

            {/* Time Selection */}
            <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Select Time
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                    {timeSlots.map((time) => (
                        <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${selectedTime === time
                                    ? 'bg-purple-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            </div>

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
                    onClick={handleConfirm}
                    disabled={!selectedDate || !selectedTime}
                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                >
                    Propose Date
                </Button>
            </div>
        </div>
    )
}
