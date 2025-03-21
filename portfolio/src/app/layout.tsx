import ActionDispatchWrapper from "@/components/ActionDispatchWrapper";
import StoreProvider from "@/store/StoreProvider";
import { PortfolioData } from "@/types";
import axios from "axios";
import "./globals.css";

export const metadata = {
  title: "my-Portfolio",
  description: "my Portfolio website",
};

const getPortfolioData = async () => {
  // const response = await axios.get("http://localhost:4000/building-portfolio/api");
  // const data = response.data;
  // console.log(data.portfolio.introduction)
  // return data.portfolio;
  const response = await axios.get("http://localhost:3000/api");
  return response.data
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data: PortfolioData = await getPortfolioData();

  return (
    <StoreProvider>
      <ActionDispatchWrapper data={data}>
        <html lang="en" className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent overflow-y-scroll">
          <body>{children}</body>
        </html>
      </ActionDispatchWrapper>
    </StoreProvider>
  );
}
