import React from "react";

function BookingInfo({ userInfos, updateUserInfo }) {

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    updateUserInfo(index, { [name]: value });
  };

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-2xl font-bold  mb-4">Booking Information</h3>
      <form className="flex flex-col gap-4">
        {userInfos.map((info, index) => (
          <div key={index} className="p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2">Ticket {index + 1} ({info.ticketType})</h3>
            <label className="grid grid-cols-2 text-white flex-row w-full ">
              Name:
              <input
                className="p-2 rounded border border-[#881523]"
                name="name"
                value={info.name}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </label>
            <label className="grid grid-cols-2 text-white">
              Email:
              <input
                className="p-2 rounded border border-[#881523]"
                name="email"
                type="email"
                value={info.email}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </label>
            <label className="grid grid-cols-2 text-white">
              Birthday:
              <input
                className="p-2 rounded border border-[#881523]"
                name="birthday"
                type="date"
                value={info.birthday}
                onChange={(e) => handleChange(index, e)}
                required
              />
            </label>
          </div>
        ))}
      </form>
    </div>
  );
}

export default BookingInfo;
