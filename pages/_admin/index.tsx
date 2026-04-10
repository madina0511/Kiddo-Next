import React, { useEffect } from "react";
import type { NextPage } from "next";

import { useRouter } from "next/router";
import withLayoutBase from "@/libs/components/layout/LayoutBase";

const AdminHome: NextPage = (props: any) => {
  const router = useRouter();

  /** LIFECYCLES **/
  useEffect(() => {
    router.push("/_admin/user");
  }, []);
  return <></>;
};

export default withLayoutBase(AdminHome);
