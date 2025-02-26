import Providers from './providers'
import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import ToastProvider from "./component/toastProvider";
import "./globals.css";

const poppins = Poppins({
  weight: ['400', '600', '700'],  
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "LearnQube",
  description: "Think Beyond the Cube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Providers>
            {children}
            <ToastProvider />
        </Providers>
      </body>
    </html>
  );
}