import { Bike } from "./Bike";

export interface ProductAttribute {
  material: string;
  color: string;
  partNumber: string;
  bikes: Bike[];
}
