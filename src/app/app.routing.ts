import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { IsLogin } from './_helper/isLogin';

const appRoutes: Routes = [
    { path: '', component: UserDetailComponent,canActivate: [IsLogin]  },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
   
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);