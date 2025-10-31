import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { NavBar } from "@/components/NavBar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
    title: "SideQuest - Find Your Team",
    description: "Find teammates for your side projects",
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className="dark">
            <NavBar />
            <main>{children}</main>
        </body>
        </html>
    )
}