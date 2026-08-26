import type { Metadata } from "next";
import { Merriweather, Mulish } from "next/font/google";
import "@/styles/globals.scss";

const serif = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Mulish({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "John Edmondson — Software Engineer & Maker",
    template: "%s · John Edmondson",
  },
  description:
    "Portfolio and writing of John Edmondson, a software engineer based in Freiburg, Germany.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
