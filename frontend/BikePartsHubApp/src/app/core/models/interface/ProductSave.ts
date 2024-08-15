import { ProductAttributeSave } from "./ProductAttribute";

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
  productAttributes: ProductAttributeSave[];
}


