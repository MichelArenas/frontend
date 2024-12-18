import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { VehiclesDriver } from '../models/vehicles-driver.model';

@Injectable({
  providedIn: 'root'
})
export class VehiclesDriverService {

  constructor(private http:HttpClient) { }
  //observable es una clase que permite manejar eventos asincronos
  list(): Observable<VehiclesDriver[]> {
    return this.http.get<VehiclesDriver[]>(
      `${environment.url_ms_logic}/VehiclesDriver`
    );
  }

  view(id: number): Observable<VehiclesDriver> {
    //listar un solo teatro

    return this.http.get<VehiclesDriver>(
      `${environment.url_ms_logic}/VehiclesDriver/${id}`
    );
  }

  delete(id: number) {
    return this.http.delete<VehiclesDriver>(
      `${environment.url_ms_logic}/VehiclesDriver/${id}`
    );
  }

  create(VehicleDriver: VehiclesDriver): Observable<VehiclesDriver> {
    return this.http.post<VehiclesDriver>(
      `${environment.url_ms_logic}/VehiclesDriver`,
      VehicleDriver
    );
  }
  //en la proxima clase colocamos el interceptor

  update(VehicleDriver: VehiclesDriver): Observable<VehiclesDriver> {
    return this.http.put<VehiclesDriver>(
      `${environment.url_ms_logic}/VehiclesDriver/${VehicleDriver.id}`,
      VehicleDriver
    );
  }
  listByDriver(driver_id: number): Observable<VehiclesDriver[]> {
           return this.http.get<VehiclesDriver[]>(`${
             environment.url_ms_logic
           }/VehiclesDriver?driver_id=${driver_id}`);
           
         }
         createForDriver(driver_id: number, operation: VehiclesDriver): Observable<VehiclesDriver> {
           return this.http.post<VehiclesDriver>(`${environment.url_ms_logic}/VehiclesDriver/driver/${driver_id}`, operation);
         }
       
         listByVehicle(vehicle_id: number): Observable<VehiclesDriver[]> {
           return this.http.get<VehiclesDriver[]>(`${
             environment.url_ms_logic
           }/VehiclesDriver?vehicle_id=${vehicle_id}`);
           
         }
         createForVehicle(vehicle_id: number, vehicleOwners: VehiclesDriver): Observable<VehiclesDriver> {
           return this.http.post<VehiclesDriver>(`${environment.url_ms_logic}/VehiclesDriver/vehicle/${vehicle_id}`, vehicleOwners);
         }
}