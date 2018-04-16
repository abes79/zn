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
  umowaEdit: number;
  selectOsoba: number;
  selectNieruchomosc: number;
  dataArray: any = [{
    id: "",
    osoby_id: "",
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

  // SELECT umowy.*, osoby.imie, osoby.nazwisko FROM umowy , osoby WHERE firmy.id = 2 AND osoby.id = 3
 
  saveAdd() {
    // Składanie zapytanie UPDATE
    this.route
      .queryParams
      .subscribe(params => {
        this.dataArray[0].osoby_id = params['osoba'];
        this.dataArray[0].nieruchomosci_id = params['nieruchomosc'];
      });
    let arr: any = [];
    let sqlQueryUpdate = "UPDATE umowy SET ";
    for (var prop in this.dataArray[0]) {
      if (Boolean(this.dataArray[0][prop]) && prop !== 'id') {
        sqlQueryUpdate = sqlQueryUpdate + prop + " ='" + this.dataArray[0][prop] + "', ";
      } else if (!Boolean(this.dataArray[0][prop])) {
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

  //selectAnotherPerson() {
  //  this.router.navigate(['umowy/edit/search'], { queryParams: { firma: this.umowaEdit, osoba: this.selectOsoba } });
  //}
}
