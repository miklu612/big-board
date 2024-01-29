import * as React from "react"

export const metadata = {
  title: 'Big Board',
  description: 'A simple message board',
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
