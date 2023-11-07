import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/Components/layout/navigation";
import bg from "../images/background.jpg"

const inter = Inter({ subsets: ["latin"] });
const img = require("../images/background.jpg")

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
        <main>
          <img className="background" src={bg.src} alt="background"/>
          <div className="page">{children}</div>
        </main>
      </body>
    </html>
  );
}
