import React, { useState } from "react";
import clsx from "clsx";

export default function FloatingLabelTextarea({
    label = "نشانی محل توقف",
    value,
    onChange,
    classNameContainer = "",
    classNameTextarea = "",
    rows = 4,
    ...props
}) {
    const [focused, setFocused] = useState(false);
    const isActive = focused || (value && value.length > 0);

    return (
        <div className={clsx("relative w-full", classNameContainer)}>
            {/* Label */}
            <label
                className={clsx("absolute px-2 transition-all duration-400 ease-in-out pointer-events-none",
                    isActive ?
                        "-top-[.7rem] text-xs text-[60%] text-blue-600 rounded-sm -translate-x-1/2 border left-1/2 py-1 px-1 bg-white"
                        : "top-1/2  animate-pulse  -translate-y-1/2 pb-2 text-xs rounded-sm pt-1 left-1/2 -translate-x-1/2 text-gray-500")}
            >
                {label}
            </label>

            <textarea
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                rows={2}
                cols={35}
                className={clsx(
                    "text-gray-800  h-13 fji p-2 pt-3 text-xs w-full text-[75%] bg-white/50 border border-gray-800  rounded-md focus:border-emerald-500 focus:ring-1 focus:ring-emerald-400 outline-none transition-all duration-150",
                    classNameTextarea
                )}
                {...props}
            />
        </div>
    );
}
