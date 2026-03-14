import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  ClickAwayListener,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { useQuery } from "@apollo/client";
// o'zingizning query va type import qiling:
// import { GET_BRANDS } from "@/apollo/user/query";
// import { Member } from "@/libs/types/member/member";

type Props = {
  label?: string;
};

export default function BrandMenuPopper({ label = "Brands" }: Props) {
  const router = useRouter();
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);

  // ✅ Backenddan brandlar ro'yxati
  // const { data } = useQuery(GET_BRANDS);
  // const brands: Member[] = data?.getBrands ?? [];

  // 🔧 Hozircha static data (keyinchalik query bilan almashtiring)
  const brands = [
    { _id: "1", memberNick: "MOLO" },
    { _id: "2", memberNick: "COSMO" },
    { _id: "3", memberNick: "NORALEE" },
    { _id: "4", memberNick: "SWEEBIES" },
  ];

  const categoryClickHandler = (brandNick: string) => {
    router.push(`/brand/${brandNick.toLowerCase()}`);
  };

  const handleOpen = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpen(true);
  };

  const handleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => setOpen(false), 150);
  };

  const handleCloseImmediate = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpen(false);
  };

  return (
    <Box
      ref={anchorRef}
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      className="megaAnchor"
      sx={{ display: "inline-flex", alignItems: "center" }}>
      <span className={`megaLabel ${open ? "isOpen" : ""}`}>{label}</span>

      <Popper
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        disablePortal
        modifiers={[
          { name: "offset", options: { offset: [0, 12] } },
          { name: "preventOverflow", options: { padding: 8 } },
        ]}
        sx={{ zIndex: 9999 }}>
        <ClickAwayListener onClickAway={handleCloseImmediate}>
          <Paper
            elevation={3}
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            className="megaPaper"
            sx={{
              position: "relative",
              zIndex: 9999,
              borderRadius: "14px",
              border: "1px solid #e5e7eb",
              overflow: "hidden",
            }}>
            <Box className="megaGrid">
              {brands.map((brand) => (
                <Box
                  key={brand._id} // ✅ unique key
                  className="megaItem"
                  onClick={() => categoryClickHandler(brand.memberNick)} // ✅
                  sx={{ cursor: "pointer" }}>
                  <Stack spacing={0.5} alignItems="center">
                    <Typography className="megaTitle">
                      {brand.memberNick} // ✅
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
}
