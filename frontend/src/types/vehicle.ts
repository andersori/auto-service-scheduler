export interface VehicleBrand {
  id: number;
  name: string;
  models: string[];
}

export interface VehicleCatalog {
  [brand: string]: string[];
}