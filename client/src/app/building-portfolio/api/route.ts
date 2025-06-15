import connectToDB from "@/lib/mongodb";
import UserPortfolioData from "@/models/UserPortfolioDataModel";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/clerk-sdk-node";


export async function POST(req: NextRequest){
    const { userId } = await auth();
    console.log("userId: ",userId)

    // user input data
    const userInput = await req.json()
    console.log("hello")

    // ai generated data
    const response = await axios.post("http://localhost:8000/portfolioData",userInput)
    const aiResponse = response.data
    // console.log(aiResponse)
    
    await connectToDB()
    const newUser = await UserPortfolioData.create({username: userInput.profileData.email, portfolio: aiResponse})
    
    // Update Clerk session claim
    await clerkClient.users.updateUserMetadata(userId!, {
      publicMetadata: {
        hasPortfolio: true,
      },
    });
    return NextResponse.json({userInput, aiResponse,newUser})
    // return NextResponse.json({newUser})
}

// export async function GET(req: NextRequest){
//     await connectToDB()
//     const allUsers = await UserPortfolioData.find({})
//     return NextResponse.json(allUsers[0])
//     // return NextResponse.json({newUser})
// }