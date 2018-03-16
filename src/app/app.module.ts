import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/Forms';

import { routing, AuthGuard } from './app.routing';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { OsobyComponent } from './main/osoby/osoby.component';
import { ObiektyComponent } from './main/obiekty/obiekty.component';
import { FirmyComponent } from './main/firmy/firmy.component';
import { AlertComponent } from './main/alert/alert.component';
import { SearchComponent } from './main/search/search.component';
import { UmowyComponent } from './main/umowy/umowy.component';
import { AddOsobyComponent } from './main/osoby/add-osoby/add-osoby.component';
import { EditOsobyComponent } from './main/osoby/edit-osoby/edit-osoby.component';
import { AddObiektyComponent } from './main/obiekty/add-obiekty/add-obiekty.component';
import { EditObiektyComponent } from './main/obiekty/edit-obiekty/edit-obiekty.component';
import { AddFirmyComponent } from './main/firmy/add-firmy/add-firmy.component';
import { EditFirmyComponent } from './main/firmy/edit-firmy/edit-firmy.component';


@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      MainComponent,
      AlertComponent,
      SearchComponent,
      OsobyComponent,
      ObiektyComponent,
      UmowyComponent,
      AddOsobyComponent,
      EditOsobyComponent,
      AddObiektyComponent,
      EditObiektyComponent,
      FirmyComponent,
      AddFirmyComponent,
      EditFirmyComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      routing
  ],
  providers: [
      AuthGuard,
      AppService,
      AddFirmyComponent,
      EditFirmyComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
