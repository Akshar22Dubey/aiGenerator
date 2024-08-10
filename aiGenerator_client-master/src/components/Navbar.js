import React from "react";
import { Box, Typography, useTheme, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Navbar = ({ toggleDarkMode, darkMode }) => {
  const theme = useTheme();
  const loggedIn = JSON.parse(localStorage.getItem("authToken"));
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/auth/logout`);
      localStorage.removeItem('authToken');
      toast.success('Logged out Successfully!');
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box
      width={"100%"}
      backgroundColor={theme.palette.background.alt}
      p="1rem 6%"
      textAlign={"center"}
      sx={{ boxShadow: 3, mb: 2, position: 'relative' }}
    >
      <Typography variant="h1" color={"primary"} fontWeight="bold">
        KraftySoul.ai
      </Typography>
      <Box sx={{ position: 'absolute', right: '20px', top: '20px', display: 'flex', alignItems: 'center' }}>
        <IconButton color="inherit" onClick={toggleDarkMode} sx={{ fontSize: '2rem' }}>
          {darkMode ? <Brightness7Icon fontSize="inherit" /> : <Brightness4Icon fontSize="inherit" />}
        </IconButton>
      </Box>
      {loggedIn ? (
        <>
          <NavLink to="/" p={1}>
            Home
          </NavLink>
          <NavLink to="/login" onClick={handleLogout} p={1}>
            Logout
          </NavLink>
        </>
      ) : (
        <>
          <NavLink to="/register" p={1}>
            Sign Up
          </NavLink>
          <NavLink to="/login" p={1}>
            Login
          </NavLink>
        </>
      )}
    </Box>
  );
};

export default Navbar;
