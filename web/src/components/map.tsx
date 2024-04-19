"use client";

import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Button } from "./ui/button";

const libraries = ["places"]; // Include places library for better user experience

const center = { lat: 37.7749, lng: -122.4194 }; // Set initial center coordinates (San Francisco)

const mapContainerStyle = {
  width: "50%",
  height: "50vh",
  border: "2px solid #ccc",
};

export default function Map() {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [marker, setMarker] = useState({ lat: center.lat, lng: center.lng });
  const handleClick = (event: google.maps.MapMouseEvent) => {
    const [lat, lng] = [event.latLng!.lat(), event.latLng!.lng()];

    setMarker({ lat, lng });
    console.log("Latitude:", lat.toFixed(6), "Longitude:", lng.toFixed(6));
  };
  const onLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance);
  };

  return (
    <div className="flex justify-between items-center">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_MAP_KEY || ""}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
          onClick={handleClick}
          onLoad={onLoad}
        >
          <Marker position={marker}></Marker>
        </GoogleMap>
      </LoadScript>
      <div className="flex flex-col gap-3 justify-center">
        <div className="text-lg">
          Select the location on the map to choose proximity
        </div>
        <div className="text-sm">Latitude: {marker.lat.toFixed(6)}</div>
        <div className="text-sm">Longitude: {marker.lng.toFixed(6)}</div>
        <Button>Confirm</Button>
      </div>
    </div>
  );
}
