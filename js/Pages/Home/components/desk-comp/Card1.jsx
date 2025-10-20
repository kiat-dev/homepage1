import { scrollAndShine } from "@/comcom/Mine";
import { mod } from "./../../ST/LG"
export default function Card() {
    return (
        <div
            className="bg-white flex flex-row justify-around w-[98%] mt-4 p-4 m-auto h-fit rounded-2xl"
            style={{ background: "repeating-linear-gradient(180deg,#f9f9f9,#f9f9f9 1px,#f3f4f6 6px,#e5e7eb 7px)", }}
        >
            <div className="w-2/3 flex flex-col justify-around bg-transparent">
                <div>
                    <div className="w-full text-center text-2xl">کجا می خوای بری؟</div>
                    <div className="w-full text-center m-3">بیاین باهم این سفر رو کم‌هزینه‌ کنیم...</div>
                </div>

                <div className="w-full flex flex-row  text-center text-sm space-x-20">
                    <div className="flex flex-col space-y-1 w-1/2">
                        <div>می خوای بری سفر؟</div>
                        <div>ماشین داری؟</div>
                        <div>خب سفرتو ثبت کن</div>
                        <div
                            onClick={() => mod.open("login")}
                            className="mt-2 flex justify-center items-center rounded-2xl p-2 px-6 bg-red-600 text-white cursor-pointer"
                        >
                            ثبت سفر
                        </div>
                    </div>

                    <div className="flex flex-col space-y-1 w-1/2">
                        <div>می خوای بری سفر؟</div>
                        <div>مسافری؟</div>
                        <div>سفرها رو چک کن</div>
                        <div
                            onClick={() => scrollAndShine()}
                            className="mt-2 flex justify-center items-center rounded-2xl p-2 px-6 bg-sky-600 text-white cursor-pointer"
                        >
                            جستجوی سفرها
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column */}
            <div className="w-1/2 flex justify-center items-center">
                <img
                    className="h-60 animate-pulse"
                    src={"/img/img1.svg"} // Adjust import path
                    alt="Illustration"
                />
            </div>
        </div>
    );


}