import { Component, OnInit } from '@angular/core';
import { AppService } from './../../app.service';

@Component({
  selector: 'app-obiekty',
  templateUrl: './obiekty.component.html',
  styleUrls: ['./obiekty.component.css']
})
export class ObiektyComponent implements OnInit {

  constructor(private service: AppService) { }

  ngOnInit() {
  }

}
