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



  const handleCardFlip = (e) => {
    const isFlippingToBack = e.type === "focus";
    setCardFlipped(isFlippingToBack);
  };

  const isCardNumberValid = paymentDetails.cardNumber.length === 16;
  const isExpiryDateValid = /^\d{2}\/\d{2}$/.test(paymentDetails.expiryDate);
  const isCvvValid = paymentDetails.cvv.length === 3;

  return (
    <div className="mt-10">

<div className=" grid pb-10 w-[340px] m-auto">
<div className={`${styles.cardWrapper}`}>
  <div className={`${styles.card} ${cardFlipped ? styles.cardFlipped : ""}`}>
    {/* Forsiden af kortet */}
    <div className={styles.cardFront}>
      <div className={styles.cardnumber}>
        {paymentDetails.cardNumber.padEnd(16, "#").match(/.{1,4}/g)?.join(" ") || "#### #### #### ####"}
      </div>
      <div className={styles.cardName}>{paymentDetails.cardName || "Cardholder Name"}</div>
      <div className={styles.expiryDate}>{paymentDetails.expiryDate || "MM/YY"}</div>
      <div className={styles.chip}></div>
    </div>

    {/* Bagsiden af kortet */}
    <div className={styles.cardBack}>
      <div className={styles.cardBackStrip}></div>
      <div className={styles.cardBackBox}></div>
      <div className={styles.cardBackLabel}>CVV</div>
      <div className={styles.cardBackCVV}>{paymentDetails.cvv || "###"}</div>
    </div>
  </div>
</div>
</div>

      {/* Input Form */}
      <form id="card-form" className="grid w-[350px] m-auto gap-4">
        <input
          type="text"
          className={`${styles.cardname} p-1 border-4 r bg-transparent text-white rounded-xl border-[#881523]`}
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
          className={`${styles.cardNumber} p-1 border-4 r bg-transparent text-white rounded-xl border-[#881523]`}
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
          className={`${styles.expirydate} p-1 border-4 r bg-transparent text-white rounded-xl border-[#881523]`}
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
  className={`${styles.cvvnumber} p-1 border-4 bg-transparent text-white rounded-xl border-[#881523]`}
  name="cvv"
  placeholder="CVV Number"
  maxLength="3"
  value={paymentDetails.cvv}
  onFocus={handleCardFlip} // Flip to back
  onBlur={handleCardFlip} // Flip back to front
  onChange={handleInputChange}
  autoComplete="off"
  required
/>
        {!isCvvValid && <span className="text-red-500 text-sm">CVV must be 3 digits.</span>}
      </form>
    
    </div>
  
  );
}

export default PaymentForm;
