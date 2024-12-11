import { VehiclesDriver } from "./vehicles-driver.model";

export class Driver {
    id?:number
    license:number;
    license_type:string;
    usuario_id?:string;
    vehicles_driver:VehiclesDriver
    
}
