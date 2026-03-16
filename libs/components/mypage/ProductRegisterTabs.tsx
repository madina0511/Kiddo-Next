import { useState } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import CropSquareRoundedIcon from "@mui/icons-material/CropSquareRounded";
import SetProductForm from "./SetProductForm";
import SingleProductForm from "./SingleProductForm";

export default function ProductRegisterTabs() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box>
      <Tabs
        value={activeTab}
        onChange={(_, val) => setActiveTab(val)}
        sx={{
          mb: 2,
          "& .MuiTabs-indicator": { height: 2, borderRadius: 1 },
          "& .MuiTab-root": {
            textTransform: "none",
            fontSize: 14,
            fontWeight: 400,
            color: "text.secondary",
            minHeight: 40,
            px: 2,
            gap: 0.75,
          },
          "& .Mui-selected": { fontWeight: 500 },
        }}>
        <Tab
          icon={<GridViewRoundedIcon sx={{ fontSize: 16 }} />}
          iconPosition="start"
          label="Set product"
        />
        <Tab
          icon={<CropSquareRoundedIcon sx={{ fontSize: 16 }} />}
          iconPosition="start"
          label="Standalone product"
        />
      </Tabs>

      <Box
        sx={{
          animation: "fadeIn 0.18s ease",
          "@keyframes fadeIn": {
            from: { opacity: 0, transform: "translateY(4px)" },
            to: { opacity: 1, transform: "translateY(0)" },
          },
        }}>
        {activeTab === 0 ? <SetProductForm /> : <SingleProductForm />}
      </Box>
    </Box>
  );
}
