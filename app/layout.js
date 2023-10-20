import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/Components/layout/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mariage de Yann & Lucie",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <link
          href="https://fonts.googleapis.com/css?family=Allura"
          rel="stylesheet"
        />
        <Navigation />
        {children}
      </body>
    </html>
  );
}
