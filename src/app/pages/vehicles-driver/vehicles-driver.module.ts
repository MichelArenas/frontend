import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiclesDriverRoutingModule } from './vehicles-driver-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    VehiclesDriverRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class VehiclesDriverModule { }
