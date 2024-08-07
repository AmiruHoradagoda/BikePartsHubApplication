import { ProductAttribute } from './ProductAttribute';

export interface Product {
  productId: number;
  productName: string;
  productType: string;
  quantity: string;
  category: string;
  manufacture: string;
  itemDescription: string;
  activeState: boolean;
  averageRating: number;
  pricePerUnit: number;
  discount: number;
  imageUrl:string;
  productAttributes: ProductAttribute[];
}
