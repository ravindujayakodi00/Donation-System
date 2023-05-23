import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

import Image1 from "../../assets/reqImage.png";
import Navbar from "../../components/navBar";

const SelectType = () => {



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
        <div className="rightside w-1/2 mt-36 ml-20">

          <div className="flex">
            <h1 className="text-8xl text-green-600">Donate</h1>
            <h2 className="text-5xl mt-10 ml-4">Now</h2>
          </div>
          <div>
            <h2 className="text-xl mt-10 mb-10">
              Are you donating from a Business organization or Personally?
            </h2>
            <div className="ml-6 mt-4">
              <Link to="/business" className="mt-3 mr-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full">
                Business Organization
              </Link>
              <Link to="/personal" className="mt-3 mr-4 bg-gray-400 hover:bg-gray-700 text-white font-bold py-2 px-20 rounded-full">
                Personal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectType;
