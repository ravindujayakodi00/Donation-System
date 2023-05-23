import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Navbar from "../../components/navBar";

import Image1 from "../../assets/reqImage.png";

const PersonalDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Frontend validation
    if (phone.length !== 10) {
      setError("Phone number must have 10 digits.");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email format.");
      return;
    }

    handleOpen();
    const formData = {
      firstName,
      lastName,
      phone,
      email,
      address,
    };

    try {
      await axios.post("http://localhost:8000/donors", formData);
      console.log("Data inserted successfully");

      handleClose();

      navigate("/selectitems"); // Navigate to "/donors/selectitems" route
    } catch (error) {
      console.log("Error inserting data:", error);
      handleClose();
    }
  };

  return (
    <div className="bg-gradient-to-r from-green-500 via-green-300 to-yellow-300 w-full overflow-hidden">
      <div className="top-section">
        <Navbar />
      </div>

      <div className="content flex">
        {/* left side */}
        <div className="leftside w-1/2 mt-6">
          <img src={Image1} alt="donateimage" width="100%" />
        </div>
        {/* Right side */}
        <div className="rightside w-1/2 mt-16 ml-20">
          <form className="flex flex-col gap-3 mr-20" onSubmit={handleSubmit}>
            <div className="flex mt-8 gap-4">
              <label className="w-1/2 ml-2">First Name</label>
              <label className="w-1/2 ml-2">Last Name</label>
            </div>
            <div className="flex gap-4">
              <input
                className="p-2 rounded-xl border w-1/2"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                placeholder="Ex: Prashan"
              />
              <input
                className="p-2 rounded-xl border w-1/2"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                placeholder="Ex: Perera"
              />
            </div>

            <label className="ml-2">Phone</label>
            <input
              className="p-2 rounded-xl border mt-0"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="Ex: 0771234567"
            />

            <label className="ml-2">Email</label>
            <input
              className="p-2 rounded-xl border "
              type="text"
              required 
              value={email}
              placeholder="Ex: abcd@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />


            <label className="ml-2">Address</label>
            <input
              className="p-2 rounded-xl border"
              type="text"
              value={address}
              placeholder="Ex: 123, Colombo"
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className="self-center">
              <Link
                to="/"
                className="mt-3 mr-4 bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-10 rounded-full"
              >
                Back
              </Link>
              <button
                className="mt-3 mr-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded-full"
                type="submit"
              >
                Next
              </button>

              {error && <p className="text-red-500 ml-2">{error}</p>}

              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
                onClick={handleClose}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
