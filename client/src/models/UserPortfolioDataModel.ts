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
/*
const UserPortfolioData = models.UserPortfolioData || model("UserPortfolioData", UserPortfolioDataSchema);
        models.UserPortfolioData:
                -> models is a Mongoose global object that stores all registered models.
                -> If the model "UserPortfolioData" already exists (because Next.js hot-reloads files), it reuses the existing model instead of redefining it.

        model("UserPortfolioData", UserPortfolioDataSchema):
                -> If the "UserPortfolioData" model does not exist, it creates a new model using PortfolioSchema.
*/

export default UserPortfolioData;
