import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router, private service: AppService) { }

  ngOnInit() {
  }
  
  keyWord: string = '';
  selectedValue1: string;
  resultExisting: boolean = false;
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
        { value: 'id', viewValue: 'ID' }, { value: 'osoby_id', viewValue: 'ID Osoby' },
        { value: 'nazwa', viewValue: 'Nazwa' }, { value: 'nip', viewValue: 'NIP' },
        { value: 'regon', viewValue: 'Regon' }, { value: 'telefon', viewValue: 'Telefon' },
        { value: 'email', viewValue: 'E Mail' }, { value: 'ulica', viewValue: 'Ulica' },
        { value: 'nr_domu', viewValue: 'Nr Domu' }, { value: 'gmina', viewValue: 'Gmina' },
        { value: 'miasto', viewValue: 'Miasto' }, { value: 'kod_p', viewValue: 'Kod Pocztowy' },
        { value: 'panstwo', viewValue: 'Państwo' }
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
        this.service.setSearchType(this.selectedValue2);
        this.service.setKayWord(this.keyWord);
        this.router.navigate(['search/osoby']);
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
