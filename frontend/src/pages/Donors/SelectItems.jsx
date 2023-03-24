import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

//import images
import Image1 from "../../assets/reqImage.png";

const BusinessDetails = () => {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");

  return (
    <div>
      <div className="top-section"></div>

      <div className="content mt-12 flex">
        {/* left side */}
        <div className="leftside w-1/2 p-32 mt-16">
          <h1 className="text-7xl sidetext">Select Things You Can Donate</h1>
        </div>
        {/* right side */}
        <div className="rightside w-1/2 mt-14">
          <form className="">
            <div className="flex mt-8">
              <label className="w-1/2 ml-24">Item</label>
              <label className="w-1/2 ml-32">Quantity</label>
            </div>
            <div className="flex gap-4 ml-20 mr-20">
              <select
                className="form-control mt-4"
                id="exampleFormControlSelect1"
                onChange={(e) => setItem(e.target.value)}
                value={item}
              >
                <option>Select Item</option>
                <option>Rice - 50KG</option>
                <option>Rice - 10KG</option>
                <option>Rice - 5KG</option>
                <option>Dhal - 10KG</option>
                <option>Dhal - 5KG</option>
              </select>
              <input
                className="p-2 rounded-xl border w-1/2 mt-4"
                type="text"
                placeholder="Ex: 10"
                onChange={(e) => setQuantity(e.target.value)}
                value={quantity}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
