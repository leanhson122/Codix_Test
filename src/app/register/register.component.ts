import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl,ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../_services/user.service';

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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: UserService,) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
        {
            nickName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            country: ['', Validators.required],
            phone: ['', Validators.required],  
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required], 
        }, {
            validators: PasswordValidator.confirmed("password", "confirmPassword")
    })
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
      this.userService.register(this.registerForm.value)
      .subscribe({
            next: data => {
                console.log(data);
                localStorage.setItem('currUser', JSON.stringify(data.currUser));
                this.router.navigate(['/user_detail']);
            },
            error: ()  => {
                this.loading = false;
            }
        });
          
  }

}
