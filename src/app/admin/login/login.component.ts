import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  login: string;
  password: string;

  constructor(
    public adminService: AdminService,
    public router: Router) { 
      this.redirect();
    }

  singIn() {
    // this.adminService.logout();
    console.log(this.login, this.password)
    const token = this.adminService.login(this.login, this.password);
    if (token) {
      this.redirect();
    }

  }

  redirect() {
    if (localStorage.getItem('silverFlameToken') || localStorage.getItem('silverFlameToken') !== null) {
      console.log('welcome');
      this.router.navigate(['admin/dashboard']);
    }

  }

}
