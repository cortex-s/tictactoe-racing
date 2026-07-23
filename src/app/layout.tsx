import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai } from "next/font/google";
import "./globals.css";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["thai", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tic-Tac-Toe Grand Prix",
  description:
    "Win tic-tac-toe rounds to gun your racer down a 20-block track first.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="h-full antialiased">
      <body
        className={`${ibmPlexSansThai.className} min-h-full flex flex-col bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
