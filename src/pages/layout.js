"use client";

import "@/styles/globals.css"; // Sørg for, at stien er korrekt
import TopNav from "@/components/TopNav";
import { StoreProvider } from "@/contexts/storeContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <TopNav />
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
