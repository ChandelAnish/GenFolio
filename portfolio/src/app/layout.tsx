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

  return (
    <StoreProvider>
      <ActionDispatchWrapper data={data}>
        <html lang="en">
          <body>{children}</body>
        </html>
      </ActionDispatchWrapper>
    </StoreProvider>
  );
}
