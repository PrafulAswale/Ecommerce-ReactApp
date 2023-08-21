import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import {
  AppBar,
  Avatar,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import DrawerComp from "./DrawerComp";

const Header = () => {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  let total = useSelector((state) => state.totalCart);
  return (
    <React.Fragment>
      <AppBar sx={{ background: "#063970" }}>
        <Toolbar>
          <img src="../store.png" alt="store" width={"40px"} height={"40px"} />

          {isMatch ? (
            <>
              <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
                Shoppee
              </Typography>
              <DrawerComp />
            </>
          ) : (
            <>
              <Tabs
                sx={{ margin: "auto" }}
                indicatorColor="secondary"
                textColor="inherit"
                value={value}
                onChange={(e, value) => setValue(value)}
              >
                <Tab
                  LinkComponent={NavLink}
                  to="/"
                  label="Products"
                  value="0"
                />
                <Tab
                  LinkComponent={NavLink}
                  to="/addproduct"
                  label="Add Product"
                  value="1"
                />

                <Tab
                  LinkComponent={NavLink}
                  to="/cart"
                  label={"Cart"}
                  value="2"
                />
                {total !== 0 ? <strong>{total}</strong> : ""}
              </Tabs>
              <Avatar sx={{ bgcolor: deepOrange[500], cursor: "pointer" }}>
                PA
              </Avatar>
            </>
          )}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
};

export default Header;
