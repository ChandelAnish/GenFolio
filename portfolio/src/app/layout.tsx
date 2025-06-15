import StoreProvider from "@/store/StoreProvider";
import "./globals.css";

export const metadata = {
  title: "my-Portfolio",
  description: "my Portfolio website",
};



export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html
      lang="en"
      className="scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-transparent overflow-y-scroll"
    >
      <body>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
