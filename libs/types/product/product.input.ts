import { Direction } from "@/libs/enums/common.enum";
import {
  AgeGroup,
  ClothingSize,
  ProductCategory,
  ProductColor,
  ProductType,
  Gender,
  ProductStatus,
} from "@/libs/enums/product.enum";

export interface ProductInput {
  productType: ProductType;

  productCategory: ProductCategory;

  size: ClothingSize[];

  ageGroup: AgeGroup[];

  gender: Gender;

  productTitle: string;

  brandName: string;

  productPrice: number;

  productColors?: ProductColor[];

  productDiscount?: number;

  productImages?: string[];

  productDesc?: string;

  memberId?: string;

  constructedAt?: Date;
}

export interface PISearch {
  memberId?: string;

  categoryList?: ProductCategory[];

  productType?: ProductType[];

  size?: ClothingSize[];

  ageGroup?: AgeGroup[];

  genderList?: Gender[];

  text?: string;
}

export interface ProductsInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: PISearch;
}
interface APISearch {
  productStatus?: ProductStatus;
}
export interface AgentProductsInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: APISearch;
}
// ADMIN
export interface ALPISearch {
  productStatus?: ProductStatus;
  productType?: ProductType;

  genderList?: Gender[];
}
export interface AllProductsInquiry {
  page: number;
  limit: number;
  sort?: string;
  direction?: Direction;
  search: ALPISearch;
}
export interface OrdinaryInquiry {
  page: number;
  limit: number;
}
