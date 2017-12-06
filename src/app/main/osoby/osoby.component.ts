import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-osoby',
  templateUrl: './osoby.component.html',
  styleUrls: ['./osoby.component.css']
})
export class OsobyComponent implements OnInit {
  constructor(private _http: HttpClient, private service: AppService) { }
  ngOnInit() {
  }

  title: string = 'Zn';
  //sqlQuerySelect: string = "SELECT * FROM testowa LIMIT 0, 5";
  sqlQuerySelect: string = "SELECT * FROM testowa";
  sqlQueryInsert: string = "SELECT * FROM testowa LIMIT 0, 5";
  dataAray: any = [];

  selectSql() {
    let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + this.sqlQuerySelect + '" }';
    let jsonPost: JSON = JSON.parse(toPost);
    let _url: string = 'http://abes79.linuxpl.info/zn/db_sql.php';
    this._http.post(_url, jsonPost
    ).subscribe((data) => {
      this.dataAray = data;
      //console.log(data)
    })
  }

  insertSql() {
    let toPost: string = '{ "sqlRequest" : "11", "sqlQuery" : "' + this.sqlQueryInsert + '" }';
    let jsonPost: JSON = JSON.parse(toPost);
    let _url: string = 'http://abes79.linuxpl.info/zn/db_sql.php';
    this._http.post(_url, jsonPost
    ).subscribe((data) => {
      this.dataAray = data;
      //console.log(data)
    })
  }
}

