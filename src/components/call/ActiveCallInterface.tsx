import React from 'react'
import { Phone, Video, Mic, MicOff, VideoOff } from 'lucide-react'
import { useVideoCall } from '@/context/VideoCallContext'

interface ActiveCallInterfaceProps {
    partnerName: string
    partnerPhoto: string
}

export default function ActiveCallInterface({ partnerName, partnerPhoto }: ActiveCallInterfaceProps) {
    const { endCall, localStream, remoteStream } = useVideoCall()
    const [isMuted, setIsMuted] = React.useState(false)
    const [isVideoOff, setIsVideoOff] = React.useState(false)

    const toggleMute = () => {
        if (localStream) {
            localStream.getAudioTracks().forEach(track => {
                track.enabled = !track.enabled
            })
            setIsMuted(!isMuted)
        }
    }

    const toggleVideo = () => {
        if (localStream) {
            localStream.getVideoTracks().forEach(track => {
                track.enabled = !track.enabled
            })
            setIsVideoOff(!isVideoOff)
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-gray-900">
            {/* Remote Video */}
            <div className="absolute inset-0">
                <video
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover"
                    ref={(video) => {
                        if (video && remoteStream) {
                            video.srcObject = remoteStream
                        }
                    }}
                />
            </div>

            {/* Local Video (Picture-in-Picture) */}
            <div className="absolute top-4 right-4 w-32 h-48 bg-gray-800 rounded-xl overflow-hidden shadow-lg">
                <video
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                    ref={(video) => {
                        if (video && localStream) {
                            video.srcObject = localStream
                        }
                    }}
                />
            </div>

            {/* Controls */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4">
                <button
                    onClick={toggleMute}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isMuted ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                >
                    {isMuted ? <MicOff className="w-6 h-6 text-white" /> : <Mic className="w-6 h-6 text-white" />}
                </button>

                <button
                    onClick={toggleVideo}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${isVideoOff ? 'bg-red-600' : 'bg-gray-700 hover:bg-gray-600'
                        }`}
                >
                    {isVideoOff ? <VideoOff className="w-6 h-6 text-white" /> : <Video className="w-6 h-6 text-white" />}
                </button>

                <button
                    onClick={endCall}
                    className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center transition-colors"
                >
                    <Phone className="w-6 h-6 text-white transform rotate-135" />
                </button>
            </div>

            {/* Partner Info */}
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
                <img
                    src={partnerPhoto}
                    alt={partnerName}
                    className="w-16 h-16 rounded-full mx-auto mb-2 border-2 border-white"
                />
                <p className="text-white font-semibold">{partnerName}</p>
            </div>
        </div>
    )
}
