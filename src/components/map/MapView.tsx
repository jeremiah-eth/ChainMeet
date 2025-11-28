import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Profile } from '@/types/profile'

interface MapViewProps {
    users: Array<Profile & { latitude: number; longitude: number }>
}

export default function MapView({ users }: MapViewProps) {
    const [center, setCenter] = useState<[number, number]>([40.7128, -74.0060]) // NYC default

    useEffect(() => {
        // Get user's location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setCenter([position.coords.latitude, position.coords.longitude])
            })
        }
    }, [])

    return (
        <div className="w-full h-screen">
            <MapContainer
                center={center}
                zoom={12}
                style={{ width: '100%', height: '100%' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                {users.map((user) => (
                    <Marker
                        key={user.wallet_address}
                        position={[user.latitude, user.longitude]}
                    >
                        <Popup>
                            <div className="text-center">
                                <img
                                    src={user.photos?.[0]?.url || '/placeholder.jpg'}
                                    alt={user.display_name}
                                    className="w-16 h-16 rounded-full mx-auto mb-2"
                                />
                                <p className="font-semibold">{user.display_name}, {user.age}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}
