import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

//import images
import Image1 from "../../assets/reqImage.png";

const ReqPersonalDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const handleNext = () => {
    const data = {
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
    };
    console.log(data);
  };

  return (
    <div>
      <div className="top-section"></div>

      <div className="content mt-12 flex">
        {/* left side */}
        <div className="leftside w-1/2 p-32 mt-6">
          <h1 className="text-6xl sidetext">
            Tell us Your Contact Details Before You Go
          </h1>
        </div>

        {/* right side */}
        <div className="rightside w-1/2 mt-16">
          <form className="flex flex-col gap-3 mr-20">
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

            <label className="ml-2 ">Phone</label>
            <input
              className="p-2 rounded-xl border mt-0"
              type="text"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              placeholder="Ex: 0771234567"
            />

            <label className="ml-2 ">Email</label>
            <input
              className="p-2 rounded-xl border "
              type="text"
              value={email}
              placeholder="Ex: abcd@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="ml-2 ">Address</label>
            <input
              className="p-2 rounded-xl border"
              type="text"
              value={address}
              placeholder="Ex: 123, Colombo"
              onChange={(e) => setAddress(e.target.value)}
            />
            <center className="mt-4">
              <Link
                to="/donors/selectbank"
                className="btn btn-outline-dark w-28 mr-4"
              >
                Back
              </Link>
              <Link
                to="/donors/business"
                className="btn btn-outline-success w-28"
              >
                Continue
              </Link>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReqPersonalDetails;
