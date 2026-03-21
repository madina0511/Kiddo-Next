import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { Stack } from "@mui/material";
import useDeviceDetect from "../../libs/hooks/useDeviceDetect";
import MyProfile from "../../libs/components/mypage/MyProfile";
import MyArticles from "../../libs/components/mypage/MyArticles";
import { useMutation, useReactiveVar } from "@apollo/client";
import { userVar } from "../../apollo/store";
import MyMenu from "../../libs/components/mypage/MyMenu";
import WriteArticle from "../../libs/components/mypage/WriteArticle";

import { Messages } from "../../libs/config";
import ProductRegisterTabs from "@/libs/components/mypage/ProductRegisterTabs";
import Link from "next/link";
import withLayoutBase from "@/libs/components/layout/LayoutBase";
import { sweetErrorHandling } from "@/libs/types/sweetAlert";
import MyProducts from "@/libs/components/mypage/myProducts";
import MyFavorites from "@/libs/components/mypage/MyFavorites";
import RecentlyVisited from "@/libs/components/mypage/ResentlyVisited";
import MyOrders from "@/libs/components/mypage/MyOrders";

const MyPage = () => {
  const device = useDeviceDetect();
  const user = useReactiveVar(userVar);
  const router = useRouter();
  const category: any = router.query?.category ?? "myProfile";

  /** LIFECYCLES **/
  useEffect(() => {
    if (!user?._id) router.push("/").then();
  }, [user]);

  /** HANDLERS **/
  const likeMemberHandler = async (id: string, refetch: any, query: any) => {};

  const redirectToMemberPageHandler = async (memberId: string) => {
    try {
      if (memberId === user?._id)
        await router.push(`/mypage?memberId=${memberId}`);
      else await router.push(`/member?memberId=${memberId}`);
    } catch (error) {
      await sweetErrorHandling(error);
    }
  };

  if (device === "mobile") {
    return <div>MY PAGE</div>;
  } else {
    return (
      <div id="my-page" style={{ position: "relative" }}>
        <div className="container">
          <Stack className={"my-page"}>
            <Stack className={"back-frame"}>
              <Stack className={"left-config"}>
                <MyMenu />
              </Stack>
              <Stack className="main-config" mb={"76px"}>
                <Stack className={"list-config"}>
                  {category === "addProduct" && <ProductRegisterTabs />}
                  {category === "myProducts" && <MyProducts />}
                  {category === "myFavorites" && <MyFavorites />}
                  {category === "recentlyVisited" && <RecentlyVisited />}
                  {category === "myArticles" && <MyArticles />}
                  {category === "myOrders" && <MyOrders />}
                  {category === "writeArticle" && <WriteArticle />}
                  {category === "myProfile" && <MyProfile />}
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </div>
      </div>
    );
  }
};

export default withLayoutBase(MyPage);
