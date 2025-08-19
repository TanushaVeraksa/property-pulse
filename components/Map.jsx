"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MdLocationOff } from "react-icons/md";
import Spinner from "@/components/Spinner";
import pin from "@/assets/images/pin.svg";

const Map = ({ location }) => {
  const { street, city, state } = location;
  const [coords, setCoords] = useState(null);
  const [customIcon, setCustomIcon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const L = require("leaflet");
    setCustomIcon(
      new L.Icon({
        iconUrl: "/images/icons/marker-icon-blue.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
      })
    );

    const fetchCoords = async () => {
      const fullAddress = `${street}, ${city}, ${state}`;
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
          fullAddress
        )}`
      );

      const data = await res.json();

      const { lat, lon } = data[0];

      if (data.length > 0) setCoords([parseFloat(lat), parseFloat(lon)]);
      setLoading(false);
    };
    fetchCoords();
  }, []);

  if (!loading && (!coords || !customIcon))
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-2xl shadow-sm">
        <MdLocationOff className="w-12 h-12 text-gray-400 mb-3" />
        <p className="text-lg font-medium text-gray-600">Location Not Found</p>
        <p className="text-sm text-gray-400">
          Please check the address and try again
        </p>
      </div>
    );

  if (loading) return <Spinner loading={loading} />;

  return (
    !loading && (
      <MapContainer
        center={coords}
        zoom={13}
        minZoom={2}
        maxZoom={18}
        style={{ width: "100%", height: 500 }}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Street Map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Carto Voyager">
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
          </LayersControl.BaseLayer>
        </LayersControl>
        <Marker position={coords} icon={customIcon} />
      </MapContainer>
    )
  );
};

export default Map;
