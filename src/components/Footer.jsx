const Footer = () => {
  return (
    <footer
      className="py-8"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--font-color)",
      }}
    >
      <div className="container mx-auto flex flex-wrap justify-between items-start">
        {/* venstre */}
        <div className="space-y-2">
          <h2 className="text-3xl font-bold italic font-display" style={{ color: "var(--font-color)" }}>
            Foo
          </h2>
          <p className="font-sans">Svinoy bygd, Faroe Islands</p>
          <p className="font-sans">+45 85 85 85 85</p>
          <a
            href="mailto:info@foofest.dk"
            className="hover:underline font-sans"
            style={{
              color: "var(--accent-color)",
            }}
          >
            info@foofest.dk
          </a>
          <p
            className="text-sm mt-4 font-sans"
            style={{
              color: "var(--light-grey-font)",
            }}
          >
            This is a student project website, 2023
          </p>
        </div>

        {/* højre sektion */}
        <div className="flex flex-wrap gap-8">
          <div className="space-y-1">
            <p className="font-bold font-sans">ABOUT</p>
            <p className="font-bold font-sans">PROGRAM</p>
            <p className="font-bold font-sans">TICKETS</p>
          </div>
          <div className="space-y-1">
            <p className="font-bold font-sans">FAQ</p>
            <p className="font-bold font-sans">TERMS & CONDITIONS</p>
            <p className="font-bold font-sans">PRIVACY POLICY</p>
            <p className="font-bold font-sans">COOKIE POLICY</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
