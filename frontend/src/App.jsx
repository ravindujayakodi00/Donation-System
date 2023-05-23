import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SelectType from "./pages/Donors/SelectType";
import PersonalDetails from "./pages/Donors/Personal";
import BusinessDetails from "./pages/Donors/Business";
import SelectItems from "./pages/Donors/SelectItems";
import DonorAdmin from "./pages/AdminPanel/DonorsAdmin";
import BusinessDonorAdmin from "./pages/AdminPanel/BusinessDonerAdmin";
import UpdateForm from "./components/UpdateForm";
import Login from "./pages/AuthPages/Login";
import Register from "./pages/AuthPages/SignUp";
import { useAuthContext } from "./hooks/useAuthContext";
import Community from "./pages/CommunityForum/CommunityForum";
import UpdatePost from "./pages/CommunityForum/UpdatePost";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          <Route path="/admin/donor" element={<DonorAdmin />} />
          <Route path="/admin/business" element={<BusinessDonorAdmin />} />
          <Route
            path="/*"
            element={
              user ? <SelectType /> : <Navigate to="/login" replace={true} />
            }
          />
          <Route
            path="/personal"
            element={
              user ? (
                <PersonalDetails />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/business"
            element={
              user ? (
                <BusinessDetails />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/selectitems"
            element={
              user ? <SelectItems /> : <Navigate to="/login" replace={true} />
            }
          />

          <Route
            path="/login"
            element={
              user ? <Navigate to="/" replace={true} /> : <Login />
            }
          />
          <Route
            path="/register"
            element={
              user ? <Navigate to="/" replace={true} /> : <Register />
            }
          />

          <Route path="/:id" element={<UpdateForm />} />

          <Route path="/community" element={<Community />} />

          <Route path="/update/:id" element={<UpdatePost />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

