import sizeGuideRows from "@/libs/common";
import { Box, Container, Stack, Typography } from "@mui/material";
export default function SizeGuidePage() {
  return (
    <Box sx={{ backgroundColor: "#f5f5f5", py: 8 }}>
      <Container maxWidth="md">
        <Stack spacing={5} alignItems="center">
          <Typography
            sx={{
              fontSize: "28px",
              fontWeight: 700,
              textTransform: "uppercase",
              fontFamily: "serif",
            }}>
            Size Guide
          </Typography>

          <Box
            component="img"
            src="/img/size-guide/size-guide-model.jpg"
            alt="Size guide"
            sx={{
              width: "100%",
              maxWidth: "430px",
              objectFit: "contain",
            }}
          />

          <Typography
            sx={{
              fontSize: "22px",
              fontFamily: "serif",
              textAlign: "center",
            }}>
            Find the right size below
          </Typography>

          <Box sx={{ width: "100%", overflowX: "auto" }}>
            <Box sx={{ minWidth: 760 }}>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1.3fr 1fr 1fr 1fr 1fr 1.2fr",
                  backgroundColor: "#e5e5e5",
                  px: 2,
                  py: 2,
                  fontWeight: 700,
                }}>
                <Typography>Age</Typography>
                <Typography align="center">A: Height</Typography>
                <Typography align="center"> B: Chest</Typography>
                <Typography align="center"> C: Waist</Typography>
                <Typography align="center">D: Hip</Typography>
                <Typography align="center"> E: Inseam</Typography>
              </Box>

              {sizeGuideRows.map((row, index) => (
                <Box
                  key={row.age}
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1.3fr 1fr 1fr 1fr 1fr 1.2fr",
                    px: 2,
                    py: 2,
                    backgroundColor: index % 2 === 0 ? "#f0f0f0" : "#ffffff",
                    borderBottom: "1px solid #e0e0e0",
                  }}>
                  <Typography>{row.age}</Typography>
                  <Typography align="center">{row.height}</Typography>
                  <Typography align="center">{row.chest}</Typography>
                  <Typography align="center">{row.waist}</Typography>
                  <Typography align="center">{row.hip}</Typography>
                  <Typography align="center">{row.inseam}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
