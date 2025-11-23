import { supabase } from './supabase'
import { MAX_PHOTO_SIZE } from '@/config/constants'

export async function uploadPhoto(file: File, userId: string): Promise<string | null> {
    console.log('Starting upload for user:', userId)
    console.log('File details:', { name: file.name, size: file.size, type: file.type })

    if (file.size > MAX_PHOTO_SIZE) {
        console.error('File too large:', file.size, 'Max:', MAX_PHOTO_SIZE)
        throw new Error('File size too large')
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    console.log('Uploading to path:', filePath)

    try {
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('photos')
            .upload(filePath, file)

        if (uploadError) {
            console.error('Upload error details:', uploadError)
            throw uploadError
        }

        console.log('Upload successful:', uploadData)

        const { data } = supabase.storage
            .from('photos')
            .getPublicUrl(filePath)

        console.log('Public URL:', data.publicUrl)
        return data.publicUrl
    } catch (error) {
        console.error('Error uploading photo:', error)
        return null
    }
}
