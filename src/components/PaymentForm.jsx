import React, { useState } from "react";
import styles from "../styles/Payment.module.css";

function PaymentForm() {
  const [paymentDetails, setPaymentDetails] = useState({
    cardName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [cardFlipped, setCardFlipped] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCardFlip = () => {
    setCardFlipped((prev) => !prev);
  };

  return (
    <div>
      <h1 style={{ marginBottom: "40px" }}>Interactive Card Payment Form</h1>

      {/* Card Front & Back */}
      <div className={styles.cardwrapper}>
        {/* Front of the Card */}
        <div
          id="card-front"
          className={`w-64 h-40 relative bg-gradient-to-br from-blue-500 to-indigo-500 text-white rounded-lg p-4 ${cardFlipped ? "hidden" : ""}`}
        >
          {/* Card Number, Name, Expiry Date */}
          <div id="card-number" className="text-2xl font-bold">
            {paymentDetails.cardNumber || "#### #### #### ####"}
          </div>
          <div id="card-name" className="text-lg mt-2">
            {paymentDetails.cardName || "Cardholder Name"}
          </div>
          <div id="expiry-date" className="text-sm mt-1">
            {paymentDetails.expiryDate || "MM/YY"}
          </div>
        </div>

        {/* Back of the Card */}
        <div
          id="card-back"
          className={`w-64 h-40 relative bg-gray-800 text-white rounded-lg p-4 ${cardFlipped ? "" : "hidden"}`}
        >
          {/* CVV */}
          <div id="card-back-cvv" className="text-xl font-bold">
            {paymentDetails.cvv || "###"}
          </div>
        </div>
      </div>

      {/* Input Form */}
      <form id="card-form" className="flex flex-col gap-4">
        <input
          type="text"
          className={`${styles.cardname} p-2 rounded border border-gray-300`}
          name="cardName"
          placeholder="Name"
          maxLength="20"
          value={paymentDetails.cardName}
          onChange={handleInputChange}
          autoFocus
          required
        />
        <input
          type="text"
          className={`${styles.cardNumber} p-2 rounded border border-gray-300`}
          name="cardNumber"
          placeholder="Card Number"
          maxLength="19"
          value={paymentDetails.cardNumber}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />
        <input
          type="text"
          className={`${styles.expirydate} p-2 rounded border border-gray-300`}
          name="expiryDate"
          placeholder="Expiry Date"
          maxLength="5"
          value={paymentDetails.expiryDate}
          onChange={handleInputChange}
          required
        />
        <input
          id="flip"
          type="text"
          className={`${styles.cvvnumber} p-2 rounded border border-gray-300`}
          name="cvv"
          placeholder="CVV Number"
          maxLength="3"
          value={paymentDetails.cvv}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />
      </form>

      {/* Button to Flip Card */}
      <button
        id="flip"
        onClick={handleCardFlip}
        className="p-2 bg-indigo-500 text-white rounded mt-4"
      >
        Flip Card
      </button>
    </div>
  );
}

export default PaymentForm;
