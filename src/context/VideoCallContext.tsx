import React, { createContext, useContext, useState, useEffect } from 'react'

interface VideoCallContextType {
    isInCall: boolean
    startCall: (peerId: string) => void
    endCall: () => void
    localStream: MediaStream | null
    remoteStream: MediaStream | null
}

const VideoCallContext = createContext<VideoCallContextType | undefined>(undefined)

export const VideoCallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isInCall, setIsInCall] = useState(false)
    const [localStream, setLocalStream] = useState<MediaStream | null>(null)
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null)

    const startCall = async (peerId: string) => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            })
            setLocalStream(stream)
            setIsInCall(true)
            // In production, establish WebRTC connection with peer
        } catch (error) {
            console.error('Failed to start call:', error)
        }
    }

    const endCall = () => {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop())
        }
        setLocalStream(null)
        setRemoteStream(null)
        setIsInCall(false)
    }

    return (
        <VideoCallContext.Provider value={{ isInCall, startCall, endCall, localStream, remoteStream }}>
            {children}
        </VideoCallContext.Provider>
    )
}

export const useVideoCall = () => {
    const context = useContext(VideoCallContext)
    if (!context) throw new Error('useVideoCall must be used within VideoCallProvider')
    return context
}
