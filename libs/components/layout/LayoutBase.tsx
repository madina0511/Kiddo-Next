import { Stack } from "@mui/material";
import Head from "next/head";
import Top from "../Top";
import Footer from "../Footer";
import BaseTop from "../BaseTop";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";

const withLayoutBase = (Component: any) => {
  return (props: any) => (
    <>
      <Head>
        <title>KIDDO</title>
        <meta name="title" content="KIDDO" />
      </Head>

      <Stack id="pc-wrap">
        <Stack id="top">
          <BaseTop />
        </Stack>

        <Stack id="main" sx={{ flexGrow: 1, pt: "130px" }}>
          <Component {...props} />
        </Stack>

        <Stack id="footer">
          <Footer />
        </Stack>
      </Stack>
    </>
  );
};

export default withLayoutBase;
