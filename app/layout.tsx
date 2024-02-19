import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/convex-client-provider";
import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/providers/modal-providers";
import { Suspense } from "react";
import Loading from "@/components/auth/loading";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boardify",
  description:
    "Boardify is a cutting-edge SaaS online board application designed to enhance team collaboration. It allows users to create boards, share ideas, and manage projects seamlessly with teammates, fostering a productive and interactive workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense fallback={<Loading />}>
          <ConvexClientProvider>
            <Toaster />
            <ModalProvider />
            {children}
          </ConvexClientProvider>
        </Suspense>
      </body>
    </html>
  );
}
