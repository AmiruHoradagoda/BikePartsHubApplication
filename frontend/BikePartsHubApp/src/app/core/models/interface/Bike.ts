export interface Bike {
  bikeId: number;
  type: string;
  model: string;
  version: string;
  manufacture: string;
}

export interface BikeSave {
  type: string;
  model: string;
  version: string;
  manufacture: string;
}


export interface BikeGet{
  bikeId:number
  type: string;
  model: string;
  version: string;
  manufacture: string;
}

export interface BikeUpdate {
  type: string;
  model: string;
  version: string;
  manufacture: string;
}

