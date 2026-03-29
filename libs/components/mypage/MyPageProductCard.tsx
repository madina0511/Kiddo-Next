// libs/components/mypage/MyPageProductCard.tsx

import { Product } from "@/libs/types/product/product";
import React from "react";
import ProductCard from "../products/productCard";

interface Props {
  product: Product;
  recentlyVisited?: boolean;
  myFavorites?: boolean;
  likeProductHandler?: (user: any, productId: string) => void;
}

const MyPageProductCard = ({
  product,
  recentlyVisited,
  myFavorites,
  likeProductHandler,
}: Props) => {
  return (
    <div className="mypage-product-card-wrap">
      <ProductCard
        product={product}
        recentlyVisited={recentlyVisited}
        myFavorites={myFavorites}
        likeProductHandler={likeProductHandler}
      />
    </div>
  );
};

export default MyPageProductCard;
