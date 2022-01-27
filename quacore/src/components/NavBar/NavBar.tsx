import React from "react";
import {
  AppBar,
  Button,
  Input,
  InputAdornment,
  InputBase,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./navbar.scss";
import { logout as logoutReducer } from "../../slice";
import { logout } from "../../api/apiAuth";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = () => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    logout()
      .then((response) => {
        localStorage.removeItem("authData");
        dispatch(logoutReducer());
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="navbar">
      <AppBar>
        <Toolbar className="toolbar">
          <Typography sx={{ textAlign: "start" }}>
            <NavLink id="quacore-logo" className="unstyled-link" to="/">
              Quacore
            </NavLink>
          </Typography>
          <TextField
            color="secondary"
            variant="standard"
            placeholder="Search user"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          ></TextField>
          <Button
            id="toolbar-button"
            color="inherit"
            variant="outlined"
            onClick={logoutHandler}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
