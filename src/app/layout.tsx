import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Web3ModalProvider from '@/context/Web3Modal'
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ChainMeet",
    description: "Wallet-Based Dating App",
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const headersList = await headers();
    const cookies = headersList.get('cookie');

    return (
        <html lang="en">
            <body className={inter.className}>
                <Web3ModalProvider cookies={cookies}>
                    {children}
                </Web3ModalProvider>
            </body>
        </html>
    );
}
