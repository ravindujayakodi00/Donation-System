import { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from "axios";
import Navbar from "../../components/navBar";
//import images
import Image1 from "../../assets/reqImage.png";

const BusinessDetails = () => {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const navigate = useNavigate(); // Hook for programmatic navigation

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create an object with the form data
    const formData = {
      businessName,
      phone,
      email,
      address,
    };
  
    try {
      // Set loading state to true
      handleOpen();
  
      // Send a POST request to the backend API endpoint
      await axios.post("http://localhost:8000/business", formData);
  
      // Handle successful response or redirect to another page
      console.log("Data inserted successfully");
  
      // redirect to another page
      navigate("/selectitems"); // Navigate to "/donors/selectitems" route
    } catch (error) {
      // Handle error
      console.error("Error inserting data:", error);
    } finally {
      // Set loading state to false
      handleClose();
    }
  };
  

  return (
    <div className="selectbank bg-gradient-to-r from-green-500 via-green-300 to-yellow-300 w-full overflow-hidden">
      <div className="top-section">
        <Navbar />
      </div>

      <div className="content mt-12 flex">
        {/* left side */}
        <div className="leftside w-1/2 mt-6">
          <img src={Image1} alt="donateimage" width="100%" />
        </div>
        {/* Right side */}
        <div className="rightside w-1/2 mt-24 ml-20">
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 mr-20 mt-4">
            <label className="ml-2 ">Organization Name</label>
            <input
              className="p-2 rounded-xl border mt-0"
              type="text"
              onChange={(e) => setBusinessName(e.target.value)}
              value={businessName}
              placeholder="Ex: ABC Company"
            />

            <label className="ml-2 ">Email</label>
            <input
              className="p-2 rounded-xl border "
              type="text"
              value={email}
              placeholder="Ex: abcd@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="ml-2 ">Phone</label>
            <input
              className="p-2 rounded-xl border "
              type="text"
              value={phone}
              placeholder="Ex: 0812345678"
              onChange={(e) => setPhone(e.target.value)}
            />

            <label className="ml-2 ">Address</label>
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
                type="submit"
              >
                Back
              </Link>
              <button
                onClick={handleOpen}
                className="mt-3 mr-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded-full"
                type="submit"
              >
                Next
              </button>
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

export default BusinessDetails;
