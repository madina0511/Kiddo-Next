import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { Box, Stack, Typography, CircularProgress, Button } from "@mui/material";
import { CONFIRM_PAYMENT } from "@/apollo/user/order/order.mutation";
import withLayoutBase from "@/libs/components/layout/LayoutBase";

const SuccessPage = () => {
  const router = useRouter();
  const [confirmPayment] = useMutation(CONFIRM_PAYMENT);

  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const [orderInfo, setOrderInfo] = useState<{ orderNumber?: string; amount?: number }>({});

  useEffect(() => {
    if (!router.isReady) return;

    const { paymentKey, orderId, amount, mongoOrderId } = router.query as {
      paymentKey?: string;
      orderId?: string; // Toss orderId (= bizning orderNumber)
      amount?: string;
      mongoOrderId?: string;
    };

    if (!paymentKey || !orderId || !amount || !mongoOrderId) {
      setStatus("error");
      setErrorMsg("Missing payment confirmation data.");
      return;
    }

    const runConfirm = async () => {
      try {
        const result = await confirmPayment({
          variables: {
            input: {
              paymentKey,
              orderId,
              mongoOrderId,
              amount: Number(amount),
            },
          },
        });

        setOrderInfo({
          orderNumber: orderId,
          amount: Number(amount),
        });
        setStatus("success");
      } catch (err: any) {
        console.error("CONFIRM PAYMENT ERROR:", err);
        setErrorMsg(err?.graphQLErrors?.[0]?.message || "Payment confirmation failed.");
        setStatus("error");
      }
    };

    runConfirm();
  }, [router.isReady]);

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", py: 10, textAlign: "center" }}>
      {status === "loading" && (
        <Stack alignItems="center">
          <CircularProgress />
          <Typography sx={{ mt: 3, color: "#666" }}>Confirming your payment...</Typography>
        </Stack>
      )}

      {status === "success" && (
        <Stack alignItems="center" spacing={2}>
          <Typography sx={{ fontSize: "32px", fontWeight: 700, textTransform: "uppercase" }}>
            Payment Complete
          </Typography>
          <Typography sx={{ color: "#666" }}>
            Order <b>{orderInfo.orderNumber}</b> has been placed successfully.
          </Typography>
          <Typography sx={{ fontSize: "20px", fontWeight: 700 }}>
            ${orderInfo.amount?.toFixed(2)}
          </Typography>
          <Button
            onClick={() => router.push("/mypage")}
            sx={{
              mt: 3,
              bgcolor: "#111",
              color: "#fff",
              borderRadius: 0,
              px: 5,
              py: 1.5,
              fontWeight: 700,
              letterSpacing: "1px",
              "&:hover": { bgcolor: "#333" },
            }}
          >
            View My Orders
          </Button>
        </Stack>
      )}

      {status === "error" && (
        <Stack alignItems="center" spacing={2}>
          <Typography sx={{ fontSize: "28px", fontWeight: 700, color: "#c62828" }}>
            Payment Failed
          </Typography>
          <Typography sx={{ color: "#666" }}>{errorMsg}</Typography>
          <Button
            onClick={() => router.push("/")}
            sx={{
              mt: 3,
              bgcolor: "#111",
              color: "#fff",
              borderRadius: 0,
              px: 5,
              py: 1.5,
              "&:hover": { bgcolor: "#333" },
            }}
          >
            Back to Home
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default withLayoutBase(SuccessPage);