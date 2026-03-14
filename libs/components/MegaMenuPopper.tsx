import React, { useMemo, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  Box,
  ClickAwayListener,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";

type MegaItem = {
  title: string;
  subtitle?: string;
  href: string;
};

type Props = {
  label?: string; // default: "SHOP"
  items?: MegaItem[];
};

export default function MegaMenuPopper({ label = "SHop", items }: Props) {
  const router = useRouter();
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);

  const menuItems = useMemo<MegaItem[]>(
    () =>
      items ?? [
        { title: "OUTERWEAR", subtitle: "0–16 Years", href: "/outerWear" },
        { title: "INDOOWEAR", subtitle: "2–16 Years", href: "/girl" },

        {
          title: "Accessories",
          subtitle: "0–16 Years",
          href: "/accessories",
        },
        {
          title: "Baby & Toddler",
          subtitle: "0–4 years",
          href: "/baby_toddler",
        },
        { title: "Swimwear", subtitle: "0–16 Years", href: "/swimwear" },
      ],
    [items],
  );
  // Handlers
  const categoryClickHandler = (category: string) => {
    router.push(`/products?category=${category}`);
  };
  const handleOpen = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setOpen(true);
  };

  const handleClose = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpen(false);
    }, 150); // 🔥 hoverda titrash bo'lmasin
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
              {menuItems.map((it) => (
                <Box
                  key={it.href}
                  className="megaItem"
                  onClick={() => categoryClickHandler(it.title)}
                  sx={{ cursor: "pointer" }}>
                  <Stack spacing={0.5} alignItems="center">
                    <Typography className="megaTitle">{it.title}</Typography>
                    {it.subtitle ? (
                      <Typography className="megaSubtitle">
                        {it.subtitle}
                      </Typography>
                    ) : null}
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
