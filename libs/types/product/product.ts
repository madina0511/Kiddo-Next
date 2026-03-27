import {
  AgeGroup,
  ClothingSize,
  Gender,
  ProductCategory,
  ProductStatus,
  ProductType,
} from "@/libs/enums/product.enum";
import { Member } from "../member/member";

export interface MeLiked {
  memberId: string;
  likeRefId: string;
  myFavorite: boolean;
}

export interface TotalCounter {
  total: number;
}

export interface Product {
  _id: string;
  productType: ProductType;
  productColors?: string[];
  productStatus: ProductStatus;
  productCategory: ProductCategory;
  ageGroup: AgeGroup[];
  size: ClothingSize[];
  productTitle: string;
  brandName: string;
  productPrice: number;
  gender: Gender;
  productDiscount?: number;
  productViews: number;
  productLikes: number;
  productComments: number;
  productRank: number;
  productImages?: string[];
  productDesc?: string;
  memberId: string;
  setItems?: string[];
  soldAt?: Date;

  /* from aggregation*/
  memberData?: Member;
  deletedAt?: Date;
  constructedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  meLiked?: MeLiked[];
}

export interface Products {
  list: Product[];
  metaCounter: TotalCounter[];
}
