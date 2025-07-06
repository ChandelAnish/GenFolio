import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadFileToCloudinary(
  file: string,
  userId: string,
  category: string
) {
  // Upload an image or PDF
  const uploadResult = await cloudinary.uploader
    .upload(file, {
      public_id: `${category}-${userId}`,
      resource_type: "auto",
    })
    .catch((error) => {
      console.log(error);
    });

  return uploadResult?.secure_url;
}

export async function POST(req: NextRequest) {
  const { file, userId, category } = await req.json();
  try {
    const fileURL = await uploadFileToCloudinary(file, userId, category);
    console.log("fileURL: ", fileURL);
    return NextResponse.json({ fileURL });
  } catch(err) {
    console.error(err);
    return NextResponse.json({ error: `File upload failed` }, { status: 500 });
  }
}
