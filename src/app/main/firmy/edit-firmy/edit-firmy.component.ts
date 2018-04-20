import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../app.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-firmy',
  templateUrl: './edit-firmy.component.html',
  styleUrls: ['./edit-firmy.component.css']
})
export class EditFirmyComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute, private _http: HttpClient, private service: AppService) { }

    ngOnInit() {
        this.selectSqlOsoby();
    }

    _confirm: string;
    firmaEdit: number;
    selectOsoba: number;
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

    // SELECT firmy.*, osoby.imie, osoby.nazwisko FROM firmy , osoby WHERE firmy.id = 2 AND osoby.id = 3
    selectSqlOsoby() {
        this.route
            .queryParams
            .subscribe(params => {
                this.firmaEdit = params['firma'];
                this.selectOsoba = params['osoba'];
            });
        let sqlQuerySelect = "SELECT firmy.*, osoby.imie, osoby.nazwisko FROM firmy , osoby WHERE firmy.id = " + this.firmaEdit + " AND osoby.id = " + this.selectOsoba;
        let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + sqlQuerySelect + '" }';
        let jsonPost: JSON = JSON.parse(toPost);
        let _url: string = this.service.getConnectUrl();
        this._http.post(_url, jsonPost
        ).subscribe((data) => {
            this.dataArray = data;
        })
    }

    saveEdit() {
        // Składanie zapytanie UPDATE
        this.route
            .queryParams
            .subscribe(params => {
                this.dataArray[0].osoby_id = params['osoba'];                
            });
        let arr: any = [];
        let sqlQueryUpdate = "UPDATE firmy SET ";
        for (var prop in this.dataArray[0]) {
            if (Boolean(this.dataArray[0][prop]) && prop !== 'id' && prop !== 'imie' && prop !== 'nazwisko') {
                sqlQueryUpdate = sqlQueryUpdate + prop + " ='" + this.dataArray[0][prop] + "', ";
            } else if (!Boolean(this.dataArray[0][prop]) && prop !== 'imie' && prop !== 'nazwisko') {
                sqlQueryUpdate = sqlQueryUpdate + prop + " = null, ";
            }
        }
        sqlQueryUpdate = sqlQueryUpdate.slice(0, -2) + " WHERE id = " + this.dataArray[0]['id'];
        //------------SQL-------------
        if (confirm("Czy na pewno zapisać zmiany?!") == true) {
            console.log(sqlQueryUpdate);
            this._confirm = "Zmiany zostały zapisane.";
            let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + sqlQueryUpdate + '" }';
            let jsonPost: JSON = JSON.parse(toPost);
            let _url: string = this.service.getConnectUrl();
            this._http.post(_url, jsonPost).subscribe((data) => {
                //this.dataArray = data;
            })
        } else {
            this._confirm = "Nie zapisano zmian.";
        }
    }

    selectAnotherPerson() {
        this.router.navigate(['firmy/edit/search'], { queryParams: { firma: this.firmaEdit, osoba: this.selectOsoba } });
    }
}
