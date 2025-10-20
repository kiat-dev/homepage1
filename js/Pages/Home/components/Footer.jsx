

export default function Footer() {
    return (
        <div className="">
            {/* Main Footer */}
            <div className="w-full flex justify-around p-3 rounded-sm text-white">
                {/* About Section */}
                <div className="flex flex-col space-y-4 text-sm">
                    <div className="text-xl">درباره ما</div>
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            console.log("درباره چیپی clicked");
                            // Replace with your state logic
                        }}
                    >
                        درباره چیپی
                    </div>
                    <div className="cursor-pointer">راه های ارتباطی</div>
                    <div>cdfg</div>
                </div>

                {/* Image */}
                <img
                    src={"/img/pp.png"} // Update path
                    alt="Logo"
                    className="h-[150px] pr-[20px]"
                />

                {/* How It Works Section */}
                <div className="flex flex-col space-y-4 text-sm">
                    <div className="text-xl">نحوه کار چیپی</div>
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            console.log("قوانین سایت clicked");
                            // Replace with your state logic
                        }}
                    >
                        قوانین سایت
                    </div>
                    <div>cdfg</div>
                    <div>cdfg</div>
                </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] w-full my-2 bg-amber-50 border-t-1 border-white"></div>

            {/* Footer Bottom */}
            <div dir="ltr" className="w-full text-white text-center  text-sm flex justify-center items-center">
                <span className="text-2xl mx-1">©</span>CopyWrite {window.location.hostname} <span className="text-2xl mx-1">©</span>
            </div>
        </div>
    );
}
