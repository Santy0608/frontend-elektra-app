import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Sale } from "../models/Sale";
import { TopPart } from "../models/TopPart";
import { CriticalStock } from "../models/CriticalStock";


@Injectable({
    providedIn: 'root'
})
export class DashboardService{

    private url: string = 'http://localhost:8080/api/dashboard'

    constructor(private http: HttpClient){

    }

    getTotalSales(): Observable<Sale[]>{
        return this.http.get<Sale[]>(`${this.url}/sales`);
    }

    getTopParts(): Observable<TopPart[]>{
        return this.http.get<TopPart[]>(`${this.url}/top-parts`);
    }

    getCriticalStock(): Observable<CriticalStock[]>{
        return this.http.get<CriticalStock[]>(`${this.url}/critical-stock`);
    }    

}