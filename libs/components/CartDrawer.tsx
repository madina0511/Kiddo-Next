import { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "@/scss/pc/layout/CartDrawer.module.scss";

interface CartItem {
  _id: string;
  productTitle: string;
  productPrice: number;
  productImage: string;
  size: string;
  quantity: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const mockItems: CartItem[] = [
  {
    _id: "1",
    productTitle: "Ronin Unity",
    productPrice: 40,
    productImage: "/img/product/product1.jpg",
    size: "128",
    quantity: 1,
  },
  {
    _id: "2",
    productTitle: "Holley Pearled Ivory",
    productPrice: 110,
    productImage: "/img/product/product2.jpg",
    size: "164",
    quantity: 1,
  },
];

export default function CartDrawer({ open, onClose }: Props) {
  const [items, setItems] = useState<CartItem[]>(mockItems);

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item,
      ),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item._id !== id));
  };

  const subtotal = items.reduce(
    (sum, i) => sum + i.productPrice * i.quantity,
    0,
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box className={styles.drawer}>
        {/* Header */}
        <Stack
          className={styles.header}
          direction="row"
          justifyContent="space-between"
          alignItems="center">
          <Typography className={styles.title}>
            CART {String(items.length).padStart(2, "0")}
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>

        <Divider />

        {/* Items */}
        <Box className={styles.itemList}>
          {items.length === 0 ? (
            <Typography className={styles.empty}>Your cart is empty</Typography>
          ) : (
            items.map((item) => (
              <Box key={item._id} className={styles.item}>
                <img
                  src={item.productImage}
                  alt={item.productTitle}
                  className={styles.itemImg}
                />
                <Box className={styles.itemInfo}>
                  <Stack direction="row" justifyContent="space-between">
                    <Typography className={styles.itemTitle}>
                      {item.productTitle.toUpperCase()}
                    </Typography>
                    <Typography className={styles.itemPrice}>
                      ${item.productPrice.toFixed(2)}
                    </Typography>
                  </Stack>
                  <Typography className={styles.itemSize}>
                    {item.size}
                  </Typography>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mt={1}>
                    <Stack direction="row" alignItems="center" gap={1}>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item._id, -1)}>
                        <RemoveIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                      <Typography className={styles.qty}>
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item._id, 1)}>
                        <AddIcon sx={{ fontSize: 14 }} />
                      </IconButton>
                    </Stack>
                    <Typography
                      className={styles.removeBtn}
                      onClick={() => removeItem(item._id)}>
                      REMOVE
                    </Typography>
                  </Stack>
                </Box>
                <Divider />
              </Box>
            ))
          )}
        </Box>

        {/* Footer */}
        <Box className={styles.footer}>
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography className={styles.label}>SUBTOTAL</Typography>
            <Typography className={styles.value}>
              ${subtotal.toFixed(2)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between" mb={2}>
            <Typography className={styles.label}>SHIPPING</Typography>
            <Typography className={styles.value}>FREE</Typography>
          </Stack>
          <Divider sx={{ mb: 2 }} />
          <Stack direction="row" justifyContent="space-between" mb={3}>
            <Typography className={styles.grandLabel}>GRAND TOTAL</Typography>
            <Typography className={styles.grandValue}>
              ${subtotal.toFixed(2)}
            </Typography>
          </Stack>
          <Button fullWidth className={styles.checkoutBtn}>
            CONTINUE TO CHECKOUT
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
