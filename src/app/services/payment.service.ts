import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Payment } from '../models/payment.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http: HttpClient) {}

  list(): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${environment.url_ms_logic}/payments`);
  }

  view(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${environment.url_ms_logic}/payments/${id}`);
  }

  create(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(
      `${environment.url_ms_logic}/payments`,
      payment
    );
  }

  delete(id: number) {
    return this.http.delete<Payment>(
      `${environment.url_ms_logic}/payments/${id}`
    );
  }

  update(payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(
      `${environment.url_ms_logic}/payments/${payment.id}`,
      payment //hay que anexarle un body
    );
  }
}
