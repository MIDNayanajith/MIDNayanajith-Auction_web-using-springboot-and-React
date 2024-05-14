import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import { Avatar, Box, Rating, Typography } from "@mui/material";
import face from "../assets/face.png";

const Review = ({ review }) => {
  const { rating, comment } = review;

  return (
    <Box
      sx={{
        width: 354,
        height: 152,
        bgcolor: "#EBEBEB",
        borderRadius: "10px",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Avatar
        src={face}
        alt={"image"}
        sx={{
          width: 80,
          height: 80,
          position: "absolute",
          top: -40,
          left: 15,
        }}
      />
      <Rating
        value={rating}
        readOnly
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
        }}
      />
      <Typography
        sx={{
          fontFamily: "poppins",
          fontSize: 10,
          fontWeight: 500,
          color: "#757575",
          width: 297,
          height: 75,
          overflow: "auto",
          scrollbarWidth: "none",
          mt: 5,
          textAlign: "center",
        }}
      >
        {comment}
      </Typography>
    </Box>
  );
};

// PropTypes validation
Review.propTypes = {
  review: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
};

export default Review;
