import React, { useState } from "react";
import { NextPage } from "next";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Pagination, Stack, Typography } from "@mui/material";

import { Messages } from "../../config";

import { Product } from "@/libs/types/product/product";
import ProductCard from "../products/productCard";
import { T } from "@/libs/common";

const MyFavorites: NextPage = () => {
  const device = useDeviceDetect();
  const [myFavorites, setMyFavorites] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchFavorites, setSearchFavorites] = useState<T>({
    page: 1,
    limit: 6,
  });

  /** HANDLERS **/
  const paginationHandler = (e: T, value: number) => {
    setSearchFavorites({ ...searchFavorites, page: value });
  };

  const likeProductHandler = async (id: string) => {};

  if (device === "mobile") {
    return <div>NESTAR MY FAVORITES MOBILE</div>;
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
                <ProductCard
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
          <Stack className="pagination-config">
            <Stack className="pagination-box">
              <Pagination
                count={Math.ceil(total / searchFavorites.limit)}
                page={searchFavorites.page}
                shape="circular"
                color="primary"
                onChange={paginationHandler}
              />
            </Stack>
            <Stack className="total-result">
              <Typography>
                Total {total} favorite produc{total > 1 ? "ts" : "t"}
              </Typography>
            </Stack>
          </Stack>
        ) : null}
      </div>
    );
  }
};

export default MyFavorites;
