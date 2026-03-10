import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import styles from "@/scss/pc/products/productCard.module.scss";
import { useRouter } from "next/router";
import { products } from "@/libs/common";

export interface ProductCardItem {
  _id: string;
  productTitle: string;
  brandName: string;
  productPrice: number;
  productImages: string[];
  // productViews: number;
  // productLikes: number;
  // meLiked: [{ myFavorite: false }];
}

interface ProductCardProps {
  product: ProductCardItem;
  likeProductHandler: (id: string) => void;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const router = useRouter();

  //HANDLERS
  const pushDetailHandler = async (productId: string) => {
    await router.push({
      pathname: "/products/productDetail",
      query: { id: productId },
    });
  };

  const mainImage = product.productImages?.[0] || "/products/sweater_polo.avif";
  const hoverImage = product.productImages?.[1] || mainImage;

  function likeProductHandler(_id: string): void {
    // throw new Error("Function not implemented.");
  }

  return (
    <Box style={{ textDecoration: "none", color: "inherit" }}>
      <div className={styles.card}>
        <div
          className={styles.imageWrap}
          onClick={() => {
            pushDetailHandler(product._id);
          }}>
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
            <IconButton color={"default"}>
              <RemoveRedEyeIcon />
            </IconButton>
            <Typography className="view-cnt">
              {/* {product?.productViews} */}
            </Typography>
            <IconButton
              color={"default"}
              onClick={() => likeProductHandler(product._id)}>
              {/* {product?.meLiked && products?.meLiked[0]?.myFavorite ? ( */}
              <FavoriteIcon style={{ color: "red" }} />
              {/* ) : ( */}
              <FavoriteIcon />
              {/* )} */}
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
