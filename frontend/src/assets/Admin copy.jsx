import React from "react";
import { FaHome, FaTrash, FaUsers, FaBlog, FaCalendarAlt, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import logo from "../assets/logoNav0.png";
import { Outlet, Link, Route, Routes } from "react-router-dom";
import BlogsPage from "./Blogs";
import EventsPage from "./Events";

function AdminPage() {
  return (
    <div className="grid grid-cols-4 h-screen">
      {/* Sidebar */}
      <div className="col-span-1 bg-green-800 text-white">
        <div className="flex flex-col h-full justify-between">
          <div>
            <div className="p-2 flex flex-col items-center">
              <img src={logo} alt="" style={{ width: "100px", height: "90px" }} className="mb-2" /> {/* Adjust the width and height as needed */}
              <h1 className="text-2xl font-bold mb-2">Your Organization</h1>
            </div>
            <hr className="border-white" />
            <div className="p-4">
              <Link to="/Admin" className="w-full pl-4 border-b border-white py-3 hover:bg-gray-700 mb-2 flex items-center">
                <FaHome className="inline-block mr-2" /> Overview
              </Link>
              <Link to="/Admin/waste-management" className="w-full pl-4 border-b border-white py-3 hover:bg-gray-700 mb-2 flex items-center">
                <FaTrash className="inline-block mr-2" /> Waste Management
              </Link>
              <Link to="/Admin/distribute-management" className="w-full pl-4 border-b border-white py-3 hover:bg-gray-700 mb-2 flex items-center">
                <FaUsers className="inline-block mr-2" /> Distribute Management
              </Link>
              <Link to="/Admin/blogs" className="w-full pl-4 border-b border-white py-3 hover:bg-gray-700 mb-2 flex items-center">
                <FaBlog className="inline-block mr-2" /> Blog Management
              </Link>
              <Link to="/Admin/events" className="w-full pl-4 border-b border-white py-3 hover:bg-gray-700 mb-2 flex items-center">
                <FaCalendarAlt className="inline-block mr-2" /> Event Management
              </Link>
              <Link to="/Admin/donors-management" className="w-full pl-4 border-b border-white py-3 hover:bg-gray-700 mb-2 flex items-center">
                <FaShoppingCart className="inline-block mr-2" /> Donors Management
              </Link>
              <Link to="/Admin/request-management" className="w-full pl-4 border-b border-white py-3 hover:bg-gray-700 mb-2 flex items-center">
                <FaShoppingCart className="inline-block mr-2" /> Request Management
              </Link>
              <Link to="/Admin/stock-management" className="w-full pl-4 border-b border-white py-3 hover:bg-gray-700 mb-2 flex items-center">
                <FaShoppingCart className="inline-block mr-2" /> Stock Management
              </Link>
            </div>
          </div>
          <div className="p-4">
            <button className="text-white py-2 px-4 rounded">
              <FaSignOutAlt className="inline-block mr-2" /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="col-span-3 bg-white p-5">
        <Routes>
          <Route path="/" element={<Outlet />} />
          <Route path="blogs" element={<BlogsPage />} />
          <Route path="events" element={<EventsPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default AdminPage;
