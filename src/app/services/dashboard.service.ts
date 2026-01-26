import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Sale } from "../models/Sale";


@Injectable({
    providedIn: 'root'
})
export class DashboardService{

    private url: string = 'http://localhost:4200/api/dashboard'

    constructor(private http: HttpClient){

    }

    getTotalSales(): Observable<Sale[]>{
        return this.http.get<Sale[]>(`${this.url}/ventas`);
    }

}