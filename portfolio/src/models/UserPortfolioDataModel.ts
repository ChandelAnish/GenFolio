import { Schema, model, models } from "mongoose";
import { PortfolioSchema } from "./portfolioSchema";

// Portfolio Data Schema
const UserPortfolioDataSchema = new Schema({
  username: { type: String, required: true, unique: true },
  preferences: {
    theme: { type: String, default: "default" },
  },
  portfolio: { type: PortfolioSchema },
});

// Create or use existing model
const UserPortfolioData =
  models.UserPortfolioData ||
  model("UserPortfolioData", UserPortfolioDataSchema);

export default UserPortfolioData;
