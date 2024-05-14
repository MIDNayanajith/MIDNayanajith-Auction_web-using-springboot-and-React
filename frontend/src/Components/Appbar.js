import React from "react";
import { Box, Typography } from "@mui/material";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Appbar = ({ selectedHeader, setSelectedHeader }) => {
  const navigate = useNavigate();

  const handleNavigation = (header) => {
    if (selectedHeader === header.name) {
      return;
    }
    navigate(header.urlPath);
    setSelectedHeader(header.name);
  };

  const Underline = () => {
    return (
      <Box
        sx={{
          width: "29px",
          height: "5px",
          background: releventFontColor,
          borderRadius: "10px",
          mx: "auto",
          mt: 0.5,
        }}
      />
    );
  };

  const releventFontColor = selectedHeader === "HOME" ? "#FFFFFF" : "#6600B5";

  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Box
        component={"img"}
        src={logo}
        sx={{
          width: 42,
          height: 74,
          ml: 10,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontFamily: "poppins",
            fontSize: 15,
            fontWeight: "bold",
            mt: "auto",
          }}
        >
          Gear Gulf
        </Typography>
        <Typography
          sx={{
            fontFamily: "poppins",
            fontSize: 10,
            fontWeight: "bold",
            opacity: "50%",
          }}
        >
          Auction Cars
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          ml: "auto",
          pr: 3,
        }}
      >
        {appHeaders.map((header) => (
          <Box
            key={header.id}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: 16,
                fontWeight: 600,
                color: releventFontColor,
                cursor: "pointer",
                mt: 3,
              }}
              onClick={() => handleNavigation(header)}
            >
              {header.name}
            </Typography>
            {header.name === selectedHeader && <Underline />}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

Appbar.propTypes = {
  selectedHeader: PropTypes.string.isRequired,
  setSelectedHeader: PropTypes.func.isRequired,
};

export default Appbar;

const appHeaders = [
  {
    id: 1,
    name: "HOME",
    urlPath: "/home",
  },
  {
    id: 2,
    name: "MY BIDS",
    urlPath: "/my-bids",
  },
  {
    id: 3,
    name: "SELL",
    urlPath: "/sell",
  },
  {
    id: 4,
    name: "CONTACT",
    urlPath: "/contact",
  },
  {
    id: 5,
    name: "CHAT",
    urlPath: "/chatroom",
  },
];
