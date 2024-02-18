import "../styles/globals.css";
import { Inter } from "next/font/google";
import Navigation from "@/Components/layout/navigation";
import bg from "../images/background.jpg";
import banner from "../images/banner.png";
import Context from "@/context/context";
import Banner from "@/Components/banner";

require("dotenv").config();

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
        <Context>
          <Navigation />
          <main>
            <img className="background" src={bg.src} alt="background" />
            <div className="page">
              <Banner />
              <div className="page-content">{children}</div>
            </div>
          </main>
        </Context>
      </body>
    </html>
  );
}
