import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import AddProduct from "./components/AddProduct";
import Cart from "./components/Cart";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/productdetail" element={<ProductDetail />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
