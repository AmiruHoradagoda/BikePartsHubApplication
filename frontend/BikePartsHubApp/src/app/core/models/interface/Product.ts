import { ProductAttribute, ProductAttributeSave } from './ProductAttribute';


export interface ProductSave {
  productName: string;
  productType: string;
  quantity: number;
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
  productAttributes: ProductAttributeSave[];
}


export interface ProductGet {
  productId: number;
  productName: string;
  productType: string;
  quantity: number;
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


export interface ProductUpdate {
  productName: string;
  productType: string;
  quantity: number;
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
