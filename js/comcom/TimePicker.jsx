import { useState } from "react";
import clx from "clsx";

export default function TimePicker({ onChange, className }) {
    const [showHourModal, setShowHourModal] = useState(false);
    const [showMinuteModal, setShowMinuteModal] = useState(false);
    const [hour, setHour] = useState(null);
    const [minute, setMinute] = useState(null);

    const handleHourSelect = (h) => {
        setHour(h);
        setShowHourModal(false);
        setShowMinuteModal(true); // open minute modal automatically
    };

    const handleMinuteSelect = (m) => {
        setMinute(m);
        setShowMinuteModal(false);
        if (onChange) onChange({ hour, m });
    };

    return (
        <div className={clx(className, "space-y-3")}>
            {/* Display selected time */}
            <div className="flex items-center gap-2" style={{ direction: "ltr" }}>
                <button
                    onClick={() => setShowHourModal(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                >
                    {hour !== null ? hour.toString().padStart(2, "0") : "ساعت"}
                </button>
                <span className="text-lg font-semibold">:</span>
                <button
                    onClick={() => hour !== null && setShowMinuteModal(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
                >
                    {minute !== null ? minute.toString().padStart(2, "0") : "دقیقه"}
                </button>
            </div>

            {/* Hour Modal */}
            {showHourModal && (
                <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-xl shadow-lg w-72">
                        <h3 className="text-center font-bold mb-3">ساعت را انتخاب کنید</h3>
                        <div className="grid grid-cols-5 gap-2">
                            {[...Array(24)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleHourSelect(i)}
                                    className="py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
                                >
                                    {i.toString().padStart(2, "0")}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowHourModal(false)}
                            className="mt-3 w-full py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            لغو
                        </button>
                    </div>
                </div>
            )}

            {/* Minute Modal */}
            {showMinuteModal && (
                <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-xl shadow-lg w-64">
                        <h3 className="text-center font-bold mb-3">دقیقه را انتخاب کنید</h3>
                        <div className="grid grid-cols-4 gap-2">
                            {[0, 15, 30, 45].map((m) => (
                                <button
                                    key={m}
                                    onClick={() => handleMinuteSelect(m)}
                                    className="py-2 rounded-lg hover:bg-blue-500 hover:text-white transition"
                                >
                                    {m.toString().padStart(2, "0")}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowMinuteModal(false)}
                            className="mt-3 w-full py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                        >
                            لغو
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
