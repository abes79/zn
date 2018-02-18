import { Component, Injectable } from '@angular/core';


@Injectable()
export class AppService {

  private connectUrl: string; 
  private isUserLogin: boolean;
  private userName: string;
  private searchType: string;
  private kayWord: string;
  private nrPage: number;

  constructor() {
    this.connectUrl = 'http://abes79.linuxpl.info/zn/db_sql.php';
    //this.connectUrl = 'http://192.168.0.161/db_sql.php';
    this.isUserLogin = false;
    this.userName = '';
    this.searchType = '';
    this.kayWord = '';
    this.nrPage = 0;
  }

  getConnectUrl() {
    return this.connectUrl;
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

  setSearchType(searchType: string) {
    this.searchType = searchType;
  }

  getSearchType() {
    return this.searchType;
  }

  setKayWord(kayWord: string) {
    this.kayWord = kayWord;
  }

  getKayWord() {
    return this.kayWord;
  }

  setNrPage(nr: number) {
    this.nrPage = nr;
  }

  getNrPage() {
    return this.nrPage;
  }
}
