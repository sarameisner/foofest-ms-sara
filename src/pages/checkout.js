import React, { useState, useContext } from "react";
import Camping from "@/components/Camping";
import ProgressMenu from "../components/ProgressMenu";
import BookingInfo from "@/components/BookingInfo";
import PaymentForm from "@/components/PaymentForm";
import SelectOptional from "@/components/SelectOptional";
import CheckoutCompleted from "@/components/CheckoutCompleted";
import { CartContext } from "../contexts/CartContext";

function Checkout() {
  // vores state til at holde styr på hvor vi er i checkout flowet
  const [currentStep, setCurrentStep] = useState(0);

  const {
    cartItems,
    cartTotal,
    selectedCamping,
    setSelectedCamping,
    selectedOptional,
    setSelectedOptional,
    userInfos,
    setUserInfo,
  } = useContext(CartContext);

  const updateUserInfo = (index, updatedInfo) => {
    setUserInfo((prevUserInfos) => {
      const newUserInfos = [...prevUserInfos];
      newUserInfos[index] = {
        ...newUserInfos[index],
        ...updatedInfo, // Opdaterer de relevante felter
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

  // komponenterne til checkout flowet definereres her
  const steps = [
    {
      title: "Camping",
      content: <Camping selectedCampingArea={selectedCamping} setCampingArea={setSelectedCamping} />,
    },
    {
      title: "Select Optional",
      content: <SelectOptional selectedOptions={selectedOptional} setOptions={setSelectedOptional} />,
    },
    {
      title: "Your Information",
      content: <BookingInfo userInfos={userInfos} updateUserInfo={updateUserInfo} />,
    },
    {
      title: "Payment Form",
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
        <strong>Tent 2 person:</strong>{" "}
        <span className="float-right">
          {selectedOptional.find((o) => o.name.includes("2 person tent"))?.quantity || "N/A"}
        </span>
      </p>
      <p>
        <strong>Tent 3 person:</strong>{" "}
        <span className="float-right">
          {selectedOptional.find((o) => o.name.includes("3 person tent"))?.quantity || "N/A"}
        </span>
      </p>
      <p>
        <strong>Green camping:</strong>{" "}
        <span className="float-right">
          {selectedOptional.find((o) => o.name.includes("Green camping"))?.quantity || "N/A"}
        </span>
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

  // alt det vi returnerer i browseren
  return (
    <div className="mt-16">
      {/* Progress menu fylder hele bredden */}
      {currentStep < steps.length - 1 && (
        <div className="w-full">
          <ProgressMenu currentStep={currentStep} steps={steps.slice(0, steps.length - 1)} />
        </div>
      )}
      {/* Hovedlayout */}
      <div className="flex flex-col md:flex-row gap-6 px-4 md:px-12">
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-center mb-6">{steps[currentStep].title}</h2>
          {steps[currentStep].content}
          {/* Navigation */}
          <div className="mt-8 flex justify-between">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep((prev) => prev - 1)}
                className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
              >
                Previous
              </button>
            )}
            {currentStep < steps.length - 1 && (
              <button
                onClick={() => setCurrentStep((prev) => prev + 1)}
                className="p-2 bg-[var(--accent-color)] text-white rounded-lg hover:bg-[var(--light-grey)]"
              >
                Next
              </button>
            )}
          </div>
        </div>
        {/* Infoboks til højre */}
        <div className="w-full md:w-1/3 md:my-12">{renderInfoBox()}</div>
      </div>
    </div>
  );
}

export default Checkout;