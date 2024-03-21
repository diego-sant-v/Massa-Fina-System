import { Injectable } from '@angular/core';
import { UserRegisterDTO } from './user-register-dto';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = 'http://localhost:8080/api/users';
  constructor(private http: HttpClient) { }
  registerUser(userRegister: UserRegisterDTO): Observable<any> {
    return this.http.post(this.apiUrl, userRegister);
  }

  loginUser(email: string, password: string): Observable<any> {
    const paramsData = new HttpParams()
      .append('email', email)
      .append('password', password);
    return this.http.get<any>(this.apiUrl + '/login', { params: paramsData });
  }
}
