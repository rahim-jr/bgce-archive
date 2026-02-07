import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "BGCE Archive",
    description: "Best Golang Community Ever",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {/* Krakens Analytics */}
                <Script
                    src="https://krakens.nesohq.org/krakens.js"
                    strategy="afterInteractive"
                />
                <Script id="krakens-init" strategy="afterInteractive">
                    {`Krakens.init('hrd_6f7e57b8d05b26e2f0801e0e0bd6437d5295eefbf93589defcb04df743f4a776');`}
                </Script>

                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
