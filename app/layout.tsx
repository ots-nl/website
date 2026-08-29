import type { Metadata } from "next";
import { Anton, Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

// Anton — display face for hero headlines and section titles.
// Ships one weight (400) which renders as bold-condensed.
// Brand Bible §4.2: never used below 32px.
const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  display: "block",
  variable: "--font-anton",
});

// Cormorant Garamond Italic — the editorial accent word.
// Used exactly once per page, on a single word inside a display headline.
// Brand Bible §4.2: "the single most opinionated visual choice on the site".
const cormorant = Cormorant_Garamond({
  weight: "500",
  style: "italic",
  subsets: ["latin"],
  display: "block",
  variable: "--font-cormorant",
});

// Inter — body copy, UI, buttons, navigation, forms.
// The neutral, hard-working face that carries meaning without personality.
const inter = Inter({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "OTS — Business Operating Systems voor dienstverleners in Nederland",
  description:
    "Wij bouwen Business Operating Systems voor restaurants, klinieken en professionele dienstverleners in Nederland. Minder handwerk. Betere data. Systemen die stil hun werk doen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="nl"
      className={`${anton.variable} ${cormorant.variable} ${inter.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
