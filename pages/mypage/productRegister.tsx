import type { Metadata } from "next";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import ProductRegisterTabs from "@/libs/components/mypage/ProductRegisterTabs";
import withLayoutBase from "@/libs/components/layout/LayoutBase";

export const metadata: Metadata = {
  title: "Add Product | Kiddo",
  description: "Register a new product or set on behalf of your brand",
};

function ProductRegisterPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f7f7f5", py: 4 }}>
      <Container maxWidth="sm">
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={500} gutterBottom>
            Add Product
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Register a new product or set on behalf of your brand
          </Typography>
        </Box>

        <ProductRegisterTabs />
      </Container>
    </Box>
  );
}
export default withLayoutBase(ProductRegisterPage);
