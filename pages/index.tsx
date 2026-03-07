import Brand from "@/libs/components/homepage/Brand";
import BrandValues from "@/libs/components/homepage/BrandValue";
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
      <Brand />
      <BrandValues />
    </Stack>
  );
};
export default withLayoutMain(Home);
