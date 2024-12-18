import { Driver } from "./driver.model";
import { Vehicle } from "./vehicle.model";

export class VehiclesDriver {
    id?:number;
    assignment_date?:Date;
    driver_id:number;
    vehicle_id:number
    vehicle?:Vehicle
    driver?:Driver
}
