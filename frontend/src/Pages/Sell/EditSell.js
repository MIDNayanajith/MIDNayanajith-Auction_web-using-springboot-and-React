import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material"; // Import Alert from @mui/material
import sell from "../../assets/sell.png";
import Footer from "../../Components/Footer";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditSell = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [vehicle, setVehicle] = useState({
    vehicleName: "",
    year: "",
    startDate: "",
    endDate: "",
    bidAmount: "",
    description: "",
    file: null,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const onInputChange = (e) => {
    setVehicle({ ...vehicle, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    loadVehicle();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    // Check for empty fields
    if (
      !vehicle.vehicleName ||
      !vehicle.year ||
      !vehicle.startDate ||
      !vehicle.endDate ||
      !vehicle.bidAmount ||
      !vehicle.description
    ) {
      setAlertSeverity("error");
      setAlertMessage("All fields are required.");
      setOpenSnackbar(true);
      return;
    }

    try {
      const {
        vehicleName,
        year,
        startDate,
        endDate,
        bidAmount,
        description,
        file,
      } = vehicle;
      const data = {
        vehicleName,
        year,
        startDate: `${startDate} 00:00:00.000000`,
        endDate: `${endDate} 00:00:00.000000`,
        bidAmount,
        description,
        file,
      };
      await axios.put(
        `http://localhost:8080/vehicle/updatevehicle/${id}`,
        data
      );
      // Show success message
      setAlertSeverity("success");
      setAlertMessage("Vehicle details updated successfully.");
      setOpenSnackbar(true);
      navigate("/sell");
    } catch (error) {
      console.error("Error updating vehicle:", error);
      // Handle error here, display a user-friendly message, etc.
    }
  };

  const loadVehicle = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/vehicle/getvehicle/${id}`
      );
      setVehicle({
        ...result.data,
        startDate: result.data.startDate.substring(0, 10), // Extract date part only
        endDate: result.data.endDate.substring(0, 10), // Extract date part only
        file: result.data.imageName, // Set the image name to the file field
      });
    } catch (error) {
      console.error("Error loading vehicle:", error);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <Box sx={{ px: 10, py: 5 }}>
        <Box
          component={"img"}
          src={sell}
          sx={{
            width: 389,
            height: 652,
            ml: 5,
            position: "absolute",
            top: 140,
            right: 150,
          }}
        />
        <Typography
          sx={{
            fontFamily: "poppins",
            fontSize: 30,
            fontWeight: 600,
            color: "#000000",
          }}
        >
          You Can Edit Your{" "}
          <span style={{ color: "#6600B5" }}> Car details </span> Here
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: 440,
            bgcolor: "#EBEBEB",
            mt: 4,
            borderRadius: "10px",
            px: 5,
            py: 4,
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", gap: 3, width: 633, mb: 3 }}>
            <TextField
              type="text"
              name="vehicleName"
              value={vehicle.vehicleName}
              onChange={(e) => onInputChange(e)}
              placeholder="Vehicle Name *"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{
                width: "100%",
                px: 2,
                bgcolor: "#FFFFFF",
                borderRadius: "5px",
              }}
            />
            <TextField
              type="text"
              name="year"
              value={vehicle.year}
              onChange={(e) => onInputChange(e)}
              placeholder="Year *"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{
                width: "100%",
                px: 2,
                bgcolor: "#FFFFFF",
                borderRadius: "5px",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 3, width: 633, mb: 3 }}>
            <TextField
              type="date"
              name="startDate"
              value={vehicle.startDate}
              onChange={(e) => onInputChange(e)}
              placeholder="Start Date *"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{
                width: "100%",
                bgcolor: "#FFFFFF",
                px: 2,
                borderRadius: "5px",
              }}
            />
            <TextField
              type="date"
              name="endDate"
              value={vehicle.endDate}
              onChange={(e) => onInputChange(e)}
              placeholder="End Date *"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{
                width: "100%",
                px: 2,
                bgcolor: "#FFFFFF",
                borderRadius: "5px",
              }}
            />
          </Box>
          <Box sx={{ display: "flex", gap: 3, width: 633, mb: 3 }}>
            <TextField
              type="number"
              name="bidAmount"
              value={vehicle.bidAmount}
              onChange={(e) => onInputChange(e)}
              placeholder="Bid Amount *"
              variant="standard"
              InputProps={{ disableUnderline: true }}
              sx={{
                width: "100%",
                px: 2,
                bgcolor: "#FFFFFF",
                borderRadius: "5px",
              }}
            />
            <TextField
              disabled
              fullWidth
              value={vehicle.file}
              InputProps={{
                endAdornment: (
                  <Button
                    variant="outlined"
                    sx={{ position: "absolute", right: 10, height: "30px" }}
                    component="label"
                    htmlFor="signature-file"
                  >
                    Upload
                    <input
                      type="file"
                      id="signature-file"
                      name="file"
                      onChange={(e) => onInputChange(e)}
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </Button>
                ),
              }}
            />
          </Box>
          <TextField
            type="text"
            name="description"
            value={vehicle.description}
            onChange={(e) => onInputChange(e)}
            placeholder="Description *"
            variant="standard"
            InputProps={{ disableUnderline: true }}
            sx={{
              width: 600,
              height: 92,
              px: 2,
              bgcolor: "#FFFFFF",
              borderRadius: "5px",
            }}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              width: 630,
              height: 50,
              mt: 4,
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
            Save
          </Button>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={alertSeverity}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <Footer />
    </form>
  );
};

export default EditSell;
//Pr7AZpScBcNcgr1Uae1LQYVFK/VRqroZJX75d0A91Yk=
