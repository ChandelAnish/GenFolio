import StoreProvider from "@/store/StoreProvider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";


export const metadata = {
  title: "GenFolio",
  description: "Portfolio generating website",
  icons:{
    icon: "/favicon.png"
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <StoreProvider>
            <div className="w-full min-h-screen flex flex-col justify-center bg-gradient-to-t from-cyan-700/30 to-black">
              {children}
            </div>
          </StoreProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
