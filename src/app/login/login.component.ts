import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AppService } from './../app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  userLogin: string = 'admin';
  userPassword: string = 'admin';
  dataArray: any = [];
  isLogin: boolean = false;

  constructor(private router: Router, private service: AppService, private _http: HttpClient) { }

  loginUser() {
    this.loginSql();
    this.service.setUserName(this.userLogin);
    if (false) {
      console.log("isLogin in loginUser method: " + this.isLogin);
      this.service.setIsUserLogin(true);
      this.router.navigate(['/']);
    } else {
      console.log("isLogin in loginUser method: " + this.isLogin);
      this.service.setIsUserLogin(false);
      this.router.navigate(['/login']);
    }
  }

  loginSql() {
    let toPost: string = '{ "sqlRequest" : "22", "sqlQuery" : "SELECT * FROM login WHERE login=\'' + this.userLogin +'\'", "sqlPassword" : "'+ this.userPassword +'" }';
    let jsonPost: JSON = JSON.parse(toPost);
    let _url: string = 'http://abes79.linuxpl.info/zn/db_sql.php';
    this._http.post(_url, jsonPost
    ).subscribe((data) => {
      this.dataArray = data;
      console.log("In loginSQL method " + this.dataArray[0].isLogin);
      this.isLogin = this.dataArray[0].isLogin;
    })
  }
}
