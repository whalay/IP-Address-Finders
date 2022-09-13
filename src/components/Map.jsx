import React from 'react'
import { MapContainer, TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import Markerposition from "./Markerposition"

const Map = ({ipData}) => {
    return (<>
        <MapContainer
            center={[ipData.location?.lat, ipData.location?.lng]}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: "100vh", width: "100vw" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Markerposition address={ipData} />
        </MapContainer>
    </>
    )
}

export default Map