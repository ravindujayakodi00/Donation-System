import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navBar";

import Image1 from "../../assets/reqImage.png";

const SelectItems = () => {
  const [foodBank, setFoodBank] = useState("");
  const [items, setItems] = useState([{ item: "", quantity: "" }]);

  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleChange = (index, event) => {
    const values = [...items];
    if (event.target.name === "item") {
      values[index].item = event.target.value;
    } else {
      values[index].quantity = event.target.value;
    }

    setItems(values);
  };

  const handleAddFields = () => {
    const values = [...items];
    values.push({ item: "", quantity: "" });
    setItems(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...items];
    values.splice(index, 1);
    setItems(values);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const stockData = {
      foodBank,
      foodItems: items,
    };

    try {
      await axios.post("http://localhost:8000/stocks", stockData);
      console.log("Stock data inserted successfully");

      navigate(`/donors/selectitems?id=${stockData._id}`); // Navigate to "/donors/selectitems" route with stock ID as query parameter
    } catch (error) {
      console.log("Error inserting stock data:", error);
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
          <form onSubmit={handleSubmit}>
            <div className="w-full">
              <select
                className="form-control w-9/12 mt-2 ml-20"
                id="FoodBank"
                onChange={(e) => setFoodBank(e.target.value)}
                value={foodBank}
              >
                <option value="">Select Food Bank</option>
                <option value="Colombo">Colombo</option>
                <option value="Kandy">Kandy</option>
                <option value="Matale">Matale</option>
                <option value="Galle">Galle</option>
                <option value="Nuwara Eliya">Nuwara Eliya</option>
              </select>
            </div>

            {items.map((item, index) => (
              <div className="flex gap-4 ml-20 mr-20" key={index}>
                <select
                  className="form-control mt-4 rounded-xl border w-1/2"
                  id="exampleFormControlSelect1"
                  name="item"
                  value={item.item}
                  onChange={(event) => handleChange(index, event)}
                >
                  <option value="">Select Item</option>
                  <option value="Rice - 50KG">Rice - 50KG</option>
                  <option value="Rice - 10KG">Rice - 10KG</option>
                  <option value="Rice - 5KG">Rice - 5KG</option>
                  <option value="Dhal - 10KG">Dhal - 10KG</option>
                  <option value="Dhal - 5KG">Dhal - 5KG</option>
                </select>

                <input
                  className="p-2 rounded-xl border w-1/2 mt-4"
                  type="text"
                  name="quantity"
                  placeholder="Ex: 10"
                  value={item.quantity}
                  onChange={(event) => handleChange(index, event)}
                />

                <button
                  className="rounded-full bg-red-500 hover:bg-red-700 text-white mt-4 w-10 h-10"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  X
                </button>
              </div>
            ))}

            <center>
              <button
                className="rounded-xl bg-gray-400 hover:bg-gray-700 text-white x-2 py-2 mt-10 w-32"
                type="button"
                onClick={() => handleAddFields()}
              >
                Add More
              </button>
            </center>

            <center>
              <button
                className="rounded-xl bg-green-500 hover:bg-green-700 text-white x-2 py-2 mt-4 w-32"
                type="submit"
              >
                Submit
              </button>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectItems;
