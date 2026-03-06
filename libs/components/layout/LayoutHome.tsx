import { Stack } from "@mui/material";
import Head from "next/head";
import Top from "../Top";
import Footer from "../Footer";

const withLayoutMain = (Component: any) => {
  return (props: any) => (
    <>
      <Head>
        <title>KIDDO</title>
        <meta name="title" content="KIDDO" />
      </Head>

      <Stack id="pc-wrap">
        <Stack id="top">
          <Top />
        </Stack>

        <Stack id="main" sx={{ flexGrow: 1 }}>
          <Component {...props} />
        </Stack>

        <Stack id="footer">
          <Footer />
        </Stack>
      </Stack>
    </>
  );
};

export default withLayoutMain;
