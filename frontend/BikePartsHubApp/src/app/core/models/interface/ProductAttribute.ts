import { Bike, BikeGet } from "./Bike";

export interface ProductAttribute {

  color: string;
  bikes: Bike[];
}


export interface ProductAttributeSave {
  color: string;
  bikeId: Number[];
}

export interface ProductAttributeGet {
  color: string;
  bikes: BikeGet[];
}