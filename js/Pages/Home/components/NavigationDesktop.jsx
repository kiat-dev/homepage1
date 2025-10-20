

import { Car, List, Cross, CarTaxiFront, PersonStanding, Download, Search } from "lucide-react";
import { useState } from "react"
import { useContext } from 'react';
import { scrollAndShine, Button } from "@/comcom/Mine";
import { DDWN } from "@/comcom/DropDown";
import { mod } from "./../ST/LG"


const NavigationDesktop = () => {

    return (
        <nav className="flex items-center justify-between bg-opacity-5 px-4 py-3 shadow-md text-blue-900 rounded-sm m-1">
            <div className="flex flex-row gap-3 ">
                <DDWN btnClass="mt-2">
                    <div className="stagger text-sm m-1 border border-red-200 flex text-center flex-col p-2 rounded-sm whitespace-nowrap gap-2 bg-red-400/20
                    [&>div]: border-b [&>div]:cursor-pointer [&>div]:border-gray-200 [&>div]:shadow-black [&>div]:shadow [&>div]:bg-white [&>div]:rounded-sm [&>div]:p-1">
                        <div>درباره ما</div>
                        <div>راهنمایی</div>
                        <div>سوالات متداول</div>
                        <div>تماس با ما</div>
                        <div>قوانین</div>
                        <div>حریم خصوصی</div>
                    </div>
                </DDWN>

                <Button variant="classic" className="bg-white !text-blue-800 border-2 border-sky-600" onClick={() => mod.open("login")}>
                    <div>ورود به ترمینال</div>
                    <CarTaxiFront width="18" height="18" />
                </Button>

            </div>
            <div className="flex flex-row gap-3 items-center">
                {/* <Button onClick={() => mod.open("download")}
                    variant="solid" className="bg-sky-600 px-3" >
                    <div>دانلود</div>
                    <Download height="18" />
                </Button> */}
                <img loading="eager" className="size-10 rounded-2xl border border-lime-400" src="/img/logo.jpg" alt="Login background" />
            </div>
        </nav >
    );
};


export default NavigationDesktop;
