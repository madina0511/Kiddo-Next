import { useState } from "react";
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  Typography,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useQuery, useMutation } from "@apollo/client";
import { UPDATE_CART, REMOVE_CART_ITEM } from "@/apollo/user/cart/mutation";
import styles from "@/scss/pc/layout/CartDrawer.module.scss";
import { GET_MY_CART } from "@/apollo/user/cart/query";
import { Cart, CartItem } from "../types/cart/cart";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { useRouter } from "next/router";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: Props) {
  const user = useReactiveVar(userVar);
  const router = useRouter();
  const { data, loading } = useQuery<{ getMyCart: Cart }>(GET_MY_CART, {
    skip: !open,
    fetchPolicy: "network-only",
  });

  const [updateCartItem, { loading: updating }] = useMutation<{
    updateCartItem: Cart;
  }>(UPDATE_CART);

  const [removeFromCart, { loading: removing }] = useMutation<{
    removeFromCart: Cart;
  }>(REMOVE_CART_ITEM);

  const items: CartItem[] = data?.getMyCart?.items ?? [];
  const totalAmount = Number(data?.getMyCart?.totalAmount ?? 0);

  const getImageSrc = (item: CartItem) => {
    const firstImage = item.productImages?.[0];
    if (!firstImage) return "/img/product/default-product.png";

    if (firstImage.startsWith("http")) return firstImage;

    return `${process.env.NEXT_PUBLIC_API_URL}/${firstImage}`;
  };

  const getSizeLabel = (size: string | string[] | undefined) => {
    if (!size) return "";
    return Array.isArray(size) ? size.join(", ") : size;
  };

  const updateQuantity = async (
    id: string,
    delta: number,
    currentQty: number,
  ) => {
    const newQty = Math.max(1, Number(currentQty) + delta);
    if (newQty === currentQty) return;

    try {
      console.log("UPDATE VARIABLES:", {
        input: {
          _id: String(id),
          quantity: newQty,
        },
      });

      const res = await updateCartItem({
        variables: {
          input: {
            _id: String(id),
            quantity: newQty,
          },
        },
        refetchQueries: [{ query: GET_MY_CART }],
        awaitRefetchQueries: true,
      });

      console.log("UPDATE RESULT:", res);
    } catch (err: any) {
      console.error("UPDATE CART ERROR:", err);
      console.error("GRAPHQL ERRORS:", err?.graphQLErrors);
      console.error("FIRST ERROR:", err?.graphQLErrors?.[0]);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await removeFromCart({
        variables: {
          input: { _id: id },
        },
        refetchQueries: [{ query: GET_MY_CART }],
        awaitRefetchQueries: true,
      });
    } catch (err) {
      console.error("REMOVE CART ITEM ERROR:", err);
    }
  };
  const handleCheckout = () => {
    if (!user?._id) {
      router.push("/account/join");
      onClose();
      return;
    }
    onClose();
  };
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      ModalProps={{ keepMounted: true }}
      sx={{
        zIndex: 2000,
        "& .MuiBackdrop-root": { backgroundColor: "rgba(0,0,0,0.35)" },
        "& .MuiDrawer-paper": {
          width: 520,
          maxWidth: "100vw",
          height: "calc(100% - 80px)",
          top: "80px",
          boxSizing: "border-box",
          backgroundColor: "#fff",
          boxShadow: "none",
        },
      }}>
      <Box className={styles.drawer}>
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

        <Box className={styles.itemList}>
          {loading ? (
            <Stack alignItems="center" mt={4}>
              <CircularProgress size={24} />
            </Stack>
          ) : items.length === 0 ? (
            <Typography className={styles.empty}>Your cart is empty</Typography>
          ) : (
            items.map((item, index) => (
              <Box key={item._id}>
                <Box className={styles.item}>
                  <img
                    src={getImageSrc(item)}
                    alt={item.productTitle || "Product image"}
                    className={styles.itemImg}
                    onError={(e) => {
                      e.currentTarget.src = "/img/product/default-product.png";
                    }}
                  />

                  <Box className={styles.itemInfo}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      gap={2}>
                      <Typography className={styles.itemTitle}>
                        {(item.productTitle ?? "").toUpperCase()}
                      </Typography>

                      <Typography className={styles.itemPrice}>
                        ${Number(item.productPrice ?? 0).toFixed(2)}
                      </Typography>
                    </Stack>

                    <Typography className={styles.itemSize}>
                      {getSizeLabel(item.size)}
                    </Typography>

                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      mt={1}>
                      <Stack direction="row" alignItems="center" gap={1}>
                        <IconButton
                          size="small"
                          disabled={updating || removing || item.quantity <= 1}
                          onClick={() =>
                            updateQuantity(item._id, -1, item.quantity)
                          }>
                          <RemoveIcon sx={{ fontSize: 14 }} />
                        </IconButton>

                        <Typography className={styles.qty}>
                          {item.quantity}
                        </Typography>

                        <IconButton
                          size="small"
                          disabled={updating || removing}
                          onClick={() =>
                            updateQuantity(item._id, 1, item.quantity)
                          }>
                          <AddIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                      </Stack>

                      <Typography
                        className={styles.removeBtn}
                        onClick={() => !removing && removeItem(item._id)}
                        sx={{
                          cursor: removing ? "not-allowed" : "pointer",
                          opacity: removing ? 0.6 : 1,
                        }}>
                        REMOVE
                      </Typography>
                    </Stack>
                  </Box>
                </Box>

                {index !== items.length - 1 && <Divider />}
              </Box>
            ))
          )}
        </Box>

        <Box className={styles.footer}>
          <Stack direction="row" justifyContent="space-between" mb={1}>
            <Typography className={styles.label}>SUBTOTAL</Typography>
            <Typography className={styles.value}>
              ${totalAmount.toFixed(2)}
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
              ${totalAmount.toFixed(2)}
            </Typography>
          </Stack>

          <Button
            fullWidth
            className={styles.checkoutBtn}
            onClick={handleCheckout}>
            CONTINUE TO CHECKOUT
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
