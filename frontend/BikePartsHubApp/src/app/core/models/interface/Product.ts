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
  material: string;
  partNumber: string;
  imageUrl: string;
  productAttributes: ProductAttribute[];
}


export interface ProductSave {
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
  material: string;
  partNumber: string;
  imageUrl: string;
  productAttributes: ProductAttribute[];
}
