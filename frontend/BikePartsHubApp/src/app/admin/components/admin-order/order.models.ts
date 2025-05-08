export interface ShippingAddress {
  address: string;
  state: string;
  district: string;
  city: string;
  postalCode: string;
}

export interface OrderDetail {
  orderDetailId: number;
  productName: string;
  qty: number;
  imageUrl:string;
  amount: number;
}

export interface OrderResponse {
  orderId: number;
  firstName: string;
  lastName: string;
  email: string;
  shippingAddress: ShippingAddress;
  date: string; // Use Date if you plan to parse it into a JavaScript Date object
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'CANCELED';
  total: number;
  orderDetails: OrderDetail[]; // Typo fixed: "oderDetails" should probably be "orderDetails"
}

export interface OrderResponses {
  orderResponses: OrderResponse[];
  dataCount: number;
}
