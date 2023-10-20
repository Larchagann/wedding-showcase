import Navbar from "@/Components/layout/navbar";
import "../styles/globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mariage de Yann & Lucie",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <link href='https://fonts.googleapis.com/css?family=Allura' rel='stylesheet'></link>
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
