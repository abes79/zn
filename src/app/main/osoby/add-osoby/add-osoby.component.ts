import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-osoby',
  templateUrl: './add-osoby.component.html',
  styleUrls: ['./add-osoby.component.css']
})
export class AddOsobyComponent implements OnInit {
    
    constructor(private _http: HttpClient) { }

    ngOnInit() {  }

    _confirm: string;
    sqlQueryAdd: string;
    dataArray: any = [{
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
    
              //INSERT INTO table_name (column1, column2, column3, ...)
              //VALUES(value1, value2, value3, ...);

    saveAdd() {
        let goSave: boolean = true;
        // Składanie zapytanie UPDATE
        let arr: any = [];
        this.sqlQueryAdd = "INSERT INTO osoby ( imie, drugie_imie, nazwisko, pesel, email, telefon, ulica, nr_domu, gmina, kod_p, miasto, panstwo ) VALUES ( ";
        
        for (var prop in this.dataArray[0]) {
            if (Boolean(this.dataArray[0][prop]) && prop !== 'id') {
                this.sqlQueryAdd = this.sqlQueryAdd + "'" + this.dataArray[0][prop] + "', ";
            } else if (!Boolean(this.dataArray[0][prop])) {
                this.sqlQueryAdd = this.sqlQueryAdd + "null, ";
                if (prop === "imie" || prop === "nazwisko" || prop === "pesel") {
                    goSave = false;
                }
            }
        }
        this.sqlQueryAdd = this.sqlQueryAdd.slice(0, -2) + " ) ";
        console.log(this.sqlQueryAdd);
        //------------SQL-------------
        if (!this.correctPesel(this.dataArray[0]['pesel'])) {
            alert("Niepoprawny Nr PESEL");
        } else if (!goSave) {
            alert(" Brakuje wymagających danych \n Imię: " + this.dataArray[0]['imie'] + " \n Nazwisko: " + this.dataArray[0]['nazwisko'] + " \n Pesel: " + this.dataArray[0]['pesel']);
        } else if (confirm("Czy na pewno dodać nową osobę?!") == true) {
            this._confirm = "Nowa osoba została dodana.";
            let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + this.sqlQueryAdd + '" }';
            let jsonPost: JSON = JSON.parse(toPost);
            let _url: string = 'http://abes79.linuxpl.info/zn/db_sql.php';
            this._http.post(_url, jsonPost).subscribe((data) => {
                //this.dataArray = data;
            })
        } else {
            this._confirm = "Nie zapisano nowej osoby.";
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
