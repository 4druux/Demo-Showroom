import { Poppins } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "./layout.client";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata = {
  title: "Demo Showroom",
  description:
    "Platform showroom online untuk beli, jual, dan tukar tambah mobil secara mudah, cepat, dan terpercaya.",
  icons: {
    icon: "/demoweb.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` ${poppins.variable}  font-antialiased`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
