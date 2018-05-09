import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../app.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-umowy',
  templateUrl: './edit-umowy.component.html',
  styleUrls: ['./edit-umowy.component.css']
})
export class EditUmowyComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _http: HttpClient, private service: AppService) { }

  ngOnInit() {
      this.selectSqlObiekty();
  }

  _confirm: string;
  umowaEdit: number;
  selectOption1 = [
      { value: 'najem', viewValue: 'Najem' },
      { value: 'wynajem', viewValue: 'Wynajem' }
  ];
  selectOption2 = [
      { value: 'osoba', viewValue: 'Osoba' },
      { value: 'firma', viewValue: 'Firma' }
  ];
  dataArray: any = [{
    id: "",
    kontrahent_id: "",
    nieruchomosci_id: "",
    typ: "",
    strona: "",
    czas_od: "",
    czas_do: "",
    kwota: "",
    bank: "",
    czynsz: "",
    media: "",
    prowizja: "",
    zalacznik: ""
  }];

  // SELECT umowy.*, osoby.imie, osoby.nazwisko, nieruchomosci.ulica, nieruchomosci.nr_domu FROM umowy, osoby, nieruchomosci WHERE osoby.id = 2 AND nieruchomosci.id = 3
  selectSqlObiekty() {
      let sqlQuerySelect;
      this.route
          .queryParams
          .subscribe(params => {
              this.umowaEdit = params['umowa'];
              if (params['kontrahent'] > 0)
                  this.dataArray[0].osoby_id = params['kontrahent'];
              if (params['nieruchomosc'] > 0)
                  this.dataArray[0].nieruchomosci_id = params['nieruchomosc'];
              //if (params['kontrahent'] > 0) {
              //    this.dataArray[0].osoby_id = params['kontrahent'];
              //    sqlQuerySelect = "SELECT imie, nazwisko FROM osoby WHERE osoby.id = " + this.dataArray[0].osoby_id;
              //    let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + sqlQuerySelect + '" }';
              //    let jsonPost: JSON = JSON.parse(toPost);
              //    let _url: string = this.service.getConnectUrl();
              //    this._http.post(_url, jsonPost
              //    ).subscribe((data) => {
              //        this.dataArray[0].imie = data[0].imie;
              //        this.dataArray[0].nazwisko = data[0].nazwisko;
              //    })
              //} else if (params['nieruchomosc'] > 0) {
              //    this.dataArray[0].nieruchomosci_id = params['nieruchomosc'];
              //    sqlQuerySelect = "SELECT ulica, nr_domu FROM nieruchomosci WHERE nieruchomosci.id = " + params['nieruchomosc'];
              //    let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + sqlQuerySelect + '" }';
              //    let jsonPost: JSON = JSON.parse(toPost);
              //    let _url: string = this.service.getConnectUrl();
              //    this._http.post(_url, jsonPost
              //    ).subscribe((data) => {
              //        this.dataArray[0].ulica = data[0].ulica;
              //        this.dataArray[0].nr_domu = data[0].nr_domu;
              //    })
              //}
          });
      sqlQuerySelect = "SELECT umowy.*, osoby.imie, osoby.nazwisko, nieruchomosci.ulica, nieruchomosci.nr_domu FROM umowy, osoby, nieruchomosci WHERE umowy.id = "+
          this.umowaEdit + " AND osoby.id = " + this.dataArray[0].kontrahent_id + " AND nieruchomosci.id = " + this.dataArray[0].nieruchomosci_id;
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
        this.dataArray[0].osoby_id = params['kontrahent'];
        this.dataArray[0].nieruchomosci_id = params['nieruchomosc'];
      });
    let arr: any = [];
    let sqlQueryUpdate = "UPDATE umowy SET ";
    for (var prop in this.dataArray[0]) {
      if (Boolean(this.dataArray[0][prop]) && prop !== 'id' && prop !== 'imie' && prop !== 'nazwisko' && prop !== 'ulica' && prop !== 'nr_domu') {
        sqlQueryUpdate = sqlQueryUpdate + prop + " ='" + this.dataArray[0][prop] + "', ";
      } else if (!Boolean(this.dataArray[0][prop]) && prop !== 'imie' && prop !== 'nazwisko' && prop !== 'ulica' && prop !== 'nr_domu') {
        sqlQueryUpdate = sqlQueryUpdate + prop + " = null, ";
      }
    }
    sqlQueryUpdate = sqlQueryUpdate.slice(0, -2) + " WHERE id = " + this.dataArray[0]['id'];
    //------------SQL-------------
    if (confirm("Czy na pewno zapisać zmiany?!") == true) {
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
      this.router.navigate(['umowy/edit/search'], { queryParams: { umowa: this.umowaEdit, kontrahent: this.dataArray[0].osoby_id, nieruchomosc: this.dataArray[0].nieruchomosci_id, search: 'person' } });
  }

  selectAnotherProperty() {
      this.router.navigate(['umowy/edit/search'], { queryParams: { umowa: this.umowaEdit, kontrahent: this.dataArray[0].osoby_id, nieruchomosc: this.dataArray[0].nieruchomosci_id, search: 'property' } });
  }
}
