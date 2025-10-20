import React, { useState, useRef } from "react";
import clsx from "clsx";
import { ALRT_ERR, ALRT_OK } from "@/comcom/ALert";
import { progress } from "@inertiajs/react";
import { Car, Hand } from "lucide-react";

/**
 * ImageUploader
 * --------------------------------------
 * Features:
 * - Select and preview image
 * - Resize + compress client-side
 * - Optional auto-upload via Inertia router
 * - Clean and reset functions
 * - Extendable via className / style props
 */

export default function ImageUploader({
    size = 150,
    id,
    className = "",
    style = {},
    routeName = null,         // Laravel route name (string)
    dat = {},                 // Additional params for upload
    uploadOnChange = true,   // Auto-upload when file selected
    onUploadSuccess = () => { },
    onUploadProcess = () => { },
    setLoading = () => { },
    setSelectedOrNot = () => { },
}) {
    // Step 1: Local state + references
    const [file, setFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const fileInputRef = useRef();

    // Step 2: Configuration
    const MAX_SIZE = 450 * 1024; // 350 KB target max size
    const MIN_QUALITY = 0.5;
    const MAX_WIDTH = 900;

    // Step 3: Handle file selection
    const handleFile = async (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile) return;
        //const resizedFile = selectedFile;
        const resizedFile = await resizeImage(selectedFile);
        console.log(
            `Final Size: ${(resizedFile.size / 1024).toFixed(2)} KB`
        );
        setFile(resizedFile);
        // Preview image
        const reader = new FileReader();
        reader.onload = (e) => setImageUrl(e.target.result);
        reader.readAsDataURL(resizedFile);
        // Auto-upload if enabled
        if (routeName && uploadOnChange) {
            uploadImage(resizedFile);
        }
    }

    // Step 4: Resize + compress the image
    const resizeImage = (file) => {
        return new Promise((resolve) => {
            const img = new Image();
            const reader = new FileReader();
            reader.onload = (e) => (img.src = e.target.result);
            img.onload = () => {
                let quality = 0.7;
                let width = img.width;
                let height = img.height;

                // Limit image width
                if (width > MAX_WIDTH) {
                    height = (height * MAX_WIDTH) / width;
                    width = MAX_WIDTH;
                }

                // Create canvas
                const canvas = document.createElement("canvas");
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, width, height);

                // Recursive compression
                const tryCompress = () => {
                    canvas.toBlob(
                        (blob) => {
                            const compressedSizeKB = blob.size / 1024;
                            if (compressedSizeKB <= MAX_SIZE || quality <= MIN_QUALITY) {
                                resolve(new File([blob], file.name, { type: blob.type }));
                            } else {
                                quality -= 0.1;
                                tryCompress();
                            }
                        },
                        "image/jpeg",
                        quality
                    );
                };

                tryCompress();
            };

            reader.readAsDataURL(file);
        });
    };

    // Step 5: Upload image via axios
    const uploadImage = async (imageFile) => {
        if (!routeName) return;

        const formData = new FormData();
        formData.append("img", imageFile);

        // Add extra params
        for (const key in dat) {
            formData.append(key, dat[key]);
        }
        progress.start();
        setLoading(true);
        const response = await axios.post(routeName, formData, {
            headers: { "Content-Type": "multipart/form-data", },
            onUploadProgress: (e) => {
                const percentCompleted = Math.round((e.loaded * 100) / e.total);
                onUploadProcess(percentCompleted);
            },
        }).then((r) => {
            onUploadSuccess(r.data);
            progress.finish();
            setLoading(false);
            if (!r.data.suc) {
                cleanImage();
                ALRT_ERR(r.data.msg || "خطایی در آپلود تصویر رخ داده است. لطفا مجددا تلاش کنید.");
                return;
            }
            ALRT_OK(r.data.msg || "اپلود موفق");
            setSelectedOrNot(true);
        }).catch((error) => {
            ALRT_ERR("خطایی در آپلود تصویر رخ داده است. لطفا مجددا تلاش کنید.");
            cleanImage();
            progress.finish();
            setLoading(false);
        });
    };

    // Step 6: Reset image + input
    const cleanImage = () => {
        setFile(null);
        setImageUrl("");
        if (fileInputRef.current) fileInputRef.current.value = null;
        setSelectedOrNot(false);
    };

    // Step 7: Render component
    return (
        <div
            className={clsx("flex flex-col items-center space-y-2 text-white", className)}
            style={style}
        >
            {/* Hidden file input */}
            <input
                type="file"
                className="hidden"
                onChange={handleFile}
                accept="image/*"
                ref={fileInputRef}
            />

            {/* Image display / picker */}
            <div
                className={clsx("border flex items-center justify-center cursor-pointer border-gray-400")}
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                style={{
                    borderRadius: "8px",
                    width: size,
                    height: size,
                    maxHeight: size,
                    ...style,
                }}
            >
                {!imageUrl && (
                    <>
                        <Hand color="gray" className="size-12 animate-bounce" />
                    </>
                )}
                {imageUrl && (
                    <img
                        src={imageUrl}
                        id={`img--${id}`}
                        className="object-contain border cursor-pointer"
                        style={{ maxWidth: "100%", maxHeight: "100%" }}
                    />
                )}
            </div>

            {/* Clean button */}
            {imageUrl && (
                <button
                    id={`btn---${id}`}
                    onClick={cleanImage}
                    className="bg-red-500 text-white text-[80%] px-2 py-1 rounded"
                >
                    پاک کردن
                </button>
            )}
        </div>
    );
}
