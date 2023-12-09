import "@styles/globals.css";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";

export const metadata = {
  title: {
    template: "%s | WikaGotuje",
    default: "WikaGotuje",
  },
  description:
    "Znajdź nowe smaki, eksperymentuj w kuchni i twórz wyjątkowe dania razem z społecznością pasjonatów kulinarnych.",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="pl">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
