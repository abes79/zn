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
  strona: string;
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
              this.dataArray[0].id = params['umowa'];
              if (params['kontrahent'] > 0)
                  this.dataArray[0].kontrahent_id = params['kontrahent'];
              if (params['nieruchomosc'] > 0)
                  this.dataArray[0].nieruchomosci_id = params['nieruchomosc'];
              if (params['strona'])
                  this.strona = params['strona'];
          });
      if (this.strona === 'osoba') {
          sqlQuerySelect = "SELECT umowy.*, CONCAT(osoby.imie, ' ', osoby.nazwisko) AS nazwa, nieruchomosci.ulica, nieruchomosci.nr_domu FROM umowy, osoby, nieruchomosci WHERE umowy.id = " +
              this.dataArray[0].id + " AND osoby.id = " + this.dataArray[0].kontrahent_id + " AND nieruchomosci.id = " + this.dataArray[0].nieruchomosci_id;
      } else if (this.strona === 'firma') {
          sqlQuerySelect = "SELECT umowy.*, firmy.nazwa AS nazwa, nieruchomosci.ulica, nieruchomosci.nr_domu FROM umowy, firmy, nieruchomosci WHERE umowy.id = " +
              this.dataArray[0].id + " AND firmy.id = " + this.dataArray[0].kontrahent_id + " AND nieruchomosci.id = " + this.dataArray[0].nieruchomosci_id;
      }
      let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + sqlQuerySelect + '" }';
      let jsonPost: JSON = JSON.parse(toPost);
      let _url: string = this.service.getConnectUrl();
      this._http.post(_url, jsonPost
      ).subscribe((data) => {
          this.dataArray = data;
          this.dataArray[0].strona = this.strona;
          })
  }

  saveEdit() {
    // Składanie zapytanie UPDATE
    this.route
      .queryParams
      .subscribe(params => {
        this.dataArray[0].kontrahent_id = params['kontrahent'];
        this.dataArray[0].nieruchomosci_id = params['nieruchomosc'];
      });
    let arr: any = [];
    let sqlQueryUpdate = "UPDATE umowy SET ";
    for (var prop in this.dataArray[0]) {
      if (Boolean(this.dataArray[0][prop]) && prop !== 'id' && prop !== 'nazwa' && prop !== 'ulica' && prop !== 'nr_domu') {
        sqlQueryUpdate = sqlQueryUpdate + prop + " ='" + this.dataArray[0][prop] + "', ";
      } else if (!Boolean(this.dataArray[0][prop]) && prop !== 'nazwa' && prop !== 'ulica' && prop !== 'nr_domu') {
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
      this.strona = this.dataArray[0].strona;
      if (this.dataArray[0].strona === 'osoba')
          this.router.navigate(['umowy/edit/search'], { queryParams: { umowa: this.dataArray[0].id, kontrahent: this.dataArray[0].kontrahent_id, nieruchomosc: this.dataArray[0].nieruchomosci_id, search: 'person' } });
      else if (this.dataArray[0].strona === 'firma')
          this.router.navigate(['umowy/edit/search'], { queryParams: { umowa: this.dataArray[0].id, kontrahent: this.dataArray[0].kontrahent_id, nieruchomosc: this.dataArray[0].nieruchomosci_id, search: 'company' } });
  }

  selectAnotherProperty() {
      this.router.navigate(['umowy/edit/search'], { queryParams: { umowa: this.dataArray[0].id, kontrahent: this.dataArray[0].osoby_id, nieruchomosc: this.dataArray[0].nieruchomosci_id, search: 'property' } });
  }
}
