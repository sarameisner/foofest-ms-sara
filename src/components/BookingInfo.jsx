import React, { useState, useEffect } from "react";
import supabase from "@/config/supabaseClient";
import ButtonWIcon from "./ButtonWIcon";
import Star from "../../public/pics/star.svg";
import Image from "next/image";
import BlackStar from "../../public/pics/blackstar.svg";

function BookingInfo({ userInfos, updateUserInfo }) {
  // state til at holde dataen
  const [formData, setFormData] = useState([]);

  // state til fejl & succes beskeder
  const [formError, setFormError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // kører denne når userInfos ændres ..
  // hvis der allerede findes data så bruger vi det
  // hvis ikke sættes felterne til tomme
  useEffect(() => {
    if (userInfos) {
      const initialFormData = userInfos.map((info) => ({
        name: info.name || "",
        email: info.email || "",
        birthday: info.birthday || "",
      }));
      setFormData(initialFormData);
    }
  }, [userInfos]);

  // denne håndterer inputændringer for hvert ticket
  const handleInputChange = (index, field, value) => {
    setFormData((prevData) => {
      // kopierer den tidligere data
      const updatedFormData = [...prevData];
      // og opdaterer det relevante felt
      updatedFormData[index][field] = value;
      return updatedFormData;
    });

    // opdaterer CartContext
    updateUserInfo(index, { [field]: value });
  };

  // Håndter formularindsendelsen
  const handleSubmit = async (e) => {
    e.preventDefault();
    // opretter datarray til at indsætte i supbase
    try {
      const insertData = formData.map((data, index) => ({
        name: data.name,
        email: data.email,
        birthday: data.birthday,
        ticketType: userInfos[index]?.ticketType || "Unknown",
      }));
      // indsætter dataen i supabase
      const { error } = await supabase.from("foofest").insert(insertData);

      if (error) {
        console.error("Error inserting data: ", error.message);
        setFormError("Failed to save booking information.");
        setSuccessMessage(null);
      } else {
        setSuccessMessage("Your booking information has been saved successfully!");
        setFormError(null);
      }
    } catch (err) {
      console.error("Unexpected error: ", err.message);
      setFormError("Unexpected error occurred.");
      setSuccessMessage(null);
    }
  };

  return (
    <div className="flex flex-col gap-8 mt-10">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {formData.map((data, index) => (
          <div key={index} className="p-4 rounded-md gap-10 ">
            <h3 className="text-lg font-semibold mb-2 text-white">
              Ticket {index + 1} ({userInfos[index]?.ticketType || "Unknown"})
            </h3>
            <div className="grid gap-5">
              <label className="grid grid-cols-2 text-white">
                Name:
                <input className="p-1 border-4 bg-transparent text-white rounded-xl border-[#881523]" type="text" value={data.name} onChange={(e) => handleInputChange(index, "name", e.target.value)} required />
              </label>
              <label className="grid grid-cols-2 text-white">
                Email:
                <input className="p-1 border-4 bg-transparent text-white rounded-xl border-[#881523]" type="email" value={data.email} onChange={(e) => handleInputChange(index, "email", e.target.value)} required />
              </label>
              <label className="grid grid-cols-2 text-white">
                Birthday:
                <input className="p-1 border-4 bg-transparent text-white rounded-xl border-[#881523]" type="date" value={data.birthday} onChange={(e) => handleInputChange(index, "birthday", e.target.value)} required />
              </label>
            </div>
          </div>
        ))}

        <div className="mt-6 flex justify-center">
          <ButtonWIcon className="text-white" type="submit" defaultIcon={<Image src={Star} alt="Default Icon" width={20} height={20} />} activeIcon={<Image src={BlackStar} alt="Active Icon" width={20} height={20} />} text="Submit" />
        </div>
      </form>

      {formError && <p className="text-red-500 text-center mt-4">{formError}</p>}
      {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}
    </div>
  );
}

export default BookingInfo;
