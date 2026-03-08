import Link from "next/link";
import { Box, Stack, Typography } from "@mui/material";
import styles from "@/scss/pc/products/productCard.module.scss";

export interface ProductCardItem {
  _id: string;
  productTitle: string;
  brandName: string;
  productPrice: number;
  productImages: string[];
}

interface ProductCardProps {
  product: ProductCardItem;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const mainImage = product.productImages?.[0] || "/products/sweater_polo.avif";
  const hoverImage = product.productImages?.[1] || mainImage;

  return (
    <Link
      href={`/product/${product._id}`}
      style={{ textDecoration: "none", color: "inherit" }}>
      <div className={styles.card}>
        <div className={styles.imageWrap}>
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

        <div className={styles.info}>
          <span className={styles.brand}>{product.brandName}</span>
          <span className={styles.title}>{product.productTitle}</span>
          <span className={styles.price}>${product.productPrice}</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
