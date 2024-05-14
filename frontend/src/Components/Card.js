import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Box, Button, Typography } from "@mui/material";
import car1 from "../assets/car1.png";
import BidDialog from "./BidDialog";
import { getImage } from "../Pages/Services/ApiService";

const Card = ({ card }) => {
  const { title, price, image, description, isButtonActive } = card;
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      const res = await getImage(image);
      setImageUrl(res);
    };

    if (image) {
      fetchImage();
    }
  }, [card]);

  return (
    <>
      <BidDialog card={card} image={imageUrl} open={open} setOpen={setOpen} />
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
            borderRadius: "10px 10px 0px 0px",
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
          {isButtonActive && (
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
                ml: "auto",
                mt: 2,
              }}
              onClick={() => setOpen(true)}
            >
              Place a Bid
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
};

// Add PropTypes validation
Card.propTypes = {
  card: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    isButtonActive: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Card;
