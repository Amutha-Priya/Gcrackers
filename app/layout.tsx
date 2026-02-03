import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HeaderBanner from "./components/TitleBanner/Header";
import Footer from "./components/footer/footer";
import { CartProvider } from "./components/Context/carcontext";

export const metadata: Metadata = {
  title: "G Crackers Shop",
  description: "Online Order Management System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <HeaderBanner />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
