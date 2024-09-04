import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Import Leaflet images using ES6 imports
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Define a default icon
const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

// Define a custom icon for selected markers
const highlightedIcon = new L.Icon({
  iconUrl: markerIcon, // Use the same icon URL or different one for a highlighted state
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
  className: 'highlight-marker', // Custom class for further styling (optional)
});

const MapComponent = () => {
  const [selectedLocations, setSelectedLocations] = useState([]);

  const locations = [
    { id: 1, name: "Chennai", lat: 13.0827, lng: 80.2707 }, // Chennai
    { id: 2, name: "Bangalore", lat: 12.9716, lng: 77.5946 }, // Bangalore
    { id: 3, name: "Mumbai", lat: 19.0760, lng: 72.8777 }, // Mumbai
  ];

  const handleMarkerClick = (location) => {
    setSelectedLocations((prevSelected) =>
      prevSelected.includes(location.id)
        ? prevSelected.filter((id) => id !== location.id)
        : [...prevSelected, location.id]
    );
  };

  return (
    <MapContainer
      center={[13.0827, 80.2707]}
      zoom={5}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {locations.map((location) => (
        <Marker
          key={location.id}
          position={[location.lat, location.lng]}
          eventHandlers={{
            click: () => handleMarkerClick(location),
          }}
          // Apply the highlighted icon if the location is selected, else use the default icon
          icon={selectedLocations.includes(location.id) ? highlightedIcon : defaultIcon}
        >
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
