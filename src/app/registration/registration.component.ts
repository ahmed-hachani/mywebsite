import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../users';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { FormGroup,Validators,FormBuilder ,ValidatorFn,AbstractControl} from '@angular/forms';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent implements OnInit{
  showError: boolean = false;
  errorMessage: string = '';
  public showHeader = false;
  predefinedRoles: string[] = ['student', 'prof', 'adminagent'];
  registrationForm: FormGroup = new FormGroup({});
  userDetails = null as any;
  constructor(private http: HttpClient, private userService: UserService, private fb:FormBuilder) {}
  ngOnInit(): void {
    
    this.registrationForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [["STUDENT"], ], // Default role or customize as needed.
      
    });
  }

  PATH_OF_API = 'http://localhost:8076';

  



    // private arrayOfStringValidator(): ValidatorFn {
    //   return (control: AbstractControl): { [key: string]: any } | null => {
    //     const value = control.value;
    //     if (!Array.isArray(value) || value.some((item) => typeof item !== 'string')) {
    //       return { invalidArray: true };
    //     }
    //     return null;
    //   };
    //}
    onSubmit() {
      if (this.registrationForm.valid) {
        const userData = this.registrationForm.value;

        
        console.log(userData.role);
        
  
        this.userService.registerUser(userData).subscribe(
          (response) => {
            
            console.log('Registration successful:', response);
            // Redirect to login page or perform other actions.
          },
          (error) => {if (error.status === 400) {
            // Handle the case where registration failed due to duplicate username
            this.showError = true;
            this.errorMessage = 'Username already exists. Please choose a different one.';
          } else {
            // Handle other error cases
            this.showError = true;
            this.errorMessage = 'An error occurred during registration. Please try again later.';
          }
        }
      );
    } else {
      this.showError = true;
      this.errorMessage = 'Please fill out all required fields.';
    }
  }}
