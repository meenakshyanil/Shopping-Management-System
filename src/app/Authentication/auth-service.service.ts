import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { environment } from 'src/environments/environment.development';
import { LoginResponseDto } from './login-response-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private apiurl = environment.baseApiUrl + 'auth';
  constructor(private client: HttpClient) {

  }
  register(u: User): Observable<User> {
    return this.client.post<User>(this.apiurl, u);
  }
  login(user: User): Observable<LoginResponseDto> {
    let res = this.client.post<LoginResponseDto>(this.apiurl + '/login', user);
    res.subscribe(response => {
      localStorage.clear();
      localStorage.setItem('userdetails', JSON.stringify(response));

    }, err => {
      console.log(err);
      return null;
    })
    return res;
  }
  getUser(): LoginResponseDto {
    let user = localStorage.getItem('userdetails');
    return JSON.parse(user || '{}');
  }
  logout() {
    localStorage.clear();
  }
  isLoggedIn(): boolean {
    return localStorage.getItem('userdetails') != null ? true : false;
  }
}
