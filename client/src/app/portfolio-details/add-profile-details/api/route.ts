import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";

async function uploadImageToCloudinary(profileImage: string, username: string) {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(profileImage, {
      public_id: `profileImage-${username}`,
    })
    .catch((error) => {
      console.log(error);
    });

  return uploadResult?.secure_url;
}

export async function POST(req: NextRequest) {
  const { profileImage, username } = await req.json();
  try {
    const profileImageURL = await uploadImageToCloudinary(profileImage, username);
    console.log(profileImageURL);
    return NextResponse.json({ profileImageURL });
  } catch {
    return NextResponse.json({ error: "Image upload failed" });
  }
}
