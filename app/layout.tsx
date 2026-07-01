import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Header from "./components/header";
import Footer from "./components/footer";
import { getSiteUrl } from "@/lib/site-url";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "AI Support Desk",
    template: "%s | AI Support Desk",
  },
  description:
    "Diagnose, troubleshoot, and escalate issues faster with AI-powered support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Runs before paint — prevents flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var s=localStorage.getItem('theme');if(s==='dark'){document.documentElement.classList.add('dark')}else if(s==='light'){document.documentElement.classList.add('light')}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ClerkProvider>
          <Header />
          {children}
          <Footer />
        </ClerkProvider>
      </body>
    </html>
  );
}
