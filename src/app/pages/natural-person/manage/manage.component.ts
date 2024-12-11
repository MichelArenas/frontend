import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import Swal from "sweetalert2";

//Importaciones de la clase
import { NaturalPerson } from "src/app/models/natural-person.model";
import { NaturalpersonService } from "src/app/services/natural-person.service";

import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
  selector: "app-manage",
  templateUrl: "./manage.component.html",
  styleUrls: ["./manage.component.css"],
})
export class ManageComponent implements OnInit {
  mode: number; //1->View, 2->Create, 3->Update
  naturalperson: NaturalPerson;
  theFormGroup: FormGroup;
  trySend: boolean;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private naturalpersonService: NaturalpersonService,
    private theFormBuilder: FormBuilder

  ) {
    this.mode = 1;
    this.naturalperson = {
      id: 0,
      user_id: 0
    };
  }

  ngOnInit(): void {
    this.configFormGroup();

    const currentUrl = this.activateRoute.snapshot.url.join("/");
    if (currentUrl.includes("view")) {
      this.mode = 1;
      this.theFormGroup.get("user_id").disable();
    } else if (currentUrl.includes("create")) {
      this.mode = 2;
    } else if (currentUrl.includes("update")) {
      this.mode = 3;
    }
    if (this.activateRoute.snapshot.params.id) {
      this.naturalperson.id = this.activateRoute.snapshot.params.id;
      this.getPerson(this.naturalperson.id);
    }
  }

  create() {
    if (this.theFormGroup.invalid) {
      Swal.fire(
        "Error",
        "Formulario inválido. Por favor, verifica los campos.",
        "error"
      );
      return;
    }
    console.log(JSON.stringify(this.naturalperson));
    this.naturalpersonService.create(this.naturalperson).subscribe((data) => {
      Swal.fire("Creado", " se ha creado exitosa mente", "success"); //tirulo a la alerta
      this.router.navigate(["people/list"]);
    });
  }

  update() {
    if (this.theFormGroup.invalid) {
      Swal.fire(
        "Error",
        "Formulario inválido. Por favor, verifica los campos.",
        "error"
      );
      return;
    }
    console.log(JSON.stringify(this.naturalperson));
    this.naturalpersonService.update(this.naturalperson).subscribe((data) => {
      Swal.fire("Actualizado", " se ha actualizado exitosa mente", "success"); //titulo a la alerta
      this.router.navigate(["people/list"]);
    });
  }

  getPerson(id: number) {
    this.naturalpersonService.view(id).subscribe((data) => {
      this.naturalperson = data;
      this.theFormGroup.patchValue({
        // id: this.naturalperson.id,
        user_id: this.naturalperson.user_id,
      });
    });
  }

  configFormGroup() {
    this.theFormGroup = this.theFormBuilder.group({
      // id: [this.naturalperson.id || ""],
      user_id: [
        "",
        [Validators.required, Validators.pattern("^[a-zA-Z0-9]+$")],
      ],

    });
  }
  get getTheFormGroup() {
    return this.theFormGroup.controls;
  }
}
