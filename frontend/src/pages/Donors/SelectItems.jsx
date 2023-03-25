import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

//import images
import Image1 from "../../assets/reqImage.png";

const BusinessDetails = () => {
  const [items, setItems] = useState([{ item: "", quantity: "" }]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Items: ", items);
  };

  return (
    <div>
      <div className="top-section"></div>

      <div className="content mt-12 flex">
        {/* left side */}
        <div className="leftside w-1/2 p-32 mt-12">
          <h1 className="text-7xl sidetext">Select Things You Can Donate</h1>
        </div>
        {/* right side */}
        <div className="rightside w-1/2 mt-20">
          <form onSubmit={handleSubmit}>
            {items.map((item, index) => (
              <div className="flex gap-4 ml-20 mr-20" key={index}>
                <select
                  className="form-control mt-4 rounded-xl border w-1/2"
                  id="exampleFormControlSelect1"
                  name="item"
                  value={item.item}
                  onChange={(event) => handleChange(index, event)}
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
                  name="quantity"
                  placeholder="Ex: 10"
                  value={item.quantity}
                  onChange={(event) => handleChange(index, event)}
                />
                <button
                  className="btn btn-outline-danger mt-4 w-10 h-10"
                  type="button"
                  onClick={() => handleRemoveFields(index)}
                >
                  X
                </button>
              </div>
            ))}
            <center>
              <button
                className="btn btn-outline-dark mt-10 w-32"
                type="button"
                onClick={() => handleAddFields()}
              >
                Add More
              </button>
              <div>
                <button className="btn btn-success mt-3 w-32" type="submit">
                  Donate
                </button>
              </div>
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BusinessDetails;
