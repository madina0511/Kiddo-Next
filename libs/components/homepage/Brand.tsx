import {
  sweetErrorAlert,
  sweetMixinSuccessAlert,
} from "@/libs/types/sweetAlert";
import { Stack, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";

const brands = [
  { name: "MOLO", image: "/img/brands/molo.jpg", slug: "molo" },
  { name: "COSMO", image: "/img/brands/cosmo.webp", slug: "cosmo" },
  { name: "NORALEE", image: "/img/brands/noralee.jpg", slug: "noralee" },
  { name: "SWEEBIES", image: "/img/brands/sweebies.jpg", slug: "sweebies" },
];

const Brand = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    if (!email.trim()) {
      await sweetErrorAlert("Please enter your email");
      return;
    }
    await sweetMixinSuccessAlert("Your email has been submitted successfully!");
    setEmail("");
  };

  return (
    <Stack className="brand-section">
      <Typography className="brand-title">OUR BRANDS</Typography>

      <Stack className="brand-wrap">
        {brands.map((brand) => (
          <Stack
            className="brand-card"
            key={brand.name}
            onClick={() => router.push(`/brand/${brand.slug}`)} // ✅ click handler
            sx={{ cursor: "pointer" }}>
            <img src={brand.image} alt={brand.name} className="brand-image" />
            <Stack className="brand-overlay">
              <h3>{brand.name}</h3>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Stack className="brand-contact">
        <Typography className="brand-contact-text">
          BECOME A PARTNER BRAND WITH US
        </Typography>
        <Stack className="email-box">
          <TextField
            size="small"
            placeholder="Email address"
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="brand-input"
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            className="brand-btn">
            Send
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Brand;
