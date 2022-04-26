import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  isActionDone = false;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        nickName: ['', Validators.required],
        password: ['', Validators.required]
    });

    // reset login status
    this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user_detail';
  }


get f() { return this.loginForm.controls; }

onSubmit() {
    this.submitted = true;

    //if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.nickName.value, this.f.password.value)
    .subscribe({
      next: data => {
          this.loading = false;
          if (data.message == "OK") {
            this.isActionDone = true;
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currUser', JSON.stringify(data.currUser));
            this.router.navigate(['/user_detail']);
          }
          else
          {
            this.isActionDone = false;
          }
      },
      error: ()  => {
        this.isActionDone = false;
        this.loading = false;
      }
  });
}

}
