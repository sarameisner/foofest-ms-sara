import React, { useState, useContext } from "react";
import Camping from "@/components/Camping";
import ProgressMenu from "../components/ProgressMenu";
import BookingInfo from "@/components/BookingInfo";
import PaymentForm from "@/components/PaymentForm";
import SelectOptional from "@/components/SelectOptional";
import CheckoutCompleted from "@/components/CheckoutCompleted";
import { CartContext } from "../contexts/CartContext";
import ButtonWIcon from "@/components/ButtonWIcon"; // Importer ButtonWIcon
import Image from "next/image";
import StarIcon from "../../public/pics/star.svg"; // Ikon til knapperne

function Checkout() {
  const [currentStep, setCurrentStep] = useState(0);

  const { cartItems, cartTotal, selectedCamping, setSelectedCamping, selectedOptional, setSelectedOptional, userInfos, setUserInfo } = useContext(CartContext);

  const updateUserInfo = (index, updatedInfo) => {
    setUserInfo((prevUserInfos) => {
      const newUserInfos = [...prevUserInfos];
      newUserInfos[index] = {
        ...newUserInfos[index],
        ...updatedInfo,
      };
      return newUserInfos;
    });
  };

  const [paymentDetails, setPaymentDetails] = useState({
    cardOwner: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const steps = [
    {
      title: "Choose camping site",
      content: <Camping selectedCampingArea={selectedCamping} setCampingArea={setSelectedCamping} />,
    },
    {
      title: "Choose tent",
      content: <SelectOptional selectedOptions={selectedOptional} setOptions={setSelectedOptional} />,
    },
    {
      title: "Information",
      content: <BookingInfo userInfos={userInfos} updateUserInfo={updateUserInfo} />,
    },
    {
      title: "Payment",
      content: <PaymentForm paymentDetails={paymentDetails} setPaymentDetails={setPaymentDetails} />,
    },
    {
      title: "",
      content: <CheckoutCompleted />,
    },
  ];

  // infoboksen som går igen igennem hele flowet
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
        <strong>Total:</strong> <span className="float-right">{cartTotal + 99},-</span>
      </p>
    </div>
  );

  // alt det vi returnerer i browseren, inklusiv vores progress menu til steps
  // Alt det vi returnerer i browseren
  return (
    <div className="mt-16 flex flex-col md:flex-row gap-6 px-4 md:px-12">
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-center mb-6">{steps[currentStep].title}</h2>
        {steps[currentStep].content}
      </div>
      <div className="w-full pt-[50px] md:w-1/3 md:my-12">
        {renderInfoBox()}
        {/* Knapper under infoboksen */}
        <div className="flex justify-center gap-2 mt-4">
          {currentStep > 0 && (
            <ButtonWIcon
              text="Previous"
              defaultIcon={<Image src={StarIcon} alt="Previous Icon" width={20} height={20} />}
              activeIcon={<Image src={StarIcon} alt="Previous Icon Active" width={20} height={20} />}
              defaultBgColor="var(--accent-color)" // Brug accentfarven
              activeBgColor="#ffffff" // Skift til hvid ved hover
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="px-4 py-2 rounded-lg hover:bg-white hover:text-[var(--accent-color)]"
            />
          )}
          {currentStep < steps.length - 1 && (
            <ButtonWIcon
              text="Next"
              defaultIcon={<Image src={StarIcon} alt="Next Icon" width={20} height={20} />}
              activeIcon={<Image src={StarIcon} alt="Next Icon Active" width={20} height={20} />}
              defaultBgColor="var(--accent-color)" // Brug accentfarven
              activeBgColor="#ffffff" // Skift til hvid ved hover
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="px-4 py-2 rounded-lg hover:bg-white hover:text-[var(--accent-color)]"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
