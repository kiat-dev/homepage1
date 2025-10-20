import React, { useState } from "react";
import clsx from "clsx";

export default function FloatingLabelInput({
    label = "شهر مقصد",
    value = "",
    onChange,
    type = "text",
    className1 = "",
    className2 = "",
    ...props
}) {
    const [focused, setFocused] = useState(false);
    const isActive = focused || (value && value.length > 0);

    return (
        <div className={clsx("relative flex-1", className1)}>
            {/* Label */}
            <label
                className={clsx("absolute px-2 transition-all duration-400 ease-in-out pointer-events-none",
                    isActive ?
                        "-top-[.7rem] text-xs text-[60%] text-blue-600 rounded-sm -translate-x-1/2 border left-1/2 py-1 px-1 bg-white"
                        : "top-1/2 text-xs animate-pulse -translate-y-1/2 pb-2 rounded-sm pt-1 left-1/2 -translate-x-1/2 text-gray-500")}
            >
                {label}
            </label>

            {/* Input */}
            <input
                type={type}
                value={value}
                onChange={onChange}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className={clsx(" bg-white/50 h-13  min-w-[150px] w-full border border-gray-800 text-center rounded-md  focus:border-emerald-500 focus:ring-1 focus:ring-emerald-400 outline-none transition-all duration-150", className2)}
                {...props}
            />
        </div>
    );
}
