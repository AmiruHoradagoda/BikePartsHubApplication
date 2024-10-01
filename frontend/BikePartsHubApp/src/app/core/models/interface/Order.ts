export interface Order {
  userId: number;
  productIds: number[];
  orderDate: Date;
  totalAmount: number;
}