import { Order } from "./order.model"
import { Route } from "./route.model"
import { Service } from "./service.model"

export class Contract {
    id?:number;
    description?: string;
    date: Date;
    /*route:Route;
    order:Order
    service:Service*/
}
