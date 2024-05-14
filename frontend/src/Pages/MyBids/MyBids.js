import React, { useEffect, useState } from "react";
import { Grid, Pagination, Typography } from "@mui/material";
import Card from "../../Components/Card";
//import { useNavigate } from "react-router-dom";
import { getBidsByUser } from "../Services/ApiService";
import Footer from "../../Components/Footer";

const MyBids = () => {
  const [page, setPage] = useState(1);
  const [cards, setCards] = useState(null);
  const [pagesCount, setPagesCount] = useState(0);
  const pageCount = 3;

  const fetchBidsByUser = async () => {
    const data = {
      page: page - 1,
      pageCount: pageCount,
      userId: parseInt(localStorage.getItem("userId")),
    };
    try {
      const response = await getBidsByUser(data);
      console.log(
        "bids by user:",
        response?.bidList.content[0].vehicle.imageName
      );
      const newCards = response?.bidList?.content.map((vehicle) => ({
        id: vehicle.vehicle.vehicleId,
        title: vehicle.vehicle.vehicleName,
        image: vehicle.vehicle.imageName,
        description: vehicle.vehicle.description,
        price: vehicle.bidAmount,
        isButtonActive: false,
      }));
      setPagesCount(response?.bidList.totalPages);
      console.log("new cards :", newCards);
      setCards(newCards);
    } catch (err) {
      console.log("error fetching vehicles", err);
    }
  };

  const handleChange = (event, value) => {
    setPage(value);
    console.log(value);
  };

  useEffect(() => {
    fetchBidsByUser();
  }, [page]);

  return (
    <>
      <Grid
        container
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        mt={4}
        rowGap={6}
      >
        {cards != null ? (
          cards?.map((card) => (
            <Grid
              item
              key={card.id}
              md={4}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Card card={card} />
            </Grid>
          ))
        ) : (
          <Typography>You Have No Bided Yet</Typography>
        )}
      </Grid>
      {pagesCount && (
        <Pagination
          count={pagesCount}
          page={page}
          onChange={handleChange}
          sx={{
            mt: 4,
            "& .MuiPaginationItem-root": {
              bgcolor: "#EBEBEB",
              ":hover": {
                bgcolor: "#6600B5",
                opacity: "100%",
                color: "#FFFFFF",
              },
            },
            "& .MuiPaginationItem-root.Mui-selected": {
              bgcolor: "#6600B5",
              opacity: "60%",
              color: "#FFFFFF",
              "&:hover": {
                color: "#FFFFFF",
                bgcolor: "#6600B5",
                opacity: "100%",
              },
            },
          }}
        />
      )}
      <Footer />
    </>
  );
};

export default MyBids;
