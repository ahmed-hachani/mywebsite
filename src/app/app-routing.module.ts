import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AllTemplateAdminComponent } from './backOffice/all-template-admin/all-template-admin.component';
import { BodyAdminComponent } from './backOffice/body-admin/body-admin.component';
import { BodyUserComponent } from './frontOffice/body-user/body-user.component';
import { AllTemplateUserComponent } from './frontOffice/all-template-user/all-template-user.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './_auth/auth.guard';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
  
  { path: 'admin', component: AdminComponent, canActivate:[AuthGuard], data:{roles:['ADMIN']} },
  { path: 'user', component: UserComponent ,  canActivate:[AuthGuard], data:{roles:['ROLE_USER','STUDENT']} },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegistrationComponent ,data:{title : 'register'}},

  { path: 'login', component: LoginComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  {path:"admins", component: AllTemplateAdminComponent, children:[
    {path:"home", component: BodyAdminComponent,canActivate:[AuthGuard], data:{roles:['ADMIN']}},
    
  ]
},
{
  path:"users", component:AllTemplateUserComponent, children:[
    {path:"body",component: BodyUserComponent,canActivate:[AuthGuard], data:{roles:['ROLE_USER','STUDENT']}},
    
  ]
},
{path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
