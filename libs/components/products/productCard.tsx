import { Box, IconButton, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import styles from "@/scss/pc/products/productCard.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { NEXT_PUBLIC_API_URL } from "@/libs/config";
import { Product } from "@/libs/types/product/product";

interface ProductCardProps {
  product: Product;
  likeProductHandler?: (user: any, productId: string) => void;
  myFavorites?: boolean;
  recentlyVisited?: boolean;
}

const ProductCard = ({ product, likeProductHandler }: ProductCardProps) => {
  const router = useRouter();
  const user = useReactiveVar(userVar);

  const [isLiked, setIsLiked] = useState<boolean>(
    product?.meLiked?.[0]?.myFavorite ?? false,
  );

  useEffect(() => {
    setIsLiked(product?.meLiked?.[0]?.myFavorite ?? false);
  }, [product?.meLiked?.[0]?.myFavorite]);

  const pushDetailHandler = async (productId: string) => {
    await router.push({
      pathname: "/products/productDetail",
      query: { id: productId },
    });
  };

  const mainImage = product.productImages?.[0]
    ? `${NEXT_PUBLIC_API_URL}/${product.productImages[0]}`
    : "/products/sweater_polo.avif";

  const hoverImage = product.productImages?.[1]
    ? `${NEXT_PUBLIC_API_URL}/${product.productImages[1]}`
    : mainImage;

  const handleLike = () => {
    // ✅ Optimistic update — server javobini kutmay UI yangilanadi
    setIsLiked((prev) => !prev);
    likeProductHandler?.(user, product._id);
  };

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
            {/* ✅ handleLike orqali chaqirilmoqda */}
            <IconButton color="default" onClick={handleLike}>
              {isLiked ? (
                <FavoriteIcon style={{ color: "red" }} />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>

            <Typography className="view-cnt">
              {/* {product.productLikes} */}
            </Typography>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default ProductCard;
