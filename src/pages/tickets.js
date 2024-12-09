import React from "react";
import Head from "next/head";
import Tickets from "@/components/Tickets";
import path from "path";
import fs from "fs";

export default function TicketsPage({ tickets }) {
  return (
    <>
      <Head>
        <title>fooFest Tickets</title>
        <meta name="description" content="fooFest Tickets Page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Tickets tickets={tickets} />
    </>
  );
}

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "tickets.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  const tickets = JSON.parse(fileContents);

  return {
    props: {
      tickets,
    },
  };
}
