import React, { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";

export default function PageLoader({ children, delay = 1000 }) {
    const [ready, setReady] = useState(false);
    const [rd, setRD] = useState(false);

    useEffect(() => {
        // Step 1: Handle document ready
        const handleReady = () => {
            setTimeout(() => setRD(true), 300);
            setTimeout(() => setReady(true), delay);
        };

        if (document.readyState === "complete") {
            setTimeout(handleReady, 100);
        } else {
            window.addEventListener("load", setTimeout(handleReady, 100));
            document.addEventListener("DOMContentLoaded", setTimeout(handleReady, 100));
            return () => window.removeEventListener("load", setTimeout(handleReady, 100));
        }
    }, [delay]);

    return (
        <div className="w-full" style={{ background: "repeating-linear-gradient(180deg,#000 3px,#19085f 9px)", fontFamily: "!Vazir", direction: "rtl" }}>
            {!ready ?
                <div className="fixed inset-0 fji w-full h-full bg-[rgba(0,0,0,0.3)] z-[9999]">
                    <div className="relative fji">
                        <LoaderCircle className="absolute animate-spin text-white size-70" strokeWidth=".2" />
                        <LoaderCircle className="absolute animate-spin text-white size-73" strokeWidth=".1" />
                        <span className="absolute fji flex-row text-4xl" style={{ opacity: rd ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}>
                            <span>🌳</span>
                            <span>❤️</span>
                            <span>🌳</span>
                        </span>
                        <span className="absolute text-3xl text-white" style={{ opacity: rd ? 1 : 0, transition: "opacity 0.5s ease-in-out" }}>
                            HoPoN
                        </span>
                    </div>
                </div>
                : <></>}
            <div className="w-full" style={{ opacity: ready ? 1 : 0, transition: "opacity .3s ease-in-out", }}>
                <div className="w-full" style={{ opacity: ready ? 1 : 0, transition: "opacity .4s ease-in-out", }}>
                    {children}
                </div>
            </div>
        </div>
    );
}


