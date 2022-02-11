import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login, LoginResponse } from "../../api/apiAuth";
import { login as loginReducer } from "../../slice";
import { RootState } from "../../store";
import "./login.scss";

type LoginProps = {};
const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const auth = useSelector((state: RootState) => state.quacore.auth);

  const dispatch = useDispatch();

  const textChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(loginData.username, loginData.password)
      .then((response) => response.json())
      .then((response: LoginResponse) => {
        localStorage["authData"] = JSON.stringify(response);
        dispatch(loginReducer(response));
      })
      .catch((error) => console.error(error));
  };

  if (auth) return <Navigate to="/" replace></Navigate>;

  return (
    <div className="login">
      <form onSubmit={submitHandler}>
        <h1>Login</h1>
        <TextField
          name="username"
          label="Username"
          variant="outlined"
          value={loginData.username}
          onChange={textChangeHandler}
        />
        <TextField
          name="password"
          label="Password"
          variant="outlined"
          type="password"
          value={loginData.password}
          onChange={textChangeHandler}
        />
        <Button variant="contained" type="submit">
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Login;
