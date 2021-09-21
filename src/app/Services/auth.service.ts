import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api = "api/Auth";

  constructor(private http: HttpClient) { }

  validateUser(_user: User): Observable<User>{
    return this.http.post<User>(`${this.api}/ValidateUser`, _user);
  }

  generateToken(_user: User): Observable<User>{
    return this.http.post<User>(`${this.api}/GenerateToken`, _user);
  }
}
