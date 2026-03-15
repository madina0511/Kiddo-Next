import { products } from "@/libs/common";
import LayoutHome from "@/libs/components/layout/LayoutHome";
import Filter from "@/libs/components/products/Filter";
import { Box, Button, Pagination, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/scss/pc/products/products.module.scss";
import ProductCard from "@/libs/components/products/productCard";
import { ProductCategory } from "@/libs/enums/product.enum";
import withLayoutBase from "@/libs/components/layout/LayoutBase";

const Products = ({ initialInput }: any) => {
  const router = useRouter();
  const category = router.query.category;
  const [openFilter, setOpenFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterSortName, setFilterSortName] = useState("New");
  const [searchFilter, setSearchFilter] = useState(
    initialInput || {
      page: 2,
      limit: 6,
      sort: "createdAt",
      direction: "DESC",
      search: {},
    },
  );

  const [total, setTotal] = useState<number>(products.length);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  // Handlers
  const likeProductHandler = (productId: string) => {
    console.log("Liked product:", productId);
  };
  const categoryClickHandler = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePaginationChange = async (
    event: ChangeEvent<unknown>,
    value: number,
  ) => {
    const updatedFilter = { ...searchFilter, page: value };
    setSearchFilter(updatedFilter);
    setCurrentPage(value);

    await router.push(
      `/products?input=${encodeURIComponent(JSON.stringify(updatedFilter))}`,
      undefined,
      { scroll: false },
    );
  };

  useEffect(() => {
    setTotal(products.length);
  }, []);

  return (
    <div id="pc-wrap">
      <Stack>
        <Stack className={styles.productsWrap}>
          <Box className={styles.categoryWrap}>
            <Box className={styles.category}>
              {Object.values(ProductCategory).map((item) => (
                <Link key={item} href="/products">
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
            {products.length === 0 ? (
              <div className={styles.noData}>
                <p>No products found!</p>
              </div>
            ) : (
              products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  likeProductHandler={likeProductHandler}
                />
              ))
            )}
          </Box>

          <Filter open={openFilter} onClose={() => setOpenFilter(false)} />

          <Stack className={styles.paginationConfig}>
            {products.length !== 0 && (
              <Stack className={styles.paginationBox}>
                <Pagination
                  page={currentPage}
                  count={Math.ceil(total / searchFilter.limit)}
                  onChange={handlePaginationChange}
                  shape="circular"
                  color="primary"
                />
              </Stack>
            )}

            {products.length !== 0 && (
              <Stack className={styles.totalResult}>
                <Typography>
                  Total {total} product{total > 1 ? "s" : ""} available
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Stack>
    </div>
  );
};

Products.defaultProps = {
  initialInput: {
    page: 1,
    limit: 6,
    sort: "createdAt",
    direction: "DESC",
    search: {},
  },
};

export default withLayoutBase(Products);
