

const Footer = () => {

    
  return (
    <footer
      // linjen over footeren
      className="py-[--padding-20] pb-[--padding-150] border-t"
      style={{
        color: "var(--font-color)",
        borderColor: "var(--light-grey-font)",
      }}
    >
     

        
      <div className="container mx-auto flex flex-wrap justify-between items-start gap-8 md:gap-16">
   
        <div className="space-y-2 flex-1">
          {/* Overskrift */}
          <h4 className="text-[6rem] text-center md:text-left" >
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
            className="text-sm mt-[--padding-20] font-sans text-center md:text-left"
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
              
            >
              ABOUT
            </p>
            <p
            >
              PROGRAM
            </p>
            <p
            >
              TICKETS
            </p>
          </div>

          <div className="space-y-1 text-center md:text-left">
            <p
            >
              FAQ
            </p>
            <p
            >
              TERMS & CONDITIONS
            </p>
            <p

            >
              PRIVACY POLICY
            </p>
            <p
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
