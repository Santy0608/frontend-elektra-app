import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class AuthService{
    
    private url: string = 'http://localhost:8080/login';

    constructor(private http: HttpClient) {}

  private _token: string | undefined;
  private _user: any = {
    isAuth: false,
    isAdmin: false, 
    user: undefined
  };

  loginUsuario({ username, password }: any): Observable<any> {
    return this.http.post<any>(this.url, { username, password });
  }
  
  set user(user: any) {
    this._user = user;
    sessionStorage.setItem('login', JSON.stringify(user));
  }
  
  get user() {
    if (this._user.isAdmin){
      return this._user;
    } else if (sessionStorage.getItem('login') != null){
       this._user = JSON.parse(sessionStorage.getItem('login') || '{}');
       return this._user;
    }
    return this._user;
  }

  set token(token: string) {
    this._token = token;
    sessionStorage.setItem('token', token);
  }

  get token() {
    if (this._token != undefined) {
        return this._token;
    } else if (sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token') || '';
      return this._token;
    }
    return this._token!;
  }

  getPayload(token: string): any {
    if (token) {
      return JSON.parse(atob(token.split(".")[1]));
    } else {
      return;
    }
  }

  isAdmin() {
    return this.user.isAdmin;
  }

  authenticated() {
    return this.user.isAuth;
  }

  logout(): void {
    this._token = undefined;
    this._user = {
      isAuth: false,
      isAdmin: false,
      usuario: undefined
    };
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('token');
  }
    

}