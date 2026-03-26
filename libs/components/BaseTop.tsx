import { Stack, Box, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";

import MegaMenuPopper from "./MegaMenuPopper";
import BrandMenuPopper from "./brands/MegaMenuPopper";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { getJwtToken, logOut, updateUserInfo } from "../auth";
import { NEXT_PUBLIC_API_URL } from "../config";
import { sweetConfirmAlert } from "../types/sweetAlert";
import CartDrawer from "./CartDrawer";

const Top = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const user = useReactiveVar(userVar);
  const [logoutAnchor, setLogoutAnchor] = useState<null | HTMLElement>(null);
  const logoutOpen = Boolean(logoutAnchor);
  const [cartOpen, setCartOpen] = useState(false);
  console.log(userVar());
  useEffect(() => {
    const jwt = getJwtToken();
    if (jwt) updateUserInfo(jwt);
  }, []);

  const logoutHandler = async () => {
    console.log("logoutHandler triggered");
    try {
      console.log("logout");
      setLogoutAnchor(null);
      if (await sweetConfirmAlert("Do you want to logout?")) logOut();
    } catch (err: any) {
      console.log("ERROR, logoutHandler:", err.message);
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <nav className={"BaseTopNav"}>
      <Stack className="container">
        <Stack className="topNav-logo">
          <Link href="/">
            <img
              className="logo"
              src={"/img/logo/kiddo_logo.svg"}
              alt="KIDDO"
            />
          </Link>
        </Stack>

        <div className="desktopMenu">
          <Link href="/products">Shop</Link>
          <Link href="/sets">Sets</Link>
          <BrandMenuPopper label="Brands" />
          <Link href="/kiddo-club">Kiddo Club</Link>
          <Link href="/sizeGuide">SizeGuide</Link>
          {user?._id ? <Link href="/mypage">My Page</Link> : null}

          <div className="searchBox">
            <input
              className="searchInput"
              type="text"
              placeholder="Search products"
            />
            <SearchIcon style={{ color: "#6b7280", width: "18px" }} />
          </div>

          <div className="cartWrap">
            <IconButton onClick={() => setCartOpen(true)}>
              <Badge
                badgeContent={4}
                sx={{
                  "& .MuiBadge-badge": {
                    backgroundColor: "#6b7280",
                    color: "#fff",
                  },
                }}>
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
            <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
          </div>

          <Box
            component="div"
            className="user-box"
            style={{ cursor: "pointer" }}>
            {user?._id ? (
              <>
                <div
                  className="login-user"
                  onClick={(event: React.MouseEvent<HTMLElement>) =>
                    setLogoutAnchor(event.currentTarget)
                  }>
                  <img
                    src={
                      user?.memberImage
                        ? `${NEXT_PUBLIC_API_URL}/${user.memberImage}`
                        : "/img/profile/defaultUser.svg"
                    }
                    alt="user"
                  />
                </div>

                {logoutOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100px",
                      right: 0,
                      background: "#fff",
                      border: "1px solid #eee",
                      borderRadius: "8px",
                      padding: "8px",
                      zIndex: 9999,
                      cursor: "pointer",
                    }}
                    onClick={logoutHandler}>
                    Logout
                  </div>
                )}
              </>
            ) : (
              <Link href="/account/join" className="loginBtn">
                Login
              </Link>
            )}
          </Box>
        </div>
      </Stack>
    </nav>
  );
};

export default Top;
