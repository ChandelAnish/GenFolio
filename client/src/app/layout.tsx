import StoreProvider from "@/store/StoreProvider";
import "./globals.css";

export const metadata = {
  title: "GenFolio",
  description: "Portfolio generating website",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <StoreProvider>
        <html lang="en">
          <body>{children}</body>
        </html>
    </StoreProvider>
  );
}
