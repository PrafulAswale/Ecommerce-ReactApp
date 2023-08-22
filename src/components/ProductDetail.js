import React from "react";
import { useDispatch } from "react-redux";
import { addCart, CartItems } from "../actions";
import { toast } from "react-toastify";
import { Box, Button, Typography } from "@mui/material";

function ProductDetail({ item }) {
  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();
  //event handle for click/ add to cart
  function handleClick(item) {
    if (!item.qty) {
      item.qty = 1;
      dispatchCart(addCart(item));
      dispatchTotal(CartItems());
      toast.success("item Added to cart");
    } else {
      dispatchCart(addCart(item));
      dispatchTotal(CartItems());
      toast("item Added to cart", "success");
    }
  }
  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "7rem",
        gap: 4,
      }}
    >
      <Box>
        <img src={item.thumbnail} alt="phone" />
      </Box>
      <Box>
        <Typography variant="h3" sx={{ marginBottom: "10px" }}>
          {item.title}
        </Typography>

        <Typography sx={{ marginBottom: "10px" }}>
          {item.description}
        </Typography>
        <Typography sx={{ marginBottom: "10px" }}>Rs. {item.price}</Typography>
        <Box sx={{ marginTop: "50px" }}>
          <Button
            onClick={() => handleClick(item)}
            variant="contained"
            sx={{ bgcolor: "#063970" }}
          >
            Add to cart
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ProductDetail;
