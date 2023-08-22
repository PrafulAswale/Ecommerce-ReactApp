import React from "react";
import Cart from "./Cart";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

function CartItems() {
  let CartItem = useSelector((state) => state.cart);
  let totalItem = useSelector((state) => state.totalCart);
  //total price
  let totalPrice = CartItem.reduce((total, item) => {
    return (total += item.price * item.qty);
  }, 0);
  //calculating discount
  let totalDiscount = CartItem.reduce((total, item) => {
    let discont = item.discountPercentage;
    if (isNaN(discont)) {
      discont = 0;
    }
    return (total += (item.price * item.qty * discont) / 100);
  }, 0);

  // if cart is empty
  if (CartItem.length === 0)
    return (
      <Typography variant="h1" sx={{ textAlign: "center", marginTop: "5rem" }}>
        Your cart is empty
      </Typography>
    );
  return (
    <Box
      sx={{ display: "flex", gap: 2, marginTop: "7rem", width: "100%" }}
      value="2"
    >
      {" "}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          width: "55%",
        }}
      >
        {CartItem.map((item) => (
          <Cart item={item} key={item.id} />
        ))}
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "40%",
          height: "40%",
          padding: 2,
          gap: 2,
          marginTop: "2rem",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        }}
      >
        <Typography
          variant="span"
          sx={{ paddingBottom: 2, fontWeight: "bold" }}
        >
          Price Detail
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <span>Price({totalItem} item)</span>
          <span>{totalPrice}</span>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <span>Discount</span>
          <span>{Math.floor(totalDiscount)}</span>
        </Box>{" "}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <span className="">Delivery Charges</span>
          <span className="text-success">Free</span>
        </Box>{" "}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1rem",
          }}
        >
          <h3>Total Amount</h3>
          <span>{totalPrice - Math.floor(totalDiscount)}</span>
        </Box>
      </Box>
    </Box>
  );
}

export default CartItems;
