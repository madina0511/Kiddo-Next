import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Box, IconButton, Pagination, Stack, Typography } from "@mui/material";
import withLayoutBase from "@/libs/components/layout/LayoutBase";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Product } from "@/libs/types/product/product";
import { ProductType } from "@/libs/enums/product.enum";
import { T } from "@/libs/common";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/apollo/user/query";
import { LIKE_TARGET_PRODUCT } from "@/apollo/user/mutation";
import { userVar } from "@/apollo/store";
import { Message } from "@/libs/enums/common.enum";
import { sweetMixinErrorAlert } from "@/libs/types/sweetAlert";

const SetsPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [likedSets, setLikedSets] = useState<Record<string, boolean>>({});
  const [sets, setSets] = useState<Product[]>([]);
  const [total, setTotal] = useState(0);
  const [searchFilter, setSearchFilter] = useState({
    page: 1,
    limit: 6,
    sort: "createdAt",
    direction: "DESC",
    search: { productType: [ProductType.SET] },
  });
  const totalPages = Math.ceil(total / searchFilter.limit);

  // Apollo
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

  useEffect(() => {
    setSets(getProductsData?.getProducts?.list ?? []);
    setTotal(getProductsData?.getProducts?.metaCounter?.[0]?.total ?? 0);
  }, [getProductsData]);

  // Effects
  useEffect(() => {
    console.log("++++searchFilter", searchFilter);
  }, [searchFilter]);

  useEffect(() => {
    console.log("set", sets);
  }, [sets]);

  // Handlers
  const likeProductHandler = async (e: React.MouseEvent, setId: string) => {
    e.stopPropagation();
    try {
      if (!userVar()?._id) throw new Error(Message.NOT_AUTHENTICATED);
      await likeTargetProduct({ variables: { input: setId } });
      setLikedSets((prev) => ({ ...prev, [setId]: !prev[setId] }));
    } catch (err: any) {
      sweetMixinErrorAlert(err.message);
    }
  };

  return (
    <Box className="sets-page">
      <Box className="sets-container">
        <Typography className="sets-count">({sets.length} sets)</Typography>

        <Box className="sets-grid">
          {sets.map((set) => {
            const imageSrc = set.productImages?.[0]
              ? `${process.env.NEXT_PUBLIC_API_URL}/${set.productImages[0]}`
              : "/img/banner/joinbaby.webp";
            console.log(
              "SERVER:",
              process.env.NEXT_PUBLIC_SERVER_URL,
              "IMAGE:",
              set.productImages?.[0],
            );
            return (
              <Box
                key={set._id}
                className="set-card"
                onClick={() => router.push(`/sets/${set._id}`)}>
                <img
                  src={imageSrc}
                  alt={set.productTitle}
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.onerror = null;
                    target.src = "/img/banner/joinbaby.webp";
                  }}
                />

                <IconButton
                  className="set-like-btn"
                  onClick={(e) => likeProductHandler(e, set._id)}>
                  {likedSets[set._id] ? (
                    <FavoriteIcon className="liked" />
                  ) : (
                    <FavoriteBorderIcon className="not-liked" />
                  )}
                </IconButton>
              </Box>
            );
          })}
        </Box>

        {totalPages > 1 && (
          <Stack className="sets-pagination">
            <Pagination
              page={page}
              count={totalPages}
              onChange={(_, value) => {
                setPage(value);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              shape="circular"
              color="primary"
            />
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default withLayoutBase(SetsPage);
