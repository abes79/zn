import { Component, Injectable } from '@angular/core';


@Injectable()
export class AppService {

  private isUserLogin: boolean;
  private userName: string;

  constructor() {
    this.isUserLogin = false;
    this.userName = '';
  }

  setIsUserLogin(status: boolean) {
    this.isUserLogin = status;
  }

  getIsUserLogin() {
    return this.isUserLogin;
  }

  setUserName(name) {
    this.userName = name;
  }

  getUserName() {
    return this.userName;
  }
}
