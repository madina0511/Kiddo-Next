import { T } from "@/libs/common";
import LayoutHome from "@/libs/components/layout/LayoutHome";
import Filter from "@/libs/components/products/Filter";
import {
  Box,
  Button,
  Pagination,
  Stack,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "@/scss/pc/products/products.module.scss";
import ProductCard from "@/libs/components/products/productCard";
import { ProductCategory, ProductType } from "@/libs/enums/product.enum";
import withLayoutBase from "@/libs/components/layout/LayoutBase";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE_TARGET_PRODUCT } from "@/apollo/user/mutation";
import { GET_PRODUCTS } from "@/apollo/user/query";
import { Product } from "@/libs/types/product/product";

import { Message } from "@/libs/enums/common.enum";
import {
  sweetMixinErrorAlert,
  sweetTopSmallSuccessAlert,
} from "@/libs/types/sweetAlert";

const Products = ({ initialInput }: any) => {
  const router = useRouter();
  const category = router.query.category;
  const [products, setProducts] = useState<Product[]>([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterSortName, setFilterSortName] = useState("New");
  const [searchFilter, setSearchFilter] = useState(
    initialInput || {
      page: 1,
      limit: 6,
      sort: "createdAt",
      direction: "DESC",
      search: {},
    },
  );

  const [total, setTotal] = useState<number>(products.length);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  // Apollo Requests

  const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);
  const {
    loading: getProductsLoading,
    data: getProductsData,
    refetch: getProductsRefetch,
  } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "network-only",
    variables: { input: searchFilter },
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      setProducts(data?.getProducts?.list);
      setTotal(data?.getProducts?.metaCounter[0]?.total);
    },
  });
  // LifeCycles
  useEffect(() => {
    if (router.query.input) {
      const inputObj = JSON.parse(router?.query?.input as string);
      setSearchFilter(inputObj);
    }
    setCurrentPage(searchFilter.page === undefined ? 1 : searchFilter.page);
  }, [router.query.input]);

  // Handlers
  const likeProductHandler = async (user: T, productId: string) => {
    console.log("Liked product:", productId);
    try {
      console.log("user, Id:", user, productId);
      if (!productId) return;
      if (!user._id) throw new Error(Message.NOT_AUTHENTICATED);

      await likeTargetProduct({ variables: { input: productId } });

      await getProductsRefetch({ input: searchFilter });

      await sweetTopSmallSuccessAlert("success", 800);
    } catch (err: any) {
      console.log("ERRoR, likePropertyHandler: ", err.message);
      sweetMixinErrorAlert(err.message).then();
    }
  };
  const categoryClickHandler = async (category: string) => {
    setSelectedCategory(category);

    const updatedFilter = {
      ...searchFilter,
      search: {
        ...searchFilter.search,
        categoryList: category === "ALL" ? undefined : [category],
      },
      page: 1,
    };

    setSearchFilter(updatedFilter);
    setCurrentPage(1);

    await router.push(
      `/products?input=${encodeURIComponent(JSON.stringify(updatedFilter))}`,
      undefined,
      { scroll: false },
    );
  };

  const typeClickHandler = async (type: string) => {
    setSelectedType(type);

    const updatedFilter = {
      ...searchFilter,
      search: {
        ...searchFilter.search,
        productType: type === "ALL" ? undefined : [type],
      },
      page: 1,
    };

    setSearchFilter(updatedFilter);
    setCurrentPage(1);

    await router.push(
      `/products?input=${encodeURIComponent(JSON.stringify(updatedFilter))}`,
      undefined,
      { scroll: false },
    );
  };
  const handleFilterApply = async ({
    sizes,
    genders,
    colors,
  }: {
    sizes: string[];
    genders: string[];
    colors: string[];
  }) => {
    const updatedFilter = {
      ...searchFilter,
      search: {
        ...searchFilter.search,
        size: sizes.length ? sizes : undefined,
        genderList: genders.length ? genders : undefined,
        productColors: colors.length ? colors : undefined,
      },
      page: 1,
    };

    setSearchFilter(updatedFilter);
    setCurrentPage(1);

    await router.push(
      `/products?input=${encodeURIComponent(JSON.stringify(updatedFilter))}`,
      undefined,
      { scroll: false },
    );
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

  return (
    <div id="pc-wrap">
      <Stack>
        <Stack className={styles.productsWrap}>
          <Box className={styles.categoryWrap}>
            <Box className={styles.filterBar}>
              <FormControl
                size="small"
                sx={{ width: 200 }}
                className={styles.select}>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  onChange={(e) => categoryClickHandler(e.target.value)}>
                  <MenuItem value="ALL">All</MenuItem>
                  {Object.values(ProductCategory)
                    .filter((item) => item !== ProductCategory.ALL)
                    .map((item) => (
                      <MenuItem key={item} value={item}>
                        {item.replace(/_/g, " ")}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl
                size="small"
                sx={{ width: 200 }}
                className={styles.select}>
                <InputLabel>Type</InputLabel>
                <Select
                  value={selectedType}
                  label="Type"
                  onChange={(e) => typeClickHandler(e.target.value)}>
                  <MenuItem value="ALL">All</MenuItem>
                  {Object.values(ProductType)
                    .filter((item) => item !== ProductType.SET)
                    .map((item) => (
                      <MenuItem key={item} value={item}>
                        {item.replace(/_/g, " ")}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
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

          <Filter
            open={openFilter}
            onClose={() => setOpenFilter(false)}
            onApply={handleFilterApply}
          />

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

export default withLayoutBase(Products);
