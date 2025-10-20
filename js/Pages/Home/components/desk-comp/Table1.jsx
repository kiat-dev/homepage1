import { Button } from "@/comcom/Mine";
import { travelStore } from "./../../ST/TRVS";
import { mod } from "./../../ST/LG";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { motion, AnimatePresence } from "framer-motion";
import { LoaderCircle } from "lucide-react";

export const TrvTable = observer(() => {
    const { travels, loading, flashes } = travelStore;
    const [flashColors, setFlashColors] = useState({});

    useEffect(() => {
        if (!flashes) return;
        const temp = {};
        Object.entries(flashes).forEach(([id, { color, duration }]) => {
            temp[id] = color;
            setTimeout(() => {
                setFlashColors((prev) => {
                    const n = { ...prev };
                    delete n[id];
                    return n;
                });
            }, duration);
        });
        setFlashColors((prev) => ({ ...prev, ...temp }));
    }, [flashes]);

    const rowMotion = {
        initial: { opacity: 0, y: -10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.15 } },
        exit: {
            opacity: 0,
            x: 50,
            height: 0,
            color: "red",
            transition: { duration: 0.35 },
        },
    };

    return (
        <div className="max-w-[90%] mx-auto  text-sm flex flex-col items-center gap-4 whitespace-nowrap">
            {/* ADD BUTTON */}
            {/* <Button
                onClick={() => travelStore.addFake()}
                className="bg-black text-white hover:bg-gray-800 mb-2"
            >
                افزودن سفر جعلی
            </Button> */}

            <div className="relative bg-white shadow rounded-xl w-full ">
                <div className=" w-full fji py-1 text-emerald-900"> سفرها</div>
                <div className="overflow-y-auto max-h-[250px] relative">
                    <table className="min-w-full border border-gray-300">
                        {/* ✅ Correct header section */}

                        <thead
                            className="sticky top-0 z-10 bg-blue-900 text-white text-center text-[90%]
  [box-shadow:0_-10px_20px_rgba(0,0,0,0.8),5px_0_2px_rgba(0,0,0,0.8),-10px_0_5px_rgba(0,0,0,0.8)]"
                        >
                            <tr className="[_&>td]:border [_&>td]:border-gray-300 [_&>td]:p-1.5">
                                <td>#</td>
                                <td > سفر</td>
                                <td>مبدا</td>
                                <td>مقصد</td>
                                <td>تاریخ</td>
                                <td>زمان</td>
                                <td>ظرفیت</td>
                            </tr>
                        </thead>

                        <tbody>
                            <AnimatePresence initial={false}>
                                {travels.map((t) => {
                                    const trv = t.inf.trv;
                                    return (
                                        <motion.tr
                                            key={t.id}
                                            variants={rowMotion}
                                            initial="initial"
                                            animate="animate"
                                            exit="exit"
                                            onClick={() => mod.open("login")}
                                            style={{ backgroundColor: flashColors[t.id] || "white" }}
                                            className="text-[90%] text-center even:bg-gray-50 hover:bg-green-50 cursor-pointer transition-all [_&>td]:px-4 [_&>td]:py-2 [_&>td]:border [_&>td]:border-gray-300"
                                        >
                                            <td className="border border-gray-300 p-2 text-center items-center">
                                                <div className="w-2 h-2 bg-green-500 rounded-xs animate-spin"></div>
                                            </td>
                                            <td>{t.id}</td>
                                            <td>{trv.mabcity}</td>
                                            <td>
                                                {trv.mag3city ||
                                                    trv.mag2city ||
                                                    trv.mag1city ||
                                                    trv.mag0city}
                                            </td>
                                            <td>{trv.dshow}</td>
                                            <td>
                                                {trv.hshow}:{trv.mshow}
                                            </td>
                                            <td>{t.cap} نفر</td>
                                        </motion.tr>
                                    );
                                })}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {loading && (
                    <div className="absolute -top-10 left-0 flex justify-center items-center py-2">
                        <LoaderCircle className="animate-spin text-blue-900/50 mr-3 w-5 h-5" />
                    </div>
                )}
            </div>
        </div>
    );
});
