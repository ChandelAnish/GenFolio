import connectToDB from "@/lib/mongodb";
import UserPortfolioData from "@/models/UserPortfolioDataModel";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ username: string }> }
) {
  const username = decodeURIComponent((await params).username);

  if (!username) {
    return NextResponse.json({ error: "Username not found" }, { status: 400 });
  }

  const { theme } = await req.json();
  console.log(theme);
  if (!theme) {
    return NextResponse.json({ error: "theme not found" }, { status: 400 });
  }
  await connectToDB();

  const updatedPortfolioData = await UserPortfolioData.findOneAndUpdate(
    { username: username },
    { "preferences.theme": theme },
    { new: true, runValidators: true }
  );
  if (!updatedPortfolioData) {
    return NextResponse.json(
      { error: "user Portfolio not found" },
      { status: 404 }
    );
  }
  return NextResponse.json({ success: true, msg: "Preferences Saved" });
}
