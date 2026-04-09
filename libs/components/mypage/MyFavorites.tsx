import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Pagination, Stack, Typography } from "@mui/material";

import { Messages } from "../../config";

import { Product } from "@/libs/types/product/product";
import ProductCard from "../products/productCard";
import { T } from "@/libs/common";
import { sweetMixinErrorAlert } from "@/libs/types/sweetAlert";
import { GET_FAVORITIES } from "@/apollo/user/query";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE_TARGET_PRODUCT } from "@/apollo/user/mutation";
import MyPageProductCard from "./MyPageProductCard";

const MyFavorites: NextPage = () => {
  const device = useDeviceDetect();
  const [myFavorites, setMyFavorites] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchFavorites, setSearchFavorites] = useState<T>({
    page: 1,
    limit: 4,
  });

  /** APOLLO REQUESTS **/
  const [likeTargetProduct] = useMutation(LIKE_TARGET_PRODUCT);

  const {
    loading: getFavoritesLoading,
    data: getFavoritesData,
    error: getFavoritesError,
    refetch: getFavoritesRefetch,
  } = useQuery(GET_FAVORITIES, {
    fetchPolicy: "network-only",
    variables: {
      input: searchFavorites,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    setMyFavorites(getFavoritesData?.getFavorities?.list ?? []);
    setTotal(getFavoritesData?.getFavorities?.metaCounter?.[0]?.total ?? 0);
  }, [getFavoritesData]);
  console.log("getFavoritesLoading:", getFavoritesLoading);

  /** HANDLERS **/
  const paginationHandler = (e: T, value: number) => {
    setSearchFavorites({ ...searchFavorites, page: value });
  };

  const likeProductHandler = async (user: any, id: string) => {
    try {
      if (!id) return;
      if (!user._id) throw new Error(Messages.error2);

      await likeTargetProduct({
        variables: {
          input: id,
        },
      });

      await getFavoritesRefetch({ input: searchFavorites });
    } catch (err: any) {
      console.log("ERROR, likePropertyHandler:", err.message);
      sweetMixinErrorAlert(err.message).then();
    }
  };

  if (device === "mobile") {
    return <div>KIDDO MY FAVORITES MOBILE</div>;
  } else {
    return (
      <div id="my-favorites-page">
        <Stack className="main-title-box">
          <Stack className="right-box">
            <Typography className="main-title">My Favorites</Typography>
            <Typography className="sub-title">
              We are glad to see you again!
            </Typography>
          </Stack>
        </Stack>
        <Stack className="favorites-list-box">
          {myFavorites?.length ? (
            myFavorites?.map((product: Product) => {
              return (
                <MyPageProductCard
                  product={product}
                  myFavorites={true}
                  likeProductHandler={likeProductHandler}
                />
              );
            })
          ) : (
            <div className={"no-data"}>
              <img src="/img/icons/icoAlert.svg" alt="" />
              <p>No Favorites found!</p>
            </div>
          )}
        </Stack>
        {myFavorites?.length ? (
          <div className="pagination-config">
            <div className="pagination-box">
              <Pagination
                count={Math.ceil(total / searchFavorites.limit)}
                page={searchFavorites.page}
                shape="circular"
                color="primary"
                onChange={paginationHandler}
              />
            </div>
            <div className="total-result">
              <Typography>
                Total {total} favorite produc{total > 1 ? "ts" : "t"}
              </Typography>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
};

export default MyFavorites;
