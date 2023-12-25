import '@styles/globals.css';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import AuthProvider from '@components/AuthProvider';

export const metadata = {
  title: {
    template: '%s | WikaGotuje',
    default: 'WikaGotuje',
  },
  description:
    'Znajdź nowe smaki, eksperymentuj w kuchni i twórz wyjątkowe dania razem z społecznością pasjonatów kulinarnych.',
};

const RootLayout = ({ children }) => {
  return (
    <html lang='pl'>
      <body>
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
