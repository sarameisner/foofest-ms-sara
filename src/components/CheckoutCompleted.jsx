import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Star from "../../public/pics/star.svg";
import ButtonWIcon from "./ButtonWIcon";
import ticketDisplay from "../../public/pics/ticketdisplay.png";
import supabase from "@/config/supabaseClient";

const CheckoutCompleted = () => {
  // state til at gemme email for den seneste reservation
  const [email, setEmail] = useState(null);
  // indlæsningsstatus
  const [loading, setLoading] = useState(true);
  // eventuelle fejlmeddelser
  const [error, setError] = useState(null); //

  // henter sidste data fra supabase
  useEffect(() => {
    const fetchLatestReservationEmail = async () => {
      try {
        setLoading(true);

        // så den henter det seneste fra vores databasen og ikke det øverste.
        const { data, error } = await supabase
          // henter tabellen
          .from("foofest")
          // men henter kun email feltet
          .select("email")
          // sorterer efter oprettelsestid
          .order("created_at", { ascending: false })
          // begrænser til den seneste reservation
          .limit(1);

        if (error) {
          setError(error.message);
          setEmail(null);
        } else {
          setEmail(data[0]?.email); // Henter data array som er email
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    // kalder funktionen for at hente data
    fetchLatestReservationEmail();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[var(--background)] text-[var(--font-color)] px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4">YOUR BOOKING IS COMPLETED</h1>
      <p className="text-lg mb-4">Thank you for your purchase!</p>
      {email && (
        <div className="text-sm mb-8">
          <p className="text-lg">The email for your latest booking is: {email}</p>
        </div>
      )}

      <div className="w-72 h-auto mb-8">
        <Image src={ticketDisplay} alt="Ticket Display" layout="responsive" objectFit="contain" />
      </div>
      <Link href="/">
        <ButtonWIcon defaultIcon={<Image src={Star} alt="Default Icon" width={20} height={20} />} text="Home" />
      </Link>
    </div>
  );
};

export default CheckoutCompleted;

// sidste trin i checkout flowet juhu
// her henter vi email-adressen fra den seneste booking i vores supabase og viser den i browseren
