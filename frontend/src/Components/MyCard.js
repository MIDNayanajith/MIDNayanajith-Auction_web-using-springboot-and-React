import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import car1 from "../assets/car1.png";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { deleteVehicle, getImage } from "../Pages/Services/ApiService";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const MyCard = ({ card }) => {
  const { id, title, price, image, description } = card;
  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchImage = async () => {
      const res = await getImage(image);
      setImageUrl(res);
    };

    if (image) {
      fetchImage();
    }
  }, [card]);

  const handleDelete = async () => {
    const data = {
      vehicleId: id,
    };
    try {
      const response = await deleteVehicle(data);
      if (response.status === "200") {
        setIsSuccess(true);
      }
      setAlertMessage(response.message);
      setOpenSnackbar(true);
    } catch (e) {
      console.log("error deleting", e);
    } finally {
      setOpen(false);
    }
  };

  const handleSnackBarClose = () => {
    setOpenSnackbar(false);
    window.location.reload();
  };

  const handleUpdate = () => {
    navigate(`/edit-sell/${id}`); // Navigate to the edit page with the vehicle id
  };

  return (
    <>
      <Dialog
        maxWidth={"sm"}
        open={open}
        slotProps={{
          backdrop: {
            sx: {
              background: "rgba(0,0,0,0.4)",
            },
          },
        }}
      >
        <DialogTitle>Are You Sure ?</DialogTitle>
        <DialogActions>
          <Button
            sx={{
              width: 120,
              height: 35,
              borderRadius: "7px",
              fontFamily: "poppins",
              fontSize: 12,
              fontWeight: 600,
              color: "#FFFFFF",
              bgcolor: "#6600B5",
              ":hover": {
                color: "#FFFFFF",
                bgcolor: "#6600B5",
              },
              ml: 1,
            }}
            onClick={() => setOpen(false)}
          >
            No
          </Button>
          <Button
            sx={{
              width: 120,
              height: 35,
              borderRadius: "7px",
              fontFamily: "poppins",
              fontSize: 12,
              fontWeight: 600,
              color: "#FFFFFF",
              bgcolor: "#6600B5",
              ":hover": {
                color: "#FFFFFF",
                bgcolor: "#6600B5",
              },
              ml: 1,
            }}
            onClick={handleDelete}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        sx={{
          width: 374,
          display: "flex",
          flexDirection: "column",
          borderRadius: "10px",
        }}
      >
        <Box
          component={"img"}
          src={imageUrl || car1}
          alt="image"
          sx={{
            width: 374,
            height: 359,
          }}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: "0px 0px 10px 10px",
            px: 2,
            py: 2,
            bgcolor: "#EBEBEB",
          }}
        >
          <Typography
            sx={{
              fontFamily: "poppins",
              fontSize: 20,
              fontWeight: 500,
              textAlign: "left",
            }}
          >
            {title}
          </Typography>
          <Typography
            sx={{
              fontFamily: "poppins",
              fontSize: 12,
              fontWeight: 500,
              mt: 0.5,
              color: "#757575",
              textAlign: "left",
            }}
          >
            Bid{" "}
            <span style={{ fontSize: 14, color: "#6600B5" }}>Rs. {price} </span>
          </Typography>
          <Typography
            sx={{
              fontFamily: "poppins",
              fontSize: 10,
              fontWeight: 500,
              mt: 1,
              color: "#757575",
              textAlign: "left",
            }}
          >
            {description}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Typography
              sx={{
                fontFamily: "poppins",
                fontSize: 12,
                fontWeight: 500,
                textAlign: "left",
              }}
            >
              Posted By Me
            </Typography>
            <IconButton
              onClick={() => setOpen(true)}
              sx={{
                ml: "auto",
              }}
            >
              <DeleteRoundedIcon
                sx={{
                  color: "#6600B5",
                  opacity: "60%",
                }}
              />
            </IconButton>
            <Button
              onClick={handleUpdate}
              sx={{
                width: 120,
                height: 35,
                borderRadius: "7px",
                fontFamily: "poppins",
                fontSize: 12,
                fontWeight: 600,
                color: "#FFFFFF",
                bgcolor: "#6600B5",
                ":hover": {
                  color: "#FFFFFF",
                  bgcolor: "#6600B5",
                },
                ml: 1,
              }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
        onClose={handleSnackBarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <MuiAlert
          onClose={handleSnackBarClose}
          severity={isSuccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

MyCard.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default MyCard;
