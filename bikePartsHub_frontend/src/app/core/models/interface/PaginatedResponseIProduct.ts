import { ProductGet } from "./Product";

export interface PaginatedResponseIProduct {
  productDetailsList: ProductGet[];
  dataCount: number;
}
