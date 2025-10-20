import { Car, CircleUser, CookingPot, DollarSign, User } from "lucide-react";

export default function Card() {
    return (
        <div className="flex flex-row space-x-3  p-4">
            <div className="flex flex-col space-y-3 bg-white rounded-2xl p-4">
                <div className="flex flex-row gap-3">
                    <div className="size-5"> <DollarSign color="blue" /></div>
                    <div className=" whitespace-nowrap"> قیمت‌های پایین</div>
                </div>
                <div className="text-sm text-gray-800">فرقی نمی‌کند کجا می‌روید، تنها یا با همسفر، از بین طیف گسترده‌ای از
                    مقاصد
                    و مسیرهای
                    ما، بهترین مسیر را با قیمت‌های پایین پیدا کنید.</div>
            </div>
            <div className="flex flex-col space-y-3 bg-white rounded-2xl p-4">
                <div className="flex flex-row gap-3">
                    <div className="size-5"> <User color="red" /></div>
                    <div className="">راننده های مطمئن </div>
                </div>
                <div className="text-sm text-gray-800">ما برای شناخت تک تک اعضا و شرکای اتوبوس‌رانی خود وقت می‌گذاریم. ما
                    نظرات، پروفایل‌ها و مدارک شناسایی را بررسی می‌کنیم، بنابراین شما می‌دانید با چه کسی سفر می‌کنید و
                    می‌توانید سفر خود را با خیال راحت در پلتفرم امن ما رزرو کنید.</div>
            </div>
            <div className="flex flex-col space-y-3 bg-white rounded-2xl p-4">
                <div className="flex flex-row gap-3">
                    <div className="size-5"> <CookingPot color="green" /></div>
                    <div className="">رزرو راحت!</div>
                </div>
                <div className="text-sm text-gray-800">رزرو سرویس هیچ‌وقت به این آسانی نبوده است! به لطف اپلیکیشن ساده‌ی ما که
                    از فناوری پیشرفته‌ای بهره می‌برد، می‌توانید در عرض چند دقیقه سرویسی نزدیک به خودتان رزرو کنید.</div>
            </div>
        </div>
    );
}