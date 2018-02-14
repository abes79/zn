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
 
  dataArray: any = [];
  countPages: number;
  countRows: number = 5;
  disabledNext: boolean = false;
  disabledPrevious: boolean = true;
  sqlQuery: string;
  
  selectSqlOsoby() {
    //console.log(this.router.url);
    if (this.router.url === "/osoby") {
      this.sqlQuery= "SELECT *, (SELECT COUNT(*) FROM osoby) as count FROM osoby LIMIT "
        + (this.service.getNrPage() * this.countRows) + ", " + this.countRows;
    } else {
      this.sqlQuery = "SELECT *, (SELECT COUNT(*) FROM osoby  WHERE " + this.service.getSearchType() +
        " LIKE '%" + this.service.getKayWord() + "%' ) as count FROM osoby WHERE "
        + this.service.getSearchType() + " LIKE '%" + this.service.getKayWord() + "%' LIMIT "
        + (this.service.getNrPage() * this.countRows) + ", " + this.countRows;
    }
    let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + this.sqlQuery + '" }';
    let jsonPost: JSON = JSON.parse(toPost);
    let _url: string = this.service.getConnectUrl();
    this._http.post(_url, jsonPost
    ).subscribe((data) => {
      this.dataArray = data;
      this.countPages = Math.ceil(this.dataArray[0]["count"] / this.countRows);
      //console.log(this.dataArray, this.dataArray[0]["count"]);
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
