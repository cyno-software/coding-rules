import "~/styles/globals.css"

import React from 'react'

import {
  GeistSans,
} from "geist/font/sans"
import {
  type Metadata,
} from "next"

import Providers from '~/app/providers'

export const metadata: Metadata = {
  title: "Cyno Next.js Boilerplate",
  description: "Cyno Next.js Boilerplate",
  icons: [
    {
      rel: "icon",
      url: "/favicon.ico",
    },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
    >
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
