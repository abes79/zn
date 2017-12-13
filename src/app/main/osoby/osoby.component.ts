import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-osoby',
  templateUrl: './osoby.component.html',
  styleUrls: ['./osoby.component.css']
})
export class OsobyComponent implements OnInit {
  constructor( private router: Router, private _http: HttpClient, private service: AppService) { }
  ngOnInit() {
    this.service.setNrPage(0);
    this.selectSqlOsoby();
  }
 
  title: string = 'Zn';
  dataArray: any = [];
  countPages: number;
  countRows: number = 5;
  disabledNext: boolean = false;
  disabledPrevious: boolean = true;

  sqlQuerySelect: string = "SELECT * FROM osoby LIMIT " + (this.service.getNrPage() * this.countRows) + ", " + this.countRows;
  sqlQueryInsert: string = "SELECT * FROM testowa LIMIT 0, 5";

  selectSqlOsoby() {
    this.sqlQuerySelect = "SELECT *, (SELECT COUNT(*) FROM osoby) as count FROM osoby LIMIT "
      + (this.service.getNrPage() * this.countRows) + ", " + this.countRows;
    let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + this.sqlQuerySelect + '" }';
    let jsonPost: JSON = JSON.parse(toPost);
    let _url: string = 'http://abes79.linuxpl.info/zn/db_sql.php';
    this._http.post(_url, jsonPost
    ).subscribe((data) => {
      this.dataArray = data;
      this.countPages = Math.ceil(this.dataArray[0]["count"] / this.countRows);
      //console.log(this.dataArray, this.dataArray[0]["count"]);
    })
  }

  insertSql() {
    let toPost: string = '{ "sqlRequest" : "11", "sqlQuery" : "'+ this.sqlQueryInsert +'" }';
    let jsonPost: JSON = JSON.parse(toPost);
    let _url: string = 'http://abes79.linuxpl.info/zn/db_sql.php';
    this._http.post(_url, jsonPost
    ).subscribe((data) => {
      this.dataArray = data;
      console.log(this.dataArray)
    })
  }

  nextPage() {
    this.service.setNrPage(this.service.getNrPage() + 1);
    this.selectSqlOsoby();
    if (this.service.getNrPage() == (this.countPages-1)){
      this.disabledNext = true;
    }
    this.disabledPrevious = false;
  }

  previousPage() {
    this.service.setNrPage(this.service.getNrPage() - 1);
    this.selectSqlOsoby();

    if (this.service.getNrPage() == 0) {
      this.disabledPrevious = true;
    }
    this.disabledNext = false;
  }

  editOsoby(idOsoby) {
    this.router.navigate(['osoby/edit'], { queryParams: { id: idOsoby } });
  }
}
