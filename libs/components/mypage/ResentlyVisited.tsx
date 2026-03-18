import React, { useState } from "react";
import { NextPage } from "next";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Pagination, Stack, Typography } from "@mui/material";

import { Product } from "@/libs/types/product/product";
import ProductCard from "../products/productCard";
import { T } from "@/libs/common";

const RecentlyVisited: NextPage = () => {
  const device = useDeviceDetect();
  const [recentlyVisited, setRecentlyVisited] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchVisited, setSearchVisited] = useState<T>({ page: 1, limit: 6 });

  /** APOLLO REQUESTS **/

  /** HANDLERS **/
  const paginationHandler = (e: T, value: number) => {};
  const likeProductHandler = async (id: string) => {};

  if (device === "mobile") {
    return <div>NESTAR MY FAVORITES MOBILE</div>;
  } else {
    return (
      <div id="my-favorites-page">
        <Stack className="main-title-box">
          <Stack className="right-box">
            <Typography className="main-title">Recently Visited</Typography>
            <Typography className="sub-title">
              We are glad to see you again!
            </Typography>
          </Stack>
        </Stack>
        <Stack className="favorites-list-box">
          {recentlyVisited?.length ? (
            recentlyVisited?.map((product: Product) => {
              return (
                <ProductCard
                  product={product}
                  recentlyVisited={true}
                  likeProductHandler={likeProductHandler}
                />
              );
            })
          ) : (
            <div className={"no-data"}>
              <img src="/img/icons/icoAlert.svg" alt="" />
              <p>No Recently Visited Products found!</p>
            </div>
          )}
        </Stack>
        {recentlyVisited?.length ? (
          <Stack className="pagination-config">
            <Stack className="pagination-box">
              <Pagination
                count={Math.ceil(total / searchVisited.limit)}
                page={searchVisited.page}
                shape="circular"
                color="primary"
                onChange={paginationHandler}
              />
            </Stack>
            <Stack className="total-result">
              <Typography>
                Total {total} recently visited produc{total > 1 ? "ts" : "t"}
              </Typography>
            </Stack>
          </Stack>
        ) : null}
      </div>
    );
  }
};

export default RecentlyVisited;
