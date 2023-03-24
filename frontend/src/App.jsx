import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import PersonalDetails from "./pages/Donors/Personal.jsx"

function App() {

  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path="donors/personal" element={<PersonalDetails/>} />
            </Routes>
        </BrowserRouter>
    </div>
  )
}

export default App
