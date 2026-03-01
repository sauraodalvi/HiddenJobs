
"use client";

import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DIRECTORY_LOCATIONS, ATS_PLATFORMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Search, MapPin, ExternalLink, Globe, Zap, ArrowRight } from 'lucide-react';
import { useSearchFilters } from '@/hooks/use-search';
import { MapSidebar } from './MapSidebar';
import Link from 'next/link';

// Fix Leaflet marker icon issue in Next.js
const markerIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

// Custom component to handle map events and center logic
function MapController({ center }: { center: [number, number] }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, map.getZoom(), { duration: 1.5 });
    }, [center, map]);
    return null;
}

import { MarketViewer } from './MarketViewer';

export default function JobMap() {
    const { generateLinks, filters, updateFilters } = useSearchFilters();
    const [mapCenter, setMapCenter] = useState<[number, number]>([30, 0]);
    const [showViewer, setShowViewer] = useState(false);
    const links = generateLinks();

    // Custom "Pulsing" Icon Div - Dynamic based on selection
    const createCustomIcon = (loc: any) => {
        const isSelected = filters.specificLocation?.toLowerCase() === loc.label.toLowerCase();
        const pulseColor = isSelected ? 'bg-primary' : 'bg-emerald-500';
        const pulseSize = isSelected ? 'w-12 h-12' : 'w-8 h-8';

        return L.divIcon({
            className: 'custom-div-icon',
            html: `
                <div class="relative flex items-center justify-center">
                    <div class="absolute ${pulseSize} ${pulseColor}/20 rounded-full animate-ping"></div>
                    <div class="relative w-4 h-4 ${pulseColor} rounded-full border-2 border-white dark:border-slate-900 shadow-xl transition-all ${isSelected ? 'scale-125' : ''}"></div>
                </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16]
        });
    };

    const handleCityClick = (loc: any) => {
        setMapCenter([loc.coords.lat, loc.coords.lng]);
        updateFilters({ location: 'specific', specificLocation: loc.label });
    };

    const handleFlyTo = (lat: number, lng: number) => {
        setMapCenter([lat, lng]);
    };

    return (
        <div className="h-[750px] w-full relative z-10 overflow-hidden bg-slate-50 dark:bg-slate-900">
            {/* The Intelligent Sidebar (Command Center) */}
            <MapSidebar onFlyTo={handleFlyTo} />

            <MapContainer
                center={mapCenter}
                zoom={3}
                className="h-full w-full grayscale-[0.2] contrast-[1.1]"
                scrollWheelZoom={true}
                zoomControl={false} // Custom zoom controls preferred for premium feel
            >
                {/* Positron Tiles - Clean and SaaS focused */}
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                />

                <MapController center={mapCenter} />

                {DIRECTORY_LOCATIONS.filter(l => l.coords).map((loc) => (
                    <Marker
                        key={loc.slug}
                        position={[loc.coords!.lat, loc.coords!.lng]}
                        icon={createCustomIcon(loc)}
                        eventHandlers={{
                            click: () => handleCityClick(loc)
                        }}
                    >
                        <Popup className="custom-popup" closeButton={false}>
                            <div className="p-3 min-w-[240px] font-sans rounded-2xl bg-white dark:bg-slate-900">
                                <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-white/5 pb-2">
                                    <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-2 text-sm uppercase tracking-tight">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        {loc.label} Hub
                                    </h3>
                                    <span className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">ACTIVE</span>
                                </div>

                                <div className="space-y-2 mb-4">
                                    {ATS_PLATFORMS.slice(0, 3).map(platform => (
                                        <div key={platform.name} className="flex items-center justify-between group/line">
                                            <span className="text-[11px] font-bold text-slate-400 group-hover/line:text-slate-600 dark:group-hover/line:text-slate-200 transition-colors uppercase tracking-widest">{platform.name}</span>
                                            <div className="flex items-center gap-1">
                                                <div className="w-1 h-1 bg-green-500 rounded-full" />
                                                <span className="font-mono text-[9px] text-slate-400">READY</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => handleCityClick(loc)}
                                    className="w-full py-2.5 bg-primary text-white text-[10px] font-black uppercase tracking-[0.1em] rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-primary/20"
                                >
                                    Pivot to this Market
                                    <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Premium Launch Console (Terminal) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 z-[1002] pointer-events-none">
                <div className="bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 p-5 rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.5)] border border-white/10 dark:border-slate-200 backdrop-blur-xl pointer-events-auto flex flex-col md:flex-row items-center gap-6 group hover:border-primary/50 transition-all duration-500">

                    <div className="flex items-center gap-4 flex-1 min-w-0 w-full">
                        <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center shrink-0 border border-primary/20 shadow-inner">
                            <Search className="w-6 h-6 text-primary animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="text-[10px] uppercase font-black tracking-[0.2em] text-primary">Market Terminal</div>
                                <div className="w-1 h-1 bg-slate-500 rounded-full" />
                                <div className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">
                                    {(filters.time === '1' ? 'Latest 24h' : filters.time === '7' ? 'Last Week' : 'Last Month')}
                                </div>
                            </div>
                            <div className="font-mono text-xs truncate text-slate-400 dark:text-slate-500 group-hover:text-slate-200 dark:group-hover:text-slate-800 transition-colors bg-black/20 dark:bg-slate-50 p-2 rounded-lg border border-white/5 dark:border-slate-200">
                                {links[0]?.query || 'Initializing Scraper Engine...'}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button
                            onClick={() => setShowViewer(true)}
                            className="flex-1 md:flex-none bg-primary hover:bg-primary/90 text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-3 hover:scale-[1.05] active:scale-95 shadow-xl shadow-primary/30 pointer-events-auto"
                        >
                            Launch Live Search
                            <ExternalLink className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>

            {/* In-Map Market Viewer */}
            <MarketViewer
                isOpen={showViewer}
                onClose={() => setShowViewer(false)}
                links={links}
            />
        </div>
    );
}
