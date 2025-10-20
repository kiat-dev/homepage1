// LocationMap.jsx
import { CircleSmall, Loader, LocateFixed, MapPin, Pin } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/comcom/Mine";
import { ALRT_ERR, ALRT_INF } from "@/comcom/Alert";
import { usePage, progress } from "@inertiajs/react";


export function Map({
    loc, open, setLoc = () => { }, setOpen = () => { }, zoom = 15, }) {
    const { mapirkey } = usePage().props;
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const [showManualBtn, setShowManualBtn] = useState(false);
    const [location, setLocation] = useState(loc);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!open) return;
        if (!window.L || !mapRef.current) return;
        setLocation(loc);
        // remove existing map if any
        if (mapInstance.current) mapInstance.current.remove();

        const map = L.map(mapRef.current, {
            center: [location.lat, location.lng],
            zoom,
            maxZoom: 19,
            dragging: true,
            touchZoom: true,
            doubleClickZoom: true,
            scrollWheelZoom: true,
            attributionControl: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: false,

        }).addTo(map);

        mapInstance.current = map;

        const interval = setInterval(() => map.invalidateSize(), 200);

        return () => {
            clearInterval(interval);
            map.remove();
            mapInstance.current = null;
        };
    }, [open, location.lat, location.lng, zoom]);

    const goToCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((pos) => {
                const { latitude, longitude } = pos.coords;
                mapInstance.current?.setView([latitude, longitude], 14);
            });
        } else {
            alert("Geolocation not supported");
        }
    };

    const handleManualBtn = () => {
        if (!mapInstance.current) return;
        const center = mapInstance.current.getCenter();
        const newLoc = {
            lat: center.lat,
            lng: center.lng,
        };
        setLocation(newLoc);
        setLoc(newLoc);
        setOpen(false);
        ALRT_INF("لطفا شهر و نشانی  را به صورت دقیق وارد کنید.");
    };

    const confirmLocation = async () => {
        if (!mapInstance.current) return;
        const center = mapInstance.current.getCenter();
        if (!center) return ALRT_ERR("مکانی انتخاب نشده است.");

        try {
            progress.start();
            setLoading(true);
            const r = await axios.get("https://map.ir/reverse", {
                headers: {
                    "x-api-key": mapirkey,
                },
                params: { "lat": center.lat, "lon": center.lng },
            });
            if (r.status == 200 && r.data) {
                const newLoc = {
                    lat: center.lat,
                    lng: center.lng,
                    city: r.data.city,
                    province: r.data.province,
                    address: r.data.address_compact,
                    neighbourhood: r.data.neighbourhood,
                    postal_address: r.data.postal_address,
                };
                setLocation(newLoc);
                setLoc(newLoc);
                setOpen(false);
            }
            else {
                console.log("Error getting location:", r);
                ALRT_INF(" لطفا دوباره تلاش کنید و یا به صورت دستی نشانی را وارد کنید", "خطا در دریافت موقعیت.");
                setShowManualBtn(true);
            }
        } catch (err) {
            console.log("Error adding location:", err);
            ALRT_INF(" لطفا دوباره تلاش کنید و یا به صورت دستی نشانی را وارد کنید", "خطا در دریافت موقعیت.");
            setShowManualBtn(true);
        } finally {
            progress.finish();
            setLoading(false);
        }


    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg w-[90%] h-[80%] relative p-2">
                <div ref={mapRef} id="map" className="w-full h-full rounded-lg" style={{
                    filter: "contrast(1.1)  "
                }}>
                    <CircleSmall strokeWidth={5} className="map-center-icon" />
                </div>

                <button className="absolute fji cursor-pointer rounded-full border border-gray-500 p-3 bg-white/70 flex-col  top-10 text-xs right-10 text-black gap-1 z-600"
                    onClick={goToCurrentLocation}
                >
                    <LocateFixed size={24} />
                    <span>مکان فعلی</span>
                </button>

                <div className="absolute left-1/2 -translate-x-1/2 bottom-2 flex gap-2 z-600">
                    <Button
                        onClick={confirmLocation} disabled={loading}
                        className="bg-blue-500 text-white border-gray-700 px-3 py-1 rounded shadow min-w-[100px] "
                    >
                        {loading ? <Loader className="animate-spin" /> : "تایید موقعیت"}
                    </Button>
                    {showManualBtn && (
                        <Button
                            onClick={() => handleManualBtn()}
                            className="bg-yellow-500 border-black !text-gray-700 px-3 py-1 rounded shadow min-w-[100px] "
                        >
                            وارد کردن نشانی دستی
                        </Button>
                    )}
                    <Button
                        onClick={() => setOpen(false)}
                        className="bg-red-400 text-white border-gray-700 px-3 py-1 rounded shadow"
                    >
                        بستن
                    </Button>
                </div>
            </div>
        </div>
    );
}

export function ShowMap(data) {
    if (!window.L) return;
    const mapRef = useRef(null);
    let loc = data.loc;
    useEffect(() => {
        if (!loc?.lat || !loc?.lng) return;
        const map = L.map(mapRef.current, {
            center: [loc.lat, loc.lng],
            zoom: 15,
            maxZoom: 19,
            dragging: false,
            touchZoom: false,
            doubleClickZoom: false,
            scrollWheelZoom: false,
            zoomControl: false,
            attributionControl: false,
        });

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: false,
        }).addTo(map);

        const interval = setInterval(() => map.invalidateSize(), 200);

        return () => {
            map.remove();
            clearInterval(interval);
        };
    }, [loc]);

    return (
        <div className="relative w-full h-full">
            {/* Map tiles only */}
            <div
                ref={mapRef}
                className="w-full h-full"
                style={{ filter: "contrast(110%) grayscale(80%) saturate(20%)" }}
            ></div>

            {/* Marker overlay */}
            <CircleSmall
                strokeWidth={6}
                className="absolute size-3 map-center-icon "
            />
        </div>
    );
}