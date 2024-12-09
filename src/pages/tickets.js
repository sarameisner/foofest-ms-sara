import React from "react";
import Tickets from "@/components/Tickets";
import path from "path";
import fs from "fs";

export default function TicketsPage({ tickets }) {
  return (
    <>
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
