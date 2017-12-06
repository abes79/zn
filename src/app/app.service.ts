import { Component, Injectable } from '@angular/core';


@Injectable()
export class AppService {

  private isUserLogin: boolean;
  private userName: string;
  private nrPage: number;

  constructor() {
    this.isUserLogin = false;
    this.userName = '';
    this.nrPage = 0;
  }

  setIsUserLogin(status: boolean) {
    this.isUserLogin = status;
  }

  getIsUserLogin() {
    return this.isUserLogin;
  }

  setUserName(name: string) {
    this.userName = name;
  }

  getUserName() {
    return this.userName;
  }

  setNrPage(nr: number) {
    this.nrPage = nr;
  }

  getNrPage() {
    return this.nrPage;
  }
}
