import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministratorsRoutingModule} from './administrators-routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListComponent,
    ManageComponent,
  ],
  imports: [
    CommonModule,
    AdministratorsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdministratorsModule { }
