import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  mode: number; //1->view, 2->Create, 3-> Update
  payment: Payment;

  constructor(
    private paymentsService: PaymentService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.mode = 0;
    this.payment = { id: 0, payment_date: new Date, contract_id: 0, bill_id : 0};
  }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1; // Visualizar
    } else if (currentUrl.includes("create")) {
      this.mode = 2; // Crear
    } else if (currentUrl.includes("update")) {
      this.mode = 3; // Actualizar
    }
    if (this.activateRoute.snapshot.params.id) {
      this.payment.id = this.activateRoute.snapshot.params.id;
      this.getLot(this.payment.id);
    }
  }
  getLot(id: number) {
    this.paymentsService.view(id).subscribe((data) => {
      this.payment = data;
    });
  }

  create() {
    this.paymentsService.create(this.payment).subscribe(() => {
      Swal.fire("Creado", "Se ha creado exitosamente", "success");
      this.router.navigate(["payments/list"]);
    });
  }

  update() {
    this.paymentsService.update(this.payment).subscribe(() => {
      Swal.fire("Actualizado", "Se ha actualizado exitosamente", "success");
      this.router.navigate(["payments/list"]);
    });
  }
}
  


