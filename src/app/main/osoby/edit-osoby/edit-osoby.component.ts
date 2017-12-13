import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-osoby',
  templateUrl: './edit-osoby.component.html',
  styleUrls: ['./edit-osoby.component.css']
})
export class EditOsobyComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe(params => {
        this.idEdit= params['id'];
      });
  }

  idEdit: number;




}
