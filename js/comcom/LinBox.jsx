import { useEffect, useRef, useState } from "react";
import { Button } from "@/comcom/Mine";

export default function LinMagsMap({ trv, visible = false, onClose = () => { } }) {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const featureGroupRef = useRef(null);

    // Initialize and update map
    useEffect(() => {
        if (!visible) return;
        if (!window.L || !mapRef.current) return;
        if (mapInstance.current) mapInstance.current.remove();
        const map = L.map(mapRef.current, {
            center: [35.6892, 51.3890],
            zoom: 10,
            maxZoom: 20,
            dragging: true,
            touchZoom: true,
            doubleClickZoom: true,
            scrollWheelZoom: true,
        });
        map.attributionControl.setPrefix(false);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: false,
        }).addTo(map);
        mapInstance.current = map;
        const interval = setInterval(() => map.invalidateSize(), 200);

        let cities = [];
        let ob = {};
        ob.city = trv.mab.city;
        ob.latlng = [trv.mab.lat, trv.mab.lng];
        cities.push(ob);
        for (const mag of trv.mags) {
            if (mag.data.city) {
                ob = {};
                ob.city = mag.data.city;
                ob.latlng = [mag.data.lat, mag.data.lng];
                cities.push(ob);
            }
        }

        // Add markers and lines
        const featureGroup = L.featureGroup().addTo(map);
        featureGroupRef.current = featureGroup;

        for (const ob of cities) {
            L.marker(ob.latlng, {
                icon: L.divIcon({
                    html: `<div class="absolute -left-5 -top-4 px-2 py-1 text-sky-500 border  bg-white/93 fji rounded-md  whitespace-nowrap">${ob.city}</div>`,
                    iconSize: [0, 0],
                    className: "label-icon",
                }),
            }).addTo(featureGroup);
        };

        for (let i = 0; i < cities.length - 1; i++) {
            L.polyline([cities[i].latlng, cities[i + 1].latlng], {
                color: "blue",
                weight: 2,
                opacity: .8,
            }).addTo(featureGroup);
        }

        // // Fit to bounds

        if (featureGroup.getLayers().length > 0) {
            map.fitBounds(featureGroup.getBounds(), {
                paddingTopLeft: [30, 30],
                paddingBottomRight: [30, 80],
            });
        }


        return () => {
            clearInterval(interval);
            map.remove();
            mapInstance.current = null;
        };
    }, [visible]);

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50" hidden={!visible}>
            <div className="bg-white rounded-lg w-[90%] h-[80%] relative p-2">
                <div ref={mapRef} id="showmap" className={`w-full h-full rounded-xl border relative`}>
                    <Button onClick={() => onClose(false)} className="absolute bottom-0 bg-red-400 text-white border-gray-700 px-6 py-1 rounded shadow z-1000" >
                        بستن
                    </Button>
                </div>
            </div>
        </div>
    );
}
