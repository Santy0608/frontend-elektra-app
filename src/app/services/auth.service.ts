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
  private _usuario: any = {
    isAuth: false,
    isAdmin: false, 
    usuario: undefined
  };

  loginUsuario({ nombreUsuario, contrasenia }: any): Observable<any> {
    return this.http.post<any>(this.url, { nombreUsuario, contrasenia });
  }
  
  set usuario(usuario: any) {
    this._usuario = usuario;
    sessionStorage.setItem('login', JSON.stringify(usuario));
  }
  
  get usuario() {
    if (this._usuario.isAdmin){
      return this._usuario;
    } else if (sessionStorage.getItem('login') != null){
       this._usuario = JSON.parse(sessionStorage.getItem('login') || '{}');
       return this._usuario;
    }
    return this._usuario;
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
    return this.usuario.isAdmin;
  }

  authenticated() {
    return this.usuario.isAuth;
  }

  logout(): void {
    this._token = undefined;
    this._usuario = {
      isAuth: false,
      isAdmin: false,
      usuario: undefined
    };
    sessionStorage.removeItem('login');
    sessionStorage.removeItem('token');
  }
    

}