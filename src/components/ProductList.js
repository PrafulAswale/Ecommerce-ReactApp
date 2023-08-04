import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import React from "react";
import ProductItem from "./ProductItem";

function ProductList() {
  const data = useSelector((state) => state.products);
  return (
    <Box sx={{ marginTop: "7rem" }}>
      <Typography variant="h3" align="center">
        Product List
      </Typography>
      {data.map((item) => (
        <ProductItem item={item} key={item.title} />
      ))}
    </Box>
  );
}

export default ProductList;
