import React from "react";
import { useDispatch } from "react-redux";
import { CartItems } from "../actions";
import { updateCart, DeleteCart } from "../actions";
import { Box, Typography, Button } from "@mui/material";
import { toast } from "react-toastify";
import AddCircleIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

function Cart({ item }) {
  const dispatchPlus = useDispatch();
  const dispatchMinus = useDispatch();
  const dispatchTotal = useDispatch();
  const dispatchDelete = useDispatch();
  // increase quantity of product
  function handlePlus(item) {
    item.qty += 1;
    dispatchPlus(updateCart(item));
    dispatchTotal(CartItems());
  }
  // decrease quantity of product
  function handleMinus(item) {
    if (item.qty > 1) {
      item.qty -= 1;
      dispatchMinus(updateCart(item));
      dispatchTotal(CartItems());
    }
  }
  // delete product from cart
  function handleCancel(item) {
    dispatchDelete(DeleteCart(item));
    dispatchTotal(CartItems());
    toast.success("Item removed from the cart");
  }
  return (
    <Box
      sx={{
        display: "flex",
        boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        padding: "10px",
        marginTop: "2rem",
      }}
    >
      <Box sx={{ width: "40%", height: "10rem", cursor: "pointer" }}>
        <img width={"90%"} height={"100%"} src={item.thumbnail} alt="phone" />
      </Box>
      <Box sx={{ width: "40%", height: "10rem" }}>
        <Typography>{item.title}</Typography>
        <Typography sx={{ marginTop: "10px" }}>{item.price}</Typography>
        <Box sx={{ marginTop: "10px", alignContent: "baseline" }}>
          <RemoveCircleIcon onClick={() => handleMinus(item)} />
          <Typography
            variant="span"
            sx={{
              border: "1px solid grey",
              margin: "20px",
              paddingLeft: "1rem",
              paddingRight: "1rem",
            }}
          >
            {item.qty}
          </Typography>
          <AddCircleIcon onClick={() => handlePlus(item)} />
        </Box>
      </Box>
      <Box sx={{}}>
        <Box
          sx={{
            width: "90%",
            height: "auto",
            paddingTop: "95px",
          }}
        >
          {" "}
          <Button
            sx={{ background: "#063970" }}
            variant="contained"
            onClick={() => handleCancel(item)}
          >
            Remove
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default Cart;
