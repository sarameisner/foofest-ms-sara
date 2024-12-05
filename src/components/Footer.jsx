const Footer = () => {
  return (
    <footer
      // linjen over footeren
      className="py-8 border-t"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--font-color)",
        borderColor: "var(--light-grey-font)",
      }}
    >
      <div className="container mx-auto flex flex-wrap justify-between items-start gap-8 md:gap-16">
        {/* venstre side */}
        <div className="space-y-2 flex-1">
          {/* Overskrift */}
          <h4 className="text-[6rem] text-center md:text-left" style={{ color: "var(--font-color)" }}>
            Foo
          </h4>
          {/* adresse */}
          <p className="font-sans text-center md:text-left">Svinoy bygd, Faroe Islands</p>
          {/* telefonnummer */}
          <p className="font-sans text-center md:text-left">+45 85 85 85 85</p>
          {/* mail */}
          <a
            href="mailto:info@foofest.dk"
            className="hover:underline font-sans block text-center md:text-left"
            style={{
              color: "var(--accent-color)",
            }}
          >
            info@foofest.dk
          </a>

          <p
            className="text-sm mt-4 font-sans text-center md:text-left"
            style={{
              color: "var(--light-grey-font)",
            }}
          >
            This is a student project website by M&S, 2024
          </p>
        </div>

        {/* højre side */}
        <div className="flex flex-wrap gap-4 md:gap-8 flex-1 justify-center md:justify-end">
          <div className="space-y-1 text-center md:text-left">
            <p
              className="font-normal font-sans"
              style={{
                color: "var(--font-color)",
              }}
            >
              ABOUT
            </p>
            <p
              className="font-normal font-sans"
              style={{
                color: "var(--font-color)",
              }}
            >
              PROGRAM
            </p>
            <p
              className="font-normal font-sans"
              style={{
                color: "var(--font-color)",
              }}
            >
              TICKETS
            </p>
          </div>

          <div className="space-y-1 text-center md:text-left">
            <p
              className="font-normal font-sans"
              style={{
                color: "var(--font-color)",
              }}
            >
              FAQ
            </p>
            <p
              className="font-normal font-sans"
              style={{
                color: "var(--font-color)",
              }}
            >
              TERMS & CONDITIONS
            </p>
            <p
              className="font-normal font-sans"
              style={{
                color: "var(--font-color)",
              }}
            >
              PRIVACY POLICY
            </p>
            <p
              className="font-normal font-sans"
              style={{
                color: "var(--font-color)",
              }}
            >
              COOKIE POLICY
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
