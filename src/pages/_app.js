// /src/pages/_app.js
import "../styles/globals.css"; // Importer globale stilarter
import TopNav from "@/components/TopNav";
import Footer from "@/components/Footer";
import BottomNav from "@/components/BottomNav";

function MyApp({ Component, pageProps }) {
  return (
    <div className="layout-wrapper">
      {/* Vis TopNav på større skærme */}
      <div>
        <TopNav />
      </div>

      {/* Vis den aktuelle side */}
      <main>
        <Component {...pageProps} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Vis BottomNav på mindre skærme */}
      <div className="block md:hidden">
        <BottomNav />
      </div>
    </div>
  );
}

export default MyApp;
