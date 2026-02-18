import type { Metadata } from "next";
import { Inter, Caprasimo } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
});

const caprasimo = Caprasimo({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-logo",
});

export const metadata: Metadata = {
    title: "Giggles - Your Next Side Project",
    description: "Find teammates for your next big idea.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${caprasimo.variable}`}>
            <body className="font-sans antialiased">
                <NavBar />
                <main>{children}</main>
            </body>
        </html>
    );
}
