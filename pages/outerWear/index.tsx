import LayoutHome from "@/libs/components/layout/LayoutHome";
import ProductCard from "@/libs/components/products/productCard";
import { Box, Stack, Typography } from "@mui/material";

const OuterWear = () => {
  // Handlers
  const likeProductHandler = (productId: string) => {
    console.log("Liked product:", productId);
  };
  return (
    <Stack id="pc-wrap">
      <Stack className="container">
        <Stack className="outer-wrap">
          <Box className="category">
            <Typography>OUTERWEAR</Typography>
          </Box>
          <Box className="product-wrap"></Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default LayoutHome(OuterWear);
