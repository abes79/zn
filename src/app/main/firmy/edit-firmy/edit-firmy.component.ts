import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../app.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-firmy',
  templateUrl: './edit-firmy.component.html',
  styleUrls: ['./edit-firmy.component.css']
})
export class EditFirmyComponent implements OnInit {

    constructor(private route: ActivatedRoute, private _http: HttpClient, private service: AppService) { }

    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                this.idEdit = params['id'];
            });
        this.selectSqlObiekty();
    }

    _confirm: string;
    idEdit: number;
    sqlQuerySelect: string;
    sqlQueryUpdate: string;
    dataArray: any = [{
        id: "",
        osoby_id: "",
        nazwa: "",
        nip: "",
        regon: "",
        telefon: "",
        email: "",
        ulica: "",
        nr_domu: "",
        gmina: "",
        kod_p: "",
        miasto: "",
        panstwo: ""
    }];

    // SELECT firmy.*, osoby.imie, osoby.nazwisko FROM firmy INNER JOIN osoby ON firmy.osoby_id = osoby.id WHERE firmy.id =
    selectSqlObiekty() {
        this.sqlQuerySelect = "SELECT firmy.*, osoby.imie, osoby.nazwisko FROM firmy INNER JOIN osoby ON firmy.osoby_id = osoby.id WHERE firmy.id = " + this.idEdit;
        let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + this.sqlQuerySelect + '" }';
        let jsonPost: JSON = JSON.parse(toPost);
        let _url: string = this.service.getConnectUrl();
        this._http.post(_url, jsonPost
        ).subscribe((data) => {
            this.dataArray = data;
        })
    }

    saveEdit() {
        // Składanie zapytanie UPDATE
        let arr: any = [];
        this.sqlQueryUpdate = "UPDATE firmy SET ";
        for (var prop in this.dataArray[0]) {
            if (Boolean(this.dataArray[0][prop]) && prop !== 'id') {
                this.sqlQueryUpdate = this.sqlQueryUpdate + prop + " ='" + this.dataArray[0][prop] + "', ";
            } else if (!Boolean(this.dataArray[0][prop])) {
                this.sqlQueryUpdate = this.sqlQueryUpdate + prop + " = null, ";
            }
        }
        this.sqlQueryUpdate = this.sqlQueryUpdate.slice(0, -2) + " WHERE id = " + this.dataArray[0]['id'];
        //------------SQL-------------
        if (confirm("Czy na pewno zapisać zmiany?!") == true) {
            this._confirm = "Zmiany zostały zapisane.";
            let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + this.sqlQueryUpdate + '" }';
            let jsonPost: JSON = JSON.parse(toPost);
            let _url: string = this.service.getConnectUrl();
            this._http.post(_url, jsonPost).subscribe((data) => {
                //this.dataArray = data;
            })
        } else {
            this._confirm = "Nie zapisano zmian.";
        }
    }

}
