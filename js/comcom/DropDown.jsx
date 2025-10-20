import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { List } from "lucide-react";

export function DDWN({
    children,
    btnClass = "",
    btn = <List width={19} height={19} />,
    className = "",
    style = {},
}) {
    const [open, setOpen] = useState(false);
    const [dropUp, setDropUp] = useState(false);
    const ref = useRef(null);
    const menuRef = useRef(null);

    // Detect if there's enough space below, otherwise open upwards
    useEffect(() => {
        if (!open) return;

        const rect = ref.current?.getBoundingClientRect();
        const menuHeight = menuRef.current?.offsetHeight || 150;
        const viewportHeight = window.innerHeight;

        if (rect && rect.bottom + menuHeight > viewportHeight - 10) {
            setDropUp(true);
        } else {
            setDropUp(false);
        }
    }, [open]);

    // Click outside → close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={ref} className="relative inline-flex flex-col items-center">
            <div onClick={() => setOpen(!open)}
                className={clsx("p-2 flex items-center justify-center rounded-sm bg-yellow-400 cursor-pointer select-none", btnClass)}>{btn}</div>
            <div
                ref={menuRef}
                className={clsx("absolute right-0 rounded-sm fji transition-all duration-200 ease-in-out z-50",
                    dropUp ? "bottom-full" : "top-full ", className)}
                style={style}
                hidden={!open}
            >
                {children}
            </div>
        </div>
    );
}
