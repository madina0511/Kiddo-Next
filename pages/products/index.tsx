import { T } from "@/libs/common";
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
import { ChangeEvent, useEffect, useMemo, useState } from "react";
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

const defaultFilter = {
  page: 1,
  limit: 6,
  sort: "createdAt",
  direction: "DESC",
  search: {},
};

const Products = ({ initialInput }: any) => {
  const router = useRouter();

  const [openFilter, setOpenFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchFilter, setSearchFilter] = useState(
    initialInput || defaultFilter,
  );
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [selectedType, setSelectedType] = useState<string>("ALL");
  const [productList, setProductList] = useState<Product[]>([]);

  /** APOLLO REQUESTS **/
  const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);

  const {
    loading: getProductsLoading,
    data: getProductsData,
    refetch: getProductsRefetch,
  } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "network-only",
    variables: { input: searchFilter },
    notifyOnNetworkStatusChange: true,
  });

  const total: number =
    getProductsData?.getProducts?.metaCounter?.[0]?.total ?? 0;

  const totalPages = useMemo(() => {
    const limit = searchFilter?.limit ?? 1;
    return Math.ceil(total / limit);
  }, [total, searchFilter?.limit]);

  /** LIFECYCLES **/
  useEffect(() => {
    if (!router.isReady) return;

    if (router.query.input) {
      try {
        const inputObj = JSON.parse(router.query.input as string);
        setSearchFilter(inputObj);
        setCurrentPage(inputObj?.page ?? 1);
        setSelectedCategory(inputObj?.search?.categoryList?.[0] ?? "ALL");
        setSelectedType(inputObj?.search?.productType?.[0] ?? "ALL");
        return;
      } catch (error) {
        console.error("Invalid router query input:", error);
      }
    }

    setCurrentPage(searchFilter?.page ?? 1);
  }, [router.isReady, router.query.input]);
  useEffect(() => {
    if (getProductsData?.getProducts?.list ?? []) {
      setProductList(getProductsData.getProducts.list);
    }
  }, [getProductsData]);
  /** HANDLERS **/
  const likeProductHandler = async (user: T, productId: string) => {
    try {
      if (!productId) return;
      if (!user?._id) throw new Error(Message.NOT_AUTHENTICATED);

      await likeTargetProduct({
        variables: { input: productId },
      });

      setProductList((prev: Product[]) =>
        prev.map((product: Product) => {
          if (product._id !== productId) return product;

          const likedItem = product.meLiked?.[0];
          const alreadyLiked = likedItem?.myFavorite ?? false;

          return {
            ...product,
            productLikes: alreadyLiked
              ? Math.max((product.productLikes ?? 1) - 1, 0)
              : (product.productLikes ?? 0) + 1,
            meLiked: likedItem
              ? [
                  {
                    ...likedItem,
                    myFavorite: !alreadyLiked,
                  },
                ]
              : [],
          };
        }),
      );

      await sweetTopSmallSuccessAlert("success", 800);
    } catch (err: any) {
      sweetMixinErrorAlert(err.message).then();
    }
  };

  const pushFilterToRouter = async (updatedFilter: any) => {
    await router.push(
      `/products?input=${encodeURIComponent(JSON.stringify(updatedFilter))}`,
      undefined,
      { scroll: false },
    );
  };

  const categoryClickHandler = async (category: string) => {
    setSelectedCategory(category);

    const updatedFilter = {
      ...searchFilter,
      page: 1,
      search: {
        ...searchFilter.search,
        categoryList: category === "ALL" ? undefined : [category],
      },
    };

    setSearchFilter(updatedFilter);
    setCurrentPage(1);

    await pushFilterToRouter(updatedFilter);
  };

  const typeClickHandler = async (type: string) => {
    setSelectedType(type);

    const updatedFilter = {
      ...searchFilter,
      page: 1,
      search: {
        ...searchFilter.search,
        productType: type === "ALL" ? undefined : [type],
      },
    };

    setSearchFilter(updatedFilter);
    setCurrentPage(1);

    await pushFilterToRouter(updatedFilter);
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
      page: 1,
      search: {
        ...searchFilter.search,
        size: sizes.length ? sizes : undefined,
        genderList: genders.length ? genders : undefined,
        productColors: colors.length ? colors : undefined,
      },
    };

    setSearchFilter(updatedFilter);
    setCurrentPage(1);

    await pushFilterToRouter(updatedFilter);
  };

  const handlePaginationChange = async (
    _event: ChangeEvent<unknown>,
    value: number,
  ) => {
    const updatedFilter = {
      ...searchFilter,
      page: value,
    };

    setSearchFilter(updatedFilter);
    setCurrentPage(value);

    await pushFilterToRouter(updatedFilter);
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
                ({productList.length} products)
              </Typography>

              <Button
                className={styles.filterBtn}
                onClick={() => setOpenFilter(true)}>
                FILTER
              </Button>
            </Box>
          </Box>

          <Box className={styles.productCards}>
            {getProductsLoading ? (
              <div className={styles.noData}>
                <p>Loading...</p>
              </div>
            ) : productList.length === 0 ? (
              <div className={styles.noData}>
                <p>No products found!</p>
              </div>
            ) : (
              productList.map((product) => (
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
            {productList.length !== 0 && (
              <Stack className={styles.paginationBox}>
                <Pagination
                  page={currentPage}
                  count={totalPages}
                  onChange={handlePaginationChange}
                  shape="circular"
                  color="primary"
                />
              </Stack>
            )}

            {productList.length !== 0 && (
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
