import { Component } from '@angular/core';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login: string;
  password: string;

  constructor( public adminService: AdminService){}

  singIn(){
    // this.adminService.logout();
    console.log(this.login, this.password)
    this.adminService.login(this.login, this.password);
    if(localStorage.getItem('silverFlameToken') || localStorage.getItem('silverFlameToken')!==null){
      console.log('welcome')
  }
  }
  
}
