import { v2 as cloudinary } from "cloudinary";

const uploadOnCloudinary = async (file, folder) => {
    const options = { folder };
    options.resource_type = "auto";
    console.log("temp file path ", file.tempFilePath)
    console.log("options are : ", options)
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log("Upload result:", result);
        return result;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return null;
    }
};

export { uploadOnCloudinary };
