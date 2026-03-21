import {
  AgeGroup,
  ClothingSize,
  Gender,
  ProductCategory,
  ProductColor,
  ProductType,
} from "@/libs/enums/product.enum";

// Set ichidagi har bir item — o'z ProductInput'i
export interface SetItem {
  id: string;
  productType: ProductType;
  productCategory: ProductCategory;
  sizes: ClothingSize[];
  ageGroups: AgeGroup[];
  gender: Gender;
  productTitle: string;
  productPrice: number;
  productColors: ProductColor[];
  productDesc: string;
  imageFile: File | null;
  imagePreview: string | null;
}

// Set cover info (SET type product)
export interface SetFormData {
  productTitle: string;
  brandName: string;
  productCategory: ProductCategory;
  gender: Gender;
  ageGroups: AgeGroup[];
  productColors: ProductColor[];
  productDiscount: number;
  productDesc: string;
  coverImageFile: File | null;
  coverImagePreview: string | null;
  items: SetItem[];
}
export const BRANDS = ["MOLO", "COSMO", "NORALEE", "SWEEBIES"];
export const makeItem = (): SetItem => ({
  id: crypto.randomUUID(),
  productType: ProductType.T_SHIRT,
  productCategory: ProductCategory.INDOORWEAR,
  sizes: [],
  ageGroups: [],
  gender: Gender.ALL,
  productTitle: "",
  productPrice: 0,
  productColors: [],
  productDesc: "",
  imageFile: null,
  imagePreview: null,
});

export const INITIAL: SetFormData = {
  productTitle: "",
  brandName: BRANDS[0],
  productCategory: ProductCategory.INDOORWEAR,
  gender: Gender.ALL,
  ageGroups: [],
  productColors: [],
  productDiscount: 0,
  productDesc: "",
  coverImageFile: null,
  coverImagePreview: null,
  items: [makeItem(), makeItem(), makeItem()],
};
