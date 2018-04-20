import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    constructor(private router: Router, private route: ActivatedRoute, private service: AppService) { }

  ngOnInit() {
      //console.log(this.router.url);
      if (this.router.url.indexOf("firmy") > 0 || this.router.url.indexOf("umowy") > 0) {
          this.wyszukaj = false;
          this.route
              .queryParams
              .subscribe(params => {
                  this.firmaEdit = params['firma'];
                  this.umowaEdit = params['umowa'];
                  this.selectKontrahent = params['kontrahent'];
                  this.selectNieruchomosc = params['nieruchomosc'];
                  this.selectSearch = params['search'];
              });
          if (this.selectSearch == 'property') {
              this.selectedValue1 = 'nieruchomosci';
              this.wyszukiwanieInfo = 'nieruchomości';
          } else {
              this.selectedValue1 = 'osoby';
              this.wyszukiwanieInfo = 'osób';
          }
          //ścieżka URL pod button 
          if (this.router.url.indexOf("/firmy/add") > 0) {
              this.routerLink = '/firmy/add/search';
          } else if (this.router.url.indexOf("/firmy/edit") > 0) {
              this.routerLink = "/firmy/edit/search";
          } else if (this.router.url.indexOf("/umowy/add") > 0) {
              this.routerLink = '/umowy/add/search';
          } else if (this.router.url.indexOf("/umowy/edit") > 0) {
              this.routerLink = '/umowy/edit/search';
          }
          
      } else {
          this.wyszukaj = true;
          this.filtrujEdit = false;
          this.wyszukiwanieInfo = 'osób, firm, nieruchomości, umów';
          this.routerLink = "/search";
      }
    }
  selectSearch: string;
  routerLink: string;
  firmaEdit: string;
  umowaEdit: string;
  selectOsoba: string;
  selectKontrahent: string;
  selectNieruchomosc: string;
  wyszukiwanieInfo: string;
  wyszukaj: boolean;
  filtrujAdd: boolean;
  filtrujEdit: boolean;  
  keyWord: string = '';
  resultExisting: boolean = false;
  selectedValue1: string;
  selectOption1 = [
    { value: 'osoby', viewValue: 'Osoby' },
    { value: 'firmy', viewValue: 'Firmy' },
    { value: 'nieruchomosci', viewValue: 'Nieruchomości' },
    { value: 'umowy', viewValue: 'Umowy' }
  ];
  selectedValue2: string;
  selectOption2: any = [{
    osoby: [
      { value: 'id', viewValue: 'ID' }, { value: 'imie', viewValue: 'Imie' },
      { value: 'drugie_imie', viewValue: 'Drugie Imie' }, { value: 'nazwisko', viewValue: 'Nazwisko' },
      { value: 'pesel', viewValue: 'Pesel' }, { value: 'email', viewValue: 'Email' },
      { value: 'telefon', viewValue: 'Nr Telefonu' }, { value: 'ulica', viewValue: 'Ulica' },
      { value: 'nr_domu', viewValue: 'Nr Domu' }, { value: 'gmina', viewValue: 'Gmina / Dzielnica' },
      { value: 'kod_p', viewValue: 'Kod Pocztowy' }, { value: 'miasto', viewValue: 'Miasto' },
      { value: 'panstwo', viewValue: 'Państwo' }
    ],
    firmy: [  
      { value: 'firmy.id', viewValue: 'ID' }, { value: 'osoby.imie', viewValue: 'Imie Reprezentanta' },
      { value: 'osoby.nazwisko', viewValue: 'Nazwisko Reprezentanta' }, { value: 'firmy.nazwa', viewValue: 'Nazwa' },
      { value: 'firmy.nip', viewValue: 'NIP' }, { value: 'firmy.regon', viewValue: 'Regon' },
      { value: 'firmy.telefon', viewValue: 'Telefon' }, { value: 'firmy.email', viewValue: 'E Mail' },
      { value: 'firmy.ulica', viewValue: 'Ulica' }, { value: 'firmy.nr_domu', viewValue: 'Nr Domu' },
      { value: 'firmy.gmina', viewValue: 'Gmina' }, { value: 'firmy.miasto', viewValue: 'Miasto' },
      { value: 'firmy.kod_p', viewValue: 'Kod Pocztowy' }, { value: 'firmy.panstwo', viewValue: 'Państwo' }
    ],
    nieruchomosci: [
      { value: 'id', viewValue: 'ID' }, { value: 'typ', viewValue: 'Typ Nieruchomości' },
      { value: 'ulica', viewValue: 'Ulica' }, { value: 'nr_domu', viewValue: 'Nr Domu' },
      { value: 'gmina', viewValue: 'Gmina / Dzielnica' }, { value: 'miasto', viewValue: 'Miasto' },
      { value: 'kod_p', viewValue: 'Kod Pocztowy' }, { value: 'panstwo', viewValue: 'Państwo' }
    ],
    umowy: [
      { value: 'umowy.id', viewValue: 'ID' }, { value: 'strona', viewValue: 'Strona Umowy' }, { value: 'umowy.typ', viewValue: 'Typ Umowy' },
      { value: 'czas_od', viewValue: 'Podpisana Od' }, { value: 'czas_do', viewValue: 'Podpisana Do' }, { value: 'kwota', viewValue: 'Kwota' },
      { value: 'osoby_id', viewValue: 'ID Osoby' }, { value: 'nieruchomosci_id', viewValue: 'ID Nieruchomiści' }
    ]
  }];

  search() {
    // silnik wyszukiwania
    //console.log(this.selectedValue1 + ' ' + this.selectedValue2 + ' ' + this.keyWord);
    if (this.selectedValue2) {
        if (this.selectedValue1 === 'osoby') {
            if (this.router.url.indexOf("firmy") > 0) {
                this.service.setSearchType(this.selectedValue2);
                this.service.setKayWord(this.keyWord);
                if (this.router.url.indexOf("firmy/edit") > 0) 
                    this.router.navigate(['firmy/edit/search/osoby'], { queryParams: { firma: this.firmaEdit, osoba: this.selectOsoba } });
                else if (this.router.url.indexOf("firmy/add") > 0)
                    this.router.navigate(['firmy/add/search/osoby']);
            } else if (this.router.url.indexOf("umowy") > 0) {
                this.service.setSearchType(this.selectedValue2);
                this.service.setKayWord(this.keyWord);
                if (this.router.url.indexOf("umowy/edit") > 0)
                    this.router.navigate(['umowy/edit/search/osoby'], { queryParams: { umowa: this.umowaEdit, kontrahent: this.selectKontrahent, nieruchomosc: this.selectNieruchomosc  } });
                else if (this.router.url.indexOf("umowy/add") > 0)
                    this.router.navigate(['umowy/add/search/osoby']);
            } else {
                this.service.setSearchType(this.selectedValue2);
                this.service.setKayWord(this.keyWord);
                this.router.navigate(['search/osoby']);
            }
        } else if (this.selectedValue1 === 'nieruchomosci') {
            if (this.router.url.indexOf("umowy") > 0) {
                this.service.setSearchType(this.selectedValue2);
                this.service.setKayWord(this.keyWord);
                if (this.router.url.indexOf("umowy/edit") > 0)
                    this.router.navigate(['umowy/edit/search/nieruchomosci'], { queryParams: { umowa: this.umowaEdit, kontrahent: this.selectKontrahent, nieruchomosc: this.selectNieruchomosc } });
                else if (this.router.url.indexOf("umowy/add") > 0)
                    this.router.navigate(['umowy/add/search/nieruchomosci']);
            } else {
                this.service.setSearchType(this.selectedValue2);
                this.service.setKayWord(this.keyWord);
                this.router.navigate(['search/nieruchomosci']);
            }
        } else if (this.selectedValue1 === 'firmy') {
            this.service.setSearchType(this.selectedValue2);
            this.service.setKayWord(this.keyWord);
            this.router.navigate(['search/firmy']);
        } else if (this.selectedValue1 === 'umowy') {
        this.service.setSearchType(this.selectedValue2);
        this.service.setKayWord(this.keyWord);
        this.router.navigate(['search/umowy']);
    }
    }
  }
}
