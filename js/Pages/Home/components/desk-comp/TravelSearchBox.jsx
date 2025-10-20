import { ArrowDown, ArrowDownToDot, Calendar, CalendarClock, Rainbow, Search } from "lucide-react";
import React, { useState, useEffect } from "react";
import { usePage } from '@inertiajs/react';
import Dropdown from "./DropDown";
import CtInput from "../../../../comcom/CTInput";



export default function SearchBox(children) {
    const [leavingFrom, setLeavingFrom] = useState("");
    const [goingTo, setGoingTo] = useState("");
    const [travelDate, setTravelDate] = useState("هفته آینده");
    const [travelDateVal, setTravelDateVal] = useState("all");
    const { props } = usePage();
    const { days } = props;



    const submitForm = () => {
        console.log({ leavingFrom, goingTo, travelDate, travelDateVal });
        // Add your search logic here
    };


    return (
        <div
            id="search-box"
            className="border border-pink-700 flex items-center justify-around bg-white rounded-md shadow-md p-2 py-3 space-x-4 w-full max-w-5xl mx-auto"
        >
            {/* Leaving From */}
            <div className="flex items-center space-x-2 rounded-sm">
                <div className="flex flex-col h-full justify-center items-center text-sm mb-1">
                    <Rainbow color="red" />
                    <div className="text-[70%]">مبدا</div>
                </div>
                <CtInput onSelected={setLeavingFrom} placeholder={"مبدا..."} classname={"!py-[.5rem] text-sm"} />
            </div>

            {/* Going To */}
            <div className="flex items-center space-x-2 rounded-sm">
                <div className="flex flex-col h-full justify-center items-center text-sm  mb-1">
                    <Rainbow color="green" />
                    <div className="text-[70%]">مقصد</div>
                </div>
                <CtInput onSelected={setGoingTo} placeholder={"مقصد..."} classname={"!py-[.5rem] text-sm"} />
            </div>

            {/* Travel Date */}
            <div
                dir="rtl"
                className="relative flex items-center space-x-3 max-w-xs text-blue-800"
            >
                <div className="flex flex-col h-full justify-center items-center text-sm mb-1">
                    <CalendarClock color="blue" />
                </div>
                <Dropdown options={days} value={travelDate} onChange={setTravelDate} onChange1={setTravelDateVal} />
            </div>

            {/* Search Button */}
            <div
                onClick={submitForm}
                className="flex items-center justify-around space-x-3 bg-sky-900 hover:bg-sky-600 text-white px-4 py-2 rounded-sm cursor-pointer"
            >
                <div>جستجو</div>
                <div className="w-5 h-5">
                    <Search />
                </div>
            </div>
        </div >
    );
}
