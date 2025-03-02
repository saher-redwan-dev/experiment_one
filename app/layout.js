import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { GlobalContextProvider } from "@/context/store";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <GlobalContextProvider>
        <body className={inter.className}>
          <Suspense fallback="loading... nav">
            <Navbar />
          </Suspense>
          <main>{children}</main>
        </body>
      </GlobalContextProvider>
    </html>
  );
}
