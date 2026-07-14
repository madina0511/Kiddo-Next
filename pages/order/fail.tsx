import { useRouter } from "next/router";
import { Box, Stack, Typography, Button } from "@mui/material";
import withLayoutBase from "@/libs/components/layout/LayoutBase";

const FailPage = () => {
  const router = useRouter();
  const { message, code } = router.query as { message?: string; code?: string };

  return (
    <Box sx={{ maxWidth: 500, mx: "auto", py: 10, textAlign: "center" }}>
      <Stack alignItems="center" spacing={2}>
        <Typography sx={{ fontSize: "28px", fontWeight: 700, color: "#c62828" }}>
          Payment Cancelled
        </Typography>
        <Typography sx={{ color: "#666" }}>
          {message || "The payment was not completed."}
        </Typography>
        <Button
          onClick={() => router.back()}
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
          Try Again
        </Button>
      </Stack>
    </Box>
  );
};

export default withLayoutBase(FailPage);