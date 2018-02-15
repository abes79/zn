import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../app.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-obiekty',
  templateUrl: './add-obiekty.component.html',
  styleUrls: ['./add-obiekty.component.css']
})
export class AddObiektyComponent implements OnInit {

  constructor(private _http: HttpClient, private service: AppService) { }

  ngOnInit() { }

    _confirm: string;
    sqlQueryAdd: string;
    dataArray: any = [{
        typ: "",
        rok_budowy: "",
        kod: "",
        garaz: "",
        piwnica: "",
        text: "",
        zalacznik: "",
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

    //INSERT INTO table_name (column1, column2, column3, ...)
    //VALUES(value1, value2, value3, ...);

    saveAdd() {
        // Składanie zapytanie INSERT
        let arr: any = [];
        this.sqlQueryAdd = "INSERT INTO obiekty ( typ, rok_budowy, kod, garaz, piwnica, text, zalacznik, ulica, nr_domu, gmina, kod_p, miasto, panstwo ) VALUES ( ";

        for (var prop in this.dataArray[0]) {
            if (Boolean(this.dataArray[0][prop]) ) {
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
