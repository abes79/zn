import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { EditFirmyComponent } from './../firmy/edit-firmy/edit-firmy.component';
import { AddFirmyComponent } from './../firmy/add-firmy/add-firmy.component';
import { AddUmowyComponent } from './../umowy/add-umowy/add-umowy.component';
import { EditUmowyComponent } from './../umowy/edit-umowy/edit-umowy.component';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-osoby',
  templateUrl: './osoby.component.html',
  styleUrls: ['./osoby.component.css']
})
export class OsobyComponent implements OnInit {
    constructor(private router: Router, private route: ActivatedRoute, private _http: HttpClient, private service: AppService,
        private editFirmy: EditFirmyComponent, private addFirmy: AddFirmyComponent, private addUmowy: AddUmowyComponent, private editUmowy: EditUmowyComponent) { }
  ngOnInit() {
    this.service.setNrPage(0);
    this.selectSqlOsoby();
    if (this.router.url.indexOf("firmy") > 0 || this.router.url.indexOf("umowy") > 0)
        this.select = true;
    else
        this.select = false;
  }
  select: boolean;
  dataArray: any = [];
  countPages: number;
  countRows: number = 5;
  disabledNext: boolean = false;
  disabledPrevious: boolean = true;
  sqlQuery: string;
  
  selectSqlOsoby() {
    //console.log(this.router.url);
      if (this.router.url.indexOf("search") > 0) {
          this.sqlQuery = "SELECT *, (SELECT COUNT(*) FROM osoby  WHERE " + this.service.getSearchType() +
              " LIKE '%" + this.service.getKayWord() + "%' ) as count FROM osoby WHERE "
              + this.service.getSearchType() + " LIKE '%" + this.service.getKayWord() + "%' LIMIT "
              + (this.service.getNrPage() * this.countRows) + ", " + this.countRows;
          //console.log(this.sqlQuery);
      } else {
      this.sqlQuery= "SELECT *, (SELECT COUNT(*) FROM osoby) as count FROM osoby LIMIT "
        + (this.service.getNrPage() * this.countRows) + ", " + this.countRows;
      }
    let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + this.sqlQuery + '" }';
    let jsonPost: JSON = JSON.parse(toPost);
    let _url: string = this.service.getConnectUrl();
    this._http.post(_url, jsonPost
    ).subscribe((data) => {
        this.dataArray = data;
        if (this.dataArray != null) {
            this.countPages = Math.ceil(this.dataArray[0]["count"] / this.countRows);
        } else {
            this.countPages = 0;
        }
        if (this.countPages <= 1) {
            this.disabledNext = true;
        }
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

  selectPerson(idOsoby) {
      let firmaEdit;
      let umowaEdit;
      let selectKontrahent;
      let selectNieruchomosc;
      this.route
          .queryParams
          .subscribe(params => {
              firmaEdit = params['firma'];
              umowaEdit = params['umowa'];
              selectKontrahent = params['kontrahent'];
              selectNieruchomosc = params['nieruchomosc'];
          });
      if (this.router.url.indexOf("firmy/add") > 0)
          this.router.navigate(['firmy/add'], { queryParams: { osoba: idOsoby } }).then(() => {
              this.addFirmy.selectSqlIdOsoby();
          });
      else if (this.router.url.indexOf("firmy/edit") > 0)
          this.router.navigate(['firmy/edit'], { queryParams: { firma: firmaEdit, osoba: idOsoby } }).then(() => {
              this.editFirmy.selectSqlOsoby();
          });
      else if (this.router.url.indexOf("umowy/add") > 0)
          this.router.navigate(['umowy/add'], { queryParams: { kontrahent: idOsoby, nieruchomosc: selectNieruchomosc } }).then(() => {
              this.addUmowy.selectSqlObiekty();
          });
      else if (this.router.url.indexOf("umowy/edit") > 0)
          this.router.navigate(['umowy/edit'], { queryParams: { umowa: umowaEdit, kontrahent: idOsoby, nieruchomosc: selectNieruchomosc } }).then(() => {
              this.editUmowy.selectSqlObiekty();
          });
  }
}