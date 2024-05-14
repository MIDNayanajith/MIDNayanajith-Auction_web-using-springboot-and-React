import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import contact from "../../assets/contact.png";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Footer from "../../Components/Footer";

const Contact = () => {
  const [contactmsg, setContactmsg] = useState({
    user_name: "",
    email: "",
    message: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const { user_name, email, message } = contactmsg;

  const onInputChange = (e) => {
    setContactmsg({ ...contactmsg, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Check if any field is empty
    if (!user_name || !email || !message) {
      setAlertSeverity("error");
      setAlertMessage("All fields are required.");
      setOpenSnackbar(true);
      return;
    }

    try {
      // Send form data to backend
      const response = await axios.post(
        "http://localhost:8080/contact",
        contactmsg
      );
      if (response.status === 200) {
        setAlertSeverity("success");
        setAlertMessage("Message sent successfully.");
        setOpenSnackbar(true);
        // Clear form fields after successful submission if needed
        clearForm();
      } else {
        setAlertSeverity("error");
        setAlertMessage("Failed to add data. Please try again later.");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setAlertSeverity("error");
      setAlertMessage("An error occurred. Please try again later.");
      setOpenSnackbar(true);
    }
  };

  const handleSnackBarClose = () => {
    setOpenSnackbar(false);
  };

  const clearForm = () => {
    setContactmsg({ user_name: "", email: "", message: "" });
  };

  return (
    <Box>
      <Box
        component={"img"}
        src={contact}
        sx={{
          width: 673,
          height: 373,
          position: "absolute",
          top: 280,
          left: 20,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
          mt: 2,
          ml: 110,
        }}
      >
        <Typography
          sx={{
            fontFamily: "poppins",
            fontSize: 50,
            fontWeight: 600,
          }}
        >
          Contact Us.
        </Typography>
        <Typography
          sx={{
            fontFamily: "poppins",
            fontSize: 14,
            fontWeight: 600,
            color: "#757575",
          }}
        >
          Contact us if you need further assistance.
        </Typography>
        <form onSubmit={(e) => onSubmit(e)}>
          <Typography
            sx={{
              fontFamily: "poppins",
              fontSize: 16,
              fontWeight: 500,
              color: "#757575",
              mt: 3,
            }}
          >
            Enter Your Name
          </Typography>
          <TextField
            name="user_name"
            value={user_name}
            onChange={(e) => onInputChange(e)}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              width: "70%",
              height: 40,
              px: 2,
              borderRadius: "5px",
              fontFamily: "poppins",
              bgcolor: "#EFEFEF",
              "& .MuiInputBase-root": {
                height: 40,
              },
            }}
            required
          />
          <Typography
            sx={{
              fontFamily: "poppins",
              fontSize: 16,
              fontWeight: 500,
              color: "#757575",
              mt: 1,
            }}
          >
            Enter Your Email
          </Typography>
          <TextField
            name="email"
            value={email}
            onChange={(e) => onInputChange(e)}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              width: "70%",
              height: 40,
              px: 2,
              borderRadius: "5px",
              fontFamily: "poppins",
              bgcolor: "#EFEFEF",
              "& .MuiInputBase-root": {
                height: 40,
              },
            }}
            required
          />
          <Typography
            sx={{
              fontFamily: "poppins",
              fontSize: 16,
              fontWeight: 500,
              color: "#757575",
              mt: 1,
            }}
          >
            Message
          </Typography>
          <TextField
            name="message"
            value={message}
            onChange={(e) => onInputChange(e)}
            variant="standard"
            InputProps={{
              disableUnderline: true,
            }}
            sx={{
              width: "70%",
              height: 127,
              px: 2,
              borderRadius: "5px",
              fontFamily: "poppins",
              bgcolor: "#EFEFEF",
              "& .MuiInputBase-root": {
                height: 40,
              },
            }}
            required
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 4,
              width: "75%",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              sx={{
                width: "45%",
                height: 50,
                borderRadius: "5px",
                bgcolor: "#6600B5",
                fontFamily: "poppins",
                fontSize: 20,
                fontWeight: 600,
                ":hover": {
                  bgcolor: "#6600B5",
                },
              }}
            >
              SUBMIT
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={clearForm}
              sx={{
                width: "45%",
                height: 50,
                borderRadius: "5px",
                fontFamily: "poppins",
                fontSize: 20,
                fontWeight: 600,
                ":hover": {
                  bgcolor: "#FFEBEE",
                },
              }}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <MuiAlert
          onClose={handleSnackBarClose}
          severity={alertSeverity}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
      <Footer />
    </Box>
  );
};

export default Contact;
