import { products } from "@/libs/common";
import LayoutHome from "@/libs/components/layout/LayoutHome";
import Filter from "@/libs/components/products/Filter";

import { Box, Button, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import styles from "@/scss/pc/products/products.module.scss";
import ProductCard from "@/libs/components/products/productCard";

const categories = [
  "ALL",
  "INDOORWEAR",
  "OUTERWEAR",
  "ACCESSORIES",
  "SWIMWEAR",
  "BABY_TODDLER",
];

const Products = () => {
  const [openFilter, setOpenFilter] = useState(false);

  return (
    <div id="pc-wrap">
      <Stack className={styles.productsWrap}>
        <Box className={styles.categoryWrap}>
          <Box className={styles.category}>
            {categories.map((item) => (
              <Link key={item} href="/dresses">
                {item}
              </Link>
            ))}
          </Box>

          <Box className={styles.filterWrap}>
            <Typography className={styles.productCount}>
              ({products.length} products)
            </Typography>

            <Button
              className={styles.filterBtn}
              onClick={() => setOpenFilter(true)}>
              FILTER
            </Button>
          </Box>
        </Box>

        <Box className={styles.productCards}>
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Box>

        <Filter open={openFilter} onClose={() => setOpenFilter(false)} />
      </Stack>
    </div>
  );
};

export default LayoutHome(Products);
