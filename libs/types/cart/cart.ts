export interface CartItem {
  _id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  productImages: string[];
  size?: string[];
  quantity: number;
}

export interface Cart {
  _id: string;
  memberId: string;
  items: CartItem[];

  totalAmount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
