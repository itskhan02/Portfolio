import mongoose from "mongoose";
import { GridFSBucket, ObjectId } from "mongodb";

const BUCKET_NAME = "portfolioImages";

export const getGridFSBucket = () => {
  if (!mongoose.connection.db) {
    throw new Error("MongoDB is not connected");
  }

  return new GridFSBucket(mongoose.connection.db, { bucketName: BUCKET_NAME });
};

export const uploadImageFile = async (file, metadata = {}) => {
  if (!file || !file.buffer) {
    throw new Error("No image file buffer was provided");
  }

  const bucket = getGridFSBucket();
  const uploadStream = bucket.openUploadStream(file.originalname || "portfolio-image", {
    contentType: file.mimetype || "application/octet-stream",
    metadata: {
      ...metadata,
      originalName: file.originalname || "",
      uploadedAt: new Date().toISOString(),
    },
  });

  await new Promise((resolve, reject) => {
    uploadStream.on("finish", resolve);
    uploadStream.on("error", reject);
    uploadStream.end(file.buffer);
  });

  return uploadStream.id;
};

export const getImageStream = (fileId) => {
  if (!fileId) {
    throw new Error("Image file id is required");
  }

  const bucket = getGridFSBucket();
  const validId = ObjectId.isValid(fileId) ? new ObjectId(fileId) : null;

  if (!validId) {
    throw new Error("Invalid image file id");
  }

  return {
    bucket,
    stream: bucket.openDownloadStream(validId),
  };
};

export const deleteImageFile = async (fileId) => {
  if (!fileId) return;

  const bucket = getGridFSBucket();
  const validId = ObjectId.isValid(fileId) ? new ObjectId(fileId) : null;

  if (!validId) return;

  try {
    await bucket.delete(validId);
  } catch (error) {
    if (error?.code !== 26 && error?.message !== "File not found") {
      console.error("GridFS image cleanup failed:", error.message || error);
    }
  }
};
