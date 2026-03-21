export enum ProductType {
  ROMPER = "ROMPER",
  SLEEPSUIT = "SLEEPSUIT",
  BODYSUIT = "BODYSUIT",
  T_SHIRT = "T_SHIRT",
  BLOUSES = "BLOUSES",
  TOPS = "TOPS",
  SHIRTS = "SHIRTS",
  KNIT = "KNIT",
  SKIRTS = "SKIRTS",
  LEGGINGS = "LEGGINGS",
  JEANS = "JEANS",
  SHORTS = "SHORTS",
  PANTS = "PANTS",
  DRESS = "DRESS",
  SET = "SET",
  JACKET = "JACKET",
  SWEATER = "SWEATER",
  HOODIE = "HOODIE",
  PAJAMA = "PAJAMA",
  UNDERWEAR_NIGHTWEAR = "UNDERWEAR NIGHTWEAR",
}

export enum ProductCategory {
  ALL = "ALL",
  INDOORWEAR = "INDOORWEAR",
  OUTERWEAR = "OUTERWEAR",
  ACCESSORIES = "ACCESSORIES",
  SWIMWEAR = "SWIMWEAR",
  BABY_TODDLER = "BABY_TODDLER",
}

export enum ProductColor {
  RED = "RED",
  BLUE = "BLUE",
  WHITE = "WHITE",
  BLACK = "BLACK",
  PINK = "PINK",
  GREEN = "GREEN",
  BEIGE = "BEIGE",
}

export enum ProductStatus {
  SOLD = "SOLD",
  DELETE = "DELETE",
  ACTIVE = "ACTIVE",
}

export enum AgeGroup {
  ALL = "ALL",
  M0_3 = "M0_3",
  M3_6 = "M3_6",
  M6_12 = "M6_12",
  M12_18 = "M12_18",
  M18_24 = "M18_24",
  Y2_3 = "Y2_3",
  Y3_4 = "Y3_4",
  Y5_6 = "Y5_6",
  Y7_8 = "Y7_8",
  Y9_10 = "Y9_10",
  Y11_12 = "Y11_12",
  Y13_14 = "Y13_14",
  Y15_16 = "Y15_16",
  ONE_SIZE = "ONE_SIZE",
}
export enum ClothingSize {
  SIZE_86_92 = "SIZE_86_92",
  SIZE_92_98 = "SIZE_92_98",
  SIZE_98_104 = "SIZE_98_104",
  SIZE_110_116 = "SIZE_110_116",
  SIZE_122_128 = "SIZE_122_128",
  SIZE_134_140 = "SIZE_134_140",
  SIZE_146_152 = "SIZE_146_152",
  SIZE_158_164 = "SIZE_158_164",
  SIZE_170_176 = "SIZE_170_176",
}

export enum Gender {
  ALL = "ALL",
  BOY = "BOY",
  GIRL = "GIRL",
}

export const AGE_GROUP_LABELS: Record<AgeGroup, string> = {
  [AgeGroup.ALL]: "All",
  [AgeGroup.M0_3]: "0-3 Months",
  [AgeGroup.M3_6]: "3-6 Months",
  [AgeGroup.M6_12]: "6-12 Months",
  [AgeGroup.M12_18]: "12-18 Months",
  [AgeGroup.M18_24]: "18-24 Months",
  [AgeGroup.Y2_3]: "2-3 Years",
  [AgeGroup.Y3_4]: "3-4 Years",
  [AgeGroup.Y5_6]: "5-6 Years",
  [AgeGroup.Y7_8]: "7-8 Years",
  [AgeGroup.Y9_10]: "9-10 Years",
  [AgeGroup.Y11_12]: "11-12 Years",
  [AgeGroup.Y13_14]: "13-14 Years",
  [AgeGroup.Y15_16]: "15-16 Years",
  [AgeGroup.ONE_SIZE]: "One Size",
};

export const CLOTHING_SIZE_LABELS: Record<ClothingSize, string> = {
  [ClothingSize.SIZE_86_92]: "86/92",
  [ClothingSize.SIZE_92_98]: "92/98",
  [ClothingSize.SIZE_98_104]: "98/104",
  [ClothingSize.SIZE_110_116]: "110/116",
  [ClothingSize.SIZE_122_128]: "122/128",
  [ClothingSize.SIZE_134_140]: "134/140",
  [ClothingSize.SIZE_146_152]: "146/152",
  [ClothingSize.SIZE_158_164]: "158/164",
  [ClothingSize.SIZE_170_176]: "170/176",
};
