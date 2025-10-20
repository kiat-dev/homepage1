import { NumInput } from "./Mine";

export default function MoneyInput({ size = 24, className, ...props }) {
    return <input
        className="border border-gray-300 rounded-sm text-right p-1 px-2 text-sm w-full"
        label="120,000"
        size={size}
        {...props}
    />;
}