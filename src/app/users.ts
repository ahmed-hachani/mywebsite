export class User {
  
  email: string;
  password: string;
  username: string;
  firstName?: string;
  lastName?: string;
  available?: boolean;
  
  adress?: string;
  cin?: string;
  roles?: any;
  
    constructor(email: string, password: string, username: string, role:string[]) {
      this.email = email;
      this.password = password;
      this.username = username;
      this.roles = role;
    }
  }
  