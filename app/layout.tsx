import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Akash Pal",
  description: "A collection of blog posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <header className="border-b border-gray-200 bg-white">
            <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
              <Link href="/" className="text-lg font-semibold text-gray-900">
                Akash Pal
              </Link>
              <nav className="flex items-center">
                <Link href="/blog" className="text-gray-700 hover:text-gray-900 ml-6">Blog</Link>
                <Link href="/about" className="text-gray-700 hover:text-gray-900 ml-6">About</Link>
              </nav>
            </div>
          </header>

          <main className="max-w-5xl mx-auto px-6 py-8 flex-1">{children}</main>

          <footer className="border-t border-gray-100 mt-12 py-6 text-sm text-gray-500">
            <div className="max-w-5xl mx-auto px-6">© {new Date().getFullYear()} Akash Pal</div>
          </footer>
        </div>
      </body>
    </html>
  );
}
