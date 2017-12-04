import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/Forms';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { routing, AuthGuard } from './app.routing';

@NgModule({
  declarations: [
      AppComponent,
      LoginComponent,
      HomeComponent
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      routing
  ],
  providers: [
      AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
