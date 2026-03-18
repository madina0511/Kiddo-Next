import React from "react";
import { Stack, Typography } from "@mui/material";
import withLayoutBase from "@/libs/components/layout/LayoutBase";

const HowWeGiveBack = () => {
  return (
    <div id="kiddo-cares-page">
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          width: "100%",
          minHeight: "80vh",
        }}>
        {/* LEFT - VIDEO */}
        <Stack
          sx={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
          }}>
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}>
            <source src="/video/kiddo_care_video.mp4" type="video/mp4" />
          </video>
        </Stack>

        {/* RIGHT - TEXT */}
        <Stack
          justifyContent="center"
          sx={{
            flex: 1,
            padding: { xs: "40px 20px", md: "80px" },
            backgroundColor: "#FAF7F2",
          }}>
          <Typography
            sx={{
              fontSize: "14px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              color: "#9C7C5B",
              mb: 2,
            }}>
            Kiddo Cares
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: "32px", md: "48px" },
              fontWeight: 500,
              lineHeight: 1.2,
              color: "#2F2A26",
              mb: 3,
            }}>
            Made with Care, Shared with Love
          </Typography>

          <Typography
            sx={{
              fontSize: "18px",
              lineHeight: 1.9,
              color: "#5F5A55",
              mb: 2,
            }}>
            At Kiddo, we believe in creating more than clothing. We bring
            comfort, joy, and kindness into everyday family life.
          </Typography>

          <Typography
            sx={{
              fontSize: "18px",
              lineHeight: 1.9,
              color: "#5F5A55",
            }}>
            Through thoughtful initiatives and family-centered values, we aim to
            make a small but meaningful difference for little ones and the
            people who love them.
          </Typography>
        </Stack>
      </Stack>
    </div>
  );
};

export default withLayoutBase(HowWeGiveBack);
