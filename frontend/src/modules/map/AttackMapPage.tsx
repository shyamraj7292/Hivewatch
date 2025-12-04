import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../auth/AuthContext";

interface Geo {
  lat: number;
  lon: number;
  country?: string;
  city?: string;
}

interface Event {
  id: string;
  src_ip: string;
  timestamp: string;
  severity: number;
  path: string;
  method: string;
  geo?: Geo;
}

export const AttackMapPage: React.FC = () => {
  const { auth } = useAuth();

  const { data: events } = useQuery<Event[]>({
    queryKey: ["events-map"],
    queryFn: async () => {
      const res = await fetch("/api/events?limit=200", {
        headers: auth.token ? { Authorization: `Bearer ${auth.token}` } : {}
      });
      if (!res.ok) {
        throw new Error("Failed to load events");
      }
      return res.json();
    },
    staleTime: 10_000
  });

  const geoEvents = (events || []).filter((e) => e.geo);

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 pt-4 flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-white">Global Attack Map</h1>
          <p className="text-xs text-slate-400">
            Visualize recent attacker origins targeting your honeypots.
          </p>
        </div>
        <div className="text-xs text-slate-400">
          Showing {geoEvents.length} geolocated events
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="h-[calc(100vh-7.5rem)] w-full rounded-xl overflow-hidden shadow border border-slate-800">
          <MapContainer center={[20, 0]} zoom={2} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {geoEvents.map((e) => (
              <Marker key={e.id} position={[e.geo!.lat, e.geo!.lon]}>
                <Popup>
                  <div className="space-y-1">
                    <div className="font-mono text-xs">{e.src_ip}</div>
                    {(e.geo?.city || e.geo?.country) && (
                      <div className="text-sm">
                        {e.geo?.city && <span>{e.geo.city}, </span>}
                        {e.geo?.country}
                      </div>
                    )}
                    <div className="text-xs text-slate-600">
                      {e.method} {e.path}
                    </div>
                    <div className="text-xs">
                      Severity: <span className="font-semibold">{e.severity}</span>
                    </div>
                    <div className="text-xs">
                      {new Date(e.timestamp).toLocaleString()}
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};


