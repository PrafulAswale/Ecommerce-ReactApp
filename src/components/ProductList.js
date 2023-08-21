import React, { useState } from "react";
import ProductItem from "./ProductItem";
import { Box, Button, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { useDispatch, useSelector } from "react-redux";
import { addproducts } from "../actions";

function ProductList() {
  const data = useSelector((state) => state.products);
  const [flag, setflag] = useState(false);
  const products = useSelector((state) => state.products);
  const dispatchSort = useDispatch();
  const dispatchCancel = useDispatch();

  function handleSort() {
    let sortedData = products.sort((a, b) => a.price - b.price);
    dispatchSort(addproducts([...sortedData]));
    setflag(true);
  }
  function cancelSort() {
    let products = JSON.parse(window.localStorage.getItem("products"));
    dispatchCancel(addproducts([...products]));
    setflag(false);
  }
  return (
    <Box sx={{ marginTop: "7rem" }} value="0">
      <Typography variant="h3" align="center">
        Product List
      </Typography>

      <Box sx={{ float: "right" }}>
        {!flag ? (
          <Button
            variant="contained"
            sx={{ marginBottom: "20px", bgcolor: "#063970" }}
            onClick={() => handleSort()}
          >
            Sort By Price
          </Button>
        ) : (
          <Button
            variant="contained"
            sx={{ marginBottom: "20px", bgcolor: "#063970" }}
          >
            Sort By Price
            <CancelIcon onClick={() => cancelSort()} />
          </Button>
        )}
      </Box>
      {data.map((item) => (
        <ProductItem item={item} key={item.title} />
      ))}
    </Box>
  );
}

export default ProductList;
