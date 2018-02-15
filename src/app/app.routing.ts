import { Injectable } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';

import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { OsobyComponent } from './main/osoby/osoby.component';
import { ObiektyComponent } from './main/obiekty/obiekty.component';
import { AlertComponent } from './main/alert/alert.component';
import { SearchComponent } from './main/search/search.component';
import { UmowyComponent } from './main/umowy/umowy.component';
import { AddOsobyComponent } from './main/osoby/add-osoby/add-osoby.component';
import { EditOsobyComponent } from './main/osoby/edit-osoby/edit-osoby.component';
import { AddObiektyComponent } from './main/obiekty/add-obiekty/add-obiekty.component';
import { EditObiektyComponent } from './main/obiekty/edit-obiekty/edit-obiekty.component';

@Injectable()
export class AuthGuard   {

  constructor(private router: Router, private service: AppService ) { }

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
    canActivate: [AuthGuard],
    component: MainComponent,
    children: [
      {
        path: 'alert',
        canActivate: [AuthGuard],
        component: AlertComponent
      },
      {
        path: 'search',
        canActivate: [AuthGuard],
        component: SearchComponent,
        children: [
          {
            path: 'osoby',
            canActivate: [AuthGuard],
            component: OsobyComponent
          },
          {
              path: 'nieruchomosci',
            canActivate: [AuthGuard],
            component: ObiektyComponent
          }
        ]
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
      },
      {
        path: 'osoby/add',
        canActivate: [AuthGuard],
        component: AddOsobyComponent
      },
      {
        path: 'osoby/edit',
        canActivate: [AuthGuard],
        component: EditOsobyComponent
      },
      {
        path: 'nieruchomosci/add',
        canActivate: [AuthGuard],
        component: AddObiektyComponent
      },
      {
        path: 'nieruchomosci/edit',
        canActivate: [AuthGuard],
        component: EditObiektyComponent
      }
    ]
  },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
]

export const routing = RouterModule.forRoot(appRoutes);
