import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UpMake | Premium Custom Precision Items",
  description: "Discover precision-made 3D printed items and custom designs that elevate your space.",
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