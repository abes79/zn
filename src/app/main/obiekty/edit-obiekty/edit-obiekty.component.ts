import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../app.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-obiekty',
    templateUrl: './edit-obiekty.component.html',
    styleUrls: ['./edit-obiekty.component.css']
})

export class EditObiektyComponent implements OnInit {

    constructor(private route: ActivatedRoute, private _http: HttpClient, private service: AppService) { }

    ngOnInit() {
        this.opisLength = 0;
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
        typ: "",
        rok_budowy: "",
        kod: "",
        garaz: "",
        piwnica: "",
        text: "",
        zalacznik: "",
        nazwisko: "",
        pesel: "",
        email: "",
        telefon: "",
        ulica: "",
        nr_domu: "",
        gmina: "",
        kod_p: "",
        miasto: "",
        panstwo: ""
    }];
    opisLength: number = this.dataArray[0].text.length;
    selectOption1 = [
        { value: 'dom', viewValue: 'Dom' },
        { value: 'mie', viewValue: 'Mieszkanie' },
        { value: 'lok', viewValue: 'Lokal' }
    ];

    selectSqlObiekty() {
        this.sqlQuerySelect = "SELECT * FROM obiekty WHERE id = " + this.idEdit;
        let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + this.sqlQuerySelect + '" }';
        let jsonPost: JSON = JSON.parse(toPost);
        let _url: string = this.service.getConnectUrl();
        this._http.post(_url, jsonPost
        ).subscribe((data) => {
            this.dataArray = data;
            if (this.dataArray[0].text) {
                this.opisLength = this.dataArray[0].text.length;
            } else {
                this.dataArray[0].text = "";
            }
        })
    }

    saveEdit() {
        // Składanie zapytanie UPDATE
        let arr: any = [];
        this.sqlQueryUpdate = "UPDATE obiekty SET ";
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
