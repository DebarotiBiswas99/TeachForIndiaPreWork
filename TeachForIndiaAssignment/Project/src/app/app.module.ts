import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule} from '@ionic/angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ViewlistComponent } from './viewlist/viewlist.component';
import { ClassroomsComponent } from './classrooms/classrooms.component';
import { ClassroomService } from 'services/classroom.service';
import { AllocationsComponent } from './allocations/allocations.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationFormComponent,
    AdminLoginComponent,
    ViewlistComponent,
    ClassroomsComponent,
    AllocationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSnackBarModule,
    IonicModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ClassroomService],
  bootstrap: [AppComponent]
})
export class AppModule { }
