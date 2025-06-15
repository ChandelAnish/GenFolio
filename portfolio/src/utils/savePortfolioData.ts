import { PortfolioData } from "@/types";
import fs from "fs";
import path from "path";

export const savePortfolioDataToFile = (portfolioData: PortfolioData) => {
  const filePath = path.join(process.cwd(), "tmp/savedPortfolioData.json");

  const jsonString = JSON.stringify(portfolioData, null, 2);

  fs.writeFileSync(filePath, jsonString, "utf8");
};
