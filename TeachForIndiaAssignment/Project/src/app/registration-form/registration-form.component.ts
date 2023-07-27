import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css']
})
export class RegistrationFormComponent implements OnInit {
  registrationForm!: FormGroup;
  locations: string[] = ["Mumbai", "Kolkata", "Chennai", "Ahmedabad", "Bengaluru"];
  weekdays: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  languages: string[] = ["Hindi", "English", "Bengali", "Gujarati", "Tamil"]

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$'), this.exactLengthValidator(10)]],
      location: ['', [Validators.required]],
      weekdays: this.fb.array([], Validators.required), // Initialize as FormArray
      languages: this.fb.array([], Validators.required),
    });
  }

  exactLengthValidator(length: number) {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value && value.length !== length) {
        return { 'exactLength': true };
      }
      return null;
    };
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      formData.weekdays = formData.weekdays.join(', ');
      formData.languages = formData.languages.join(', ');

      // Don't submit the form to the server yet, check for uniqueness first
      this.http.get<any[]>('http://localhost:3000/api/users')
        .subscribe(
          (users) => {
            // Check if the email or phone number already exists in the users array
            const duplicateUser = users.find(
              (user) => user.email === formData.email || user.phone === formData.phone
            );

            if (duplicateUser) {
              // Display an alert box with the error message
              alert('Error: Email or phone number already exists. Please use a different one.');
            } else {
              // Continue with form submission to the server
              this.http.post<any>('http://localhost:3000/api/register', formData)
                .subscribe(
                  response => {
                    console.log('Registration successful!', response);
                    // Handle success message or redirection here
                    setTimeout(() => {
                      alert('Registration successful!'); // Display alert message
                      location.reload();
                    }, 1000);
                  },
                  error => {
                    console.error('Error registering user:', error);
                    // Handle error message or any error-related tasks here
                  }
                );
            }
          },
          (error) => {
            console.error('Error fetching users:', error);
            // Handle error message or any error-related tasks here
          }
        );
    }
  }

  get Name(): FormControl {
    return this.registrationForm.get("name") as FormControl;
  }

  get Email(): FormControl {
    return this.registrationForm.get("email") as FormControl;
  }

  get Phone(): FormControl {
    return this.registrationForm.get("phone") as FormControl;
  }

  get Location(): FormControl {
    return this.registrationForm.get("location") as FormControl;
  }

  get weekdaysArray(): FormArray {
    return this.registrationForm.get('weekdays') as FormArray;
  }

  // Helper method to get the languages FormArray
  get languagesArray(): FormArray {
    return this.registrationForm.get('languages') as FormArray;
  }

  toggleSelection(value: string, formArray: FormArray) {
    const index = formArray.controls.findIndex((control) => control.value === value);
    if (index >= 0) {
      formArray.removeAt(index);
    } else {
      formArray.push(new FormControl(value));
    }
  }
}
