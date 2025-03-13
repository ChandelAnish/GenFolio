import axios from "axios";
import ActionDispatchWrapper from "@/components/ActionDispatchWrapper";
import { PortfolioData } from "@/types";

export const metadata = {
  title: "myPortfolio",
  description: "Portfolio generating website111",
};

const getPortfolioData = async () => {
  const response = await axios.get("http://localhost:3000/api");
  const data: PortfolioData = response.data;
  return data;
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data: PortfolioData = await getPortfolioData();

  return <ActionDispatchWrapper data={data}>{children}</ActionDispatchWrapper>;
}
