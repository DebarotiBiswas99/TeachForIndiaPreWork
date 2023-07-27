import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ViewlistComponent } from './viewlist/viewlist.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { AllocationsComponent } from './allocations/allocations.component';

const routes: Routes = [
  { path: '', component: RegistrationFormComponent },
  { path: 'adminlogin', component: AdminLoginComponent},
  { path: 'viewlist', component:ViewlistComponent },
  { path: 'classrooms', component:ClassroomsComponent},
  { path: 'allocations', component:AllocationsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
