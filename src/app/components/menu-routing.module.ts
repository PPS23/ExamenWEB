import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { ContactsComponent } from './contacts/contacts.component';


const menuRoutes: Routes = [
    {
        path: '',
        canActivate:[AuthGuard],
        children:[
            { path: 'contacts', component: ContactsComponent },
            { path: '**', redirectTo: '/menu' },
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(menuRoutes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }