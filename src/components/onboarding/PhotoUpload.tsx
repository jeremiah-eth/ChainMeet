'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Upload, X, Plus } from 'lucide-react'

interface PhotoUploadProps {
    onContinue: (photos: File[]) => void
    onBack: () => void
}

export default function PhotoUpload({ onContinue, onBack }: PhotoUploadProps) {
    const [photos, setPhotos] = useState<File[]>([])
    const [previews, setPreviews] = useState<string[]>([])

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        if (photos.length + files.length > 6) {
            alert('Maximum 6 photos allowed')
            return
        }

        const newPhotos = [...photos, ...files]
        setPhotos(newPhotos)

        // Generate previews
        files.forEach(file => {
            const reader = new FileReader()
            reader.onloadend = () => {
                setPreviews(prev => [...prev, reader.result as string])
            }
            reader.readAsDataURL(file)
        })
    }

    const removePhoto = (index: number) => {
        setPhotos(prev => prev.filter((_, i) => i !== index))
        setPreviews(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <div className="flex flex-col h-full w-full max-w-md mx-auto p-6 animate-fade-in">
            <div className="flex-1 overflow-y-auto pb-20">
                <button
                    onClick={onBack}
                    className="mb-6 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    ← Back
                </button>

                <h1 className="text-4xl font-bold mb-2 text-gray-900">Add Photos</h1>
                <p className="text-gray-500 mb-8">
                    Add at least 2 photos to continue. You can add up to 6.
                </p>

                <div className="grid grid-cols-3 gap-4">
                    {previews.map((preview, index) => (
                        <div key={index} className="relative aspect-square rounded-2xl overflow-hidden group bg-gray-100">
                            <img
                                src={preview}
                                alt={`Photo ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <button
                                onClick={() => removePhoto(index)}
                                className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                            {index === 0 && (
                                <div className="absolute bottom-2 left-2 px-2 py-1 bg-purple-600 text-white text-xs font-medium rounded-full">
                                    Main
                                </div>
                            )}
                        </div>
                    ))}

                    {photos.length < 6 && (
                        <label className="aspect-square rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-purple-600 hover:bg-purple-50 transition-all">
                            <Plus className="w-8 h-8 text-gray-400 mb-1" />
                            <span className="text-xs text-gray-500 font-medium">
                                Add Photo
                            </span>
                            <input
                                type="file"
                                accept="image/*"
                                multiple
                                className="hidden"
                                onChange={handleFileSelect}
                            />
                        </label>
                    )}
                </div>

                <p className="text-xs text-gray-400 mt-4">
                    Your first photo will be your main profile photo. You can reorder them later.
                </p>
            </div>

            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100 md:static md:border-0">
                <div className="max-w-md mx-auto">
                    <Button
                        variant="default"
                        size="lg"
                        fullWidth
                        disabled={photos.length < 2}
                        onClick={() => onContinue(photos)}
                        className="bg-purple-600 hover:bg-purple-700 text-white rounded-full shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Continue ({photos.length}/6)
                    </Button>
                </div>
            </div>
        </div>
    )
}
