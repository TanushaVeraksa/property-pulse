"use client";
import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { MdLocationOff } from "react-icons/md";
import Spinner from "@/components/Spinner";

const Map = ({ location }) => {
  const { street, city, state } = location;
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const customIcon = useMemo(() => {
    const L = require("leaflet");
    return new L.Icon({
      iconUrl: "/images/icons/marker-icon-blue.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });
  }, []);

  useEffect(() => {
    setLoading(true);

    const fetchCoords = async () => {
      const fullAddress = `${street}, ${city}, ${state}`;
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
            fullAddress
          )}`
        );

        const data = await res.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          setCoords([parseFloat(lat), parseFloat(lon)]);
        } else {
          setError(true);
        }
      } catch (error) {
        console.error(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCoords();
  }, [street, city, state]);

  if (loading) return <Spinner loading={loading} />;

  if (error || !coords)
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-gray-50 rounded-2xl shadow-sm">
        <MdLocationOff className="w-12 h-12 text-gray-400 mb-3" />
        <p className="text-lg font-medium text-gray-600">Location Not Found</p>
        <p className="text-sm text-gray-400">
          Please check the address and try again
        </p>
      </div>
    );

  return (
    !loading && (
      <MapContainer
        center={coords}
        zoom={13}
        minZoom={2}
        maxZoom={19}
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
