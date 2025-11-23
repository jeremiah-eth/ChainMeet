import { useState } from 'react'
import { Upload, X } from 'lucide-react'
import { uploadPhoto } from '@/lib/storage'

interface PhotoUploaderProps {
    userId: string
    onPhotosChange: (photos: string[]) => void
    maxPhotos?: number
}

export function PhotoUploader({ userId, onPhotosChange, maxPhotos = 6 }: PhotoUploaderProps) {
    const [photos, setPhotos] = useState<string[]>([])
    const [uploading, setUploading] = useState(false)

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return
        if (photos.length >= maxPhotos) return

        setUploading(true)
        try {
            // Try to upload to Supabase
            let url = await uploadPhoto(e.target.files[0], userId)

            // If upload fails, use a local object URL for preview (MVP fallback)
            if (!url) {
                url = URL.createObjectURL(e.target.files[0])
            }

            const newPhotos = [...photos, url]
            setPhotos(newPhotos)
            onPhotosChange(newPhotos)
        } catch (error) {
            console.error('Upload failed:', error)
            // Use object URL as fallback
            const url = URL.createObjectURL(e.target.files[0])
            const newPhotos = [...photos, url]
            setPhotos(newPhotos)
            onPhotosChange(newPhotos)
        } finally {
            setUploading(false)
        }
    }

    const removePhoto = (index: number) => {
        const newPhotos = photos.filter((_, i) => i !== index)
        setPhotos(newPhotos)
        onPhotosChange(newPhotos)
    }

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
                {photos.map((photo, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden group">
                        <img src={photo} alt={`Photo ${index + 1}`} className="w-full h-full object-cover" />
                        <button
                            onClick={() => removePhoto(index)}
                            className="absolute top-2 right-2 p-1 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <X className="w-4 h-4 text-white" />
                        </button>
                    </div>
                ))}
                {photos.length < maxPhotos && (
                    <label className="aspect-square rounded-lg border-2 border-dashed border-white/20 flex flex-col items-center justify-center cursor-pointer hover:border-purple-500/50 hover:bg-purple-500/10 transition-colors">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <span className="text-xs text-gray-400">
                            {uploading ? 'Uploading...' : 'Add Photo'}
                        </span>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </label>
                )}
            </div>
            <p className="text-xs text-gray-400">
                Upload {maxPhotos} photo{maxPhotos > 1 ? 's' : ''}. Supported formats: JPG, PNG.
            </p>
        </div>
    )
}
