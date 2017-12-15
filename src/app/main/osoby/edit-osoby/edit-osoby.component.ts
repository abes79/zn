import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-edit-osoby',
    templateUrl: './edit-osoby.component.html',
    styleUrls: ['./edit-osoby.component.css']
})
export class EditOsobyComponent implements OnInit {

    constructor(private route: ActivatedRoute, private _http: HttpClient) { }

    ngOnInit() {
        this.route
            .queryParams
            .subscribe(params => {
                this.idEdit = params['id'];
            });
        this.selectSqlOsoby();
    }

    _confirm: string;
    idEdit: number;
    sqlQuerySelect: string;
    sqlQueryUpdate: string;
    dataArray: any = [{
        id: "",
        imie: "",
        drugie_imie: "",
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

    selectSqlOsoby() {
        this.sqlQuerySelect = "SELECT * FROM osoby WHERE id = " + this.idEdit;
        let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + this.sqlQuerySelect + '" }';
        let jsonPost: JSON = JSON.parse(toPost);
        let _url: string = 'http://abes79.linuxpl.info/zn/db_sql.php';
        this._http.post(_url, jsonPost
        ).subscribe((data) => {
            this.dataArray = data;
            //console.log(this.dataArray[0]);
        })
    }

    saveEdit() {
        let goSave: boolean = true;
        // Składanie zapytanie UPDATE
        let arr: any = [];
        this.sqlQueryUpdate = "UPDATE osoby SET ";
        for (var prop in this.dataArray[0]) {
            if (Boolean(this.dataArray[0][prop]) && prop !== 'id') {
                this.sqlQueryUpdate = this.sqlQueryUpdate + prop + " ='" + this.dataArray[0][prop] + "', ";
            } else if (!Boolean(this.dataArray[0][prop])) {
                this.sqlQueryUpdate = this.sqlQueryUpdate + prop + " = null, ";
                if (prop === "imie" || prop === "nazwisko" || prop === "pesel") {
                    goSave = false;
                }
            }
        }
        this.sqlQueryUpdate = this.sqlQueryUpdate.slice(0, -2) + " WHERE id = " + this.dataArray[0]['id'];
        //------------SQL-------------
        if (!this.correctPesel(this.dataArray[0]['pesel'])) {
            alert("Niepoprawny Nr PESEL");
        }else if (!goSave){
            alert(" Brakuje wymagających danych \n Imię: " + this.dataArray[0]['imie'] + " \n Nazwisko: " + this.dataArray[0]['nazwisko']+" \n Pesel: "+this.dataArray[0]['pesel'] );
        } else if (confirm("Czy na pewno zapisać zmiany?!") == true) {
            this._confirm = "Zmiany zostały zapisane.";
            let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + this.sqlQueryUpdate + '" }';
            let jsonPost: JSON = JSON.parse(toPost);
            let _url: string = 'http://abes79.linuxpl.info/zn/db_sql.php';
            this._http.post(_url, jsonPost).subscribe((data) => {
                //this.dataArray = data;
            })
        } else {
            this._confirm = "Nie zapisano zmian.";
        }
    }

    correctPesel(pesel) {
        // Sprawdza poprawność Nr PESEL
        if (pesel.length === 11) {
              let countPeselCorrect = 9 * Number(pesel.charAt(0));
              countPeselCorrect = Number(countPeselCorrect) + (7 * Number(pesel.charAt(1)));
              countPeselCorrect = Number(countPeselCorrect) + (3 * Number(pesel.charAt(2)));
              countPeselCorrect = Number(countPeselCorrect) + Number(pesel.charAt(3)));
              countPeselCorrect = Number(countPeselCorrect) + (9 * Number(pesel.charAt(4)));
              countPeselCorrect = Number(countPeselCorrect) + (7 * Number(pesel.charAt(5)));
              countPeselCorrect = Number(countPeselCorrect) + (3 * Number(pesel.charAt(6)));
              countPeselCorrect = Number(countPeselCorrect) + Number(pesel.charAt(7)));
              countPeselCorrect = Number(countPeselCorrect) + (9 * Number(pesel.charAt(8)));
              countPeselCorrect = Number(countPeselCorrect) + (7 * Number(pesel.charAt(9)));
              countPeselCorrect = countPeselCorrect % 10;
              if (countPeselCorrect === Number(pesel.charAt(10))) {
                  return true;
              } else {
                  return false;
              }
          } else {
              return false;
          }
    }
}
