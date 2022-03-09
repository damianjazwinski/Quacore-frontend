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
  useTheme,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./navbar.scss";
import { logout as logoutReducer } from "../../slice";
import { logout } from "../../api/apiAuth";
import SearchIcon from "@mui/icons-material/Search";

const NavBar = () => {
  const dispatch = useDispatch();

  const theme = useTheme();

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
          <Typography id="quacore-logo" sx={{ textAlign: "start" }}>
            <NavLink className="unstyled-link" to="/">
              Quacore
            </NavLink>
          </Typography>
          <TextField
            className="toolbar-search"
            sx={{ input: { color: "white" } }}
            placeholder="Search user"
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon sx={{ color: "white" }} />
                </InputAdornment>
              ),
              disableUnderline: true,
            }}
          ></TextField>
          <Button
            id="toolbar-button"
            onClick={logoutHandler}
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.contrastText,
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
