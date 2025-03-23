import mongoose, { Schema, model, models } from "mongoose";
import { UserInputSchema } from "./userInputSchema";
import { PortfolioSchema } from "./portfolioSchema";

// Portfolio Data Schema
const UserPortfolioDataSchema = new Schema({
    userInput: { type: UserInputSchema },
    portfolio: { type: PortfolioSchema },
  });

// Create or use existing model
const UserPortfolioData = models.UserPortfolioData || model("UserPortfolioData", UserPortfolioDataSchema);

export default UserPortfolioData;