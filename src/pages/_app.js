import { CartProvider } from "@/contexts/CartContext"; // Importer CartProvider
import "../styles/globals.css"; // Importer globale stilarter
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

function MyApp({ Component, pageProps }) {
  return (
    // vores provider til createContext
    <CartProvider>
      <div className="layout-wrapper">
        <TopNav />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
        {/* Sørg for, at BottomNav kun vises på mobile enheder */}
        <div className="z-20 block md:hidden">
          <BottomNav />
        </div>
      </div>
    </CartProvider>
  );
}

export default MyApp;
