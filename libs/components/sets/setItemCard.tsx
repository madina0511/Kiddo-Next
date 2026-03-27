import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "@/apollo/user/query";
import { T } from "@/libs/common";
import { Product } from "@/libs/types/product/product";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { ClothingSize, CLOTHING_SIZE_LABELS } from "@/libs/enums/product.enum";

interface Props {
  itemId: string;
}

export default function SetItemCard({ itemId }: Props) {
  const [selectedSize, setSelectedSize] = useState("");
  const [item, setItem] = useState<Product | null>(null);

  useQuery(GET_PRODUCT, {
    variables: { input: itemId },
    fetchPolicy: "network-only",
    onCompleted: (data: T) => setItem(data?.getProduct),
  });

  if (!item) return null;

  return (
    <Box className="set-product-card">
      <Box className="product-image-wrap">
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}/${item.productImages?.[0]}`}
          alt={item.productTitle}
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/img/banner/header1.svg";
          }}
        />
      </Box>
      <Box className="product-info">
        <Typography className="product-name">{item.productTitle}</Typography>
        <Typography className="product-price">${item.productPrice}</Typography>

        <FormControl fullWidth size="small">
          <InputLabel>Size</InputLabel>
          <Select
            value={selectedSize}
            onChange={(e: SelectChangeEvent) => setSelectedSize(e.target.value)}
            label="Size">
            {item.size?.map((s) => (
              <MenuItem key={s} value={s}>
                {CLOTHING_SIZE_LABELS[s as ClothingSize] ?? s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button className="add-to-cart-btn" disabled={!selectedSize}>
          Add to cart
        </Button>
      </Box>
    </Box>
  );
}
