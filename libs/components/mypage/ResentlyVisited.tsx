import React, { useState } from "react";
import { NextPage } from "next";
import useDeviceDetect from "../../hooks/useDeviceDetect";
import { Pagination, Stack, Typography } from "@mui/material";

import { Product } from "@/libs/types/product/product";
import ProductCard from "../products/productCard";
import { T } from "@/libs/common";
import { GET_VISITED } from "@/apollo/user/query";
import { useQuery } from "@apollo/client";
import MyPageProductCard from "./MyPageProductCard";

const RecentlyVisited: NextPage = () => {
  const device = useDeviceDetect();
  const [recentlyVisited, setRecentlyVisited] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [searchVisited, setSearchVisited] = useState<T>({ page: 1, limit: 2 });

  /** APOLLO REQUESTS **/
  const {
    loading: getVisitedLoading,
    data: getVisitedData,
    error: getVisitedError,
    refetch: getVisitedRefetch,
  } = useQuery(GET_VISITED, {
    fetchPolicy: "network-only",
    variables: {
      input: searchVisited,
    },
    onCompleted(data: T) {
      setRecentlyVisited(data.getVisited?.list);
      setTotal(data.getVisited?.metaCounter?.[0]?.total || 0);
    },
  });

  /** HANDLERS **/
  const paginationHandler = (e: T, value: number) => {
    setSearchVisited({ ...searchVisited, page: value });
  };

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
            recentlyVisited.map((product: Product) => (
              <MyPageProductCard
                key={product._id}
                product={product}
                recentlyVisited={true}
              />
            ))
          ) : (
            <div className="no-data">
              <img src="/img/icons/icoAlert.svg" alt="" />
              <p>No Recently Visited Products found!</p>
            </div>
          )}
        </Stack>

        {recentlyVisited?.length ? (
          <div className="pagination-config">
            <div className="pagination-box">
              <Pagination
                count={Math.ceil(total / searchVisited.limit)}
                page={searchVisited.page}
                shape="circular"
                color="primary"
                onChange={paginationHandler}
              />
            </div>
            <div className="total-result">
              <Typography>
                Total {total} recently visited product{total > 1 ? "s" : ""}
              </Typography>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
};

export default RecentlyVisited;
