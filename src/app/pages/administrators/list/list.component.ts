import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Administrator } from "src/app/models/administrator.model";
import { AdministratorService } from "src/app/services/administrator.service";
import Swal from "sweetalert2";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"],
})
export class ListComponent implements OnInit {
  administrators:Administrator[]

  constructor(private adminService:AdministratorService, private router:Router ) { 
    this.administrators=[]
  }

  ngOnInit(): void {
  this.list()
  }
  list(){
    this.adminService.list().subscribe(data =>{
      this.administrators=data
    })
  }
  delete(id:number){
    Swal.fire({ 
      title: 'Eliminar Operación', 
      text: "Está seguro que quiere eliminar la Operación?", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Si, eliminar',
      cancelButtonText:'No, Cancelar'
      }).then((result) => { 
      if (result.isConfirmed) { 
      this.adminService.delete(id). 
      subscribe(data => { 
      Swal.fire( 
      'Eliminado!', 
      'La Operación ha sido eliminada correctamente', 
      'success'
      ) 
      this.ngOnInit();
      }); 
      } 
      }) 
  }
  update(id:number){
    this.router.navigate(["administrators/update/"+id])
  }
  view(id:number){
    this.router.navigate(["administrators/view/"+id])
  }

  create(){
    this.router.navigate(["administrators/create"])
  }
}
