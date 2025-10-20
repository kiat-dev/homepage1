import React from "react";

export default function CircularUploadProgress({ visible, percent = 0, label = "Uploading..." }) {
    if (!visible) return null;

    const size = 140;
    const strokeWidth = 10;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const clamped = Math.max(0, Math.min(100, percent));
    const offset = circumference - (clamped / 100) * circumference;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/40 backdrop-blur-sm">
            <div className="flex flex-col items-center justify-center bg-white/10 rounded-2xl p-6 shadow-2xl">
                <svg
                    width={size}
                    height={size}
                    viewBox={`0 0 ${size} ${size}`}
                    className="mb-4"
                >
                    {/* Background circle */}
                    <circle
                        stroke="#e5e7eb"
                        strokeWidth={strokeWidth}
                        fill="transparent"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                    />
                    {/* Progress circle */}
                    <circle
                        stroke="url(#gradient)"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        fill="transparent"
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        className="transition-[stroke-dashoffset] duration-300 ease-linear transform -rotate-90 origin-center"
                    />
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                    </defs>
                </svg>

                <div className="text-center text-white">
                    <div className="text-2xl font-bold">{Math.round(clamped)}%</div>
                    <div className="text-sm opacity-80">{label}</div>
                </div>
            </div>
        </div>
    );
}
