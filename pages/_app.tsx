import type { AppProps } from "next/app";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { useApollo } from "../apollo/client";
import { CssBaseline } from "@mui/material";
import { light } from "../scss/MaterialTheme";
import { useState } from "react";
import "../scss/app.scss";
import "../scss/pc/main.scss";

import { ApolloProvider } from "@apollo/client";

export default function App({ Component, pageProps }: AppProps) {
  //@ts-ignore
  const [theme, setTheme] = useState(createTheme(light));
  const client = useApollo(pageProps.initialApolloState);
  // Socket. io, Redux, Mui ...
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}
