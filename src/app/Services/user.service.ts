import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = "api/User";

  constructor(private http: HttpClient) { }

  logInn(userName: string, password: string): any{
    if(userName != "" && password != ""){
      return true;
    }
  }


}
