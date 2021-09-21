import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private Api:string = "api/Contact";

  constructor(private http: HttpClient) { }

  getAll():Observable<Contact[]> {
    return this.http.get<any>(`${this.Api}/GetAll`);
  }

  getById(id: number):Observable<Contact>{
    return this.http.get<Contact>(`${this.Api}/GetById/${id}`);
  }

  save(_contact: Contact): Observable<Contact>{
    return this.http.post<Contact>(`${this.Api}/Save`, _contact);
  }

  update(_contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${this.Api}/Update`, _contact);
  }

  delete(id: number):Observable<any> {
    return this.http.post<any>(`${this.Api}/Delete`, id);
  }

  uploadCSV(_file: any):Observable<any> {
    return this.http.post<any>(`${this.Api}/UploadCSV`, _file);
  }



}
