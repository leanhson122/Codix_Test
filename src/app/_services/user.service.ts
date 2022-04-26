import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { User } from "../_models/user";

const endpoint = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUser() {
    return this.http.get(`${endpoint}/all_users`);
  }

  getById(id: number) {
    return this.http.get(`${endpoint}/users/` + id);
  }

  register(user: User) {
    return this.http.post<any>(`${endpoint}/users/register`, user);
  }

  update(user: User) {
    return this.http.put<any>(`${endpoint}/user/update`, user);
  }
}