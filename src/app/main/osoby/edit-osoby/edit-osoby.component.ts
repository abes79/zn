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
      //console.log(this.dataArray);
    })
  }

  saveEdit() {
    if (confirm("Czy na pewno zapisać zmiany?!") == true) {
      this._confirm = "Zmiany zostały zapisane.";
      this.sqlQueryUpdate = "UPDATE osoby SET imie='" + this.dataArray[0]['imie'] +
        "', drugie_imie='" + this.dataArray[0]['drugie_imie'] +
        "', nazwisko='" + this.dataArray[0]['nazwisko'] +
        "', pesel='" + this.dataArray[0]['pesel'] +
        "', email='" + this.dataArray[0]['email'] +
        "', telefon='" + this.dataArray[0]['telefon'] +
        "', ulica='" + this.dataArray[0]['ulica'] +
        "', nr_domu='" + this.dataArray[0]['nr_domu'] +
        "', gmina='" + this.dataArray[0]['gmina'] +
        "', kod_p='" + this.dataArray[0]['kod_p'] +
        "', miasto='" + this.dataArray[0]['miasto'] +
        "', panstwo='" + this.dataArray[0]['panstwo'] +
        "' WHERE id = " + this.dataArray[0]['id'];
      let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + this.sqlQueryUpdate + '" }';
      let jsonPost: JSON = JSON.parse(toPost);
      let _url: string = 'http://abes79.linuxpl.info/zn/db_sql.php';
      this._http.post(_url, jsonPost
      ).subscribe((data) => {
        //this.dataArray = data;
      })
    } else {
      this._confirm = "Nie zapisano zmian.";
    }
  }
}
