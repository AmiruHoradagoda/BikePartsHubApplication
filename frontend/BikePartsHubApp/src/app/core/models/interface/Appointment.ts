import { ServiceType } from "./ServiceType";

export interface Appointment {
  id?: string;
  serviceDuration: number;
  date: string;
  startTime: string;
  name: string;
  mobile: string;
  plateNumber: string;
  engineOil: string | undefined;
  totalCharge: number;
  serviceType: ServiceType;
}
