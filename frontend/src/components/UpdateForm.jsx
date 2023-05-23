import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// import images
import Image1 from "../assets/reqImage.png";

const UpdateForm = () => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const { id } = useParams();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const fetchDonor = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/donors/${id}`);
        const donorData = response.data;
        setFirstName(donorData.firstName);
        setLastName(donorData.lastName);
        setEmail(donorData.email);
        setPhone(donorData.phone);
        setAddress(donorData.address);
      } catch (error) {
        console.error("Error fetching donor:", error);
      }
    };

    fetchDonor();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedDonor = {
        firstName,
        lastName,
        email,
        phone,
        address
      };
      const response = await axios.patch(
        `http://localhost:8000/donors/${id}`,
        updatedDonor
      );
      console.log(response.data); // Log the response data if needed
      handleClose();
        window.location.href = "/admin/donor";
      // Handle success, e.g., show a success message or redirect to another page
    } catch (error) {
      console.error("Error updating donor:", error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="selectbank">
      <div className="top-section"></div>

      <div className="content mt-12 flex">
        {/* left side */}
        <div className="leftside w-1/2 mt-6">
          <img src={Image1} alt="donateimage" width="100%" />
        </div>
        {/* Right side */}
        <div className="rightside w-1/2 mt-24 ml-20">
          <form className="flex flex-col gap-3 mr-20" onSubmit={handleUpdate}>
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
                to="/admin/donor"
                className="mt-3 mr-4 bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-10 rounded-full"
                type="submit"
              >
                Cancel
              </Link>
              <button
                onClick={handleOpen}
                className="mt-3 mr-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-10 rounded-full"
                type="submit"
              >
                Update
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

export default UpdateForm;
