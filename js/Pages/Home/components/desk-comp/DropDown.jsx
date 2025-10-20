import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react"; // you can replace with your icon

const Dropdown = ({ options, value, onChange, onChange1 }) => {
    const [open, setOpen] = useState(false);
    const [dropUp, setDropUp] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        if (open && ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const spaceAbove = rect.top;

            if (spaceBelow < 200 && spaceAbove > spaceBelow) {
                setDropUp(true);
            } else {
                setDropUp(false);
            }
        }
    }, [open]);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative  w-40">
            {/* Trigger */}
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm hover:border-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
                {value}
                <ChevronDown className={`w-4 h-4 transform transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown list */}
            {open && (
                <ul
                    className={`absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-white border-red-300 shadow-2xl transition-all ${dropUp ? "bottom-full mb-1" : "top-full mt-1"}`}
                >
                    <li className="bg-red-50 cursor-pointer px-3 py-1.5 border-b-1 border-gray-300 text-sm text-black hover:bg-blue-500 hover:text-white"
                        onClick={() => { onChange("هفته آینده"); onChange1("all"); setOpen(false); }}
                    >هفته آینده</li>
                    {options.map((opt, i) => (
                        <li key={i} onClick={() => { onChange(opt); onChange1(i); setOpen(false); }}
                            className="even:bg-emerald-50 odd: bg-red-50 cursor-pointer px-3 py-1.5 border-b-1 border-gray-300 text-sm text-black hover:bg-blue-500 hover:text-white"
                        >
                            {opt}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
