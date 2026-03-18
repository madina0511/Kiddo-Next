import { Button, Stack, Typography } from "@mui/material";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckroomOutlinedIcon from "@mui/icons-material/CheckroomOutlined";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import Link from "next/link";
import { useRouter } from "next/router";

const values = [
  {
    icon: <LocalShippingOutlinedIcon />,
    title: "Fast Delivery",
  },
  {
    icon: <CheckroomOutlinedIcon />,
    title: "Comfort First",
  },
  {
    icon: <AutorenewOutlinedIcon />,
    title: "Easy Returns",
  },
  {
    icon: <FavoriteBorderOutlinedIcon />,
    title: "Giving  Back Love",
  },
];

const BrandValues = () => {
  const router = useRouter();
  return (
    <Stack className="values-section">
      <Stack className="values-left">
        <img src="/img/brands/value-kiddo.webp" alt="Kiddo values" />
      </Stack>

      <Stack className="values-right">
        <Typography className="values-subtitle">WHY KIDDO</Typography>

        <Typography className="values-title">
          Made for Little Moments
        </Typography>

        <Typography className="values-desc">
          At Kiddo, we create comfortable and playful clothing for little ones.
          Our collections are designed with soft fabrics, easy movement, and
          everyday joy in mind — so children can feel free, happy, and stylish.
        </Typography>

        <Stack className="values-items">
          {values.map((item) => (
            <Stack className="values-item" key={item.title}>
              <Stack className="values-icon">{item.icon}</Stack>
              <Typography className="values-item-title">
                {item.title}
              </Typography>
            </Stack>
          ))}
        </Stack>

        <Stack className="values-buttons">
          <Button
            onClick={() => router.push("/products")}
            className="values-btn primary">
            SHOP COLLECTION
          </Button>

          <Button
            onClick={() => router.push("/kiddo-cares")}
            className="values-btn secondary">
            KIDDO CARES
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BrandValues;
