import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Payment } from 'src/app/models/payment.model';
import { PaymentService } from 'src/app/services/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  payments: Payment[];

  constructor(private paymentsService: PaymentService, private router: Router) { 
    this.payments=[];
  }

  ngOnInit(): void {
    this.list();
  }

  list() {
    this.paymentsService.list().subscribe((data) => {
      this.payments=data;
    });
  }
  
  create(){
    this.router.navigate(["payments/create"]);
  }
  
  view(id: number) {
    this.router.navigate(["payments/view/" + id]);
  }

  update(id: number) {
    this.router.navigate(["payments/update/" + id]);
  }

  delete(id: number) {
    Swal.fire({
      title: "Eliminación",
      text: "Está seguro que quiere eliminar este registro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "No,cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        this.paymentsService.delete(id).subscribe((data) => {
          this.ngOnInit(); // actualiza la vista luego de eliminar
          Swal.fire({
            title: "Eliminado",
            text: "Se ha eliminado correctamente",
            icon: "success",
          });
        });
      }
    });
  } 

}
