import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule }    from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule} from '@angular/router';
import { routing }        from './app.routing';
import { UserService } from './_services/user.service';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { IsLogin } from './_helper/isLogin';
import { AuthenticationService } from './_services/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    routing
  ],
  providers: [UserService,IsLogin,AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
