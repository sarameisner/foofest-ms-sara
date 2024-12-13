import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "../styles/Schedule.module.css";

const Band = ({ band, isBandPlaying, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const bandRef = useRef(null);

  useEffect(() => {
    const currentBand = bandRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.1 }
    );

    if (currentBand) {
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
        <p className="text-[1.25rem] uppercase p-1">{band.name}</p>
      </Link>
      
    </div>
  );
};

export default Band;
