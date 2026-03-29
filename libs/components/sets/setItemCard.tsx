import { useQuery, useMutation } from "@apollo/client";
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
  IconButton,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { ClothingSize, CLOTHING_SIZE_LABELS } from "@/libs/enums/product.enum";
import { ADD_TO_CART } from "@/apollo/user/cart/mutation";
import { GET_MY_CART } from "@/apollo/user/cart/query";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Props {
  itemId: string;
}

export default function SetItemCard({ itemId }: Props) {
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState<Product | null>(null);

  useQuery(GET_PRODUCT, {
    variables: { input: itemId },
    fetchPolicy: "network-only",
    onCompleted: (data: T) => setItem(data?.getProduct),
  });

  const [addToCart, { loading }] = useMutation(ADD_TO_CART);

  const handleAddToCart = async () => {
    if (!item || !selectedSize) return;

    try {
      const res = await addToCart({
        variables: {
          input: {
            productId: item._id,
            size: [selectedSize],
            quantity: Number(quantity),
          },
        },
      });

      console.log("SUCCESS:", res);
    } catch (err: any) {
      console.error("ADD TO CART ERR:", err);
      console.error("GRAPHQL ERRORS:", err?.graphQLErrors);
      console.error("NETWORK ERROR:", err?.networkError);
    }
  };

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

        <Stack direction="row" alignItems="center" gap={1} mt={1}>
          <IconButton
            size="small"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
            <RemoveIcon sx={{ fontSize: 14 }} />
          </IconButton>
          <Typography>{quantity}</Typography>
          <IconButton size="small" onClick={() => setQuantity((q) => q + 1)}>
            <AddIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Stack>

        <Button
          className="add-to-cart-btn"
          disabled={!selectedSize || loading}
          onClick={handleAddToCart}>
          {loading ? "Adding..." : "Add to cart"}
        </Button>
      </Box>
    </Box>
  );
}
