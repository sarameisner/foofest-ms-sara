import React from "react";

function BookingInfo({ info, setInfo }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <h3 className="text-2xl font-bold text-[var(--font-color)] mb-4">Booking Information</h3>
        <form className="flex flex-col gap-4">
          <label className="flex flex-col">
            Name:
            <input className="p-2 rounded border border-gray-300" name="name" value={info.name || ""} onChange={handleChange} required />
          </label>
          <label className="flex flex-col">
            Email:
            <input className="p-2 rounded border border-gray-300" name="email" type="email" value={info.email || ""} onChange={handleChange} required />
          </label>
          <label className="flex flex-col">
            Birthday:
            <input className="p-2 rounded border border-gray-300" name="birthday" type="date" value={info.birthday || ""} onChange={handleChange} required />
          </label>
        </form>
      </div>
    </div>
  );
}

export default BookingInfo;
