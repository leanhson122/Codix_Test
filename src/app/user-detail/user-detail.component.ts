import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl,ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';


export class PasswordValidator {
  static confirmed = (controlPassword: string, matchingConfirmPassword: string) => {
      return (control: AbstractControl): ValidationErrors | null => {
          const input = control.get(controlPassword);
          const matchingInput = control.get(matchingConfirmPassword);
          
          if (input === null || matchingInput === null) {
              return null;
          }

          if (matchingInput?.errors && !matchingInput.errors.confirmedValidator) {
              return null;
          }

          if (input.value !== matchingInput.value) {
              matchingInput.setErrors({ confirmedValidator: true });
              console.log(input,matchingInput)
              return ({ confirmedValidator: true });
          } else {
              matchingInput.setErrors(null);
              return null;
          }
      };
  }
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  currentUser:any;
  isActionDone = false;
  resMessage = '';

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UserService,) { }

  ngOnInit() {
    //get current user;
    const currUser = localStorage.getItem('currUser');
    if(currUser && JSON.parse(currUser)){
      const user = JSON.parse(currUser);
      this.currentUser = user;
      this.registerForm = this.formBuilder.group(
        {
            nickName: [user.nickName, Validators.required],
            email: [{value:'', disabled: true}],
            country: [user.country, Validators.required],
            phone: [user.phone, Validators.required],  
            password: [user.password, [Validators.required, Validators.minLength(6)]],
            confirmPassword: [user.confirmPassword, Validators.required], 
        }, {
            validators: PasswordValidator.confirmed("password", "confirmPassword")
      })
      this.registerForm.controls['email'].setValue(user.email); 
      this.registerForm.controls['phone'].setValue(user.phone); 
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      //if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      this.loading = true;
      this.userService.update({...this.registerForm.value, email: this.currentUser.email, oldNick: this.currentUser.nickName})
      .subscribe({
            next: data => {
                this.loading = false;
                console.log(data);
                if (data.message=="OK") {
                  this.isActionDone = true;
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currUser', JSON.stringify(data.currUser));
                }
                else
                {
                  this.isActionDone = false;
                  this.resMessage = data.message;
                }  
            },
            error: (err)  => {
              this.isActionDone = false;
              this.loading = false;
            }
        });
          
  }

}

