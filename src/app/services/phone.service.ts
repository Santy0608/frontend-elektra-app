import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Phone } from "../models/Phone";


@Injectable({
    providedIn: 'root'
})
export class PhoneService{

    private url: string = 'http://localhost:8080/api/phones';    

    constructor(private http: HttpClient){

    }

    phoneList(): Observable<Phone[]>{
        return this.http.get<Phone[]>(this.url);
    }

    findPhoneById(id:Number): Observable<Phone>{
        return this.http.get<Phone>(`${this.url}/${id}`);
    }

    savePhone(phone: Phone): Observable<Phone>{
        return this.http.post<Phone>(this.url, phone);
    }

    updatePhone(phone: Phone): Observable<Phone>{
        return this.http.put<Phone>(`${this.url}/${phone.idPhone}`, phone);
    }

    deletePhoneById(id: number): Observable<void>{
        return this.http.delete<void>(`${this.url}/${id}`);
    }

    searchPhone(phone: string): Observable<Phone[]>{
        let params = new HttpParams();
        if (phone){
            params = params.append('phoneNumber', phone);
        }
        return this.http.get<Phone[]>(`${this.url}/search`, { params: params });
    }

}