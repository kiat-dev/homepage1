import SearchBox from "./desk-comp/TravelSearchBox";
import { TrvTable } from "./desk-comp/Table1";
import Card1 from "./desk-comp/Card1";
import Card2 from "./desk-comp/Card2";
import { lazy, Suspense } from "react";
const Download_Modal = lazy(() => import("./Modals").then((m) => ({ default: m.Download_Modal })));

const Rules_Modal = lazy(() => import("./Modals").then((m) => ({ default: m.Rules_Modal })));

const Login_Modal = lazy(() => import("./Modals").then((m) => ({ default: m.Login_Modal })));



import { usePage } from '@inertiajs/react'
import TrvsState from "./desk-comp/trvsstate";

const BodyDesktop = () => {
    return (
        <div className="flex flex-col">
            <div className="relative max-w-full w-full flex flex-row justify-center items-center">
                <img
                    src="/img/login-background.jpg"
                    className="w-[98%] h-50  rounded-2xl border border-white"
                    alt="Background"
                    loading="eager"
                />
                <div className="absolute top-10 w-full text-center text-[200%] text-sky-200/20">
                    HoPoN   <div>{usePage().props.dat?.name}</div>
                </div>
                <div className="absolute -bottom-[15px] max-w-[95%] w-full text-center flex items-center justify-center">
                    <SearchBox />

                </div>
            </div>
            <div className="w-full flex flex-row justify-around mt-10 p-2">
                <div className="fji w-1/4 text-white">
                    <div className="grid grid-rows-3 text-sm justify-center items-center gap-2 " >
                        <div className="fji py-3 bg-sky-400/70  px-5 rounded-md animate-shine"> قیمت‌های پایین</div>
                        <div className="fji py-3 bg-red-400/70  px-5 rounded-md  animate-shine">  رزرو راحت </div>
                        <div className="fji py-3 bg-emerald-500/70 px-5 rounded-md inline-flex  animate-shine">  راننده های مطمئن</div>
                    </div>
                </div>
                <div className="min-w-1/2"><TrvTable /></div >
                <div className="fji w-1/4"><TrvsState /></div >
            </div>
            <Card1 />
            <Card2 />
            <Suspense fallback={<div>Loading...</div>}>
                <Download_Modal />
                <Login_Modal />
                <Rules_Modal />
            </Suspense>
            <div className="w-full h-[2px] bg-white mu-3"></div>
        </div>
    );
};

export default BodyDesktop;
