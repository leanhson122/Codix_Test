import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
      
  }

  ngOnInit() {
      this.loadAllUsers();
  }

  private loadAllUsers() {
      this.userService.getAllUser().subscribe({
        next: data => {
            console.log(data);
            localStorage.setItem("users",data.toString())
        },
        error: ()  => {
            //this.alertService.error(error);
        }
    });
  }
}
