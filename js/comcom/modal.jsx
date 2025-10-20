import React, { useEffect, useRef, useState } from "react";
import { SquareX } from "lucide-react";
import { MY, MOY, MO } from '@/comcom/Motion'
import { AnimatePresence } from "motion/react";
import { observer } from 'mobx-react-lite';

export function Mod({ closeOnClickOutside = false, onClose, children, title, z = 50 }) {
    const modalRef = useRef();
    const [borderError, setBorderError] = useState(false);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            if (closeOnClickOutside) {
                onClose();
            } else {
                setBorderError(true);
                setTimeout(() => setBorderError(false), 250);
            }
        }
    };

    return (

        <div onMouseDown={handleClickOutside}
            className={`fixed inset-0 z-${z} flex items-center justify-center bg-[rgba(0,0,0,0.2)] backdrop-blur-md`}
            role="dialog" aria-modal="true"
        >
            <MOY time={.2} className="w-full h-full flex items-center justify-center">
                <div ref={modalRef} onMouseDown={(e) => e.stopPropagation()}
                    className={`bg-white rounded-lg shadow-lg p-3 pb-2 w-fit max-w-[95%]  relative transition-all duration-300 ${borderError ? "border-4 border-red-500" : ""}`}
                >
                    <div className="flex flex-row justify-between">
                        <div>{title}</div>
                        <SquareX onClick={onClose} className="cursor-pointer" />
                    </div>
                    <div className="w-full my-1 h-[1px] bg-gray-200"></div>
                    {children}
                </div>
            </MOY>
        </div>


    );
}

const Modal = observer(({ mod, name, title, children }) => {
    const close = () => mod.close(name);
    return (
        <AnimatePresence >
            {mod[name] && <Mod closeOnClickOutside={true} onClose={close} title={title}>
                {children}
            </Mod>}
        </AnimatePresence>

    );
});

export default Modal;