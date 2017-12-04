import { Injectable } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/Forms';
import { Routes, RouterModule, CanActivate } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { routing } from './app.routing';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AlwaysAuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
]

@Injectable()
class AlwaysAuthGuard implements CanActivate {
    canActivate() {
        console.log("AlwaysAuthGuard");
        return true;
    }
}

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
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        AlwaysAuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }




