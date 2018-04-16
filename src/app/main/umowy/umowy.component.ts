import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-umowy',
  templateUrl: './umowy.component.html',
  styleUrls: ['./umowy.component.css']
})
export class UmowyComponent implements OnInit {

    constructor(private router: Router, private _http: HttpClient, private service: AppService) { }
    ngOnInit() {
        this.service.setNrPage(0);
        this.selectSqlObiekty();
    }

    dataArray: any = [];
    countPages: number;
    countRows: number = 5;
    disabledNext: boolean = false;
    disabledPrevious: boolean = true;
    sqlQuery: string;

    selectSqlObiekty() {
        // SELECT umowy.*, osoby.imie, osoby.nazwisko, nieruchomosci.ulica, (SELECT COUNT(*) FROM umowy) as count FROM umowy JOIN osoby ON umowy.osoby_id = osoby.id JOIN nieruchomosci ON umowy.nieruchomosci_id = nieruchomosci.id  WHERE umowy.id = 1;
        if (this.router.url === "/umowy") {
            this.sqlQuery = "SELECT umowy.*, osoby.imie, osoby.nazwisko, nieruchomosci.ulica, nieruchomosci.nr_domu, (SELECT COUNT(*) FROM umowy) as count FROM umowy JOIN osoby ON umowy.osoby_id = osoby.id JOIN nieruchomosci ON umowy.nieruchomosci_id = nieruchomosci.id LIMIT "
                + (this.service.getNrPage() * this.countRows) + ", " + this.countRows;
        } else {
            this.sqlQuery = "SELECT umowy.*, osoby.imie, osoby.nazwisko, nieruchomosci.ulica, nieruchomosci.nr_domu, (SELECT COUNT(*) FROM umowy WHERE " + this.service.getSearchType() +
                " LIKE '%" + this.service.getKayWord() + "%' ) as count FROM umowy INNER JOIN osoby ON umowy.osoby_id = osoby.id JOIN nieruchomosci ON umowy.nieruchomosci_id = nieruchomosci.id WHERE "
                + this.service.getSearchType() + " LIKE '%" + this.service.getKayWord() + "%' LIMIT "
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
        this.selectSqlObiekty();
        if (this.service.getNrPage() == (this.countPages - 1)) {
            this.disabledNext = true;
        }
        this.disabledPrevious = false;
    }

    previousPage() {
        this.service.setNrPage(this.service.getNrPage() - 1);
        this.selectSqlObiekty();

        if (this.service.getNrPage() == 0) {
            this.disabledPrevious = true;
        }
        this.disabledNext = false;
    }

    editUmowy(idUmowy, idOsoby) {
        this.router.navigate(['umowy/edit'], { queryParams: { firma: idUmowy, osoba: idOsoby } });
    }
}
