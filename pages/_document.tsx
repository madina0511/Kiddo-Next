import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <meta name="title" content="Kiddo | Premium Kids Clothing Store" />
        <meta name="robots" content="index, follow" />

        <link rel="icon" type="image/png" href="/logo/kiddo_logo.png" />
        {/*SEO */}
        <meta
          name="keywords"
          content="Kiddo, kids clothing, children's fashion, premium kidswear, 
          baby clothes, kids brand store"
        />

        <meta
          name="description"
          content="Kiddo is a modern kids clothing store featuring 
          world-renowned children's fashion brands. Discover premium, comfortable and trendy outfits 
          for your little ones. Kiddo는 세계적인 키즈 브랜드 의류를 제공하는 프리미엄 아동복 스토어입니다."
        />

        {/* Open Graph for social preview */}
        <meta property="og:title" content="Kiddo | Premium Kids Clothing" />
        <meta
          property="og:description"
          content="Premium kids clothing from famous brands. Stylish, safe
           and comfortable outfits for your little ones."
        />
        <meta property="og:image" content="/logo/kiddo_logo.png" />
        <meta property="og:type" content="website" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
