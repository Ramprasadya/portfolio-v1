import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProfileContextProvider from "@/components/context/context";
import { Analytics } from "@vercel/analytics/next"
import OGImage from './home.png'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ramprasad yadav - Full Stack Developer",
  description: " Full-stack developer creating fast, scalable web applications.",
keywords: [
  "portfolio website",
  "personal portfolio",
  "web developer portfolio",
  "software developer portfolio",
  "frontend developer portfolio",
  "full-stack developer portfolio",
  "responsive web design",
  "custom website development",
  "website design",
  "website development",
  "website template",
  "UI/UX design",
  "React developer",
  "Next.js developer",
  "MERN stack developer",
  "professional portfolio",
  "modern portfolio design",
  "customizable website",
  "website builder",
  "created with qviq.io",
],
    openGraph: {
      type: "website",
      url: "https://ramprasad.site",
      title: "Ramprasad yadav - Full Stack Developer",
      description:
        " Full-stack developer creating fast, scalable web applications.",
      images: [
        {
          url: OGImage.src,
          width: OGImage.width,
          height: OGImage.height,
          alt: "Ramprasad Porftfolio",
        },
      ],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#000e25]`}
      >
        <ProfileContextProvider>
        {children}
        <Analytics/>
        </ProfileContextProvider>
      </body>
    </html>
  );
}
