import connectToDB from "@/lib/mongodb";
import UserPortfolioData from "@/models/UserPortfolioDataModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const username = decodeURIComponent((await params).username);

  if (!username) {
    return NextResponse.json(
      { error: "Username not found in cookies login Again" },
      { status: 400 }
    );
  }

  await connectToDB();

  const userPortfolioData = await UserPortfolioData.findOne({
    "userInput.profileData.email": username,
  });

  if (!userPortfolioData) {
    return NextResponse.json(
      { error: "User Portfolio not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(userPortfolioData.portfolio);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const newPortfolioData = await req.json();

  const username = decodeURIComponent((await params).username);
  // console.log("Extracted Username:", username);

  if (!username) {
    return NextResponse.json(
      { error: "Username not found in cookies login Again" },
      { status: 400 }
    );
  }

  await connectToDB();

  const updatedPortfolioData = await UserPortfolioData.findOneAndUpdate(
    { "userInput.profileData.email": username },
    { portfolio: newPortfolioData.newPortfolioData },
    { new: true, runValidators: true }
  );
  if (!updatedPortfolioData) {
    return NextResponse.json(
      { error: "user Portfolio not found" },
      { status: 404 }
    );
  }
  return NextResponse.json(updatedPortfolioData);
}
