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
    // <StoreProvider>
    <html lang="en">
      <body>
        <div className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-t from-cyan-700/30 to-black">
          {children}
        </div>
      </body>
    </html>
    // </StoreProvider>
  );
}
