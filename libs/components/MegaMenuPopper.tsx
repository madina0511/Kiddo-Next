import React, { useMemo, useRef, useState } from "react";
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

export default function MegaMenuPopper({ label = "SHOP", items }: Props) {
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [open, setOpen] = useState(false);

  const menuItems = useMemo<MegaItem[]>(
    () =>
      items ?? [
        { title: "Outerwear", subtitle: "0–16 Years", href: "/outerWear" },
        { title: "Girl", subtitle: "2–16 Years", href: "/girl" },
        { title: "Boy", subtitle: "2–16 Years", href: "/boy" },
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
                <Link key={it.href} href={it.href} className="megaItem">
                  <Stack spacing={0.5} alignItems="center">
                    <Typography className="megaTitle">{it.title}</Typography>
                    {it.subtitle ? (
                      <Typography className="megaSubtitle">
                        {it.subtitle}
                      </Typography>
                    ) : null}
                  </Stack>
                </Link>
              ))}
            </Box>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
}
