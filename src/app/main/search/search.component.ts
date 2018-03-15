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
      if (this.router.url.indexOf("firmy") > 0) {
          this.wyszukaj1 = false;
          this.wyszukaj2 = true;
          this.selectedValue1 = 'osoby';
          this.wyszukiwanieInfo = 'osób';
          this.route
              .queryParams
              .subscribe(params => {
                  this.firmaEdit = params['firma'];
                  this.selectOsoba = params['osoba'];
              });
      } else {
          this.wyszukaj1 = true;
          this.wyszukaj2 = false;
          this.wyszukiwanieInfo = 'osób, nieruchomości, umów';
      }
    }
  firmaEdit: string;
  selectOsoba: string;
  wyszukiwanieInfo: string;
  wyszukaj1: boolean;
  wyszukaj2: boolean;  
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
      { value: 'id', viewValue: 'ID' }, { value: 'typ', viewValue: 'Typ Umowy' },
      { value: 'czas_od', viewValue: 'Podpisana Od' }, { value: 'czas_do', viewValue: 'Podpisana Do' },
      { value: 'osoby_id', viewValue: 'ID Osoby' }, { value: 'obiekty_id', viewValue: 'ID Nieruchomiści' }
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
                this.router.navigate(['firmy/edit/search/osoby'], { queryParams: { firma: this.firmaEdit, osoba: this.selectOsoba } });
            } else {
                this.service.setSearchType(this.selectedValue2);
                this.service.setKayWord(this.keyWord);
                this.router.navigate(['search/osoby']);
            }
        } else if (this.selectedValue1 === 'nieruchomosci') {
            this.service.setSearchType(this.selectedValue2);
            this.service.setKayWord(this.keyWord);
            this.router.navigate(['search/nieruchomosci']);
        } else if (this.selectedValue1 === 'firmy') {
            this.service.setSearchType(this.selectedValue2);
            this.service.setKayWord(this.keyWord);
            this.router.navigate(['search/firmy']);
        }
    }
  }
}
