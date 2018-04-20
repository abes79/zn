import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { HttpClient } from '@angular/common/http';
import { AddUmowyComponent } from './../umowy/add-umowy/add-umowy.component';
import { EditUmowyComponent } from './../umowy/edit-umowy/edit-umowy.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-obiekty',
  templateUrl: './obiekty.component.html',
  styleUrls: ['./obiekty.component.css']
})
export class ObiektyComponent implements OnInit {
    
    constructor(private router: Router, private route: ActivatedRoute, private _http: HttpClient, private service: AppService,
        private addUmowy: AddUmowyComponent, private editUmowy: EditUmowyComponent) { }
    ngOnInit() {
        this.service.setNrPage(0);
        this.selectSqlObiekty();
        if (this.router.url.indexOf("umowy") > 0)
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

    selectSqlObiekty() {
        //console.log(this.router.url);
        if (this.router.url === "/nieruchomosci") {
            this.sqlQuery = "SELECT *, (SELECT COUNT(*) FROM nieruchomosci) as count FROM nieruchomosci LIMIT "
                + (this.service.getNrPage() * this.countRows) + ", " + this.countRows;
        } else {
            this.sqlQuery = "SELECT *, (SELECT COUNT(*) FROM nieruchomosci  WHERE " + this.service.getSearchType() +
                " LIKE '%" + this.service.getKayWord() + "%' ) as count FROM nieruchomosci WHERE "
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

    editObiekt(idObiektu) {
        this.router.navigate(['nieruchomosci/edit'], { queryParams: { id: idObiektu } });
    }

    selectProperty(idNieruchomosci) {
        let umowaEdit;
        let selectKontrahent;
        this.route
            .queryParams
            .subscribe(params => {
                umowaEdit = params['umowa'];
                selectKontrahent = params['kontrahent'];
            });
        if (this.router.url.indexOf("umowy/add") > 0)
            this.router.navigate(['umowy/add'], { queryParams: { kontrahent: selectKontrahent, nieruchomosc: idNieruchomosci } }).then(() => {
                this.addUmowy.selectSqlObiekty();
            });
        else if (this.router.url.indexOf("umowy/edit") > 0)
            this.router.navigate(['umowy/edit'], { queryParams: { umowa: umowaEdit, kontrahent: selectKontrahent, nieruchomosc: idNieruchomosci } }).then(() => {
                this.editUmowy.selectSqlObiekty();
            });
    }
}
