import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import AddProduct from "./components/AddProduct";
import CartItems from "./components/CartItems";
import { addproducts } from "./actions";
import customFetch from "./apiCall";
import "./App.css";
import { ToastContainer } from "react-toastify";

function App() {
  let productDetailItem = useSelector((state) => state.itemToDisplay);

  const url = "https://my-json-server.typicode.com/prafulaswale/database/db";

  const dispatch = useDispatch();

  useEffect(() => {
    let response = customFetch(url, {
      method: "GET",
    });
    response.then((data) => {
      let modifiedData = data.products.map((item) => {
        item.edit = true;
        return item;
      });
      window.localStorage.setItem("products", JSON.stringify(modifiedData));
      let products = JSON.parse(window.localStorage.getItem("products"));
      dispatch(addproducts(products));
    });
  });
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route
            path={`/productdetails/${productDetailItem.id}`}
            element={<ProductDetail item={productDetailItem} />}
          />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/cart" element={<CartItems />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
