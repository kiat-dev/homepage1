import { CircleCheck, CircleCheckIcon, Clock, ClockIcon, Snowflake } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import { travelStore } from "./../../ST/TRVS";
import { observer } from "mobx-react-lite";


function TrvsState() {
    const { pending, during, done, pageLoaded } = travelStore;
    if (!pageLoaded) return null;
    return (
        <div className="text-white w-full fji ">
            <div className="grid grid-rows-3 items-center justify-around gap-2 text-xs whitespace-nowrap bg-white/10 rounded-2xl">
                <div className="flex items-center flex-1 justify-between w-full border border-gray-400 rounded-sm bg-yellow-400/50">
                    <ClockIcon className="mr-1 bg-yellow-400 rounded-full text-black animate-pulse" />
                    <div className=" p-2 py-3">سفرهای ثبت شده </div>
                    <AnimatedCounter className="text-center p-2 text-md  min-w-[50px]" target={pending} duration={1} />
                </div>
                <div className="flex items-center flex-1 justify-between w-full border border-gray-400 rounded-sm bg-red-400/50">
                    <Snowflake className="size-5 mr-1 animate-spin text-red-200" />
                    <div className=" p-2 py-3">در حال سفر</div>
                    <AnimatedCounter className="text-center p-2 text-md  min-w-[50px]" target={during} duration={1} />
                </div>
                <div className="flex items-center flex-1 justify-between w-full border border-gray-400 rounded-sm bg-emerald-400/50">
                    <CircleCheckIcon className="mr-1 text-white bg-emerald-400 rounded-full" />
                    <div className=" p-2 py-3">سفرهای  پایان یافته </div>
                    <AnimatedCounter className="text-center p-2 text-md  min-w-[50px]" target={done} duration={1} />
                </div>
            </div>
        </div>
    )
}

export default observer(TrvsState);