import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-add-firmy',
    templateUrl: './add-firmy.component.html',
    styleUrls: ['./add-firmy.component.css']
})
export class AddFirmyComponent implements OnInit {

    constructor(private _http: HttpClient, private service: AppService) { }

    ngOnInit() { }

    _confirm: string;
    sqlQueryAdd: string;
    dataArray: any = [{
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

    //INSERT INTO table_name (column1, column2, column3, ...)
    //VALUES(value1, value2, value3, ...);

    saveAdd() {
        // Składanie zapytanie INSERT
        let arr: any = [];
        this.sqlQueryAdd = "INSERT INTO firmy ( osoby_id, nazwa, nip, regon, telefon, email, ulica, nr_domu, gmina, kod_p, miasto, panstwo ) VALUES ( ";

        for (var prop in this.dataArray[0]) {
            if (Boolean(this.dataArray[0][prop])) {
                this.sqlQueryAdd = this.sqlQueryAdd + "'" + this.dataArray[0][prop] + "', ";
            } else if (!Boolean(this.dataArray[0][prop])) {
                this.sqlQueryAdd = this.sqlQueryAdd + "null, ";
            }
        }
        this.sqlQueryAdd = this.sqlQueryAdd.slice(0, -2) + " ) ";
        console.log(this.sqlQueryAdd);
        //------------SQL-------------
        if (confirm("Czy na pewno dodać nową nieruchomość?!") == true) {
            this._confirm = "Nowa nieruchomość została dodana.";
            let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + this.sqlQueryAdd + '" }';
            let jsonPost: JSON = JSON.parse(toPost);
            let _url: string = this.service.getConnectUrl();
            this._http.post(_url, jsonPost).subscribe((data) => {
                //this.dataArray = data;
            })
        } else {
            this._confirm = "Nie zapisano nowej nieruchomości.";
        }
    }
}

