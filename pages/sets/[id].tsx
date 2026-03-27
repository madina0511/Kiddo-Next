import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT } from "@/apollo/user/query";
import { Product } from "@/libs/types/product/product";
import { T } from "@/libs/common";
import { Box, Typography } from "@mui/material";
import withLayoutBase from "@/libs/components/layout/LayoutBase";
import SetItemCard from "@/libs/components/sets/setItemCard";

const SetDetailPage = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const [set, setSet] = useState<Product | null>(null);

  useQuery(GET_PRODUCT, {
    fetchPolicy: "network-only",
    variables: { input: id },
    skip: !router.isReady || !id,
    notifyOnNetworkStatusChange: true,
    onCompleted: (data: T) => {
      if (data?.getProduct) {
        setSet(data.getProduct);
      }
    },
  });

  if (!set) return null;

  return (
    <Box className="set-detail-page">
      <Box className="set-detail-container">
        <Box className="set-detail-left">
          <img
            src={
              set.productImages?.[0]
                ? `${process.env.NEXT_PUBLIC_SERVER_URL}/${set.productImages[0]}`
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
      </Box>
    </Box>
  );
};

export default withLayoutBase(SetDetailPage);
