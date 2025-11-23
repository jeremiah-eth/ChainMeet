import { supabase } from './supabase'
import { MAX_PHOTO_SIZE } from '@/config/constants'

export async function uploadPhoto(file: File, userId: string): Promise<string | null> {
    if (file.size > MAX_PHOTO_SIZE) {
        throw new Error('File size too large')
    }

    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}/${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    try {
        const { error: uploadError } = await supabase.storage
            .from('photos')
            .upload(filePath, file)

        if (uploadError) {
            throw uploadError
        }

        const { data } = supabase.storage
            .from('photos')
            .getPublicUrl(filePath)

        return data.publicUrl
    } catch (error) {
        console.error('Error uploading photo:', error)
        return null
    }
}
