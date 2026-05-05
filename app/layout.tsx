import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FuelNow - Emergency Fuel Delivery",
  description: "Get emergency fuel delivered to your location in minutes. Safe, verified fuel with pay on delivery.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}