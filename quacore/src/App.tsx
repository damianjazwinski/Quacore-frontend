import React from "react";
import "./globals.scss";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./helpers/ProtectedRoute";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register header="Register" />} />
          <Route path="/login" element={<Login header="Login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
