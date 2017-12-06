import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  constructor(private _http: HttpClient, private service: AppService) { }
  ngOnInit() {
    this.countRowsSql();
    this.selectSql();
    this.service.setNrPage(0);
  }

  title: string = 'Zn';
  dataArray: any = [];
  countPages: number;
  countRows: number = 6;
  disabledNext: boolean = false;
  disabledPrevious: boolean = true;

  sqlQuerySelect: string = "SELECT * FROM osoby LIMIT " + (this.service.getNrPage() * this.countRows) + ", " + this.countRows;
  sqlQueryInsert: string = "SELECT * FROM testowa LIMIT 0, 5";

  selectSql() {
    this.sqlQuerySelect = "SELECT * FROM osoby LIMIT " + (this.service.getNrPage() * this.countRows) + ", " + this.countRows;
    let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + this.sqlQuerySelect + '" }';
    let jsonPost: JSON = JSON.parse(toPost);
    let _url: string = 'http://abes79.linuxpl.info/zn/db_sql.php';
    this._http.post(_url, jsonPost
    ).subscribe((data) => {
      this.dataArray = data;
      //console.log(this.dataArray);
    })
  }

  insertSql() {
    let toPost: string = '{ "sqlRequest" : "11", "sqlQuery" : "' + this.sqlQueryInsert + '" }';
    let jsonPost: JSON = JSON.parse(toPost);
    let _url: string = 'http://abes79.linuxpl.info/zn/db_sql.php';
    this._http.post(_url, jsonPost
    ).subscribe((data) => {
      this.dataArray = data;
      console.log(this.dataArray)
    })
  }

  countRowsSql() {
    let toPost: string = '{ "sqlRequest" : "11", "sqlQuery" : "SELECT COUNT(*) FROM osoby" }';
    let jsonPost: JSON = JSON.parse(toPost);
    let _url: string = 'http://abes79.linuxpl.info/zn/db_sql.php';
    this._http.post(_url, jsonPost
    ).subscribe((data) => {
      this.dataArray = data;
      this.countPages = Math.ceil(this.dataArray[0]["COUNT(*)"] / this.countRows);
    })
  }

  nextPage() {
    this.service.setNrPage(this.service.getNrPage() + 1);
    this.selectSql();
    if (this.service.getNrPage() == (this.countPages - 1)) {
      this.disabledNext = true;
    }
    this.disabledPrevious = false;
  }

  previousPage() {
    this.service.setNrPage(this.service.getNrPage() - 1);
    this.selectSql();

    if (this.service.getNrPage() == 0) {
      this.disabledPrevious = true;
    }
    this.disabledNext = false;
  }
}
