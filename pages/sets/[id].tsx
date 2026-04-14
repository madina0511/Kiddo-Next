import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT, GET_PRODUCTS } from "@/apollo/user/query";
import { Product } from "@/libs/types/product/product";
import { T } from "@/libs/common";
import { Box, Typography } from "@mui/material";
import withLayoutBase from "@/libs/components/layout/LayoutBase";
import SetItemCard from "@/libs/components/sets/setItemCard";
import ProductCard from "@/libs/components/products/productCard";

const SetDetailPage = () => {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [set, setSet] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  const { data } = useQuery(GET_PRODUCT, {
    fetchPolicy: "network-only",
    variables: { input: id },
    skip: !router.isReady || !id,
  });

  const { data: relatedData } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "network-only",
    variables: {
      input: {
        page: 1,
        limit: 4,
        search: {
          brandName: set?.brandName,
        },
      },
    },
    skip: !set?.brandName,
  });

  useEffect(() => {
    if (data?.getProduct) setSet(data.getProduct);
  }, [data]);

  useEffect(() => {
    if (relatedData?.getProducts?.list) {
      setRelatedProducts(
        relatedData.getProducts.list.filter((p: Product) => p._id !== id),
      );
    }
  }, [relatedData]);

  const likeProductHandler = async (id: string) => {
    // handler
  };

  if (!set) return null;

  return (
    <Box className="set-detail-page">
      <Box className="set-detail-container">
        <Box className="set-detail-left">
          <img
            src={
              set.productImages?.[0]
                ? `${process.env.NEXT_PUBLIC_API_URL}/${set.productImages[0]}`
                : "/img/banner/header1.svg"
            }
            alt={set.productTitle}
            onError={(e) => {
              const target = e.currentTarget;
              target.onerror = null;
              target.src = "/img/banner/joinbaby.webp";
            }}
          />
        </Box>

        <Box className="set-detail-right">
          <Box className="set-detail-header">
            <Typography className="set-brand">{set.brandName}</Typography>
            <Typography className="set-name">{set.productTitle}</Typography>
            <Typography className="set-total-price">
              Total: ${set.productPrice}
            </Typography>
          </Box>

          <Box className="set-products">
            {set.setItems?.map((itemId) => (
              <SetItemCard key={itemId} itemId={itemId} />
            ))}
          </Box>
        </Box>
        <Box className="see-more-wrap">
          <Typography className="see-more-title">YOU MAY ALSO LIKE</Typography>
          <Typography className="see-more-brand">{set.brandName}</Typography>

          <Box className="see-more-card">
            {relatedProducts.map((item: Product) => (
              <ProductCard
                key={item._id}
                product={item}
                likeProductHandler={likeProductHandler}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default withLayoutBase(SetDetailPage);
