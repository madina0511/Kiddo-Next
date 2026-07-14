import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { GET_MY_ORDERS } from "@/apollo/user/order/order.query"; // yoki alohida GET_ORDER_BY_ID bo'lsa o'sha
import withLayoutBase from "@/libs/components/layout/LayoutBase";

const TOSS_CLIENT_KEY = process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string;

const PaymentPage = () => {
  const router = useRouter();
  const { orderId } = router.query;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Order ma'lumotini olish uchun oddiy yechim:
  // checkout sahifasidan totalAmount va orderNumber ni query orqali o'tkazamiz
  const { amountKRW, orderNumber } = router.query as {
    amountKRW?: string;
    orderNumber?: string;
  };

  const handlePay = async () => {
    if (!orderId || !amountKRW || !orderNumber) {
      setError("Missing order information.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);

      await tossPayments.requestPayment("카드", {
        amount: Number(amountKRW),
        orderId: orderNumber, // Toss uchun unique order id (bizning orderNumber)
        orderName: `Kiddo Order ${orderNumber}`,
        successUrl: `${window.location.origin}/order/success?mongoOrderId=${orderId}`,
        failUrl: `${window.location.origin}/order/fail`,
      });
    } catch (err: any) {
      console.error("TOSS PAYMENT ERROR:", err);
      const isCancelled =
        err?.code === "USER_CANCEL" ||
        err?.code === "PAY_PROCESS_CANCELED" ||
        err?.message?.includes("취소");

      if (!isCancelled) {
        setError(err?.message || "Payment failed to start.");
      } else {
        router.push("/order/checkout"); // foydalanuvchi qayerdan kelgan bo'lsa, o'sha yerga qaytaradi
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId && amountKRW && orderNumber) {
      handlePay();
    }
  }, [orderId, amountKRW, orderNumber]);

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", py: 10, textAlign: "center" }}>
      <Typography
        sx={{
          fontSize: "28px",
          fontWeight: 700,
          textTransform: "uppercase",
          mb: 3,
        }}>
        Redirecting to Payment
      </Typography>

      {loading && (
        <Stack alignItems="center" mt={4}>
          <CircularProgress />
          <Typography sx={{ mt: 2, color: "#666" }}>Please wait...</Typography>
        </Stack>
      )}

      {error && (
        <Box mt={4}>
          <Typography color="error" mb={2}>
            {error}
          </Typography>
          <Button
            onClick={handlePay}
            sx={{
              bgcolor: "#111",
              color: "#fff",
              borderRadius: 0,
              px: 4,
              py: 1.5,
              "&:hover": { bgcolor: "#333" },
            }}>
            Try Again
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default withLayoutBase(PaymentPage);
