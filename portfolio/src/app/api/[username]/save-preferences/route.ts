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

  const body = await req.json();
  if (body.variant === "resume") {
    const { theme, fontStyle } = body;
    console.log(theme, fontStyle);
    if (!theme || !fontStyle) {
      return NextResponse.json({ error: `theme or fontStyle not found` }, { status: 400 });
    }
    await connectToDB();

    const updatedPortfolioData = await UserPortfolioData.findOneAndUpdate(
      { username: username },
      { "preferences.resume": {theme, fontStyle} },
      { new: true, runValidators: true }
    );
    if (!updatedPortfolioData) {
      return NextResponse.json(
        { error: "user Portfolio not found" },
        { status: 404 }
      );
    }
  } else {
    const { theme } = body;
    console.log(theme);
    if (!theme) {
      return NextResponse.json({ error: "theme not found" }, { status: 400 });
    }
    await connectToDB();

    const updatedPortfolioData = await UserPortfolioData.findOneAndUpdate(
      { username: username },
      { "preferences.portfolio.theme": theme },
      { new: true, runValidators: true }
    );
    if (!updatedPortfolioData) {
      return NextResponse.json(
        { error: "user Portfolio not found" },
        { status: 404 }
      );
    }
  }
  return NextResponse.json({
    success: true,
    msg: `${body.variant} preferences saved`,
  });
}
