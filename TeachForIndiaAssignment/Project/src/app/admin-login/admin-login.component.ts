import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit{
  loginForm = new FormGroup({
    logemail: new FormControl("", [
      Validators.required]),
    logpassword: new FormControl("", [
      Validators.required])
});


  constructor(private alertController: AlertController, private router: Router) { }

  ngOnInit(): void {
  }


get Email(): FormControl {
  return this.loginForm.get("logemail") as FormControl;
}

get Password(): FormControl {
  return this.loginForm.get("logpassword") as FormControl;
}

  async loginSubmitted(){
  if (
    this.loginForm.valid &&
    this.Email.value === 'admin@gmail.com' &&
    this.Password.value === 'admin'
  ) {
    const alert = await this.alertController.create({
      header: 'Login Success',
      message: 'You have successfully logged in.',
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.router.navigate(['/viewlist']); // Replace '/new-page' with the actual route to the new page
          }
        }
      ],
      cssClass: 'alert-middle'
    });

    await alert.present();
  } else {
    const alert = await this.alertController.create({
      header: 'Login Failed',
      message: 'Invalid email or password.',
      buttons: ['OK'],
      cssClass: 'alert-middle'
    });

    await alert.present();
  }

}
}

