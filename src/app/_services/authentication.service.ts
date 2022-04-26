import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

const endpoint = 'http://localhost:3000';
@Injectable({
    providedIn: 'root'
  })
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${endpoint}/authenticate`, { nickName: username, password: password })      
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currUser');
    }
}