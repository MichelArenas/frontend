import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OwnerVehiclesRoutingModule } from './owner-vehicles-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';


@NgModule({
  declarations: [
    ListComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    OwnerVehiclesRoutingModule
  ]
})
export class OwnerVehiclesModule { }