import { Box, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import styles from "@/scss/pc/products/productCard.module.scss";
import { useRouter } from "next/router";
import { useState } from "react";

export interface ProductCardItem {
  _id: string;
  productTitle: string;
  brandName: string;
  productPrice: number;
  productImages?: string[];
  // productViews: number;
  // productLikes: number;
  meLiked?: { myFavorite: boolean }[];
}

interface ProductCardProps {
  product: ProductCardItem;
  likeProductHandler: (id: string) => void;
  myFavorites?: boolean;
  recentlyVisited?: boolean;
}

const ProductCard = ({ product, likeProductHandler }: ProductCardProps) => {
  const router = useRouter();
  const [isLiked, setIsLiked] = useState(
    product?.meLiked?.[0]?.myFavorite ?? false,
  );

  const pushDetailHandler = async (productId: string) => {
    await router.push({
      pathname: "/products/productDetail",
      query: { id: productId },
    });
  };
  const handleLike = () => {
    setIsLiked((prev) => !prev); // local state o'zgaradi
    likeProductHandler(product._id); // parent ga xabar beradi
  };

  const mainImage = product.productImages?.[0] || "/products/sweater_polo.avif";
  const hoverImage = product.productImages?.[1] || mainImage;

  return (
    <Box style={{ textDecoration: "none", color: "inherit" }}>
      <div className={styles.card}>
        <div
          className={styles.imageWrap}
          onClick={() => pushDetailHandler(product._id)}>
          <img
            src={mainImage}
            alt={product.productTitle}
            className={`${styles.image} ${styles.mainImage}`}
          />
          <img
            src={hoverImage}
            alt={product.productTitle}
            className={`${styles.image} ${styles.hoverImage}`}
          />
        </div>

        <div
          className={styles.info_box}
          style={{ display: "flex", justifyContent: "space-between" }}>
          <div className={styles.info}>
            <span className={styles.brand}>{product.brandName}</span>
            <span className={styles.title}>{product.productTitle}</span>
            <span className={styles.price}>${product.productPrice}</span>
          </div>

          <div className={styles.view_like}>
            <IconButton color="default">
              <RemoveRedEyeIcon />
            </IconButton>
            <Typography className="view-cnt">
              {/* {product?.productViews} */}
            </Typography>

            <IconButton
              color="default"
              onClick={() => likeProductHandler(product._id)}>
              {isLiked ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
            <Typography className="view-cnt">
              {/* {product?.productLikes} */}
            </Typography>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ProductCard;
