import React, { useState, useContext } from "react";
import Camping from "@/components/Camping";
import BookingInfo from "@/components/BookingInfo";
import PaymentForm from "@/components/PaymentForm";
import SelectOptional from "@/components/SelectOptional";
import CheckoutCompleted from "@/components/CheckoutCompleted";
import { CartContext } from "../contexts/CartContext";

function Checkout() {
  const [currentStep, setCurrentStep] = useState(0);

  const { cartItems, cartTotal, selectedCamping, setSelectedCamping, selectedOptional, setSelectedOptional, userInfo, setUserInfo } = useContext(CartContext);

  // Initialisering af paymentDetails
  const [paymentDetails, setPaymentDetails] = useState({
    cardOwner: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const steps = [
    {
      title: "Choose Camping Area",
      content: <Camping selectedCampingArea={selectedCamping} setCampingArea={setSelectedCamping} />,
    },
    {
      title: "Select Optional Add-Ons",
      content: <SelectOptional selectedOptions={selectedOptional} setOptions={setSelectedOptional} />,
    },
    {
      title: "Booking Information",
      content: <BookingInfo info={userInfo} setInfo={setUserInfo} />,
    },
    {
      title: "Payment",
      content: <PaymentForm paymentDetails={paymentDetails} setPaymentDetails={setPaymentDetails} />,
    },
    {
      title: "Booking Completed",
      content: <CheckoutCompleted />,
    },
  ];

  const renderInfoBox = () => (
    <div className="p-4 bg-gray-800 text-white rounded-lg border">
      <h3 className="text-lg font-bold mb-4">Your Selection</h3>
      <p>
        <strong>Tickets:</strong>{" "}
        {cartItems.map((item) => (
          <span key={item.id}>
            {item.name} ({item.quantity}) - {item.price * item.quantity} DKK
          </span>
        ))}
      </p>
      <p>
        <strong>Camping Area:</strong> {selectedCamping || "None"}
      </p>
      <p>
        <strong>Optional Add-Ons:</strong> {selectedOptional.length > 0 ? selectedOptional.map((item) => `${item.name} (${item.quantity})`).join(", ") : "None"}
      </p>
      <p>
        <strong>Total:</strong> {cartTotal} DKK
      </p>
    </div>
  );

  return (
    <div className="mt-16 flex flex-col md:flex-row gap-6 px-4 md:px-12">
      <div className="flex-1">
        <h2 className="text-3xl font-bold text-center mb-6">{steps[currentStep].title}</h2>
        {steps[currentStep].content}
        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <button onClick={() => setCurrentStep((prev) => prev - 1)} className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
              Previous
            </button>
          )}
          {currentStep < steps.length - 1 && (
            <button onClick={() => setCurrentStep((prev) => prev + 1)} className="p-2 bg-[var(--accent-color)] text-white rounded-lg hover:bg-[var(--light-grey)]">
              Next
            </button>
          )}
        </div>
      </div>
      <div className="w-full pt-[52px] md:w-1/3">{renderInfoBox()}</div>
    </div>
  );
}

export default Checkout;
