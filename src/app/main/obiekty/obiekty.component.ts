import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-obiekty',
  templateUrl: './obiekty.component.html',
  styleUrls: ['./obiekty.component.css']
})
export class ObiektyComponent implements OnInit {
    
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
        //console.log(this.router.url);
        if (this.router.url === "/nieruchomosci") {
            this.sqlQuery = "SELECT *, (SELECT COUNT(*) FROM obiekty) as count FROM obiekty LIMIT "
                + (this.service.getNrPage() * this.countRows) + ", " + this.countRows;
        } else {
            this.sqlQuery = "SELECT *, (SELECT COUNT(*) FROM obiekty  WHERE " + this.service.getSearchType() +
                " LIKE '%" + this.service.getKayWord() + "%' ) as count FROM obiekty WHERE "
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

    editObiekt(idObiektu) {
        this.router.navigate(['obiekty/edit'], { queryParams: { id: idObiektu } });
    }
}
