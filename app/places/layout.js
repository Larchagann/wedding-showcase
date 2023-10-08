import Footer from "@/Components/layout/Footer";

export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
