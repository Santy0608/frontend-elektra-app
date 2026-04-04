import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Email } from "../models/Email";

@Injectable({
    providedIn: 'root'
})
export class EmailService{

    private url: string = 'http://localhost:8080/api/emails';

    constructor(private http: HttpClient){

    }

    emailList(): Observable<Email[]>{
        return this.http.get<Email[]>(this.url);
    }

    findEmailById(id:Number): Observable<Email>{
        return this.http.get<Email>(`${this.url}/${id}`);
    }
    
    saveEmail(email: Email): Observable<Email>{
        return this.http.post<Email>(this.url, email);
    }
    
    updateEmail(email: Email): Observable<Email>{
        return this.http.put<Email>(`${this.url}/${email.idEmail}`, email);
    }
    
    deleteEmailById(id: number): Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`);
    }

    searchEmail(email: string): Observable<Email[]>{
        let params = new HttpParams();
        if (email){
            params = params.append('email', email);
        }
        return this.http.get<Email[]>(`${this.url}/search`, { params: params });
    }

}