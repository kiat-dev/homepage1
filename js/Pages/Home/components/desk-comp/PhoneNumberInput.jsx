import { useState } from "react";

export function PhoneNumberInput() {
    const [num, setNum] = useState("");

    const handleInput = (e) => {
        let value = e.target.value;
        value = value
            .replace(/\D/g, "") // remove non-digits
            .slice(0, 11) // limit to 11 numbers
            .replace(/^(\d{4})(\d{0,3})(\d{0,4})$/, (_, a, b, c) =>
                [a, b, c].filter(Boolean).join("-")
            );
        setNum(value);
    };

    return (
        <div >
            <div className="text-sm text-orange-700 p-1">شماره تماس</div>
            <input
                type="text" placeholder="0999-888-7766" inputMode="numeric" required value={num} onInput={handleInput}
                className="rounded-md border relative block w-full px-4 py-2 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm text-center"
                style={{ letterSpacing: ".4rem", direction: "ltr" }}
                dir="ltr" size="22"
            />
        </div>
    );
}
