import React, { useState, useEffect, useRef } from "react";

export default function CtInput({ onSelected, placeholder, className, size = 20 }) {
    const [cities, setCities] = useState([]);
    const [query, setQuery] = useState("");
    const [filteredCities, setFilteredCities] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedCity, setSelectedCity] = useState(null);
    const dropdownRef = useRef();

    useEffect(() => {
        const loadCities = async () => {
            const res = await fetch("/data/cts.json");
            const data = await res.json();
            setCities(data);
        };
        loadCities();
    }, []);

    useEffect(() => {
        if (query.trim() === "") {
            setFilteredCities([]);
        } else {
            const filtered = cities
                .filter(city =>
                    city.c.includes(query) || city.p.includes(query)
                )
                .sort((a, b) => {
                    const aIndex = a.c.indexOf(query);
                    const bIndex = b.c.indexOf(query);

                    if (aIndex !== bIndex) return aIndex - bIndex; // earlier match first
                    return a.c.length - b.c.length; // shorter match first
                });

            setFilteredCities(filtered);
        }
    }, [query, cities]);

    const handleSelect = (city) => {
        setSelectedCity(city);
        setQuery(city.c);
        setShowDropdown(false);
        onSelected(city.c);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <input
                size={size}
                type="text"
                value={query}
                onChange={(e) => {
                    setQuery(e.target.value);
                    setShowDropdown(true);
                }}
                onFocus={() => setShowDropdown(true)}
                placeholder={placeholder}
                className={`w-full text-center border border-gray-400 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200 ${className}`}
            />

            {showDropdown && filteredCities.length > 0 && (
                <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded mt-1 max-h-[100px] overflow-auto shadow-lg">
                    {filteredCities.map((city, i) => (
                        <li
                            key={i}
                            onClick={() => { handleSelect(city); }}
                            className="px-3 py-2 cursor-pointer border-b-1 border-gray-200 flex flex-row items-center justify-between hover:bg-blue-100 text-sm"
                        >
                            <span className="text-xs">{city.c}</span>
                            <span className="text-[60%]">{city.p}</span>
                        </li>
                    ))}
                </ul>
            )}


        </div>
    );
}
