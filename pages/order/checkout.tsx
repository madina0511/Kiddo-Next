import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation, useReactiveVar } from "@apollo/client";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import { GET_MY_CART } from "@/apollo/user/cart/query";
import { CREATE_ORDER } from "@/apollo/user/order/order.mutation";
import { userVar } from "@/apollo/store";
import { Cart, CartItem } from "@/libs/types/cart/cart";
import withLayoutBase from "@/libs/components/layout/LayoutBase"; // haqiqiy nomga moslang

const inputSx = {
  "& .MuiOutlinedInput-root": {
    borderRadius: 0,
    fontSize: "16px",
    "& fieldset": { borderColor: "#ccc" },
    "&:hover fieldset": { borderColor: "#111" },
    "&.Mui-focused fieldset": { borderColor: "#111", borderWidth: "1px" },
  },
  "& .MuiInputLabel-root": {
    fontSize: "15px",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
};

const CheckoutPage = () => {
  const router = useRouter();
  const user = useReactiveVar(userVar);

  const { data, loading: cartLoading } = useQuery<{ getMyCart: Cart }>(
    GET_MY_CART,
    {
      skip: !user?._id,
      fetchPolicy: "network-only",
    },
  );

  const [createOrder, { loading: placing }] = useMutation(CREATE_ORDER);

  const [form, setForm] = useState({
    recipientName: "",
    phone: "",
    zipCode: "",
    address: "",
    addressDetail: "",
    deliveryNote: "",
  });

  const [error, setError] = useState("");

  const items: CartItem[] = data?.getMyCart?.items ?? [];
  const totalAmount = Number(data?.getMyCart?.totalAmount ?? 0);

  const handleChange =
    (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const validate = () => {
    if (!form.recipientName || !form.phone || !form.zipCode || !form.address) {
      setError("Please fill in all required delivery fields.");
      return false;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    setError("");
    if (!validate()) return;
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      const result = await createOrder({
        variables: {
          input: {
            items: items.map((item) => ({
              productId: item.productId,
              productName: item.productTitle,
              productImages: item.productImages?.[0] ?? "",
              quantity: item.quantity,
              price: Number(item.productPrice),
            })),
            totalAmount,
            address: {
              recipientName: form.recipientName,
              phone: form.phone,
              zipCode: form.zipCode,
              address: form.address,
              addressDetail: form.addressDetail,
              deliveryNote: form.deliveryNote,
            },
          },
        },
      });

      const orderId = result.data?.createOrder?._id;
      const orderNumber = result.data?.createOrder?.orderNumber;
      const amountKRW = result.data?.createOrder?.totalAmountKRW;
      router.push(
        `/order/payment?orderId=${orderId}&amountKRW=${amountKRW}&orderNumber=${orderNumber}`,
      );
    } catch (err: any) {
      console.error("CREATE ORDER ERROR:", err);
      setError(err?.graphQLErrors?.[0]?.message || "Failed to create order.");
    }
  };

  if (cartLoading) {
    return (
      <Stack alignItems="center" mt={10}>
        <CircularProgress />
      </Stack>
    );
  }

  return (
    <Box sx={{ maxWidth: 1100, mx: "auto", py: 8, px: { xs: 2, md: 4 } }}>
      <Typography
        sx={{
          fontSize: { xs: "32px", md: "42px" },
          fontWeight: 700,
          letterSpacing: "1px",
          textTransform: "uppercase",
          mb: 6,
        }}>
        Checkout
      </Typography>

      <Stack direction={{ xs: "column", md: "row" }} spacing={6}>
        {/* Delivery form */}
        <Box flex={1.4}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              mb: 3,
              pb: 1.5,
              borderBottom: "2px solid #111",
            }}>
            Delivery Address
          </Typography>
          <Stack spacing={3}>
            <TextField
              label="Recipient Name"
              value={form.recipientName}
              onChange={handleChange("recipientName")}
              required
              fullWidth
              sx={inputSx}
            />
            <TextField
              label="Phone Number"
              value={form.phone}
              onChange={handleChange("phone")}
              required
              fullWidth
              sx={inputSx}
            />
            <TextField
              label="Zip Code"
              value={form.zipCode}
              onChange={handleChange("zipCode")}
              required
              fullWidth
              sx={inputSx}
            />
            <TextField
              label="Address"
              value={form.address}
              onChange={handleChange("address")}
              required
              fullWidth
              sx={inputSx}
            />
            <TextField
              label="Address Detail"
              value={form.addressDetail}
              onChange={handleChange("addressDetail")}
              fullWidth
              sx={inputSx}
            />
            <TextField
              label="Delivery Note"
              value={form.deliveryNote}
              onChange={handleChange("deliveryNote")}
              multiline
              rows={3}
              fullWidth
              sx={inputSx}
            />
          </Stack>
        </Box>

        {/* Order summary */}
        <Box
          flex={1}
          sx={{
            border: "1px solid #111",
            p: 4,
            height: "fit-content",
            bgcolor: "#fafafa",
          }}>
          <Typography
            sx={{
              fontSize: "20px",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "1px",
              mb: 3,
              pb: 1.5,
              borderBottom: "2px solid #111",
            }}>
            Order Summary
          </Typography>

          <Stack spacing={2} mb={3}>
            {items.map((item) => (
              <Stack
                key={item._id}
                direction="row"
                justifyContent="space-between">
                <Typography sx={{ fontSize: "16px", fontWeight: 500 }}>
                  {(item.productTitle ?? "").toUpperCase()}{" "}
                  <span style={{ color: "#888" }}>x{item.quantity}</span>
                </Typography>
                <Typography sx={{ fontSize: "16px", fontWeight: 600 }}>
                  ${(Number(item.productPrice) * item.quantity).toFixed(2)}
                </Typography>
              </Stack>
            ))}
          </Stack>

          <Divider sx={{ mb: 3, borderColor: "#111" }} />

          <Stack direction="row" justifyContent="space-between" mb={4}>
            <Typography
              sx={{
                fontSize: "20px",
                fontWeight: 700,
                textTransform: "uppercase",
              }}>
              Grand Total
            </Typography>
            <Typography sx={{ fontSize: "22px", fontWeight: 700 }}>
              ${totalAmount.toFixed(2)}
            </Typography>
          </Stack>

          {error && (
            <Typography color="error" sx={{ fontSize: "14px", mb: 2 }}>
              {error}
            </Typography>
          )}

          <Button
            fullWidth
            disabled={placing || items.length === 0}
            onClick={handlePlaceOrder}
            sx={{
              bgcolor: "#111",
              color: "#fff",
              borderRadius: 0,
              py: 1.8,
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "1.5px",
              "&:hover": { bgcolor: "#333" },
              "&:disabled": { bgcolor: "#999" },
            }}>
            {placing ? "Placing Order..." : "Place Order"}
          </Button>
        </Box>
      </Stack>
    </Box>
  );
};

export default withLayoutBase(CheckoutPage);
