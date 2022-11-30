import React from "react";
import GoogleMapReact from 'google-map-react';
import { Icon } from '@iconify/react';
import "./map.css";
// google maps component
interface Location {
    address: string,
    lat: number,
    lng: number
}

interface MapProps {
    location: Location,
    zoomLevel: number
}
interface PinProps extends GoogleMapReact.ChildComponentProps {
    address: string
}
const LocationPin = (props : PinProps) => {
    const { address } = props;
    return (
        <div className="pin">
            <Icon icon="topcoat:location" className="pin-icon" />
            <p className="pin-text">{address}</p>
        </div>
    )
}
const Map = (props: MapProps) => {
    const { location, zoomLevel } = props;
    const { address } = location;
    return (
        <div>
            <h2 className="font-semibold text-2xl pt-2 text-blue-800 sm:text-3xl pb-4">Google Maps View</h2>
            <div className="google-map">
                <GoogleMapReact
                    // decrease height of map
                    bootstrapURLKeys={{key: "AIzaSyA4Ln5uejfRENu4pgyXwd69SgIymTY0LpI"}}
                    center={location}
                    defaultZoom={zoomLevel}
                >
                    <LocationPin
                        lat={location.lat}
                        lng={location.lng}
                        address={address}
                    />
                </GoogleMapReact>
            </div>
        </div>
    )
}
export default Map