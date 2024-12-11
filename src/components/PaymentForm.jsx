import React from "react";

function PaymentForm({ paymentDetails = {}, setPaymentDetails }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h3 className="text-2xl font-bold text-white mb-4">Payment Details</h3>
      <form className="flex flex-col gap-4">
        <label className="flex flex-col">
          Card Owner:
          <input className="p-2 rounded border border-gray-300" name="cardOwner" value={paymentDetails.cardOwner || ""} onChange={handleInputChange} required />
        </label>
        <label className="flex flex-col">
          Card Number:
          <input className="p-2 rounded border border-gray-300" name="cardNumber" value={paymentDetails.cardNumber || ""} onChange={handleInputChange} required />
        </label>
        <label className="flex flex-col">
          Expiry Date:
          <input className="p-2 rounded border border-gray-300" name="expiryDate" value={paymentDetails.expiryDate || ""} onChange={handleInputChange} required />
        </label>
        <label className="flex flex-col">
          CVV:
          <input className="p-2 rounded border border-gray-300" name="cvv" value={paymentDetails.cvv || ""} onChange={handleInputChange} required />
        </label>
        <button type="submit" className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Submit Payment
        </button>
      </form>
    </div>
  );
}

export default PaymentForm;
