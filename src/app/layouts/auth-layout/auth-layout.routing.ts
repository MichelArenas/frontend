import { Routes } from '@angular/router';

import { LoginComponent } from '../../pages/login/login.component';
import { RegisterComponent } from '../../pages/register/register.component';
import { ResetPasswordComponent } from 'src/app/pages/reset-password/reset-password.component';
import { SecondFAComponent } from 'src/app/pages/second-fa/second-fa.component';

export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent },
    { path: 'resetPassword',  component:ResetPasswordComponent },
    { path:'login-2FA',       component:SecondFAComponent}
    
];
