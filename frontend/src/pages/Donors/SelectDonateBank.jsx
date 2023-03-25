import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import Image1 from "../../assets/reqImage.png";

const SelectDonateBank = () => {
  return (
    <div className="selectbank">
      <div className="top-section"></div>

      <div className="content mt-12 flex">
        {/* left side */}
        <div className="leftside w-1/2 mt-6">
          <img src={Image1} alt="donateimage" width="100%" />
        </div>
        {/* Right side */}
        <div className="rightside w-1/2 mt-36 ml-20">
          <div className="flex">
            <h1 className="text-7xl text-green-600">Donate</h1>
            <h2 className="text-4xl mt-7 ml-4">Now</h2>
          </div>
          <form className="flex flex-col gap-3 mr-20 mt-4">
            <label className="text-3xl text-gray-400">
              Select Food Bank Near You
            </label>
            <div class="form-group">
              <select class="form-control mt-2" id="FoodBank">
                <option>Colombo</option>
                <option>Kandy</option>
                <option>Matale</option>
                <option>Galle</option>
                <option>Nuwara Eliya</option>
              </select>
            </div>

            <center>
              <Link
                to="/donors/personal"
                className="mt-2 btn btn-outline-dark w-28"
                size="lg"
                block
              >
                Get Started
              </Link>
            </center>
          </form>
        </div>

      </div>
    </div>
  );
};

export default SelectDonateBank;
