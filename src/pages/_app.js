import { CartProvider } from "@/contexts/CartContext"; // Importer CartProvider
import "../styles/globals.css"; // Importer globale stilarter
import TopNav from "@/components/TopNav"; //importere vores komponenter 
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";
import RunningBanner from "@/components/RunningBanner"
import Image from "next/image";
import Star from "../../public/pics/blackstar.svg"

function MyApp({ Component, pageProps }) {

// et array der indeholder HTML-elementer og et billede som bruges til at vise information på vores løbene banner
//bliver importeret herinde, da dette er vores globale layout. 
  const bannerItems = [
    <div key="1" className="text-xl font-bold">FOO FEST</div>,
    <div key="2" className="text-xl font-bold">DECEMBER 02th - 20th, 2024</div>,
    <div key="3" className="text-xl font-bold">
      <Image
        src={Star}
        alt="star"
        width={35}
        height={35}
        priority
      />
    </div>,
  ];
  return (
    // vores provider til createContext, så vi har adgang fra context. 
    <CartProvider>
      <div className="layout-wrapper"> 
        <TopNav />
        <main>
          <Component {...pageProps} />
        </main>
        <div>
    <RunningBanner items={bannerItems} speed="medium" />
    </div>
        <Footer />
        {/* Sørg for, at BottomNav kun vises på mobile enheder */}
        <div className="z-20 block md:hidden">
          <BottomNav />
        </div>
      </div>
    </CartProvider>
  );
}
// denne komopoent fungerer som en wrapper for alle siger på vores sider. 
export default MyApp;
