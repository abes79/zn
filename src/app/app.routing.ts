import { Injectable } from '@angular/core';
import { Router, Routes, RouterModule, RouterStateSnapshot } from '@angular/router';

import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

@Injectable()
export class AuthGuard   {

  loged: boolean = true;

  constructor(private router: Router, private service: AppService) { }

    canActivate(state: RouterStateSnapshot) {
      
      if (this.service.getIsUserLogin()) {
        console.log(this.service.getIsUserLogin());
            return true;
        }
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}

const appRoutes: Routes = [
    { path: '', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '/login', pathMatch: 'full' }
]

export const routing = RouterModule.forRoot(appRoutes);
