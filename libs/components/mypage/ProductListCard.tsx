// libs/components/mypage/ProductListCard.tsx

import { Stack, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import SellIcon from "@mui/icons-material/Sell";
import { Product } from "@/libs/types/product/product";
import { ProductStatus } from "@/libs/enums/product.enum";
import { NEXT_PUBLIC_API_URL } from "@/libs/config";

interface ProductListCardProps {
  product: Product;
  deleteHandler: (id: string) => void;
  updateHandler: (status: ProductStatus, id: string) => void;
  showActions?: boolean;
}

const ProductListCard = ({
  product,
  deleteHandler,
  updateHandler,
  showActions = true,
}: ProductListCardProps) => {
  return (
    <Stack className="property-card-box">
      <Stack className="image-box">
        <img
          src={
            product.productImages?.[0]
              ? `${NEXT_PUBLIC_API_URL}/${product.productImages[0]}`
              : "/img/banner/home_banner.jpg"
          }
          alt={product.productTitle}
        />
      </Stack>
      <Stack className="information-box">
        <Typography className="name">{product.productTitle}</Typography>
        <Typography className="address">{product.brandName}</Typography>
        <Typography className="price">${product.productPrice}</Typography>
      </Stack>
      <Stack className="date-box">
        <Typography className="date">
          {new Date(product.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </Typography>
      </Stack>
      <Stack className="status-box">
        <Stack
          className="coloured-box"
          sx={{
            background:
              product.productStatus === ProductStatus.ACTIVE
                ? "rgba(0, 182, 155, 0.14)"
                : "rgba(235, 103, 83, 0.14)",
          }}>
          <Typography
            className="status"
            sx={{
              color:
                product.productStatus === ProductStatus.ACTIVE
                  ? "#00b69b"
                  : "#eb6753",
            }}>
            {product.productStatus}
          </Typography>
        </Stack>
      </Stack>
      <Stack className="views-box">
        <Typography className="views">{product.productViews}</Typography>
      </Stack>
      {showActions && (
        <Stack className="action-box">
          <IconButton
            className="icon-button"
            onClick={() => updateHandler(ProductStatus.SOLD, product._id)}>
            <SellIcon className="buttons" />
          </IconButton>
          <IconButton
            className="icon-button"
            onClick={() => deleteHandler(product._id)}>
            <DeleteIcon className="buttons" />
          </IconButton>
        </Stack>
      )}
    </Stack>
  );
};

export default ProductListCard;
