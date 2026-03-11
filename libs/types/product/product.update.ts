import {
  ProductCategory,
  ProductColor,
  ProductStatus,
  ProductType,
} from "@/libs/enums/product.enum";

export interface ProductUpdate {
  _id: string;
  productType?: ProductType;
  productStatus?: ProductStatus;
  productCategory?: ProductCategory;
  productTitle?: string;
  productColors?: ProductColor[];
  brandName: string;
  productPrice?: number;
  productDiscount?: number;
  productImages?: string[];
  productDesc?: string;
  soldAt?: Date;

  deletedAt?: Date;
  constructedAt?: Date;
}
