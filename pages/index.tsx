import NewArrivals from "@/libs/components/homepage/NewArrivals";
import ProductSwiper from "@/libs/components/homepage/ProductSwiper";
import withLayoutMain from "@/libs/components/layout/LayoutHome";
import { Container, Stack } from "@mui/material";
import { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Stack className={"home-page"}>
      <NewArrivals />
      <ProductSwiper />
    </Stack>
  );
};
export default withLayoutMain(Home);
