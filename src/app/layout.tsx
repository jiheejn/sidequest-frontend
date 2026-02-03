import type { Metadata } from "next";
import { Roboto_Flex , Caprasimo, Zalando_Sans_Expanded } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar"; // Navbar 경로 확인

// 1. 본문용 (Medium 느낌의 깔끔한 Sans-serif)
const inter = Roboto_Flex({
    subsets: ["latin"],
    variable: "--font-sans"
});

// 2. 로고용 (Caprasimo)
const caprasimo = Caprasimo({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-logo"
});

// 3. 랜딩페이지 강조용 (Alfa Slab One)
const alfa = Zalando_Sans_Expanded({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-accent"
});

export const metadata: Metadata = {
    title: "Giggles - Your Next Side Project", // 앱 이름 변경
    description: "Find teammates for your next big idea.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${caprasimo.variable} ${alfa.variable}`}>
        <body className="font-sans antialiased"> {/* 기본 본문 폰트 적용 */}
        <NavBar />
        <main>{children}</main>
        </body>
        </html>
    );
}