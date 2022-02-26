import React from "react";
import "./globals.scss";
import Register from "./views/Register/Register";
import Login from "./views/Login/Login";
import Home from "./views/Home/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ProtectedRoute from "./helpers/ProtectedRoute";
import Profile from "./views/Profile/Profile";
import QuacoreLayout from "./components/QuacoreLayout/QuacoreLayout";

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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/profile/:username"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
