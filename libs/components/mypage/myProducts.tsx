import React, { useState } from "react";
import { NextPage } from "next";
import { Pagination, Stack, Typography } from "@mui/material";
import useDeviceDetect from "../../hooks/useDeviceDetect";

import { useMutation, useQuery, useReactiveVar } from "@apollo/client";

import { userVar } from "../../../apollo/store";
import { useRouter } from "next/router";
import { AgentProductsInquiry } from "@/libs/types/product/product.input";
import { Product } from "@/libs/types/product/product";
import { ProductStatus } from "@/libs/enums/product.enum";
import { T } from "@/libs/common";
import { sweetConfirmAlert } from "@/libs/types/sweetAlert";
import ProductCard from "../products/productCard";

const MyProducts = ({ initialInput, ...props }: any) => {
  const device = useDeviceDetect();
  const [searchFilter, setSearchFilter] =
    useState<AgentProductsInquiry>(initialInput);
  const [agentProducts, setAgentProducts] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const user = useReactiveVar(userVar);
  const router = useRouter();

  /** APOLLO REQUESTS **/

  /** HANDLERS **/
  const paginationHandler = (e: T, value: number) => {
    setSearchFilter({ ...searchFilter, page: value });
  };

  const changeStatusHandler = (value: ProductStatus) => {
    setSearchFilter({ ...searchFilter, search: { productStatus: value } });
  };

  const deletePropertyHandler = async (id: string) => {};

  const updatePropertyHandler = async (status: string, id: string) => {};

  if (user?.memberType !== "AGENT") {
    router.back();
  }

  if (device === "mobile") {
    return <div>NESTAR PRODUCTS MOBILE</div>;
  } else {
    return (
      <div id="my-property-page">
        <Stack className="main-title-box">
          <Stack className="right-box">
            <Typography className="main-title">My Products</Typography>
            <Typography className="sub-title">
              We are glad to see you again!
            </Typography>
          </Stack>
        </Stack>
        <Stack className="property-list-box">
          <Stack className="tab-name-box">
            <Typography
              //   onClick={() => changeStatusHandler(productStatus.ACTIVE)}
              className={
                searchFilter.search.productStatus === "ACTIVE"
                  ? "active-tab-name"
                  : "tab-name"
              }>
              On Sale
            </Typography>
            <Typography
              //   onClick={() => changeStatusHandler(ProductStatus.SOLD)}
              className={
                searchFilter.search.productStatus === "SOLD"
                  ? "active-tab-name"
                  : "tab-name"
              }>
              On Sold
            </Typography>
          </Stack>
          <Stack className="list-box">
            <Stack className="listing-title-box">
              <Typography className="title-text">Listing title</Typography>
              <Typography className="title-text">Date Published</Typography>
              <Typography className="title-text">Status</Typography>
              <Typography className="title-text">View</Typography>
              {searchFilter.search.productStatus === "ACTIVE" && (
                <Typography className="title-text">Action</Typography>
              )}
            </Stack>

            {agentProducts?.length === 0 ? (
              <div className={"no-data"}>
                <img src="/img/icons/icoAlert.svg" alt="" />
                <p>No Property found!</p>
              </div>
            ) : (
              agentProducts.map((product: Product) => {
                return (
                  <ProductCard
                    product={product}
                    likeProductHandler={function (id: string): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                );
              })
            )}

            {agentProducts.length !== 0 && (
              <Stack className="pagination-config">
                <Stack className="pagination-box">
                  <Pagination
                    count={Math.ceil(total / searchFilter.limit)}
                    page={searchFilter.page}
                    shape="circular"
                    color="primary"
                    onChange={paginationHandler}
                  />
                </Stack>
                <Stack className="total-result">
                  <Typography>{total} product available</Typography>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Stack>
      </div>
    );
  }
};

MyProducts.defaultProps = {
  initialInput: {
    page: 1,
    limit: 5,
    sort: "createdAt",
    search: {
      productStatus: "ACTIVE",
    },
  },
};

export default MyProducts;
