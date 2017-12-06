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
import { AlertComponent } from './main/alert/alert.component';


@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      MainComponent,
      OsobyComponent,
      ObiektyComponent,
      AlertComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      routing
  ],
  providers: [
    AuthGuard,
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
