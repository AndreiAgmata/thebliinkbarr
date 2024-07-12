import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import NextAuthSessionProvider from "../../providers/NextAuthSessionProvider";
import { CartProvider } from "@/context/CartContext";
import { ShippingDetailsProvider } from "@/context/ShippingDetailsContext";

const Satoshi = localFont({
  src: [
    {
      path: "../../public/Fonts/Satoshi-Bold.otf",
      weight: "700",
    },
    {
      path: "../../public/Fonts/Satoshi-Medium.otf",
      weight: "500",
    },
    {
      path: "../../public/Fonts/Satoshi-Regular.otf",
      weight: "400",
    },
    {
      path: "../../public/Fonts/Satoshi-Light.otf",
      weight: "300",
    },
  ],
});

export const metadata: Metadata = {
  title: "TheBliinkBarr",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Satoshi.className}>
        <NextAuthSessionProvider>
          <CartProvider>
            <ShippingDetailsProvider>{children}</ShippingDetailsProvider>
          </CartProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
