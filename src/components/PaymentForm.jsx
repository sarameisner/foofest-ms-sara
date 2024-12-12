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

    // Validation logic
    if (name === "cardNumber" && !/^\d*$/.test(value)) return; // Allow only digits for card number
    if (name === "cvv" && !/^\d*$/.test(value)) return; // Allow only digits for CVV
    if (name === "expiryDate" && !/^\d{0,2}\/?\d{0,2}$/.test(value)) return; // Validate MM/YY format

    // Format expiration date
    if (name === "expiryDate" && value.length === 2 && !value.includes("/")) {
      setPaymentDetails((prevDetails) => ({
        ...prevDetails,
        [name]: `${value}/`,
      }));
    } else {
      setPaymentDetails((prevDetails) => ({
        ...prevDetails,
        [name]: value,
      }));
    }
  };

  const handleCardFlip = () => {
    setCardFlipped((prev) => !prev);
  };

  const isCardNumberValid = paymentDetails.cardNumber.length === 16;
  const isExpiryDateValid = /^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate);
  const isCvvValid = paymentDetails.cvv.length === 3;

  return (
    <div>
      <h1 style={{ marginBottom: "40px" }}>Interactive Card Payment Form</h1>

<div className="grid grid-cols-1 w-[200px] m-auto">
      <div className={styles.cardWrapper}>
  {/* Front of the Card */}
  <div className={`${styles.card} ${cardFlipped ? styles.hidden : ""}`}>
    {/* Card Number */}
    <div className={styles.cardNumber}>
      {paymentDetails.cardNumber.padEnd(16, "#").match(/.{1,4}/g)?.join(" ") || "#### #### #### ####"}
    </div>
    {/* Cardholder Name */}
    <div className={styles.cardName}>
      {paymentDetails.cardName || "Cardholder Name"}
    </div>
    {/* Expiry Date */}
    <div className={styles.expiryDate}>
      {paymentDetails.expiryDate || "MM/YY"}
    </div>
    {/* Chip */}
    <div className={styles.chip}></div>
    {/* Visa Logo */}
    <div className={styles.visaLogo}>VISA</div>
  </div>

  {/* Back of the Card */}
  <div className={`${styles.cardBack} ${cardFlipped ? "" : styles.hidden}`}>
    <div className={styles.cardBackStrip}></div>
    <div className={styles.cardBackBox}></div>
    <div className={styles.cardBackLabel}>CVV</div>
    <div className={styles.cardBackCVV}>
      {paymentDetails.cvv || "###"}
    </div>
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
          maxLength="16"
          value={paymentDetails.cardNumber}
          onChange={handleInputChange}
          autoComplete="off"
          required
        />
        {!isCardNumberValid && (
          <span className="text-red-500 text-sm">Card number must be 16 digits.</span>
        )}
        <input
          type="text"
          className={`${styles.expirydate} p-2 rounded border border-gray-300`}
          name="expiryDate"
          placeholder="Expiry Date (MM/YY)"
          maxLength="5"
          value={paymentDetails.expiryDate}
          onChange={handleInputChange}
          required
        />
        {!isExpiryDateValid && (
          <span className="text-red-500 text-sm">Enter a valid expiry date (MM/YY).</span>
        )}
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
        {!isCvvValid && <span className="text-red-500 text-sm">CVV must be 3 digits.</span>}
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
