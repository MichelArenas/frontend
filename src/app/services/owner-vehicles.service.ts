import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { OwnerVehicles } from '../models/owner-vehicles.model';

@Injectable({
  providedIn: 'root'
})
export class OwnerVehiclesService {
  constructor(private http:HttpClient) { }
  list(): Observable<OwnerVehicles[]> { 
    return this.http.get<OwnerVehicles[]>(`${environment.url_ms_logic}/ownerVehicles`); 
  }
  delete(id:number) {
    return this.http.delete<OwnerVehicles>(`${environment.url_ms_logic}/ownerVehicles/${id}`);
  }
  view(id:number): Observable<OwnerVehicles> {
    return this.http.get<OwnerVehicles>(`${environment.url_ms_logic}/ownerVehicles/${id}`);
  }
  create(newOwnerVehicles: OwnerVehicles): Observable<OwnerVehicles> {
    return this.http.post<OwnerVehicles>(`${environment.url_ms_logic}/ownerVehicles`,newOwnerVehicles);
  }
  update(theOwnerVehicles: OwnerVehicles): Observable<OwnerVehicles> {
    return this.http.put<OwnerVehicles>(`${environment.url_ms_logic}/ownerVehicles/${theOwnerVehicles.id}`,theOwnerVehicles);
  }
  
}