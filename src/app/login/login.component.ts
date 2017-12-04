import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from './../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  userLogin: string = 'admin';
  userPassword: string = 'admin';

  constructor(private router: Router, private service: AppService) { }

  loginUser() {
    this.service.setUserName(this.userLogin);
    if (this.userLogin === 'admin' && this.userPassword === 'admin') {
      this.service.setIsUserLogin(true);
      this.router.navigate(['/']);
    } else {
      this.service.setIsUserLogin(false);
      this.router.navigate(['/login']);
    }
  }
}

