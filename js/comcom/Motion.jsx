import { motion, AnimatePresence } from "motion/react";
import clsx from "clsx";
export function BOD({ hidden, children, className = "" }) {
    return (<div hidden={hidden} className="w-full h-full" >
        {!hidden && <MOY className={clsx("w-full h-full flex flex-col items-center max-h-[90vh]  pt-4 overflow-y-auto  bg-white/1 ", className)}>

            {children}

        </MOY>}
    </div>)
}


/* Fade only */
export function MO({ className = "", children, time = 0.1, ...props }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: time }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

/* Fade + vertical slide */
export function MOY({ className = "", children, time = 0.1, ...props }) {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: time }}
            {...props}
        >
            {children}
        </motion.div>
    );
}

/* Vertical slide only */
export function MY({ className = "", children, time = 0.1, ...props }) {
    return (
        <motion.div
            className={className}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            exit={{ y: 20 }}
            transition={{ duration: time }}
            {...props}
        >
            {children}
        </motion.div>
    );
}
