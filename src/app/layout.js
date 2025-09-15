import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import ReduxProvider from "@/lib/ReaduxProvider";
import AuthCheck from "@/components/AuthCheck";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GradLink",
  description: "Alumni connect web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          <AuthCheck/>
          <Navbar/>
        {children}
        </ReduxProvider>
        
      </body>
    </html>
  );
}
