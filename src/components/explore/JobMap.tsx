
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

    // Custom "Market Cluster" Icon - Dynamic based on selection and job activity
    const createCustomIcon = (loc: any) => {
        const isSelected = filters.specificLocation?.toLowerCase() === loc.label.toLowerCase();
        const pulseColor = isSelected ? 'bg-primary' : 'bg-emerald-500';
        const hasData = loc.jobCount && loc.companies;

        // Multi-stage Logo Pipeline (DuckDuckGo -> Google -> UI-Avatars)
        const companiesHtml = hasData ? loc.companies.slice(0, 3).map((domain: string, i: number) => `
            <div class="absolute w-7 h-7 rounded-full border border-white dark:border-slate-800 bg-white dark:bg-slate-700 shadow-sm overflow-hidden transition-all duration-700 hover:scale-150 hover:z-50 ring-2 ring-primary/5" 
                 style="transform: rotate(${i * 120}deg) translateY(-24px) rotate(-${i * 120}deg);">
                <img src="https://icons.duckduckgo.com/ip3/${domain}.ico" 
                     class="w-full h-full object-contain p-1" 
                     alt="${domain}"
                     onerror="this.onerror=null; this.src='https://ui-avatars.com/api/?name=${domain.charAt(0)}&background=6366f1&color=fff&bold=true&font-size=0.6'" />
            </div>
        `).join('') : '';

        return L.divIcon({
            className: 'custom-div-icon',
            html: `
                <div class="relative flex items-center justify-center group/marker" style="width: 80px; height: 80px;">
                    <!-- Base Pulse -->
                    <div class="absolute w-12 h-12 ${pulseColor}/20 rounded-full animate-ping"></div>
                    
                    <!-- Company Orbit Cluster (Visible on Hover or if Selected) -->
                    <div class="absolute inset-0 flex items-center justify-center transition-transform duration-[2000ms] group-hover/marker:rotate-[360deg]">
                        ${companiesHtml}
                    </div>

                    <!-- Hub Core -->
                    <div class="relative w-6 h-6 ${pulseColor} rounded-full border-2 border-white dark:border-slate-900 shadow-xl transition-all ${isSelected ? 'scale-125 ring-4 ring-primary/20' : ''} flex items-center justify-center z-10">
                        ${loc.jobCount ? `
                            <div class="absolute -top-3 -right-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-[8px] font-black px-1.5 py-0.5 rounded-full shadow-lg border border-white/20 whitespace-nowrap">
                                ${loc.jobCount >= 1000 ? (loc.jobCount / 1000).toFixed(1) + 'k' : loc.jobCount}
                            </div>
                        ` : ''}
                    </div>
                </div>
            `,
            iconSize: [80, 80],
            iconAnchor: [40, 40]
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
        <div className="h-[calc(100vh-64px)] md:h-[750px] w-full relative z-10 overflow-hidden bg-slate-50 dark:bg-slate-900">
            {/* The Intelligent Sidebar (Command Center) */}
            <MapSidebar onFlyTo={handleFlyTo} />

            <MapContainer
                center={mapCenter}
                zoom={3}
                className="h-full w-full grayscale-[0.2] contrast-[1.1]"
                scrollWheelZoom={true}
                zoomControl={false}
            >
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
                            <div className="p-3 w-[260px] md:w-[280px] font-sans rounded-2xl bg-white dark:bg-slate-900 border-none shadow-none">
                                <div className="flex items-center justify-between mb-3 border-b border-slate-100 dark:border-white/5 pb-2">
                                    <h3 className="font-black text-slate-900 dark:text-white flex items-center gap-2 text-sm uppercase tracking-tight">
                                        <MapPin className="w-4 h-4 text-primary" />
                                        {loc.label} Hub
                                    </h3>
                                    <span className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full">ACTIVE</span>
                                </div>

                                <div className="space-y-3 mb-4">
                                    {loc.jobCount && (
                                        <div className="flex items-center justify-between bg-slate-50 dark:bg-white/5 p-2 rounded-xl">
                                            <div className="flex items-center gap-2">
                                                <Zap className="w-3.5 h-3.5 text-primary fill-primary" />
                                                <span className="text-[11px] font-black tracking-tight text-slate-700 dark:text-slate-200">
                                                    ~{loc.jobCount.toLocaleString()} Jobs
                                                </span>
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-400">
                                                Fresh
                                            </span>
                                        </div>
                                    )}

                                    {loc.companies && (
                                        <div className="space-y-2">
                                            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">Top Movers</p>
                                            <div className="flex flex-wrap gap-2">
                                                {loc.companies.map((domain: string) => (
                                                    <div key={domain} className="w-8 h-8 rounded-xl border border-slate-100 dark:border-white/5 bg-white dark:bg-slate-800 p-1.5 flex items-center justify-center shadow-sm" title={domain}>
                                                        <img src={`https://icons.duckduckgo.com/ip3/${domain}.ico`}
                                                            className="w-full h-full object-contain"
                                                            alt={domain} />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <button
                                    onClick={() => handleCityClick(loc)}
                                    className="w-full py-3 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary/20"
                                >
                                    Pivot to this Market
                                    <ArrowRight className="w-3 h-3" />
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Premium Launch Console (Terminal) - Responsive Stacking */}
            <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-4xl px-4 md:px-6 z-[1002] pointer-events-none">
                <div className="bg-slate-900/95 dark:bg-white/95 text-white dark:text-slate-900 p-4 md:p-5 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-white/10 dark:border-slate-200 backdrop-blur-xl pointer-events-auto flex flex-col md:flex-row items-center gap-4 md:gap-6 group transition-all duration-500">

                    <div className="flex items-center gap-4 flex-1 min-w-0 w-full">
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 border border-primary/20">
                            <Search className="w-5 h-5 md:w-6 md:h-6 text-primary animate-pulse" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="text-[9px] md:text-[10px] uppercase font-black tracking-[0.2em] text-primary">Market Terminal</div>
                                <div className="hidden md:block w-1 h-1 bg-slate-500 rounded-full" />
                                <div className="hidden md:block text-[9px] uppercase font-bold text-slate-500 tracking-wider">
                                    {(filters.time === '1' ? 'Latest 24h' : filters.time === '7' ? 'Last Week' : 'Last Month')}
                                </div>
                            </div>
                            <div className="font-mono text-[10px] md:text-xs truncate text-slate-400 dark:text-slate-500 bg-black/20 dark:bg-slate-50 p-2 rounded-lg border border-white/5 dark:border-slate-200">
                                {links[0]?.query || 'Initializing...'}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <button
                            onClick={() => setShowViewer(true)}
                            className="w-full md:w-auto bg-primary hover:bg-primary/90 text-white px-8 md:px-10 py-3.5 md:py-4 rounded-[1.25rem] md:rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl shadow-primary/30"
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
