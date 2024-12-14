import React, { useState } from 'react';
import supabase from '@/config/supabaseClient';
import ButtonWIcon from './ButtonWIcon';
import Star from "../../public/pics/star.svg"
import Image from 'next/image';
import BlackStar from "../../public/pics/blackstar.svg"

function BookingInfo({ userInfos, updateUserInfo }) {

  // Hold en state for hvert ticket med navn, email og fødselsdag
  const [formData, setFormData] = useState(
    userInfos?.map((info) => ({
      name: '',
      email: '',
      birthday: '',
    }))
  );

  const [formError, setFormError] = useState(null);

  // Håndter inputændringer, så vi opdaterer data for den rigtige ticket
  const handleInputChange = (index, field, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index][field] = value;
    setFormData(updatedFormData);
  };

  // Håndterer formularindsendelsen
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Opret en liste af data, som skal sendes til Supabase
      const insertData = formData.map((data, index) => ({
        name: data.name,
        email: data.email,
        birthday: data.birthday,
        ticketType: userInfos[index]?.ticketType || "Unknown", // Tilføj ticketType til dataene
      }));

      // Send data til Supabase
      const { data, error } = await supabase.from('foofest').insert(insertData);

      if (error) {
        console.error("Error inserting data: ", error.message);
        setFormError(error.message);
      } else {
        console.log("Data inserted successfully: ", data);
        setFormError(null);
      }
    } catch (err) {
      console.error("Unexpected error: ", err.message);
      setFormError("Unexpected error occurred");
    }
  };

  return (
    <div className="flex flex-col gap-8 mt-10">
      <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
        {userInfos?.map((info, index) => (
          <div key={index} className="p-4 rounded-md gap-10">
            <h3 className="text-lg font-semibold mb-2">
              Ticket {index + 1} ({info.ticketType || "Unknown"})
            </h3>
            <div className="grid gap-5">
              <label className="grid grid-cols-2 text-white flex-row w-full">
                Name:
                <input
                  className="p-1 border-4 r bg-transparent text-white rounded-xl border-[#881523]"
                  id="name"
                  type="text"
                  value={formData[index]?.name || ''}
                  onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                  required
                />
              </label>
              <label className="grid grid-cols-2 text-white">
                Email:
                <input
                  className="p-1 border-4 r bg-transparent text-white rounded-xl border-[#881523]"
                  id="email"
                  type="text"
                  value={formData[index]?.email || ''}
                  onChange={(e) => handleInputChange(index, 'email', e.target.value)}
                  required
                />
              </label>
              <label className="grid grid-cols-2 text-white">
                Birthday:
                <input
                  className="p-1 border-4 r bg-transparent text-white rounded-xl border-[#881523]"
                  id="birthday"
                  type="date"
                  value={formData[index]?.birthday || ''}
                  onChange={(e) => handleInputChange(index, 'birthday', e.target.value)}
                  required
                />
              </label>
            </div>
           
          </div>
        ))}
      </form>
      <div>
      <ButtonWIcon 
              className='text-white' 
              type="submit" 
              defaultIcon={<Image src={Star} alt="Default Icon" width={20} height={20}/>}
              activeIcon={<Image src={BlackStar} alt="Active Icon" width={20} height={20} />}
              text="Submit"
            />
            </div>
    </div>
  );
}

export default BookingInfo;
