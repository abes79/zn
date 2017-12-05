import { Injectable } from '@angular/core';
import { Router, Routes, RouterModule } from '@angular/router';

import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

@Injectable()
export class AuthGuard   {

  constructor(private router: Router, private service: AppService) { }

    canActivate() {
      
      if (this.service.getIsUserLogin()) {
        return true;
      }
        this.router.navigate(['/login']);
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
