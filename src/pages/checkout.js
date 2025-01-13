import React, { useState, useContext, useEffect } from "react";
import Camping from "@/components/Camping";
import ProgressMenu from "../components/ProgressMenu";
import BookingInfo from "@/components/BookingInfo";
import PaymentForm from "@/components/PaymentForm";
import SelectOptional from "@/components/SelectOptional";
import CheckoutCompleted from "@/components/CheckoutCompleted";
import { CartContext } from "../contexts/CartContext";
import ButtonWIcon from "@/components/ButtonWIcon";
import Image from "next/image";
import Head from "next/head";
import StarIcon from "../../public/pics/star.svg";

function Checkout() {
  // statet der holder styr på hvilket step vi er på i vores flow
  const [currentStep, setCurrentStep] = useState(0);

  // state der tjekker om vi har submittet info til database
  const [isSubmitted, setIsSubmitted] = useState(false);

  // state til at håndtere om next knappen skal være aktiv
  const [stepSpecificDisable, setStepSpecificDisable] = useState(true);

  // checker om payment er udfyldt
  const [isPaymentValid, setIsPaymentValid] = useState(false);

  // her henter vi vores værdier fra CartContext
  const { cartItems, cartTotal, selectedCamping, selectedOptional, remainingTime, formatTime, resetTimer, startTimer, userInfos, updateUserInfo } = useContext(CartContext);

  // håndterer ændringer i betalingsvalidering
  const handlePaymentValidityChange = (isValid) => {
    setIsPaymentValid(isValid);
  };
  // håndtere deaktiverting baseret på det aktuelle trin
  useEffect(() => {
    if (currentStep === 3) {
      setStepSpecificDisable(!isPaymentValid);
    } else if (currentStep === 2) {
      setStepSpecificDisable(!isSubmitted); // deaktiver knappen, hvis der ikke er trykket submit
    } else if (currentStep === 0) {
      setStepSpecificDisable(!selectedCamping); // hvis camping ikke er valgt
    } else {
      setStepSpecificDisable(false); //
    }
  }, [currentStep, isSubmitted, isPaymentValid, selectedCamping]);
  // timeren starter og bliver nulstillet hvis siden bliver forladt
  useEffect(() => {
    startTimer();
    return () => resetTimer();
  }, []);

  // timeren stopper når vi når sidste trin i flowet
  useEffect(() => {
    if (currentStep === steps.length - 1) {
      resetTimer();
    }
  }, [currentStep]);

  //  her er definationen af trin i checkoutflowet, og her henter vi de tilhørende komponenter
  const steps = [
    {
      title: "Choose camping site",
      content: <Camping />,
    },
    {
      title: "Choose tent",
      content: <SelectOptional />,
    },
    {
      title: "Information",
      content: <BookingInfo userInfos={userInfos} updateUserInfo={updateUserInfo} onFormSubmit={() => setIsSubmitted(true)} />,
    },
    {
      title: "Payment",
      content: <PaymentForm onValidityChange={handlePaymentValidityChange} />,
    },
    {
      title: "",
      content: <CheckoutCompleted />,
    },
  ];

  // vores infoboks som står til højre og opdaterer sig efter ens valg af billet osv
  const renderInfoBox = () => (
    <div className="p-6 bg-[var(--background)] text-[var(--font-color)] border-4 border-[var(--accent-color)] rounded-lg">
      <h3 className="text-lg font-bold mb-4">Your Selection</h3>
      {cartItems.map((item, index) => (
        <div key={index} className="mb-4">
          <p>
            <strong>Type:</strong> <span className="float-right">{item.name}</span>
          </p>
          <p>
            <strong>Amount:</strong> <span className="float-right">{item.quantity}</span>
          </p>
          <p>
            <strong>Price:</strong> <span className="float-right">{item.price * item.quantity},-</span>
          </p>
        </div>
      ))}
      <p>
        <strong>Campsite:</strong> <span className="float-right">{selectedCamping || "N/A"}</span>
      </p>
      <p>
        <strong>Tent 2 person:</strong> <span className="float-right">{selectedOptional.find((o) => o.name.includes("2 person tent"))?.quantity || "N/A"}</span>
      </p>
      <p>
        <strong>Tent 3 person:</strong> <span className="float-right">{selectedOptional.find((o) => o.name.includes("3 person tent"))?.quantity || "N/A"}</span>
      </p>
      <p>
        <strong>Green camping:</strong> <span className="float-right">{selectedOptional.find((o) => o.name.includes("Green camping"))?.quantity || "N/A"}</span>
      </p>
      <p>
        <strong>Booking fee:</strong> <span className="float-right">99,-</span>
      </p>
      <hr className="my-4" />
      <p className="text-xl font-bold">
        <strong>Total:</strong>
        <span className="float-right">{cartItems.length > 0 ? cartTotal + 99 : 99},-</span>
      </p>
      {remainingTime > 0 && (
        <div className="mt-4 text-center">
          <p className="text-lg text-red-500 font-bold">Reservation Time Left: {formatTime(remainingTime)}</p>
        </div>
      )}
    </div>
  );

  return (
    <>
    <Head>
      <title>Checkout</title>
      <meta name="description" content="Review and manage your festival tickets. Checkout to secure your spot at the event!" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
    <div className="mt-40">
      {currentStep < steps.length - 1 && (
        <div>
          <ProgressMenu currentStep={currentStep} steps={steps.slice(0, steps.length - 1)} />
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-12">
        <div className="flex-1">{steps[currentStep].content}</div>
        <div className="w-full md:w-1/3 md:my-12">
          {renderInfoBox()}
          <div className="flex justify-center gap-2 mt-4">
            {currentStep > 0 && currentStep < steps.length - 1 && <ButtonWIcon text="Previous" defaultIcon={<Image src={StarIcon} alt="Previous Icon" width={20} height={20} />} activeIcon={<Image src={StarIcon} alt="Previous Icon Active" width={20} height={20} />} defaultBgColor="var(--accent-color)" activeColor="white" disabled={!cartItems || cartItems.length === 0} activeBgColor="var(--accent-color)" onClick={() => setCurrentStep((prev) => prev - 1)} className="px-4 py-2 rounded-lg hover:bg-white hover:text-[var(--accent-color)]" />}
            {currentStep < steps.length - 1 && (
              <ButtonWIcon
                text="Next"
                activeColor="white"
                defaultIcon={<Image src={StarIcon} alt="Next Icon" width={20} height={20} />}
                activeIcon={<Image src={StarIcon} alt="Next Icon Active" width={20} height={20} />}
                defaultBgColor="var(--accent-color)"
                activeBgColor="var(--accent-color)"
                onClick={() => setCurrentStep((prev) => prev + 1)}
                disabled={
                  stepSpecificDisable || // Deaktiver, hvis trin-specifik handling ikke er opfyldt
                  !cartItems ||
                  cartItems.length === 0 // Deaktiver, hvis kurven er tom
                } // Knappen deaktiveres, hvis kurven er tom
                className={`px-4 py-2 rounded-lg ${stepSpecificDisable ? "opacity-50 cursor-not-allowed" : "hover:bg-white hover:text-[var(--accent-color)]"}`}
              />
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default Checkout;

// her håndterer vi altså checkout flowet

// vi har opdelt flowet i trin og bruger state til at styre hvilke trin brugeren befinder sig på

// siden opdaterer dynamisk en infoboks med brugerens valg og den totalepris for de valg
