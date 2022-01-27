import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, NavLink } from "react-router-dom";
import { RootState } from "../../store";
import "./register.scss";

type RegisterProps = { header: string };
const Register = ({ header }: RegisterProps) => {
  const [registerData, setRegisterData] = useState({
    username: "",
    password: "",
    email: "",
  });

  const textChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const auth = useSelector((state: RootState) => state.quacore.auth);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiUrl = "https://localhost:5001/api";

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(registerData),
      redirect: "follow",
    };

    fetch(apiUrl + "/user/register", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  if (auth) return <Navigate to="/" replace></Navigate>;

  return (
    <div className="register">
      <form onSubmit={submitHandler}>
        <h1>{header}</h1>
        <TextField
          name="username"
          label="Username"
          variant="outlined"
          value={registerData.username}
          onChange={textChangeHandler}
        />
        <TextField
          name="email"
          label="Email"
          variant="outlined"
          type="email"
          value={registerData.email}
          onChange={textChangeHandler}
        />
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          value={registerData.password}
          onChange={textChangeHandler}
        />
        <Button variant="contained" type="submit">
          Sign Up
        </Button>

        <p>
          Already have an account? <NavLink to="/login">Sign in</NavLink>
        </p>
      </form>
    </div>
  );
};

export default Register;
