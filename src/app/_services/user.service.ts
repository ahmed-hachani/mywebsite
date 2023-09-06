import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { catchError } from 'rxjs';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  PATH_OF_API = 'http://localhost:8076';
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
   httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpclient: HttpClient, private userAuthService: UserAuthService) { }

  public login(loginData: any) {
    return this.httpclient.post(this.PATH_OF_API + '/api/auth/signin', loginData, { headers: this.requestHeader });
  }
  // registerUser(user:any) {
  //   return this.httpclient.post(this.PATH_OF_API + '/api/auth/signup', {
  //     username: user.username,
  //     email: user.email,
  //     password: user.password,
  //     roles:user.role
  //   }, this.httpOptions);
  // }
  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
      headers: new HttpHeaders({ 'Authorization': 'Bearer '+this.userAuthService.getToken() })
    });
  }

  public roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles: string[] = this.userAuthService.getRoles();
  
    if (userRoles != null && userRoles.length > 0) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i] === allowedRoles[j]) {
            isMatch = true;
          }
        }
      }
    }
  
    return isMatch;
  }
  public getusers() {
    return this.httpclient.get<any>(this.PATH_OF_API + '/Users/retrieve-all-users');
  }
  public deleteUsers2(id: any) {
    return this.httpclient.delete(this.PATH_OF_API + '/Users/deleteUser/id', id );
  }
  public deleteUser1(id: any) {
    return this.httpclient.delete(this.PATH_OF_API + '/Users/deleteUser1/' + id);
  }
   public updateUsers(User: any) {
     return this.httpclient.put(this.PATH_OF_API + '/Users/updateUser', User);
   }
    public registerUser(UserData: any) {
     return this.httpclient.post(this.PATH_OF_API + '/api/auth/signup', UserData, { headers: this.requestHeader }).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error);
      })
    );
  }

  deleteUsers(id: number) {
    const url = `http://localhost:8076/User/deleteUser/${id}`;
    return this.httpclient.delete(url);
  }
  
  
}

