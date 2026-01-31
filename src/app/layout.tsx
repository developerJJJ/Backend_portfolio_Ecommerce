import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VitalFoods | Premium Organic Superfoods",
  description: "Experience the purity of nature with our curated selection of organic superfoods and health-conscious essentials.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}