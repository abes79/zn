import { Injectable } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';

import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { OsobyComponent } from './main/osoby/osoby.component';
import { ObiektyComponent } from './main/obiekty/obiekty.component';
import { AlertComponent } from './main/alert/alert.component';
import { UmowyComponent } from './main/umowy/umowy.component';

@Injectable()
export class AuthGuard   {

  constructor(private router: Router, private service: AppService) { }

    canActivate() {
      
      if (this.service.getIsUserLogin()) {
        return true;
      }
        this.router.navigate(['login']);
        return false;
    }
}

const appRoutes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'alert',
        canActivate: [AuthGuard],
        component: AlertComponent
      },
      {
        path: 'osoby',
        canActivate: [AuthGuard],
        component: OsobyComponent
      },
      {
        path: 'nieruchomosci',
        canActivate: [AuthGuard],
        component: ObiektyComponent
      },
      {
        path: 'umowy',
        canActivate: [AuthGuard],
        component: UmowyComponent
      }
    ]
  },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
]

export const routing = RouterModule.forRoot(appRoutes);
