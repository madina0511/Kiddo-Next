export interface UpdateCartItemInput {
  _id: string;
  quantity: number;
  size?: string[];
}

export interface RemoveCartItemInput {
  _id: string;
}
