import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../_services/storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export  class LoginComponent implements OnInit{
  siteKey = '6LdnB_IlAAAAANQCHV1vWqy2tPx3pFLQILxAiNmn';
  response!: string;
  isCaptchaValid: boolean = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  showError: boolean = false;
  
  constructor(private storageService: StorageService ,private userService: UserService, private userAuthService :UserAuthService,private router: Router,private http: HttpClient) {
    

  }
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
    //this.http.get('https://www.google.com/recaptcha/api/siteverify?secret=' + '6LdnB_IlAAAAAMKAPysgE4Cly8gPH48HPgzymItK' + '&response=' + this.response)
    //.subscribe((res: any) => {
      //if (res.success) {
        // captcha validation success
     // } else {
        // captcha validation failed
      //}
    //});
    

  }
  handleResponse(response: string): void {
    this.response = response;
  }
  // validateCaptcha(): void {
  //   this.http.get('https://www.google.com/recaptcha/api/siteverify?secret=' + '6LdnB_IlAAAAAMKAPysgE4Cly8gPH48HPgzymItK' + '&response=' + this.response)
  //   .subscribe((res: any) => {
  //     if (res.success) {
  //       // captcha validation success
  //       console.log('reCAPTCHA validation success');
  //       this.isCaptchaValid = true;
  //     } else {
  //       // captcha validation failed
  //       console.log('reCAPTCHA validation failed');
  //       this.isCaptchaValid = false;
  //     }
  //   });
  // }
  // onSubmit() {
  //   grecaptcha.ready(() => {
  //     grecaptcha.execute(this.siteKey, { action: 'submit' }).then((token) => {
  //       this.response = token;
  //     });
  //   });}
  
  login(loginForm: NgForm){
    {
    this.userService.login(loginForm.value).subscribe(
      (response:any)=>{
        console.log(response); 
        this.storageService.saveUser(response);
        
        this.userAuthService.setRoles(response.roles);
        console.log(response);  
        this.userAuthService.setToken(response.Token);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        const role = response.roles[0];
        console.log(role);
        
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
      },
      (error)=>{
        console.log(error);
        this.showError = true;
      }
    );}
    
  }
 
  
  
  

}
