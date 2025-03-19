import connectToDB from "@/lib/mongodb";
import UserPortfolioData from "@/models/UserPortfolioDataModel";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
    // user input data
    const userInput = await req.json()
    // console.log(userInput)

    // ai generated data
    const response = await axios.post("http://localhost:8000/portfolioData",userInput)
    const aiResponse = response.data
    // console.log(aiResponse)
    
    await connectToDB()
    const newUser = await UserPortfolioData.create({userInput, portfolio: aiResponse})
    return NextResponse.json({userInput, aiResponse,newUser})
    // return NextResponse.json({newUser})
}