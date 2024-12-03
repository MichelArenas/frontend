import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Restaurant } from 'src/app/models/restaurant.model';
import { RestaurantService } from 'src/app/services/restaurant.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  restaurant: Restaurant
  mode:number // mode=1 -> View, mode=2 -> create, mode=3-> update
  theFormGroup: FormGroup;
  trySend: Boolean; //Indica si la persona hizo un intento de enviar información
  constructor(private restaurantService: RestaurantService, 
    private router:Router,
    private activateRoute:ActivatedRoute, //Visializar o tomar foto a la ruta
    private theFormBuilder: FormBuilder// Hace cumplir los validadores

  ) {
    this.restaurant = {id:0, name:" ",ubicacion:" ",telefono:" "}
    this.mode=0;
    this.configFormGroup()
    this.trySend=false
   }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');//Tomar una foto y separar por /
    if (currentUrl.includes('view')) { // Si en esa lista incluye la palabra view
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if(this.activateRoute.snapshot.params.id){
      this.restaurant.id = this.activateRoute.snapshot.params.id
      this.getRestaurant(this.restaurant.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({ //theFormGroup es el que establece las reglas 
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      capacity:[0,[Validators.required,Validators.min(1),Validators.max(100)]], //Reglas que riguen ese campo
      location:['',[Validators.required,Validators.minLength(2)]]
    })
  }
  get getTheFormGroup(){ //Para poder ser llamado desde la interfaz grafica 
    return this.theFormGroup.controls
  }
  getRestaurant(id:number){
    this.restaurantService.view(id).subscribe(data => {
      this.restaurant=data
    })
  }
  create(){
    this.restaurantService.create(this.restaurant).subscribe(data =>{
      Swal.fire("creado", "Se ha creado exitosamente","success")
      this.router.navigate([`restaurants/list`])
    })
  }

  update(){
    this.restaurantService.update(this.restaurant).subscribe(data =>{
      Swal.fire("Actualizado", "Se Actualizado exitosamente","success")
      this.router.navigate(["restaurants/list"])
    })
  }

}
