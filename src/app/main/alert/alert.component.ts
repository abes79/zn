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
    this.service.setNrPage(0);
    this.selectSqlAlert();
  }

  title: string = 'Zn';
  dataArray: any = [];
  countPages: number;
  countRows: number = 6;
  disabledNext: boolean = false;
  disabledPrevious: boolean = true;

  sqlQuerySelect: string = "SELECT * FROM alerty LIMIT " + (this.service.getNrPage() * this.countRows) + ", " + this.countRows;
  sqlQueryInsert: string = "SELECT * FROM alerty LIMIT 0, 5";

  selectSqlAlert() {
    this.sqlQuerySelect = "SELECT * , (SELECT COUNT(*) FROM alerty) as count FROM alerty LIMIT "
      + (this.service.getNrPage() * this.countRows) + ", " + this.countRows;
    let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + this.sqlQuerySelect + '" }';
    let jsonPost: JSON = JSON.parse(toPost);
    let _url: string = this.service.getConnectUrl();
    this._http.post(_url, jsonPost
    ).subscribe((data) => {
      this.dataArray = data;
      this.countPages = Math.ceil(this.dataArray[0]["count"] / this.countRows);
    })
  }

  insertSql() {
    let toPost: string = '{ "sqlRequest" : "11", "sqlQuery" : "' + this.sqlQueryInsert + '" }';
    let jsonPost: JSON = JSON.parse(toPost);
    let _url: string = this.service.getConnectUrl();
    this._http.post(_url, jsonPost
    ).subscribe((data) => {
      this.dataArray = data;
      console.log(this.dataArray)
    })
  }
    
  nextPage() {
    this.service.setNrPage(this.service.getNrPage() + 1);
    this.selectSqlAlert();
    if (this.service.getNrPage() == (this.countPages - 1)) {
      this.disabledNext = true;
    }
    this.disabledPrevious = false;
  }

  previousPage() {
    this.service.setNrPage(this.service.getNrPage() - 1);
    this.selectSqlAlert();

    if (this.service.getNrPage() == 0) {
      this.disabledPrevious = true;
    }
    this.disabledNext = false;
  }

  akcja(link) {
      //this.router.navigate(['osoby/edit'], { queryParams: { id: idOsoby } });
      console.log('Akcja z linkiem: ' + link);
  }
}
