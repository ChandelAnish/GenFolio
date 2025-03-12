import "./globals.css"

export const metadata = {
  title: 'GenFolio',
  description: 'Portfolio generating website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
