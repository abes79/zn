import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../app.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-umowy',
  templateUrl: './add-umowy.component.html',
  styleUrls: ['./add-umowy.component.css']
})
export class AddUmowyComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute, private _http: HttpClient, private service: AppService) { }

  ngOnInit() {  }

  _confirm: string;
  selectOsoba: number;
  selectNieruchomosc: number;
  selectOption1 = [
      { value: 'najem', viewValue: 'Najem' },
      { value: 'wynajem', viewValue: 'Wynajem' }
  ];
  selectOption2 = [
      { value: 'osoba', viewValue: 'Osoba' },
      { value: 'firma', viewValue: 'Firma' }
  ];
  dataArray: any = [{
    kontrahent_id: "",
    nieruchomosci_id: "",
    typ: "",
    strona: "osoba",
    czas_od: "",
    czas_do: "",
    kwota: "",
    bank: "",
    czynsz: "",
    media: "",
    prowizja: "",
    zalacznik: ""
  }];

  // SELECT umowy.*, osoby.imie, osoby.nazwisko FROM umowy , osoby WHERE firmy.id = 2 AND osoby.id = 3

  selectSqlObiekty() {      
      let sqlQuerySelect;
      this.route
          .queryParams
          .subscribe(params => {
              if (params['kontrahent'] > 0) {
                  this.dataArray[0].kontrahent_id = params['kontrahent'];
                  if (this.dataArray[0].strona == 'firma') {
                      sqlQuerySelect = "SELECT nazwa FROM firmy WHERE firmy.id = " + this.dataArray[0].kontrahent_id;
                  } else {
                      sqlQuerySelect = "SELECT imie, nazwisko FROM osoby WHERE osoby.id = " + this.dataArray[0].kontrahent_id;
                  }
                  let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + sqlQuerySelect + '" }';
                  let jsonPost: JSON = JSON.parse(toPost);
                  let _url: string = this.service.getConnectUrl();
                  this._http.post(_url, jsonPost
                  ).subscribe((data) => {
                      this.dataArray[0].imie = data[0].imie;
                      this.dataArray[0].nazwisko = data[0].nazwisko;
                      this.dataArray[0].nazwa = data[0].nazwa;
                  })
              } else if (params['nieruchomosc'] > 0) {
                  this.dataArray[0].nieruchomosci_id = params['nieruchomosc'];
                  sqlQuerySelect = "SELECT ulica, nr_domu FROM nieruchomosci WHERE nieruchomosci.id = " + params['nieruchomosc'];
                  let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + sqlQuerySelect + '" }';
                  let jsonPost: JSON = JSON.parse(toPost);
                  let _url: string = this.service.getConnectUrl();
                  this._http.post(_url, jsonPost
                  ).subscribe((data) => {
                      this.dataArray[0].ulica = data[0].ulica;
                      this.dataArray[0].nr_domu = data[0].nr_domu;
                  })
              }
          });
  }
  
  saveAdd() {
      // Składanie zapytanie INSERT
      let sqlQueryAdd: string;
      let arr: any = [];
      sqlQueryAdd = "INSERT INTO umowy ( kontrahent_id, nieruchomosci_id, typ, strona, czas_od, czas_do, kwota, bank, czynsz, media, prowizja, zalacznik ) VALUES ( ";
      for (var prop in this.dataArray[0]) {
          if (Boolean(this.dataArray[0][prop]) && prop !== 'imie' && prop !== 'nazwisko' && prop !== 'nazwa' && prop !== 'ulica' && prop !== 'nr_domu') {
              sqlQueryAdd = sqlQueryAdd + "'" + this.dataArray[0][prop] + "', ";
          } else if (!Boolean(this.dataArray[0][prop]) && prop !== 'imie' && prop !== 'nazwisko' && prop !== 'nazwa') {
              sqlQueryAdd = sqlQueryAdd + "null, ";
          }
      }
      sqlQueryAdd = sqlQueryAdd.slice(0, -2) + " ) ";
      //------------SQL-------------
      if (confirm("Czy na pewno dodać nową umowę?!") == true) {
          this._confirm = "Nowa umowa została dodana.";
          let toPost: string = '{ "sqlRequest" : "10", "sqlQuery" : "' + sqlQueryAdd + '" }';
          let jsonPost: JSON = JSON.parse(toPost);
          let _url: string = this.service.getConnectUrl();
          this._http.post(_url, jsonPost).subscribe((data) => {
              //this.dataArray = data;
          })
      } else {
          this._confirm = "Nie zapisano nowej umowy.";
      }
  }
    
  selectAnotherPerson() {
      if (this.dataArray[0].strona === 'osoba')
          this.router.navigate(['umowy/add/search'], { queryParams: { kontrahent: this.dataArray[0].kontrahent_id, search: 'person' } });
      else if (this.dataArray[0].strona === 'firma')
          this.router.navigate(['umowy/add/search'], { queryParams: { kontrahent: this.dataArray[0].kontrahent_id, search: 'company' } });
  }

  selectAnotherProperty() {
      this.router.navigate(['umowy/add/search'], { queryParams: { kontrahent: this.dataArray[0].kontrahent_id, search: 'property' } });
  }
}
