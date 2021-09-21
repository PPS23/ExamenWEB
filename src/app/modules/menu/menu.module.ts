import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { ContactsComponent } from 'src/app/components/contacts/contacts.component';
import { MenuRoutingModule } from 'src/app/components/menu-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { UploadcsvComponent } from 'src/app/components/uploadcsv/uploadcsv.component';



@NgModule({
  declarations: [
    MenuComponent,
    ContactsComponent,
    UploadcsvComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MenuRoutingModule,
    ReactiveFormsModule,
    DataTablesModule
  ]
})
export class MenuModule { }
