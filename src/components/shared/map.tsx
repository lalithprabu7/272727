"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { cn } from "@/lib/utils";

// Fix for default marker icons in Leaflet with Next.js
const iconRetinaUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png";
const iconUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png";
const shadowUrl = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons
export const carIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export const alertIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export const destinationIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  description?: string;
  type: "car" | "alert" | "destination" | "default";
}

export interface MapRoute {
  id: string;
  positions: [number, number][];
  color?: string;
}

interface MapProps {
  center: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  routes?: MapRoute[];
  className?: string;
}

export default function Map({ center, zoom = 13, markers = [], routes = [], className }: MapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return (
      <div className={cn("w-full h-full bg-bg-elevated animate-pulse rounded-xl flex items-center justify-center", className)}>
        <span className="text-sm text-text-muted">Loading map...</span>
      </div>
    );
  }

  const getIcon = (type: MapMarker["type"]) => {
    switch (type) {
      case "car": return carIcon;
      case "alert": return alertIcon;
      case "destination": return destinationIcon;
      default: return DefaultIcon;
    }
  };

  return (
    <div className={cn("w-full h-full relative z-0 overflow-hidden rounded-xl border border-border-subtle shadow-inner", className)}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          className="map-tiles"
        />
        <ZoomControl position="bottomright" />
        
        {routes.map((route) => (
          <Polyline
            key={route.id}
            positions={route.positions}
            pathOptions={{ color: route.color || "#2563EB", weight: 4, opacity: 0.8 }}
          />
        ))}

        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={getIcon(marker.type)}
          >
            <Popup className="custom-popup">
              <div className="font-sans">
                <h3 className="font-semibold text-sm m-0 leading-tight">{marker.title}</h3>
                {marker.description && (
                  <p className="text-xs text-text-muted mt-1 m-0">{marker.description}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Map dark mode filter for non-dark tiles if needed */}
      <style jsx global>{`
        .custom-popup .leaflet-popup-content-wrapper {
          background: #111827;
          color: #fff;
          border: 1px solid #374151;
          border-radius: 8px;
        }
        .custom-popup .leaflet-popup-tip {
          background: #111827;
        }
      `}</style>
    </div>
  );
}
