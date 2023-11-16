import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";

// import Drawer from "@/components/Drawer";
import { fontSans } from "@/lib/fonts";
import React from "react";

export const metadata: Metadata = {
  title: "BPGC Everyone",
  description: "A website to view BITS-GOA student information",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Live Age</title>
        <link rel="icon" href="/magnifying-glass.svg" />
      </head>
      <body
        className={cn(
          "dark:bg-stone-950 bg-white relative flex min-h-screen w-full justify-center scroll-smooth bg-background font-sans antialiased",
          fontSans.variable,
          // "dark"
        )}
      >
        <div className="flex flex-col items-center justify-center min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
