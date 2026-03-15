import { Stack, Box, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Logout from "@mui/icons-material/Logout";
import Link from "next/link";
import { REACT_APP_API_URL } from "../types/config";
import MegaMenuPopper from "./MegaMenuPopper";
import BrandMenuPopper from "./brands/MegaMenuPopper";
import { useRouter } from "next/router";

const Top = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({
    _id: "",
    memberImage: "",
  });
  // ✅ logout menu uchun
  const [logoutAnchor, setLogoutAnchor] = useState<null | HTMLElement>(null);
  const logoutOpen = Boolean(logoutAnchor);
  const [scrolled, setScrolled] = useState(false);
  // Apollo

  // Effects
  useEffect(() => {
    const handleScroll = () => {
      const isHomePage = router.pathname === "/";
      console.log("pathname:", router.pathname);
      console.log("isHomePage:", isHomePage);
      if (isHomePage) {
        console.log("scrollY:", window.scrollY);
        const heroHeight = window.innerHeight;
        setScrolled(window.scrollY > heroHeight - 80);
      } else {
        setScrolled(true); // ← boshqa sahifalarda har doim oq
      }
    };

    // ← sahifa load bo'lganda ham tekshir
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [router.pathname]);

  // Handlers
  const logOut = () => {
    // TODO: sizning logout logikangiz
    console.log("logout");
    setLogoutAnchor(null);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <nav className={`topNav ${scrolled ? "scrolled" : ""}`}>
      <Stack className="container">
        {/* logo */}
        <Stack className="topNav-logo">
          <Link href="/">
            <img
              className="logo"
              src={"/img/logo/kiddo_logo.svg"}
              alt="KIDDO"
            />
          </Link>
        </Stack>

        {/* Desktop Menu */}
        <div className="desktopMenu">
          <MegaMenuPopper label="SHOP" />
          <Link href="/sets">Sets</Link>
          <BrandMenuPopper label="Brands" />
          <Link href="/stories">Stories</Link>
          <Link href="/sizeGuide">SizeGuide</Link>
          {user._id ? <Link href={"/mypage"}>My Page</Link> : null}

          <div className="searchBox">
            <input
              className="searchInput"
              type="text"
              placeholder="Search products"
            />
            <SearchIcon style={{ color: "#6b7280", width: "18px" }} />
          </div>

          <div className="cartWrap">
            <IconButton>
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
          </div>

          {/* ✅ USER BOX (Login/Register yoki Avatar+Logout) */}
          <Box component={"div"} className={"user-box"}>
            {user?._id ? (
              <>
                <div
                  className={"login-user"}
                  onClick={(event: any) =>
                    setLogoutAnchor(event.currentTarget)
                  }>
                  <img
                    src={
                      user?.memberImage
                        ? `${REACT_APP_API_URL}/${user?.memberImage}`
                        : "/img/profile/defaultUser.svg"
                    }
                    alt="user"
                  />
                </div>
                <Menu
                  id="basic-menu"
                  anchorEl={logoutAnchor}
                  open={logoutOpen}
                  onClose={() => setLogoutAnchor(null)}
                  sx={{ mt: "5px" }}>
                  <MenuItem onClick={logOut}>
                    <Logout
                      fontSize="small"
                      style={{ color: "#6b7280", marginRight: "10px" }}
                    />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Link href="/account/join">
                <button className="loginBtn">Login</button>
              </Link>
            )}
          </Box>
        </div>
      </Stack>
    </nav>
  );
};

export default Top;
