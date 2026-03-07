import {
  sweetErrorAlert,
  sweetMixinSuccessAlert,
} from "@/libs/types/sweetAlert";
import { Stack, Typography, TextField, Button } from "@mui/material";
import { useState } from "react";

const brands = [
  { name: "MOLO", image: "/img/brands/molo.jpg" },
  { name: "COSMO", image: "/img/brands/cosmo.webp" },
  { name: "NORALEE", image: "/img/brands/noralee.jpg" },
  { name: "SWEEBIES", image: "/img/brands/sweebies.jpg" },
];

const Brand = () => {
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
          <Stack className="brand-card" key={brand.name}>
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
