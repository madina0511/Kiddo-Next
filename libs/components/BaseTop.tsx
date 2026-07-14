import { Stack, Box, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import MegaMenuPopper from "./MegaMenuPopper";
import BrandMenuPopper from "./brands/MegaMenuPopper";
import { useRouter } from "next/router";
import { useQuery, useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { getJwtToken, logOut, updateUserInfo } from "../auth";
import { NEXT_PUBLIC_API_URL } from "../config";
import { sweetConfirmAlert } from "../types/sweetAlert";
import CartDrawer from "./CartDrawer";
import { GET_MY_CART } from "@/apollo/user/cart/query";
import { GET_AGENTS } from "@/apollo/user/query";

const Top = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const user = useReactiveVar(userVar);
  const [logoutAnchor, setLogoutAnchor] = useState<null | HTMLElement>(null);
  const logoutOpen = Boolean(logoutAnchor);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Apollo
  const { data: brandsData } = useQuery(GET_AGENTS, {
    variables: { input: { page: 1, limit: 100, search: {} } },
  });
  const { data: cartData } = useQuery(GET_MY_CART, {
    skip: !user?._id,
  });
  useEffect(() => {
    const jwt = getJwtToken();
    if (jwt) updateUserInfo(jwt);
  }, []);

  const logoutHandler = async () => {
    try {
      setLogoutAnchor(null);
      if (await sweetConfirmAlert("Do you want to logout?")) logOut();
    } catch (err: any) {
      console.log("ERROR, logoutHandler:", err.message);
    }
  };
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") return;
    const value = searchText.trim().toLowerCase();
    if (!value) return;

    const pageRoutes: Record<string, string> = {
      sets: "/sets",
      brands: "/brands",
      club: "/kiddo-club",
      shop: "/products",
    };
    if (pageRoutes[value]) {
      router.push(pageRoutes[value]);
      return;
    }

    const brands = brandsData?.getAgents?.list ?? [];
    const matched = brands.find(
      (b: any) =>
        b.brandName?.toLowerCase() === value ||
        b.memberNick?.toLowerCase() === value,
    );
    if (matched) {
      const slug = (matched.brandName || matched.memberNick)
        .toLowerCase()
        .replace(/\s+/g, "-");
      router.push(`/brand/${slug}`);
      return;
    }

    router.push(`/products?search=${encodeURIComponent(searchText.trim())}`);
    setSearchText("");
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
          {user?._id ? (
            <Link href={user.memberType === "ADMIN" ? "/_admin" : "/mypage"}>
              My Page
            </Link>
          ) : null}

          <div className="searchBox">
            <input
              className="searchInput"
              type="text"
              placeholder="Search products"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleSearch}
            />
            <SearchIcon style={{ color: "#6b7280", width: "18px" }} />
          </div>

          <div className="cartWrap">
            <IconButton onClick={() => setCartOpen(true)}>
              <Badge
                badgeContent={cartData?.getMyCart?.items?.length || 0}
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

        <div className="mobileActions">
          <IconButton onClick={() => setCartOpen(true)}>
            <Badge
              badgeContent={cartData?.getMyCart?.items?.length || 0}
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#6b7280",
                  color: "#fff",
                },
              }}>
              <ShoppingCartOutlinedIcon />
            </Badge>
          </IconButton>

          <button
            className="mobileMenuBtn"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu">
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {mobileOpen && (
          <div className="mobileMenu">
            <Link
              className="mobileLink"
              href="/products"
              onClick={() => setMobileOpen(false)}>
              Shop
            </Link>
            <Link
              className="mobileLink"
              href="/sets"
              onClick={() => setMobileOpen(false)}>
              Sets
            </Link>
            <Link
              className="mobileLink"
              href="/brands"
              onClick={() => setMobileOpen(false)}>
              Brands
            </Link>
            <Link
              className="mobileLink"
              href="/kiddo-club"
              onClick={() => setMobileOpen(false)}>
              Kiddo Club
            </Link>
            <Link
              className="mobileLink"
              href="/sizeGuide"
              onClick={() => setMobileOpen(false)}>
              SizeGuide
            </Link>
            {user?._id ? (
              <>
                <Link
                  className="mobileLink"
                  href={user.memberType === "ADMIN" ? "/_admin" : "/mypage"}
                  onClick={() => setMobileOpen(false)}>
                  My Page
                </Link>
                <span
                  className="mobileLink"
                  onClick={() => {
                    setMobileOpen(false);
                    logoutHandler();
                  }}>
                  Logout
                </span>
              </>
            ) : (
              <Link
                className="mobileLoginBtn"
                href="/account/join"
                onClick={() => setMobileOpen(false)}>
                Login
              </Link>
            )}
          </div>
        )}

        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </Stack>
    </nav>
  );
};

export default Top;
