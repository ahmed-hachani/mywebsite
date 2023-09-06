import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { HttpClient } from '@angular/common/http';
import Chart from 'chart.js/auto';
  @Component({
  selector: 'app-body-admin',
  templateUrl: './body-admin.component.html',
  styleUrls: ['./body-admin.component.css']
})

export class BodyAdminComponent implements OnInit {
  UserDetails = null as any;
  chart: any;
  UserToUpdate = {
    id:"",
    username:"",
    email:"",
    role:"",
    password:"",
    gender:""
  }
  constructor(private userService: UserService, private http: HttpClient){
    this.getUsersDetails();
  }
  ngOnInit() {
    this.http.get('http://localhost:8076/Users/profilingByGender').subscribe((data: any) => {
      // Process the data and use it to populate your chart
      this.generateChart(data);
    });
  }
  register(registerForm: NgForm) {
    this.userService.registerUser(registerForm.value).subscribe(
      (resp:any) => {
        console.log(resp);
        registerForm.reset();
        this.getUsersDetails();
      },
      (err:any) => {
        console.log(err);
      }
    );
  }
  getUsersDetails() {
    this.userService.getusers().subscribe(
      (resp:any) => {
        console.log(resp);
        this.UserDetails = resp;
      },
      (err:any) => {
        console.log(err);
      }
    );
  }
  deleteUser(user:any) {
    this.userService.deleteUser1(user.id).subscribe(
      (resp:any) => {
        console.log(resp);
        console.log(this.UserToUpdate.id);
        this.getUsersDetails();
      },
      (err:any) => {
        console.log(err);
      }
    );
  }

  edit(user1: any){
    this.UserToUpdate = user1;
  }

  updateUser(){
    this.userService.updateUsers(this.UserToUpdate).subscribe(
      (resp:any) => {
        console.log(resp);
      },
      (err:any) => {
        console.log(err);
      }
    );
  }
  generateChart(data: { [key: string]: string }) {
    const malePercentageStr = data['Male'];
    const femalePercentageStr = data['Female'];
    const malePercentage = parseFloat(malePercentageStr.replace('%', ''));
    const femalePercentage = parseFloat(femalePercentageStr.replace('%', ''));
    
  
    const chart = new Chart('genderChart', {
      type: 'pie',
      data: {
        labels: ['Male', 'Female'],
        datasets: [
          {
            data: [malePercentage, femalePercentage],
            backgroundColor: ['blue', 'pink'], // Colors for male and female sections
          },
        ],
      },
    });
  }

}
