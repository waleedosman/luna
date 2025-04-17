import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { Web3Provider } from "@/provider"; // ✅ added Web3Provider wrapper
import '@rainbow-me/rainbowkit/styles.css'; // ✅ Required!

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luna - Premier Sonic Launchpad",
  description: "Launch your project on the Sonic blockchain with Luna",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen bg-black text-white antialiased flex flex-col`}
      >
        <Web3Provider>
          <Navigation />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </Web3Provider>
      </body>
    </html>
  );
}
