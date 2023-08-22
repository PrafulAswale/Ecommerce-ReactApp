import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import { ProductToview, addproducts } from "../actions";
import { useNavigate } from "react-router-dom";
import { addCart, CartItems } from "../actions";
import customFetch from "../apiCall";
import { toast } from "react-toastify";

function ProductItem({ item }) {
  const [addedItem, setAddedItem] = useState(true);
  const [title, setTitle] = useState(item.title);
  const [price, setPrice] = useState(item.price);
  // const [rating, setrating] = useState(item.rating);
  const [description, setDescription] = useState(item.description);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dispatchCart = useDispatch();
  const dispatchTotal = useDispatch();
  const dispatchProduct = useDispatch();

  //event handler for product detail
  function handleClick(item) {
    dispatch(ProductToview(item));
    navigate(`/productdetails/${item.id}`);
  }
  // event hadler for cart
  function handleCart(item) {
    if (addedItem) {
      item.qty = 1;
      dispatchCart(addCart(item));
      dispatchTotal(CartItems());
      setAddedItem(false);
      toast.success("Item Added to cart");
    } else {
      navigate("/cart");
    }
  }

  // event handler for update
  function handleEdit(item) {
    item.edit = false;
    dispatchProduct(addproducts([...products]));
  }
  // making delete request
  function handleDelelteProduct(item) {
    let url = `https://my-json-server.typicode.com/jaiswalaryan/data/products/${item.id}`;
    let result = customFetch(url, { method: "DELETE" });
    result.then(() => {
      let index = products.indexOf(item);
      products.splice(index, 1);
      dispatchProduct(addproducts([...products]));
      toast.success("Deleted Successfully");
    });
  }
  // closing edit mode
  function handleCancel(item) {
    item.edit = true;
    dispatchProduct(addproducts([...products]));
  }
  // making put request after click on save button of edit
  function handleSave(item) {
    let url = `https://my-json-server.typicode.com/jaiswalaryan/data/products/${item.id}`;
    let result = customFetch(url, {
      body: {
        ...item,
        title,
        price,
        // rating,
        description,
        edit: true,
      },
      method: "PUT",
    });
    result.then((data) => {
      let index = products.indexOf(item);
      products[index] = data;

      dispatchProduct(addproducts([...products]));
      toast.success("Updated Successfully");
    });
  }
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          marginTop: "2rem",
          boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          padding: "10px",
        }}
      >
        <Box sx={{ width: "33%", height: "10rem", cursor: "pointer" }}>
          <img
            width={"90%"}
            height={"100%"}
            src={item.thumbnail}
            alt="phone"
            onClick={() => handleClick(item)}
          />
        </Box>
        <Box sx={{ width: "33%", height: "10rem" }}>
          {item.edit ? (
            <Typography sx={{ fontWeight: "bold" }}>{item.title}</Typography>
          ) : (
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              defaultValue={item.title}
              onChange={(e) => setTitle(e.target.value)}
            />
          )}
          {item.edit ? (
            <Typography sx={{ marginTop: "10px" }}>{item.price}</Typography>
          ) : (
            <TextField
              sx={{ marginTop: "15px" }}
              id="outlined-basic"
              label="Price"
              variant="outlined"
              defaultValue={item.price}
              onChange={(e) => setPrice(e.target.value)}
            />
          )}
        </Box>
        <Box
          sx={{
            width: "33%",
            height: "auto",
          }}
        >
          {item.edit ? (
            <Typography>{item.description}</Typography>
          ) : (
            <TextField
              id="outlined-multiline-static"
              label="Description"
              multiline
              rows={2}
              defaultValue={item.description}
              onChange={(e) => setDescription(e.target.value)}
            />
          )}
          {item.edit ? (
            <Box
              sx={{
                width: "90%",
                height: "auto",
                paddingTop: "95px",
              }}
            >
              <Button
                sx={{ background: "#063970" }}
                variant="contained"
                onClick={() => handleCart(item)}
              >
                {addedItem ? "Add to Cart" : "Go to Cart "}
              </Button>

              <EditIcon
                sx={{ marginLeft: "80px", cursor: "pointer" }}
                onClick={() => handleEdit(item)}
              />
              <DeleteIcon
                sx={{ marginLeft: "80px", cursor: "pointer" }}
                onClick={() => handleDelelteProduct(item)}
              />
            </Box>
          ) : (
            <Box
              sx={{
                width: "90%",
                height: "auto",
                paddingTop: "30px",
              }}
            >
              <Button
                sx={{ background: "#063970" }}
                variant="contained"
                onClick={() => handleCancel(item)}
              >
                Cancle
              </Button>
              <Button
                sx={{ marginLeft: "80px", background: "#063970" }}
                variant="contained"
                onClick={() => handleSave(item)}
              >
                Save
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default ProductItem;
