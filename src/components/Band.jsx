import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../styles/Schedule.module.css"; // grunden til vi bruger style sheet her er fordi vi skal lave en animation, det nemmere at ændre i

//iBandPlaying er en boolean som brugrs til at bestemme om bandet skal vises som aktivitet i UI'en
const Band = ({ band, isBandPlaying, index }) => {
  // state-variabel for at vise band listen langsomt from
  const [isVisible, setIsVisible] = useState(false);
  // en reference til DOM elementet som denne komponent render hvilket gr det muligt at tilgå elementet direkte
  const bandRef = useRef(null);
-
// Mounter komponenter så det bliver vist i DOM elementer
  useEffect(() => {
    const currentBand = bandRef.current;

    // Observer giver muligjed for at element træder ind i viewporten
    const observer = new IntersectionObserver(
      // Når observeren opfanger ændringer i synlighed og kører den et call-funktionen
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      // Angiver a observeen vil udløse når 10% af elementet er synligt i viewporten
      { threshold: 0.1 }
    );

    //referer af bandRef
    if (currentBand) {
      //rydder op i observeren når komoponenter fjernes. Forhondrer hukommelseslækager.
      observer.observe(currentBand);
    }

    return () => {
      if (currentBand) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <div
      ref={bandRef}
      className={`${styles.band} ${isBandPlaying ? styles.active : ""} ${
        isVisible ? styles.visible : styles.hidden
      }`}
      style={{ "--index": index }}
    >
      <Link href={`/bands/${band.slug || band.name.toLowerCase().replace(/ /g, "-")}`}>
        <p className="text-[1.25rem] uppercase p-[--padding-5]">{band.name}</p>
      </Link>
      
    </div>
  );
};

export default Band;
