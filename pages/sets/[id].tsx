// pages/sets/[id].tsx
import { useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Stack,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { products } from "@/libs/common";
import withLayoutBase from "@/libs/components/layout/LayoutBase";

const SIZE = ["2Y", "3Y", "4Y", "5Y", "6Y", "7Y", "8Y"];

const mockSet = {
  _id: "1",
  setName: "Summer Breeze Set",
  brand: "Molo",
  totalPrice: 189,
  setImage: "/img/sets/jacketset.webp",
  products: [
    {
      _id: "p1",
      productName: "Stripe Shirt",
      productPrice: 65,
      productImage: "/img/sets/settshort.webp",
      size: ["2Y", "3Y", "4Y", "5Y", "6Y", "7Y", "8Y"],
    },
    {
      _id: "p2",
      productName: "Linen Shorts",
      productPrice: 58,
      productImage: "/img/sets/jacketset1.webp",
      size: ["2Y", "3Y", "4Y", "5Y", "6Y", "7Y", "8Y"],
    },
    {
      _id: "p3",
      productName: "Summer Cap",
      productPrice: 66,
      productImage: "/img/sets/jacketsetshort.webp",
      size: ["2Y", "3Y", "4Y", "5Y", "6Y", "7Y", "8Y"],
    },
  ],
};

const SetDetailPage = () => {
  const router = useRouter();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>(
    {},
  );

  const handleSizeChange = (productId: string, event: SelectChangeEvent) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: event.target.value }));
  };

  return (
    <Box className="set-detail-page">
      <Box className="set-detail-container">
        {/* LEFT — katta rasm */}
        <Box className="set-detail-left">
          <img
            src={mockSet.setImage}
            alt={mockSet.setName}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/img/banner/header1.svg";
            }}
          />
        </Box>

        {/* RIGHT — ma'lumot */}
        <Box className="set-detail-right">
          {/* Header */}
          <Box className="set-detail-header">
            <Typography className="set-brand">{mockSet.brand}</Typography>
            <Typography className="set-name">{mockSet.setName}</Typography>
            <Typography className="set-total-price">
              Total: ${mockSet.totalPrice}
            </Typography>
          </Box>

          {/* Products — gorizontal */}
          <Box className="set-products">
            {mockSet.products.map((product) => (
              <Box key={product._id} className="set-product-card">
                {/* Rasm */}
                <Box className="product-image-wrap">
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/img/banner/header1.svg";
                    }}
                  />
                </Box>

                {/* Info */}
                <Box className="product-info">
                  <Typography className="product-name">
                    {product.productName}
                  </Typography>
                  <Typography className="product-price">
                    ${product.productPrice}
                  </Typography>

                  {/* Size */}
                  <FormControl fullWidth size="small">
                    <InputLabel id={`size-label-${product._id}`}>
                      Size
                    </InputLabel>
                    <Select
                      labelId={`size-label-${product._id}`}
                      value={selectedSizes[product._id] ?? ""}
                      onChange={(e) => handleSizeChange(product._id, e)}
                      label="Size">
                      {product.size?.map((item: string) => (
                        <MenuItem key={item} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Add to cart */}
                  <Button
                    className="add-to-cart-btn"
                    disabled={!selectedSizes[product._id]}>
                    Add to cart
                  </Button>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default withLayoutBase(SetDetailPage);
