import { Geist, Geist_Mono,Roboto, Oswald } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import Navbar from "@/components/shared/Navbar";
import StoreProvider from "@/components/provider/StoreProvider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
});
const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "700"], 
});

export const metadata = {
  title: "Inventroy management",
  description: "Inventroy management system for dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} ${oswald.variable} antialiased`} >
        <StoreProvider>
          <ThemeProvider>
            {/* <Navbar></Navbar> */}
            {children}
          </ThemeProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
