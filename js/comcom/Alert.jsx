import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";

// Create a ref to hold the global function
const alertRef = {
    showAlert: null
};

export default function Alert() {
    const [alert, setAlert] = useState({
        visible: false,
        type: "info",
        header: "",
        message: "",
    });

    useEffect(() => {
        // Assign the function to the ref
        alertRef.showAlert = (type, header, message, time = 3000) => {
            setAlert({ visible: true, type, header, message });
            if (time > 0) {
                setTimeout(() => setAlert((prev) => ({ ...prev, visible: false })), time);
            }
        };
    }, []);

    const hideAlert = () => {
        setAlert(prev => ({ ...prev, visible: false }));
    };

    if (!alert.visible) return null;

    const typeClasses = {
        info: "border-sky-500 text-sky-600 bg-sky-50",
        success: "border-green-500 text-green-600 bg-green-50",
        warning: "border-yellow-500 text-yellow-600 bg-yellow-50",
        danger: "border-red-500 text-red-600 bg-red-50",
    };

    const iconClasses = {
        info: "bg-sky-500/15 text-sky-600",
        success: "bg-green-500/15 text-green-600",
        warning: "bg-yellow-500/15 text-yellow-600",
        danger: "bg-red-500/15 text-red-600",
    };

    return (
        <div className="fixed top-2 left-1/2 transform -translate-x-1/2 w-screen max-w-md z-[2000]">
            <div
                className={`rounded-md border-1 py-1.5 px-3 flex items-center gap-3 ${typeClasses[alert.type]}`}
                style={{ boxShadow: "0 0 10px 1px rgba(255, 255, 255, 0.8)" }}
            >
                <button
                    onClick={hideAlert}
                    className="flex-shrink-0 text-gray-500 hover:text-gray-700"
                >
                    <X size={16} />
                </button>

                <div className="flex-1 text-center">
                    {alert.header && (
                        <div className="text-xs  mb-2">{alert.header}</div>
                    )}
                    <div className="text-[75%]">{alert.message}</div>
                </div>

                <div className={`rounded-full p-2 flex-shrink-0 ${iconClasses[alert.type]}`}>
                    {/* You can add custom icons here based on type */}
                    <div className="w-4 h-4 flex items-center justify-center text-xs font-bold">
                        {alert.type === 'danger' && '!'}
                        {alert.type === 'success' && '✓'}
                        {alert.type === 'warning' && '⚠'}
                        {alert.type === 'info' && 'i'}
                    </div>
                </div>
            </div>
        </div>
    );
}

// 🔥 exported helpers - these will work after the Alert component is mounted
export function ALRT_ERR(text, header = "") {
    if (alertRef.showAlert) {
        alertRef.showAlert("danger", header, text);
    } else {
        console.warn("Alert component not mounted yet");
        // Fallback: you could queue these calls or use a different approach
    }
}

export function ALRT_OK(text, header = "") {
    alertRef.showAlert?.("success", header, text);
}

export function ALRT_INF(text, header = "") {
    alertRef.showAlert?.("info", header, text);
}

export function ALRT_WAR(text, header = "") {
    alertRef.showAlert?.("warning", header, text);
}

// Alternative: Export a function that can be called directly
export const showAlert = (type, header, message, time = 3000) => {
    alertRef.showAlert?.(type, header, message, time);
};