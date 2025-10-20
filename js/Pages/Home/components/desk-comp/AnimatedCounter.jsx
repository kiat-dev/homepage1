import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function AnimatedCounter({ target = 0, duration = 2, className }) {
    const motionValue = useMotionValue(0);

    // Calculate stiffness & damping roughly based on duration
    const spring = useSpring(motionValue, { stiffness: 50, damping: 20 });

    const [display, setDisplay] = useState(0);

    useEffect(() => {
        // Reset counter
        motionValue.set(0);

        // Animate to target
        motionValue.set(target);

        const unsubscribe = spring.on("change", (latest) => {
            setDisplay(Math.floor(latest));
        });

        return () => unsubscribe();
    }, [target, motionValue, spring]);

    if (target === 0) return null;

    return (
        <motion.div
            className={className || "text-2xl font-bold"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration }}
        >
            {display}
        </motion.div>
    );
}
