import { OrderStatus } from "@/libs/enums/myorders";

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

export interface Order {
  _id: string;
  orderNumber: string;
  items: OrderItem[];
  totalAmount: number;
  orderStatus: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}
