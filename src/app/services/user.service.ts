import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/User";


@Injectable({
    providedIn: 'root'
})
export class UserService{

    private url: string = 'http://localhost:8080/api/users';

    constructor(private http: HttpClient){

    }

    userList(): Observable<User[]>{
        return this.http.get<User[]>(this.url);
    }

    findUserById(id: number): Observable<User>{
        return this.http.get<User>(`${this.url}/${id}`);
    }

    saveUser(user: User): Observable<User>{
        return this.http.post<User>(this.url, user);
    }

    updateUser(user: User): Observable<User>{
        return this.http.put<User>(`${this.url}/${user.idUser}`, user);
    }

    deleteUser(id: number): Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`);
    }

}