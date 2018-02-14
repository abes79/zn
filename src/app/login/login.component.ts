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

  userLogin: string = 'abes';
  userPassword: string = 'abes';
  dataArray: any = [];
  stylesWarn = { };
  
  constructor(private router: Router, private service: AppService, private _http: HttpClient) { }

  loginUser() {
    let toPost: string = '{ "sqlRequest" : "22", "sqlQuery" : "SELECT * FROM login WHERE login=\'' + this.userLogin +'\'", "sqlPassword" : "'+ this.userPassword +'" }';
    let jsonPost: JSON = JSON.parse(toPost);
    let _url: string = this.service.getConnectUrl();
    return this._http.post(_url, jsonPost
    ).subscribe((data) => {
      this.dataArray = data;
      if (this.dataArray[0].isLogin == 'true') {
        this.service.setUserName(this.userLogin);
        this.service.setIsUserLogin(true);
        this.router.navigate(['alert']);
      } else {
        this.service.setIsUserLogin(false);
        this.router.navigate(['login']);
        this.stylesWarn = {
          'color': 'red',
          'visibility': 'visible'
        };
      }
    })
  }

  setMyStylesForWarn() {
    return this.stylesWarn;
  }
}
