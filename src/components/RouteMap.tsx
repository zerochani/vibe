'use client';

/**
 * SafeRoute G - Route Map Component
 *
 * Interactive Leaflet map showing route comparison
 * Fully client-side rendered to avoid SSR issues with Leaflet
 */
import { useEffect, useState, useRef } from 'react';

interface RouteMapProps {
  fastRoute?: [number, number][];
  safeRoute?: [number, number][];
  origin?: { lat: number; lon: number; name?: string };
  destination?: { lat: number; lon: number; name?: string };
  showFastRoute?: boolean;
  showSafeRoute?: boolean;
  onMapClick?: (lat: number, lon: number) => void;
}

export default function RouteMap({
  fastRoute,
  safeRoute,
  origin,
  destination,
  showFastRoute = true,
  showSafeRoute = true,
  onMapClick,
}: RouteMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<unknown>(null);
  const [isClient, setIsClient] = useState(false);

  // Check if we're on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load Leaflet CSS via link tag
  useEffect(() => {
    if (!isClient) return;

    // Add Leaflet CSS via link tag to avoid SSR issues
    const linkId = 'leaflet-css';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);
    }
  }, [isClient]);

  // Initialize map
  useEffect(() => {
    if (!isClient || !mapRef.current || mapInstance) return;

    // Dynamic import of Leaflet only on client
    const initMap = async () => {
      const L = (await import('leaflet')).default;
      // Fix default icon
      delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      });

      // Create map
      const map = L.map(mapRef.current!, {
        center: [37.27, 127.02], // Suwon
        zoom: 13,
      });

      // Add tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);

      // Add click event handler
      if (onMapClick) {
        map.on('click', (e: any) => {
          onMapClick(e.latlng.lat, e.latlng.lng);
        });
      }

      setMapInstance(map);
    };

    initMap();

    return () => {
      if (mapInstance) {
        (mapInstance as { remove: () => void }).remove();
      }
    };
  }, [isClient, mapInstance]);

  // Update routes and markers
  useEffect(() => {
    if (!mapInstance || !isClient) return;

    const updateMap = async () => {
      const L = (await import('leaflet')).default;
      const map = mapInstance as L.Map;

      // Clear existing layers (except tile layer)
      map.eachLayer((layer) => {
        if (!(layer instanceof L.TileLayer)) {
          map.removeLayer(layer);
        }
      });

      // Convert GeoJSON [lon, lat] to Leaflet [lat, lon]
      const convertCoords = (coords: [number, number][]): [number, number][] =>
        coords.map(c => [c[1], c[0]]);

      const allCoords: [number, number][] = [];

      // Add fast route (red, dashed)
      if (showFastRoute && fastRoute && fastRoute.length > 0) {
        const coords = convertCoords(fastRoute);
        allCoords.push(...coords);
        L.polyline(coords, {
          color: '#ef4444',
          weight: 5,
          opacity: 0.7,
          dashArray: '10, 10',
        }).addTo(map);
      }

      // Add heat-safe route (green, solid)
      if (showSafeRoute && safeRoute && safeRoute.length > 0) {
        const coords = convertCoords(safeRoute);
        allCoords.push(...coords);
        L.polyline(coords, {
          color: '#22c55e',
          weight: 6,
          opacity: 0.9,
        }).addTo(map);
      }

      // Add origin marker
      if (origin) {
        const originIcon = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });
        L.marker([origin.lat, origin.lon], { icon: originIcon })
          .bindPopup(`<strong>출발지</strong><br/>${origin.name || ''}`)
          .addTo(map);
      }

      // Add destination marker
      if (destination) {
        const destIcon = L.icon({
          iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowSize: [41, 41],
        });
        L.marker([destination.lat, destination.lon], { icon: destIcon })
          .bindPopup(`<strong>도착지</strong><br/>${destination.name || ''}`)
          .addTo(map);
      }

      // Fit bounds if we have coordinates
      if (allCoords.length > 0) {
        const bounds = L.latLngBounds(allCoords);
        map.fitBounds(bounds, { padding: [50, 50] });
      }
    };

    updateMap();
  }, [mapInstance, fastRoute, safeRoute, origin, destination, showFastRoute, showSafeRoute, isClient]);

  if (!isClient) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500">Loading map...</div>
      </div>
    );
  }

  return (
    <div
      ref={mapRef}
      className="w-full h-full"
      style={{ minHeight: '400px' }}
    />
  );
}
