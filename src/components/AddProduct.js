import React from "react";
import { useState } from "react";
import customFetch from "../apiCall";
import { addproducts } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField, Typography } from "@mui/material";
import { toast } from "react-toastify";

function AddProduct() {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbmail] = useState("");
  const [rating, setRating] = useState("");

  let url =
    "https://my-json-server.typicode.com/prafulaswale/database/products";

  function handleSubmit(e) {
    e.preventDefault();
    let result = customFetch(url, {
      body: {
        id: Date.now(),
        title: name,
        price,
        category,
        thumbnail,
        rating,
        description,
        edit: true,
      },
      method: "POST",
    });
    result.then((data) => {
      dispatch(addproducts([data, ...products]));
      navigate("/");
      toast.success("Product Added successfully");
    });
    setName("");
    setCategory("");
    setDescription("");
    setRating("");
    setThumbmail("");
    setPrice("");
  }
  return (
    <Box
      component="form"
      sx={{
        width: "40rem",
        height: "auto",
        margin: "auto",
        marginTop: "7rem",
      }}
      onSubmit={handleSubmit}
      value="1"
    >
      <Typography variant="h3" sx={{ textAlign: "center" }}>
        Add Product
      </Typography>

      <TextField
        sx={{ marginTop: "10px" }}
        fullWidth
        label="Product Name"
        id="fullWidth"
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        sx={{ marginTop: "10px" }}
        fullWidth
        label="Description"
        id="outlined-textarea"
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        sx={{ marginTop: "10px" }}
        fullWidth
        label="Price"
        id="fullWidth"
        onChange={(e) => setPrice(e.target.value)}
      />
      <TextField
        sx={{ marginTop: "10px" }}
        fullWidth
        label="Category"
        id="fullWidth"
        onChange={(e) => setCategory(e.target.value)}
      />
      <TextField
        sx={{ marginTop: "10px" }}
        fullWidth
        label="Thumbnail Image Url"
        id="fullWidth"
        onChange={(e) => setThumbmail(e.target.value)}
      />
      <TextField
        sx={{ marginTop: "10px" }}
        fullWidth
        label="Rating"
        id="fullWidth"
        onChange={(e) => setRating(e.target.value)}
      />
      <Button
        variant="submit"
        type="submit"
        fullWidth
        sx={{
          height: "3rem",
          color: "white",
          bgcolor: "#063970",
          marginTop: "10px",
        }}
      >
        Add{" "}
      </Button>
    </Box>
  );
}

export default AddProduct;
