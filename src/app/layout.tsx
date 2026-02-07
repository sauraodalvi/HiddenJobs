
import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import JsonLd from "@/components/seo/JsonLd";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: {
    default: "HiddenJobs | Find Unlisted Jobs on Greenhouse, Lever & Ashby",
    template: "%s | HiddenJobs"
  },
  description: "The #1 Search Engine for the 'Hidden Job Market'. Bypass LinkedIn and search 50,000+ unlisted tech jobs directly on ATS platforms like Greenhouse, Lever, and Ashby.",
  keywords: ["hidden job market", "ATS search", "Greenhouse jobs", "Lever jobs", "remote tech jobs", "job wrapper", "bypass linkedin", "unlisted jobs"],
  authors: [{ name: "HiddenJobs Team" }],
  creator: "HiddenJobs",
  icons: {
    icon: '/icon',
    apple: '/apple-icon',
  },
  metadataBase: new URL("https://hiddenjobs.netlify.app"),
  verification: {
    google: "56R-JruPxjmoOonvhlzkMpNgJqO9-PG-AEJsjPXX_pw",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hiddenjobs.netlify.app",
    title: "HiddenJobs | Find the 60% of Jobs Not on LinkedIn",
    description: "Search 50k+ live unlisted roles directly on Greenhouse, Lever, and Ashby. Stop competing with 1000+ applicants on LinkedIn.",
    siteName: "HiddenJobs",
    images: [
      {
        url: "/og-image.png", // We will need to generate this or placeholder
        width: 1200,
        height: 630,
        alt: "HiddenJobs Search Interface",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HiddenJobs | Uncover Hidden Tech Jobs",
    description: "Search 50k+ live unlisted roles directly on Greenhouse, Lever, and Ashby.",
    images: ["/og-image.png"],
    creator: "@HiddenJobs",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "vdongugfyk");
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <JsonLd />
        </ThemeProvider>
      </body>
    </html>
  );
}
